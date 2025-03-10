"""
Serializers for the comments app models.
"""
from rest_framework import serializers
from .models import Video, Comment, CommentAnalysis, VideoAnalysis


class CommentAnalysisSerializer(serializers.ModelSerializer):
    """
    Serializer for comment analysis results.
    """
    class Meta:
        model = CommentAnalysis
        fields = ['sentiment', 'topics', 'keywords']


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for YouTube comments with nested analysis data.
    """
    analysis = CommentAnalysisSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id', 'youtube_comment_id', 'author_name', 'text',
            'published_at', 'like_count', 'analysis'
        ]


class VideoAnalysisSerializer(serializers.ModelSerializer):
    """
    Serializer for video-level analysis results.
    """
    class Meta:
        model = VideoAnalysis
        fields = [
            'total_comments', 'positive_comments', 'negative_comments',
            'neutral_comments', 'overall_sentiment', 'top_topics',
            'recommendations'
        ]


class VideoSerializer(serializers.ModelSerializer):
    """
    Serializer for YouTube videos with nested analysis data.
    """
    analysis = VideoAnalysisSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = [
            'id', 'youtube_video_id', 'title', 'description',
            'created_at', 'analysis', 'comments'
        ]


class VideoCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new video analysis requests.
    """
    class Meta:
        model = Video
        fields = ['youtube_video_id']

    def create(self, validated_data):
        """
        Create a new video entry and trigger analysis tasks.
        """
        # Associate the video with the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
