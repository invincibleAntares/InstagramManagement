import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          {/* 404 Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-blue-600" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h1>

          {/* Error Description */}
          <div className="text-gray-600 mb-8">
            <p className="mb-2">The Instagram profile you're looking for doesn't exist or is private.</p>
            <p className="text-sm">Please check the username and try again.</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Search className="w-5 h-5" />
              Search Another Profile
            </Link>
            
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Common issues:</p>
            <ul className="text-xs text-gray-400 space-y-1 text-left">
              <li>• Account might be private</li>
              <li>• Username may have been changed</li>
              <li>• Check for typos in the username</li>
              <li>• Account might be temporarily unavailable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
