/**
 * Admin authorization utility for protected API endpoints
 */
export function verifyAdminAuth(request) {
  const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY;

  if (!adminSecret) {
    return {
      authorized: false,
      error: 'ADMIN_SECRET_KEY is not configured on the server.',
    };
  }

  // 1. Check Bearer Authorization header: "Bearer <token>"
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === adminSecret) {
      return { authorized: true };
    }
  }

  // 2. Check "x-admin-key" header
  const customKey = request.headers.get('x-admin-key');
  if (customKey && customKey.trim() === adminSecret) {
    return { authorized: true };
  }

  // 3. Check query param: "?key=<secret>"
  try {
    const url = new URL(request.url);
    const queryKey = url.searchParams.get('key');
    if (queryKey && queryKey.trim() === adminSecret) {
      return { authorized: true };
    }
  } catch (e) {
    // Ignore URL parse errors
  }

  return {
    authorized: false,
    error: 'Unauthorized: Valid admin API key required.',
  };
}
