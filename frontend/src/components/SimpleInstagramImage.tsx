'use client';

import { useState, useEffect } from 'react';

interface SimpleInstagramImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function SimpleInstagramImage({ 
  src, 
  alt, 
  className = '', 
  fallback 
}: SimpleInstagramImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useProxy, setUseProxy] = useState(false);

  // If there's an error or no src, show fallback
  if (imageError || !src) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}>
        {fallback || <span className="text-gray-500 text-lg">Image unavailable</span>}
      </div>
    );
  }

  const isInstagramUrl = src.includes('fbcdn.net') || src.includes('cdninstagram.com');
  const imageUrl = (useProxy && isInstagramUrl) 
    ? `/api/proxy-image?url=${encodeURIComponent(src)}` 
    : src;

  const handleError = () => {
    if (!useProxy && isInstagramUrl) {
      // First try: switch to proxy
      setUseProxy(true);
      setIsLoading(true);
    } else {
      // Final fallback: show error
      setImageError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // For Instagram URLs, start with proxy immediately due to CORS
  useEffect(() => {
    if (isInstagramUrl) {
      setUseProxy(true);
    }
  }, [isInstagramUrl]);

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 ${className} bg-gray-200 animate-pulse rounded`} />
      )}
      <img
        key={imageUrl} // Force re-render when URL changes
        src={imageUrl}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
