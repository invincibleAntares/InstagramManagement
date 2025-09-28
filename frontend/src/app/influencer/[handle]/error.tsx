'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  const isNotFound = error.message.includes('404') || error.message.toLowerCase().includes('not found');
  const isNetworkError = error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('timeout');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {isNotFound ? 'Profile Not Found' : 'Something went wrong'}
          </h1>

          {/* Error Description */}
          <div className="text-gray-600 mb-8">
            {isNotFound ? (
              <div>
                <p className="mb-2">The Instagram profile you're looking for doesn't exist or is private.</p>
                <p className="text-sm">Please check the username and try again.</p>
              </div>
            ) : isNetworkError ? (
              <div>
                <p className="mb-2">Unable to connect to Instagram.</p>
                <p className="text-sm">Please check your internet connection and try again.</p>
              </div>
            ) : (
              <div>
                <p className="mb-2">We encountered an unexpected error while loading this profile.</p>
                <p className="text-sm text-gray-500">Error: {error.message}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>
          </div>

          {/* Debug Info (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                Debug Information
              </summary>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 font-mono overflow-auto">
                <div><strong>Error:</strong> {error.message}</div>
                {error.digest && <div><strong>Digest:</strong> {error.digest}</div>}
                {error.stack && (
                  <div className="mt-2">
                    <strong>Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
