/**
 * Anti-spam heuristic and bot detection filter
 */

/**
 * Detects if a string resembles random gibberish or automated bot generated text.
 * Example of spambot pattern from screenshot: "PhYdeqtZOlRrNHJeu SbEJOuGKMDCsnVciBbnbPQP"
 */
export function isGibberishName(name) {
  if (!name || typeof name !== 'string') return false;

  const trimmed = name.trim();
  if (trimmed.length > 50) return true; // Suspiciously long human name

  const words = trimmed.split(/\s+/);

  for (const word of words) {
    if (word.length >= 8) {
      // Count uppercase to lowercase transitions inside the word (e.g. "PhYdeqtZOlRr")
      let caseTransitions = 0;
      for (let i = 1; i < word.length; i++) {
        const isPrevUpper = word[i - 1] >= 'A' && word[i - 1] <= 'Z';
        const isCurrUpper = word[i] >= 'A' && word[i] <= 'Z';
        if (isPrevUpper !== isCurrUpper) {
          caseTransitions++;
        }
      }
      // Natural human names (like MacDonald or DeSilva) have at most 2 case transitions.
      // Random generator strings typically have 4, 5, 6+ transitions.
      if (caseTransitions >= 4) {
        return true;
      }

      // Check for excessive uppercase letters inside words
      const upperCount = (word.match(/[A-Z]/g) || []).length;
      if (upperCount >= 5 && word.length < 25) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Checks for obvious spam / fake phone patterns
 */
export function isFakePhone(phone) {
  if (!phone || typeof phone !== 'string') return true;
  const digits = phone.replace(/\D/g, '');

  if (digits.length < 8 || digits.length > 13) return true;

  // Check all identical digits (e.g., 0000000000, 9999999999, 1111111111)
  const isAllSame = /^(\d)\1+$/.test(digits);
  if (isAllSame) return true;

  // Check simple sequential digits (e.g., 1234567890)
  if (digits === '1234567890' || digits === '0123456789' || digits === '9876543210') {
    return true;
  }

  return false;
}

/**
 * Comprehensive spam validation for form submissions
 */
export function validateFormSpam(body) {
  // 1. Honeypot check (hidden fields that humans don't see or touch)
  const honeypots = [body.hp_website, body.hp_confirm, body.company_fax, body.bot_field];
  for (const hp of honeypots) {
    if (hp && typeof hp === 'string' && hp.trim().length > 0) {
      return {
        isSpam: true,
        reason: 'HONEYPOT_TRIGGERED',
        details: 'Automated honeypot field was filled by robot crawler.',
      };
    }
  }

  // 2. Submission speed check (humans take > 2 seconds to fill forms)
  if (body._form_loaded_at) {
    const loadedAt = parseInt(body._form_loaded_at, 10);
    if (!isNaN(loadedAt)) {
      const elapsedMs = Date.now() - loadedAt;
      if (elapsedMs > 0 && elapsedMs < 1500) {
        return {
          isSpam: true,
          reason: 'SUBMISSION_TOO_FAST',
          details: 'Form submitted unnaturally fast (< 1.5s).',
        };
      }
    }
  }

  // 3. Name gibberish check
  const candidateName = body.name || body.user || '';
  if (isGibberishName(candidateName)) {
    return {
      isSpam: true,
      reason: 'GIBBERISH_NAME',
      details: `Name "${candidateName}" matches random bot generator patterns.`,
    };
  }

  // 4. Phone sanity check
  const candidatePhone = body.phone || body.userphone || body.con_phone || '';
  if (candidatePhone && isFakePhone(candidatePhone)) {
    return {
      isSpam: true,
      reason: 'INVALID_PHONE_PATTERN',
      details: 'Phone number pattern is invalid or fake.',
    };
  }

  return { isSpam: false };
}
