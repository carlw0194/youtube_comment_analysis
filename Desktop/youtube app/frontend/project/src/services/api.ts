/**
 * API Service for YouTube Comment Analysis
 * 
 * This module provides a centralized interface for all backend API interactions.
 * It handles authentication, request formatting, and response parsing.
 * 
 * The service is organized by resource type (videos, comments, analysis)
 * and implements RESTful methods for each resource.
 */

// Base API configuration
const API_BASE_URL = '/api';

// Interface definitions for API responses
interface Video {
  id: number;
  youtube_video_id: string;
  title: string;
  description: string;
  created_at: string;
}

interface Comment {
  id: number;
  youtube_comment_id: string;
  author_name: string;
  text: string;
  published_at: string;
  like_count: number;
  analysis?: CommentAnalysis;
}

interface CommentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  topics: Record<string, number>;
  keywords: string[];
}

interface VideoAnalysis {
  total_comments: number;
  positive_comments: number;
  negative_comments: number;
  neutral_comments: number;
  overall_sentiment: 'positive' | 'negative' | 'neutral';
  top_topics: Record<string, number>;
  recommendations: string;
}

interface VideoWithAnalysis extends Video {
  analysis?: VideoAnalysis;
  comments?: Comment[];
}

// API request helpers with authentication
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

/**
 * Handles API errors and provides meaningful error messages
 * @param response - Fetch API response object
 */
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `API Error: ${response.status}`;
    throw new Error(errorMessage);
  }
  return response;
};

// Video API methods
const videoApi = {
  /**
   * Fetches all videos analyzed by the current user
   * @returns List of analyzed videos
   */
  getAll: async (): Promise<Video[]> => {
    const response = await fetch(`${API_BASE_URL}/videos/`, {
      headers: getAuthHeaders(),
    }).then(handleApiError);
    
    return response.json();
  },
  
  /**
   * Submits a new YouTube video for analysis
   * @param youtubeVideoId - YouTube video ID to analyze
   * @returns Created video object
   */
  create: async (youtubeVideoId: string): Promise<Video> => {
    const response = await fetch(`${API_BASE_URL}/videos/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ youtube_video_id: youtubeVideoId }),
    }).then(handleApiError);
    
    return response.json();
  },
  
  /**
   * Gets detailed information about a specific video with analysis
   * @param videoId - Internal video ID
   * @returns Video with analysis data
   */
  getById: async (videoId: number): Promise<VideoWithAnalysis> => {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/`, {
      headers: getAuthHeaders(),
    }).then(handleApiError);
    
    return response.json();
  },
  
  /**
   * Gets comments for a specific video
   * @param videoId - Internal video ID
   * @returns List of comments with analysis
   */
  getComments: async (videoId: number): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments/`, {
      headers: getAuthHeaders(),
    }).then(handleApiError);
    
    return response.json();
  },
  
  /**
   * Gets analysis results for a specific video
   * @param videoId - Internal video ID
   * @returns Analysis data for the video
   */
  getAnalysis: async (videoId: number): Promise<VideoAnalysis> => {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/analysis/`, {
      headers: getAuthHeaders(),
    }).then(handleApiError);
    
    return response.json();
  },
};

// Auth API methods
const authApi = {
  /**
   * Logs in a user and stores the authentication token
   * @param username - User's username
   * @param password - User's password
   * @returns User data and token
   */
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handleApiError);
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  },
  
  /**
   * Logs out the current user
   */
  logout: () => {
    localStorage.removeItem('authToken');
  },
  
  /**
   * Checks if the user is currently authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Export the API service
export { videoApi, authApi };
export type { Video, Comment, CommentAnalysis, VideoAnalysis, VideoWithAnalysis };
