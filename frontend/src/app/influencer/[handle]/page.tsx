import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PostsGrid } from '@/components/PostsGrid';
import { EngagementChart } from '@/components/EngagementChart.client';
import { DashboardNav } from '@/components/DashboardNav.client';
import { BackToTop } from '@/components/BackToTop.client';
import { getProfile, getPosts, handleApiError } from '@/lib/api';

interface InfluencerPageProps {
  params: {
    handle: string;
  };
}

async function InfluencerContent({ handle }: { handle: string }) {
  let profile, posts;
  
  try {
    // Fetch profile and posts in parallel
    [profile, posts] = await Promise.all([
      getProfile(handle),
      getPosts(handle, 12)
    ]);
  } catch (error) {
    const apiError = handleApiError(error);
    
    // Handle specific error cases
    if (apiError.message.includes('404') || apiError.message.toLowerCase().includes('not found')) {
      notFound();
    }
    
    // Re-throw for error boundary to catch
    throw new Error(apiError.message);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <DashboardNav handle={profile.handle} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <ProfileHeader profile={profile} />

          {/* Engagement Chart */}
          {posts.length > 0 && (
            <EngagementChart posts={posts} />
          )}

          {/* Posts Grid */}
          <PostsGrid posts={posts} />
        </div>
      </main>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default async function InfluencerPage({ params }: InfluencerPageProps) {
  const { handle } = params;

  // Clean the handle (remove @ if present)
  const cleanHandle = handle.replace(/^@/, '');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfluencerContent handle={cleanHandle} />
    </Suspense>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: InfluencerPageProps) {
  const { handle } = params;
  const cleanHandle = handle.replace(/^@/, '');

  try {
    const profile = await getProfile(cleanHandle);
    
    return {
      title: `${profile.name || profile.handle} (@${profile.handle}) - Instagram Analytics`,
      description: `Analytics for @${profile.handle}: ${profile.followers.toLocaleString()} followers, ${profile.posts.toLocaleString()} posts. View engagement metrics and recent posts.`,
      openGraph: {
        title: `${profile.name || profile.handle} - Instagram Analytics`,
        description: `View detailed analytics for @${profile.handle}`,
        images: profile.profile_picture_url ? [profile.profile_picture_url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${profile.name || profile.handle} - Instagram Analytics`,
        description: `View detailed analytics for @${profile.handle}`,
        images: profile.profile_picture_url ? [profile.profile_picture_url] : [],
      },
    };
  } catch (error) {
    return {
      title: `@${cleanHandle} - Instagram Analytics`,
      description: 'Instagram profile analytics and insights',
    };
  }
}
