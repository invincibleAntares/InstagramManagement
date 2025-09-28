'use client';

import { InstagramImage } from '@/components/InstagramImage';
import { SimpleInstagramImage } from '@/components/SimpleInstagramImage';

export default function TestImagePage() {
  const testImageUrl = "https://instagram.fblr11-1.fna.fbcdn.net/v/t51.2885-19/495970936_18571729156019133_4702419124763180758_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby40MDAuYzIifQ&_nc_ht=instagram.fblr11-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QHRlfeB9XvxHz8C_9v4BBNK-D07jJqhwVS8wuPqxzkDOYXE5ydiLNBz4DG3iCi2zqc&_nc_ohc=YL0M15hPqlwQ7kNvwFnS0Hl&_nc_gid=Brm-8leUzhOIF5jhYytaZA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfYaIvUIVUlHMeNZkGekCVFCJ7ddv74lSPooLj5ifhK0cw&oe=68DEBC9A&_nc_sid=8b3546";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Instagram Image Loading Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Profile Picture Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profile Picture Test</h2>
            <div className="w-32 h-32 mx-auto">
              <InstagramImage
                src={testImageUrl}
                alt="Test Instagram Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
                priority
                fallback={
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center rounded-full">
                    <span className="text-white text-2xl font-bold">NG</span>
                  </div>
                }
              />
            </div>
            <p className="text-sm text-gray-600 mt-4 break-all">
              URL: {testImageUrl.substring(0, 50)}...
            </p>
          </div>

          {/* Post Image Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Post Image Test</h2>
            <div className="aspect-square">
              <InstagramImage
                src={testImageUrl}
                alt="Test Instagram Post"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg"
                fallback={
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500 text-lg">Failed to load</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Simple Image Component Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Simple Image Test</h2>
            <div className="aspect-square">
              <SimpleInstagramImage
                src={testImageUrl}
                alt="Simple Instagram Test"
                className="w-full h-full object-cover rounded-lg"
                fallback={
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center rounded-lg">
                    <span className="text-blue-700 text-lg">Simple Fallback</span>
                  </div>
                }
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Using regular img tag with crossOrigin</p>
          </div>

          {/* Error Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Error Fallback Test</h2>
            <div className="aspect-square">
              <SimpleInstagramImage
                src="https://invalid-url.com/invalid.jpg"
                alt="Invalid Image"
                className="w-full h-full object-cover rounded-lg"
                fallback={
                  <div className="w-full h-full bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center rounded-lg">
                    <span className="text-red-700 text-lg">Error Fallback</span>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Direct Image Test */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Direct Next.js Image Test</h2>
          <div className="w-64 h-64 mx-auto">
            <img
              src={testImageUrl}
              alt="Direct img tag test"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEyOCIgeT0iMTI4IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            This uses a regular img tag to test if the URL is accessible at all.
          </p>
        </div>
      </div>
    </div>
  );
}
