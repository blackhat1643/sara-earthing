/**
 * Resolves image paths to full URLs that work across environments.
 * 
 * Image paths from the backend can be:
 * - Full URLs (http:// or https://) — returned as-is
 * - /api/uploads/filename.jpg — newly uploaded images, served via backend API
 * - /images/VIEW/... or /images/products/... — legacy static images
 */
export function getImageUrl(imgPath: string): string {
  if (!imgPath) return '';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
    return imgPath;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
  const backendBase = apiBase.replace(/\/api\/?$/, '');

  // Uploaded images served via /api/uploads/:filename
  if (imgPath.startsWith('/api/uploads/')) {
    return `${backendBase}${imgPath}`;
  }

  // Legacy /images/ paths — served via backend static middleware
  if (imgPath.startsWith('/images/')) {
    return `${backendBase}${imgPath}`;
  }

  return imgPath;
}
