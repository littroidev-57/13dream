// In-memory sliding window rate limiter with IP detection

// Track request timestamps per IP: Map<ip, Array<timestamp>>
const ipRequestMap = new Map();

// Periodic cleanup every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipRequestMap.entries()) {
      // Keep only timestamps within the last 1 hour
      const filtered = timestamps.filter((t) => now - t < 3600 * 1000);
      if (filtered.length === 0) {
        ipRequestMap.delete(ip);
      } else {
        ipRequestMap.set(ip, filtered);
      }
    }
  }, 10 * 60 * 1000);

  if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
    cleanupTimer.unref();
  }
}


/**
 * Extract client IP address from Next.js request headers
 */
export function getClientIp(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      // May be comma-separated list of IPs: "client, proxy1, proxy2"
      const clientIp = forwarded.split(',')[0].trim();
      if (clientIp) return clientIp;
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp) return realIp.trim();

    const cfIp = request.headers.get('cf-connecting-ip');
    if (cfIp) return cfIp.trim();

    const vercelIp = request.headers.get('x-vercel-forwarded-for');
    if (vercelIp) return vercelIp.split(',')[0].trim();
  } catch (err) {
    console.warn('[RateLimit] Error getting client IP:', err);
  }

  return '127.0.0.1';
}

/**
 * Check if the given IP has exceeded the allowed rate limit.
 *
 * Defaults:
 * - maxRequests: 5 requests
 * - windowSeconds: 600 (10 minutes)
 * - minIntervalSeconds: 3 (burst protection - no 2 requests within 3 seconds)
 */
export function checkRateLimit(ip, {
  maxRequests = 5,
  windowSeconds = 600,
  minIntervalSeconds = 3,
} = {}) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const minIntervalMs = minIntervalSeconds * 1000;

  let timestamps = ipRequestMap.get(ip) || [];

  // Filter timestamps to only keep those within current window
  timestamps = timestamps.filter((t) => now - t < windowMs);

  // Check burst limit (minimum interval between consecutive submissions)
  if (timestamps.length > 0) {
    const lastTimestamp = timestamps[timestamps.length - 1];
    if (now - lastTimestamp < minIntervalMs) {
      return {
        allowed: false,
        reason: 'BURST_LIMIT',
        retryAfter: Math.ceil((minIntervalMs - (now - lastTimestamp)) / 1000),
        message: 'Please wait a few seconds before submitting again.',
      };
    }
  }

  // Check max requests in current window
  if (timestamps.length >= maxRequests) {
    const oldestInWindow = timestamps[0];
    const retryAfter = Math.ceil((windowMs - (now - oldestInWindow)) / 1000);
    return {
      allowed: false,
      reason: 'WINDOW_LIMIT',
      retryAfter,
      message: `Too many submissions from this network. Please wait ${Math.ceil(retryAfter / 60)} minute(s) before trying again or call our counsellors directly at +91 9759053463.`,
    };
  }

  // Allow and record timestamp
  timestamps.push(now);
  ipRequestMap.set(ip, timestamps);

  return {
    allowed: true,
    remaining: maxRequests - timestamps.length,
  };
}
