/**
 * Resolves image paths to full URLs that work across environments.
 * 
 * Image paths from the backend can be:
 * - Full URLs (http:// or https://) — returned as-is
 * - /api/uploads/filename.jpg — newly uploaded images, served via backend API
 * - /images/VIEW/... or /images/products/... — legacy static images
 */
export function getImageUrl(imgPath: any): string {
  try {
    if (!imgPath || typeof imgPath !== 'string') return '';
    
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const backendBase = apiBase.replace(/\/api\/?$/, '');

    // Uploaded images served via /api/uploads/:filename
    if (imgPath.startsWith('/api/uploads/')) {
      return `${backendBase}${imgPath}`;
    }

    // Legacy uploaded images were served at /images/uploads/
    if (imgPath.startsWith('/images/uploads/')) {
      return `${backendBase}${imgPath}`;
    }

    // Other /images/ paths are static frontend assets (e.g., /images/products/)
    // They are hosted by Vercel directly, so we just return the path.
    return imgPath;
  } catch (e) {
    console.error('Error parsing image URL:', e);
    return '';
  }
}
