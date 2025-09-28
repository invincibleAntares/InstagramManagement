'use client';

import Image from 'next/image';
import { useState } from 'react';

interface InstagramImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
}

function isInstagramUrl(url: string): boolean {
  return url.includes('fbcdn.net') || url.includes('cdninstagram.com');
}

function getProxiedUrl(originalUrl: string): string {
  if (!isInstagramUrl(originalUrl)) {
    return originalUrl;
  }
  
  // Use our proxy API route
  return `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
}

export function InstagramImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  fallback 
}: InstagramImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useDirectUrl, setUseDirectUrl] = useState(false);

  // If there's an error or no src, show fallback
  if (imageError || !src) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}>
        {fallback || <span className="text-gray-500 text-lg">Image unavailable</span>}
      </div>
    );
  }

  // Determine which URL to use
  const imageUrl = useDirectUrl ? src : getProxiedUrl(src);

  const handleError = () => {
    if (!useDirectUrl && isInstagramUrl(src)) {
      // Try direct URL as fallback
      setUseDirectUrl(true);
      setIsLoading(true);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 ${className} bg-gray-200 animate-pulse rounded`} />
      )}
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized={true}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
        style={{
          objectFit: 'cover'
        }}
      />
    </div>
  );
}
