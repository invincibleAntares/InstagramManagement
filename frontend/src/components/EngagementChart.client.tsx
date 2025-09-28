'use client';

import { useEffect, useState } from 'react';
import { ChartDataPoint } from '@/types';
import { formatNumber, getAverageEngagement } from '@/lib/utils';

interface EngagementChartProps {
  posts: Array<{ likes: number; comments: number; posted_at: string; caption: string }>;
}

export function EngagementChart({ posts }: EngagementChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Process posts to create chart data
    const recentPosts = posts.slice(0, 10).reverse(); // Get last 10 posts and reverse for chronological order
    
    const data = recentPosts.map((post, index) => ({
      name: `Post ${index + 1}`,
      value: post.likes + post.comments,
      label: post.caption ? post.caption.substring(0, 30) + '...' : 'No caption'
    }));
    
    setChartData(data);
  }, [posts]);

  const maxEngagement = Math.max(...chartData.map(d => d.value), 1);
  const avgEngagement = getAverageEngagement(posts);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Overview</h3>
        <div className="text-center py-8 text-gray-500">
          No engagement data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Engagement Overview</h3>
        <div className="text-right">
          <div className="text-sm text-gray-600">Average Engagement</div>
          <div className="text-xl font-bold text-blue-600">{formatNumber(avgEngagement, true)}</div>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-16 text-xs text-gray-600 flex-shrink-0">
              {item.name}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(item.value / maxEngagement) * 100}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
            <div className="w-16 text-xs text-gray-900 font-medium text-right flex-shrink-0">
              {formatNumber(item.value, true)}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Recent posts engagement (likes + comments)</span>
          <span>Max: {formatNumber(maxEngagement, true)}</span>
        </div>
      </div>
    </div>
  );
}
