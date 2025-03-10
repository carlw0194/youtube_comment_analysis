/**
 * Custom React Hook for YouTube Video Analysis
 * 
 * This hook provides a clean interface for components to interact with the video analysis API.
 * It manages loading states, error handling, and data caching for optimal user experience.
 * 
 * The hook follows the React Hooks pattern and can be used in any functional component.
 */

import { useState, useEffect, useCallback } from 'react';
import { videoApi, Video, Comment, VideoAnalysis, VideoWithAnalysis } from '../services/api';

interface VideoAnalysisState {
  // Video data states
  videos: Video[];
  currentVideo: VideoWithAnalysis | null;
  comments: Comment[];
  analysis: VideoAnalysis | null;
  
  // UI states
  isLoading: boolean;
  error: string | null;
  
  // Action methods
  submitVideo: (youtubeUrl: string) => Promise<void>;
  selectVideo: (videoId: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

/**
 * Extracts YouTube video ID from various URL formats
 * @param url - YouTube URL in any format
 * @returns YouTube video ID or null if invalid
 */
const extractYouTubeVideoId = (url: string): string | null => {
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Custom hook for managing YouTube video analysis data and operations
 * @returns VideoAnalysisState object with data and methods
 */
export const useVideoAnalysis = (): VideoAnalysisState => {
  // State management
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoWithAnalysis | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches all videos analyzed by the current user
   */
  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await videoApi.getAll();
      setVideos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetches detailed information about a specific video
   * @param videoId - Internal video ID
   */
  const fetchVideoDetails = useCallback(async (videoId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch video details with analysis
      const videoData = await videoApi.getById(videoId);
      setCurrentVideo(videoData);
      
      // Fetch comments if not included in the response
      if (!videoData.comments) {
        const commentsData = await videoApi.getComments(videoId);
        setComments(commentsData);
      } else {
        setComments(videoData.comments);
      }
      
      // Fetch analysis if not included in the response
      if (!videoData.analysis) {
        try {
          const analysisData = await videoApi.getAnalysis(videoId);
          setAnalysis(analysisData);
        } catch (analysisErr) {
          // Analysis might not be ready yet, which is okay
          console.log('Analysis not ready yet');
          setAnalysis(null);
        }
      } else {
        setAnalysis(videoData.analysis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Submits a new YouTube video for analysis
   * @param youtubeUrl - YouTube video URL
   */
  const submitVideo = useCallback(async (youtubeUrl: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Extract video ID from URL
      const videoId = extractYouTubeVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }
      
      // Submit video for analysis
      const newVideo = await videoApi.create(videoId);
      
      // Refresh videos list
      await fetchVideos();
      
      // Select the newly created video
      await fetchVideoDetails(newVideo.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit video');
    } finally {
      setIsLoading(false);
    }
  }, [fetchVideos, fetchVideoDetails]);

  /**
   * Selects a video for detailed viewing
   * @param videoId - Internal video ID
   */
  const selectVideo = useCallback(async (videoId: number) => {
    await fetchVideoDetails(videoId);
  }, [fetchVideoDetails]);

  /**
   * Refreshes all data
   */
  const refreshData = useCallback(async () => {
    await fetchVideos();
    if (currentVideo) {
      await fetchVideoDetails(currentVideo.id);
    }
  }, [fetchVideos, fetchVideoDetails, currentVideo]);

  // Load videos on initial mount
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    currentVideo,
    comments,
    analysis,
    isLoading,
    error,
    submitVideo,
    selectVideo,
    refreshData,
  };
};
