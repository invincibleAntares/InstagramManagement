# InstaAnalytics Frontend

A modern, responsive Next.js application for analyzing Instagram profiles and their content performance.

## Features

- 🔍 **Profile Search**: Search and analyze any public Instagram profile
- 📊 **Analytics Dashboard**: Comprehensive profile statistics and metrics
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Data**: Live Instagram data fetching
- 📈 **Engagement Charts**: Visual representation of post performance
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Components**: Custom reusable components
- **API**: RESTful API integration

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Landing page (username input)
│   └── influencer/
│       └── [handle]/
│           ├── page.tsx        # Dashboard
│           ├── loading.tsx     # Loading skeleton
│           ├── error.tsx       # Error boundary
│           └── not-found.tsx   # 404 page
├── components/
│   ├── ProfileHeader.tsx       # Profile information header
│   ├── StatCard.tsx           # Statistics display card
│   ├── PostsGrid.tsx          # Posts grid layout
│   ├── EngagementChart.client.tsx # Client-side engagement chart
│   └── EmptyState.tsx         # Empty state component
├── lib/
│   ├── api.ts                 # API client functions
│   └── utils.ts               # Utility functions
└── types/
    └── index.ts               # TypeScript type definitions
```

## Key Components

### Landing Page (`/`)
- Hero section with Instagram username input
- Feature highlights
- Example profiles to try
- Modern gradient design

### Dashboard (`/influencer/[handle]`)
- Profile header with stats
- Engagement chart visualization
- Posts grid with interaction metrics
- Export and sharing functionality

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Graceful fallbacks for network issues

## API Integration

The frontend communicates with the backend through:
- `/profile/:handle` - Get profile information
- `/posts/:handle` - Get recent posts data
- Error handling with retries and proper status codes

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Features Implemented

✅ **Profile Analytics**
- Follower, following, and post counts
- Profile picture and basic information
- Real-time data fetching

✅ **Post Analysis**
- Recent posts grid (up to 50 posts)
- Likes and comments metrics
- Media type indicators (image/video/carousel)
- Post timestamps and captions

✅ **Engagement Visualization**
- Interactive engagement chart
- Average engagement calculation
- Visual performance indicators

✅ **User Experience**
- Loading skeletons
- Error handling
- Responsive design
- Smooth animations

✅ **Performance**
- Optimized images with Next.js Image
- Component-based architecture
- Efficient data fetching
- TypeScript for type safety

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is for educational purposes only.