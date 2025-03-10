"""
Models for handling YouTube video and comment data.
"""
from django.db import models
from django.contrib.auth.models import User


class Video(models.Model):
    """
    Stores information about analyzed YouTube videos.
    """
    youtube_video_id = models.CharField(max_length=20, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.youtube_video_id})"


class Comment(models.Model):
    """
    Stores YouTube comments for analysis.
    """
    youtube_comment_id = models.CharField(max_length=50, unique=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100)
    text = models.TextField()
    published_at = models.DateTimeField()
    like_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author_name} on {self.video.title}"


class CommentAnalysis(models.Model):
    """
    Stores sentiment and topic analysis results for comments.
    """
    SENTIMENT_CHOICES = [
        ('positive', 'Positive'),
        ('negative', 'Negative'),
        ('neutral', 'Neutral'),
    ]

    comment = models.OneToOneField(Comment, on_delete=models.CASCADE, related_name='analysis')
    sentiment = models.CharField(max_length=10, choices=SENTIMENT_CHOICES)
    topics = models.JSONField()  # Stores topic analysis results
    keywords = models.JSONField()  # Stores extracted keywords

    def __str__(self):
        return f"Analysis for comment {self.comment.id}"


class VideoAnalysis(models.Model):
    """
    Stores aggregated analysis results for entire videos.
    """
    SENTIMENT_CHOICES = [
        ('positive', 'Positive'),
        ('negative', 'Negative'),
        ('neutral', 'Neutral'),
    ]

    video = models.OneToOneField(Video, on_delete=models.CASCADE, related_name='analysis')
    total_comments = models.IntegerField(default=0)
    positive_comments = models.IntegerField(default=0)
    negative_comments = models.IntegerField(default=0)
    neutral_comments = models.IntegerField(default=0)
    overall_sentiment = models.CharField(max_length=10, choices=SENTIMENT_CHOICES)
    top_topics = models.JSONField()  # Stores most common topics
    recommendations = models.TextField(blank=True)  # Stores AI-generated recommendations

    def __str__(self):
        return f"Analysis for video {self.video.title}"
