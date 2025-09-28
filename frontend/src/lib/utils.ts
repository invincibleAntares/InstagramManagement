import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format large numbers into compact notation (1.2K, 1.2M, etc.)
 */
export function formatNumber(num: number, compact = false): string {
  if (!compact) {
    return num.toLocaleString();
  }

  if (num < 1000) {
    return num.toString();
  }

  const units = ['', 'K', 'M', 'B', 'T'];
  const unitIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
  const unitValue = Math.pow(1000, unitIndex);
  const formattedValue = (num / unitValue).toFixed(1);
  
  // Remove trailing .0
  const cleanValue = formattedValue.endsWith('.0') 
    ? formattedValue.slice(0, -2) 
    : formattedValue;
  
  return `${cleanValue}${units[unitIndex]}`;
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  }

  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }

  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks}w ago`;
  }

  const months = Math.floor(diffInSeconds / 2592000);
  return `${months}mo ago`;
}

/**
 * Calculate engagement rate
 */
export function calculateEngagementRate(likes: number, comments: number, followers: number): number {
  if (followers === 0) return 0;
  return ((likes + comments) / followers) * 100;
}

/**
 * Validate Instagram username
 */
export function isValidInstagramUsername(username: string): boolean {
  // Remove @ if present
  const cleanUsername = username.replace(/^@/, '');
  
  // Instagram username rules:
  // - 1-30 characters
  // - Only letters, numbers, periods, and underscores
  // - Cannot start or end with a period
  // - Cannot have consecutive periods
  const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/;
  
  return cleanUsername.length >= 1 && 
         cleanUsername.length <= 30 && 
         usernameRegex.test(cleanUsername) &&
         !cleanUsername.includes('..');
}

/**
 * Clean Instagram username (remove @ and trim)
 */
export function cleanInstagramUsername(username: string): string {
  return username.replace(/^@/, '').trim().toLowerCase();
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get average engagement from posts
 */
export function getAverageEngagement(posts: Array<{ likes: number; comments: number }>): number {
  if (posts.length === 0) return 0;
  
  const totalEngagement = posts.reduce((sum, post) => sum + post.likes + post.comments, 0);
  return Math.round(totalEngagement / posts.length);
}

/**
 * Generate random placeholder colors for loading states
 */
export function getRandomPlaceholderColor(): string {
  const colors = [
    'bg-gray-200',
    'bg-slate-200', 
    'bg-zinc-200',
    'bg-neutral-200',
    'bg-stone-200'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
