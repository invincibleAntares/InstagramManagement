'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Instagram, TrendingUp, Users, BarChart3, Zap } from 'lucide-react';
import { isValidInstagramUsername, cleanInstagramUsername } from '@/lib/utils';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Please enter an Instagram username');
      return;
    }

    const cleanedUsername = cleanInstagramUsername(username);
    
    if (!isValidInstagramUsername(cleanedUsername)) {
      setError('Please enter a valid Instagram username');
      return;
    }

    setIsLoading(true);
    
    try {
      // Navigate to the influencer page
      router.push(`/influencer/${cleanedUsername}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Profile Analytics',
      description: 'Get detailed insights on followers, following, and post counts'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Engagement Tracking',
      description: 'Track likes, comments, and engagement rates across recent posts'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Performance Metrics',
      description: 'Visualize engagement patterns and identify top-performing content'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Data',
      description: 'Access up-to-date information directly from Instagram'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              InstaAnalytics
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Analyze Any{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instagram Profile
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Get comprehensive insights into Instagram profiles and their content performance. 
            Discover engagement patterns, track metrics, and analyze social media presence.
          </p>

          {/* Search Form */}
          <div className="max-w-md mx-auto mb-16">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">@</span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Instagram username"
                  className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <p className="text-red-600 text-sm text-left">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze Profile
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Example */}
          <div className="text-center text-gray-500">
            <p className="mb-2">Try it with popular accounts:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['instagram', 'cristiano', 'selenagomez', 'kyliejenner'].map((handle) => (
                <button
                  key={handle}
                  onClick={() => setUsername(handle)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  @{handle}
                </button>
              ))}
            </div>
          </div>
        </div>


      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 InstaAnalytics. Built for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
