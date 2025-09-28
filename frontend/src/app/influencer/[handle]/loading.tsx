export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">
              {/* Profile Picture Skeleton */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 animate-pulse ring-4 ring-gray-200 ring-offset-4" />
              
              <div className="flex-1 text-center md:text-left">
                {/* Name Skeleton */}
                <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto md:mx-0 mb-2 animate-pulse" />
                {/* Handle Skeleton */}
                <div className="h-6 bg-gray-200 rounded-lg w-32 mx-auto md:mx-0 mb-4 animate-pulse" />
                
                {/* Mobile Stats Skeleton */}
                <div className="grid grid-cols-3 gap-4 md:hidden">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-1 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-12 mx-auto animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Stats Skeleton */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                    <div className="h-8 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Chart Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="text-right">
              <div className="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 bg-gray-200 rounded-full h-3 animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}
