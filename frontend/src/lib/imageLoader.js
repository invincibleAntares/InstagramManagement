// Custom image loader for Instagram images
export default function instagramImageLoader({ src, width, quality }) {
  // For Instagram images, return the original URL without optimization
  if (src.includes('fbcdn.net') || src.includes('cdninstagram.com')) {
    return src;
  }
  
  // For other images, use default Next.js optimization
  return `${src}?w=${width}&q=${quality || 75}`;
}
