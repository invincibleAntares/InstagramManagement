import { Profile, Post, ApiError } from '@/types';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(30000), // 30 seconds
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle timeout
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }
        // Handle network errors
        if (error.message.includes('fetch')) {
          throw new Error('Network error. Please check your connection and try again.');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  /**
   * Fetch Instagram profile data
   */
  async getProfile(handle: string): Promise<Profile> {
    const cleanHandle = handle.replace(/^@/, '');
    
    if (!cleanHandle) {
      throw new Error('Username is required');
    }

    return this.fetchWithErrorHandling<Profile>(`/profile/${cleanHandle}`);
  }

  /**
   * Fetch Instagram posts
   */
  async getPosts(handle: string, limit: number = 10): Promise<Post[]> {
    const cleanHandle = handle.replace(/^@/, '');
    
    if (!cleanHandle) {
      throw new Error('Username is required');
    }

    const queryParams = new URLSearchParams({
      limit: Math.min(Math.max(limit, 1), 50).toString(), // Ensure limit is between 1-50
    });

    return this.fetchWithErrorHandling<Post[]>(`/posts/${cleanHandle}?${queryParams}`);
  }

  /**
   * Check API health
   */
  async checkHealth(): Promise<{ ok: boolean }> {
    return this.fetchWithErrorHandling<{ ok: boolean }>('/health');
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export individual functions for easier usage
export const getProfile = (handle: string) => apiClient.getProfile(handle);
export const getPosts = (handle: string, limit?: number) => apiClient.getPosts(handle, limit);
export const checkHealth = () => apiClient.checkHealth();

// Utility function to handle API errors in components
export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: undefined,
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    status: undefined,
  };
}

// Hook for client-side data fetching with error handling
export async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Don't retry on client errors (4xx)
      if (lastError.message.includes('HTTP 4')) {
        throw lastError;
      }

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
}
