"""
Celery tasks for fetching and analyzing YouTube comments.
"""
from celery import shared_task
from django.conf import settings
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime
from .models import Video, Comment, CommentAnalysis, VideoAnalysis
from analysis.sentiment import analyze_sentiment
from analysis.topic_modeling import extract_topics


@shared_task
def fetch_video_comments(video_id):
    """
    Fetch comments for a YouTube video and trigger analysis.
    
    Args:
        video_id (int): Database ID of the Video model instance
    """
    try:
        # Get video instance
        video = Video.objects.get(id=video_id)
        
        # Initialize YouTube API client
        youtube = build('youtube', 'v3', developerKey=settings.YOUTUBE_API_KEY)
        
        # Fetch video details first
        video_response = youtube.videos().list(
            part='snippet',
            id=video.youtube_video_id
        ).execute()
        
        if video_response['items']:
            video_data = video_response['items'][0]['snippet']
            video.title = video_data['title']
            video.description = video_data['description']
            video.save()
        
        # Fetch comments
        comments_list = []
        next_page_token = None
        
        while True:
            # Get comments page
            response = youtube.commentThreads().list(
                part='snippet',
                videoId=video.youtube_video_id,
                maxResults=100,
                pageToken=next_page_token
            ).execute()
            
            # Process comments
            for item in response['items']:
                comment_data = item['snippet']['topLevelComment']['snippet']
                
                # Create comment instance
                comment = Comment.objects.create(
                    video=video,
                    youtube_comment_id=item['id'],
                    author_name=comment_data['authorDisplayName'],
                    text=comment_data['textDisplay'],
                    published_at=datetime.strptime(
                        comment_data['publishedAt'],
                        '%Y-%m-%dT%H:%M:%SZ'
                    ),
                    like_count=comment_data.get('likeCount', 0)
                )
                comments_list.append(comment)
            
            # Check if there are more pages
            next_page_token = response.get('nextPageToken')
            if not next_page_token:
                break
        
        # Trigger analysis for all comments
        analyze_comments.delay(video_id, [comment.id for comment in comments_list])
        
    except HttpError as e:
        # Log the error and update video status
        print(f"Error fetching comments: {str(e)}")
        # TODO: Add error handling and status updates
    except Exception as e:
        print(f"Unexpected error: {str(e)}")


@shared_task
def analyze_comments(video_id, comment_ids):
    """
    Analyze sentiment and topics for a batch of comments.
    
    Args:
        video_id (int): Database ID of the Video model instance
        comment_ids (list): List of Comment IDs to analyze
    """
    try:
        video = Video.objects.get(id=video_id)
        comments = Comment.objects.filter(id__in=comment_ids)
        
        # Initialize counters for video analysis
        sentiment_counts = {'positive': 0, 'negative': 0, 'neutral': 0}
        all_topics = []
        
        # Analyze each comment
        for comment in comments:
            # Perform sentiment analysis
            sentiment = analyze_sentiment(comment.text)
            
            # Extract topics and keywords
            topics, keywords = extract_topics(comment.text)
            
            # Create or update comment analysis
            CommentAnalysis.objects.create(
                comment=comment,
                sentiment=sentiment,
                topics=topics,
                keywords=keywords
            )
            
            # Update sentiment counts
            sentiment_counts[sentiment] += 1
            all_topics.extend(topics)
        
        # Calculate overall sentiment
        max_sentiment = max(sentiment_counts.items(), key=lambda x: x[1])[0]
        
        # Get top topics (simple frequency-based approach)
        topic_freq = {}
        for topic in all_topics:
            topic_freq[topic] = topic_freq.get(topic, 0) + 1
        top_topics = dict(sorted(
            topic_freq.items(),
            key=lambda x: x[1],
            reverse=True
        )[:10])
        
        # Generate basic recommendations based on sentiment distribution
        recommendations = generate_recommendations(sentiment_counts, top_topics)
        
        # Create or update video analysis
        VideoAnalysis.objects.create(
            video=video,
            total_comments=len(comments),
            positive_comments=sentiment_counts['positive'],
            negative_comments=sentiment_counts['negative'],
            neutral_comments=sentiment_counts['neutral'],
            overall_sentiment=max_sentiment,
            top_topics=top_topics,
            recommendations=recommendations
        )
        
    except Exception as e:
        print(f"Error analyzing comments: {str(e)}")


def generate_recommendations(sentiment_counts, top_topics):
    """
    Generate basic recommendations based on sentiment analysis and topics.
    
    Args:
        sentiment_counts (dict): Count of comments by sentiment
        top_topics (dict): Most frequent topics discussed
    
    Returns:
        str: Generated recommendations
    """
    total = sum(sentiment_counts.values())
    if total == 0:
        return "No comments available for analysis."
    
    recommendations = []
    
    # Analyze sentiment distribution
    pos_ratio = sentiment_counts['positive'] / total
    neg_ratio = sentiment_counts['negative'] / total
    
    if neg_ratio > 0.5:
        recommendations.append(
            "High negative sentiment detected. Consider addressing the main "
            "concerns in your top topics."
        )
    elif pos_ratio > 0.7:
        recommendations.append(
            "Very positive sentiment! Consider leveraging this goodwill to "
            "engage more with your audience."
        )
    
    # Add topic-based recommendations
    if top_topics:
        recommendations.append("\nTop discussion topics and suggestions:")
        for topic, count in list(top_topics.items())[:3]:
            recommendations.append(
                f"- '{topic}' is frequently discussed. Consider creating "
                "follow-up content on this topic."
            )
    
    return "\n".join(recommendations)
