/**
 * Google reCAPTCHA server-side token verification
 */
export async function verifyRecaptcha(token, clientIp = '') {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // If secret key is not configured, pass through with warning
  if (!secretKey) {
    return {
      success: true,
      skipped: true,
      message: 'reCAPTCHA secret key is not configured in environment variables.',
    };
  }

  if (!token) {
    return {
      success: false,
      error: 'reCAPTCHA verification is required. Please check the "I am not a robot" box.',
    };
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    if (clientIp) {
      params.append('remoteip', clientIp);
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, score: data.score, hostname: data.hostname };
    } else {
      console.warn('[reCAPTCHA] Verification rejected by Google:', data['error-codes']);
      return {
        success: false,
        error: 'Security verification failed. Please try reCAPTCHA again.',
        errorCodes: data['error-codes'],
      };
    }
  } catch (error) {
    console.error('[reCAPTCHA] Verification network error:', error);
    // Don't completely lock out real students if Google API has a transient connection issue
    return {
      success: true,
      skipped: true,
      error: error.message,
    };
  }
}
