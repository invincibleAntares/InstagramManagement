'use client';

import { ProfileHeaderProps } from '@/types';
import { StatCard } from './StatCard';
import { SimpleInstagramImage } from './SimpleInstagramImage';
import { Users, UserPlus, Grid3X3 } from 'lucide-react';

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture and Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">
          <div className="relative">
            <div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-white p-1">
              <SimpleInstagramImage
                src={profile.profile_picture_url}
                alt={profile.name || profile.handle}
                className="w-full h-full object-cover rounded-full"
                fallback={
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center rounded-full">
                    <span className="text-white text-4xl font-bold">
                      {(profile.name || profile.handle).charAt(0).toUpperCase()}
                    </span>
                  </div>
                }
              />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {profile.name || profile.handle}
            </h1>
            <p className="text-xl text-gray-600 mb-4">@{profile.handle}</p>
            
            {/* Mobile Stats - Show on small screens */}
            <div className="grid grid-cols-3 gap-4 md:hidden">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.posts.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.following.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Stats - Show on larger screens */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 mt-8">
        <StatCard
          label="Posts"
          value={profile.posts}
          icon={<Grid3X3 className="w-6 h-6" />}
          format="compact"
        />
        <StatCard
          label="Followers"
          value={profile.followers}
          icon={<Users className="w-6 h-6" />}
          format="compact"
        />
        <StatCard
          label="Following"
          value={profile.following}
          icon={<UserPlus className="w-6 h-6" />}
          format="compact"
        />
      </div>
    </div>
  );
}
