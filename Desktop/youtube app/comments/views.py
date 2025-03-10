"""
API views for handling YouTube video analysis requests and results.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Video, Comment, VideoAnalysis
from .serializers import (
    VideoSerializer,
    VideoCreateSerializer,
    CommentSerializer,
    VideoAnalysisSerializer
)
from .tasks import fetch_video_comments


class VideoViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling YouTube video analysis operations.
    
    Endpoints:
    - GET /api/videos/ - List all analyzed videos
    - POST /api/videos/ - Submit new video for analysis
    - GET /api/videos/{id}/ - Get video details with analysis
    - GET /api/videos/{id}/comments/ - Get video comments
    - GET /api/videos/{id}/analysis/ - Get video analysis results
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter videos by the current user."""
        return Video.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        """Use different serializers for list/create vs retrieve operations."""
        if self.action == 'create':
            return VideoCreateSerializer
        return VideoSerializer

    def perform_create(self, serializer):
        """
        Handle new video analysis requests.
        1. Save the video entry
        2. Trigger async task to fetch and analyze comments
        """
        video = serializer.save()
        # Trigger async task for comment fetching and analysis
        fetch_video_comments.delay(video.id)
        
    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        """Get all comments for a specific video."""
        video = self.get_object()
        comments = Comment.objects.filter(video=video)
        page = self.paginate_queryset(comments)
        
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def analysis(self, request, pk=None):
        """Get analysis results for a specific video."""
        video = self.get_object()
        try:
            analysis = VideoAnalysis.objects.get(video=video)
            serializer = VideoAnalysisSerializer(analysis)
            return Response(serializer.data)
        except VideoAnalysis.DoesNotExist:
            return Response(
                {"detail": "Analysis not yet complete"},
                status=status.HTTP_404_NOT_FOUND
            )
