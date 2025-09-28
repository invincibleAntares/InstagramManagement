// API Response Types based on backend normalize functions
export interface Profile {
  name: string;
  handle: string;
  profile_picture_url: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  shortcode: string;
  permalink: string;
  media_type: 'image' | 'video' | 'carousel';
  thumbnail_url: string;
  caption: string;
  likes: number;
  comments: number;
  posted_at: string;
}

// API Error Response
export interface ApiError {
  message: string;
  status?: number;
}

// Component Props Types
export interface ProfileHeaderProps {
  profile: Profile;
}

export interface StatCardProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  format?: 'number' | 'compact';
}

export interface PostsGridProps {
  posts: Post[];
  isLoading?: boolean;
}

export interface PostCardProps {
  post: Post;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Form Types
export interface UsernameInputForm {
  username: string;
}

// Chart Data Types (for engagement charts)
export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
