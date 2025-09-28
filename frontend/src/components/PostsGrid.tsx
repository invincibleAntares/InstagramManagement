'use client';

import { PostsGridProps, PostCardProps } from '@/types';
import { SimpleInstagramImage } from './SimpleInstagramImage';
import { formatNumber, formatRelativeTime, truncateText } from '@/lib/utils';
import { Heart, MessageCircle, Play, Copy, ExternalLink, Grid3X3 } from 'lucide-react';

function PostCard({ post }: PostCardProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(post.permalink);
  };

  const handleOpenPost = () => {
    window.open(post.permalink, '_blank');
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Post Image */}
      <div className="relative aspect-square overflow-hidden">
        <SimpleInstagramImage
          src={post.thumbnail_url}
          alt={post.caption ? truncateText(post.caption, 100) : 'Instagram post'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-lg">No Image</span>
            </div>
          }
        />
        
        {/* Media Type Indicator */}
        {post.media_type === 'video' && (
          <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
        )}
        
        {post.media_type === 'carousel' && (
          <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-2 py-1">
            <Copy className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 fill-white" />
              <span className="font-semibold">{formatNumber(post.likes, true)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 fill-white" />
              <span className="font-semibold">{formatNumber(post.comments, true)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Caption */}
        {post.caption && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-2 leading-relaxed">
            {truncateText(post.caption, 120)}
          </p>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{formatNumber(post.likes, true)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{formatNumber(post.comments, true)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Copy link"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={handleOpenPost}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Open in Instagram"
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Posted Time */}
        {post.posted_at && (
          <div className="mt-2 text-xs text-gray-500">
            {formatRelativeTime(post.posted_at)}
          </div>
        )}
      </div>
    </div>
  );
}

export function PostsGrid({ posts, isLoading = false }: PostsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <Grid3X3 className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">This account doesn't have any posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
        <span className="text-sm text-gray-600">{posts.length} posts</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.shortcode} post={post} />
        ))}
      </div>
    </div>
  );
}
