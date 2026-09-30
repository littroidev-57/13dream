import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getRelevantRagKnowledge, RAG_KNOWLEDGE_BASE } from '@/lib/ragKnowledge';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';
import { sendEnquiryNotification, sendStudentEnquiryGreeting } from '@/lib/email';

// Helper to extract phone number (supports spaces, hyphens, +91, 0, or international formats)
function extractPhoneNumber(text) {
  if (!text) return null;
  // Match 10-digit Indian numbers with optional spaces, hyphens, or prefixes (+91, 91, 0)
  const indianMatch = text.match(/(?:\+91[\s.-]?|91[\s.-]?|0)?[6-9](?:[\s.-]?\d){9}\b/);
  if (indianMatch) {
    return indianMatch[0].replace(/[\s.-]/g, '');
  }
  // Match standard 10-digit contiguous or segmented numbers
  const generalMatch = text.match(/\b\d{5}[\s.-]?\d{5}\b/);
  if (generalMatch) {
    return generalMatch[0].replace(/[\s.-]/g, '');
  }
  return null;
}

// Helper to extract email address
function extractEmail(text) {
  if (!text) return null;
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

const NAME_STOP_WORDS = new Set([
  'hi', 'hello', 'hey', 'dear', 'sir', 'mam', 'madam', 'mr', 'mrs', 'ms',
  'i', 'im', 'am', 'my', 'me', 'mine', 'myself', 'this', 'is', 'we', 'our',
  'want', 'need', 'looking', 'interested', 'planning', 'applying', 'study', 'studying',
  'abroad', 'visa', 'student', 'admission', 'intake', 'course', 'university', 'college',
  'ielts', 'pte', 'toefl', 'duolingo', 'band', 'bands', 'score', 'scores', 'test',
  'canada', 'australia', 'uk', 'usa', 'germany', 'new', 'zealand', 'ireland',
  'bareilly', 'khatima', 'india', 'delhi', 'punjab', 'office', 'uttarakhand', 'up',
  'please', 'pls', 'call', 'contact', 'whatsapp', 'number', 'mobile', 'phone', 'ph',
  'good', 'fine', 'yes', 'no', 'ok', 'okay', 'sure', 'thanks', 'thank', 'you',
  '12th', '10th', 'bachelor', 'bachelors', 'master', 'masters', 'degree', 'diploma',
  'fees', 'fee', 'free', 'budget', 'gpa', 'percentage', 'stream', 'sds', 'non-sds'
]);

function formatName(str) {
  if (!str) return null;
  return str
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// Helper to extract student name from chat message
function extractName(text) {
  if (!text) return null;
  const trimmed = text.trim();

  // 1. Explicit greeting / introduction patterns
  const patterns = [
    /(?:my\s+name\s+is|i\s*['’]?m|i\s+am|this\s+is|myself)\s+([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)/i,
    /(?:name\s*[:\-=])\s*([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)/i,
    /\b([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)\s+here\b/i,
    /(?:call\s+me)\s+([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      const firstWord = candidate.split(/\s+/)[0].toLowerCase();
      if (!NAME_STOP_WORDS.has(firstWord)) {
        return formatName(candidate);
      }
    }
  }

  // 2. Standalone short name message (e.g. user just types "Mohsin" or "Mohsin Hamza")
  const wordsOnly = trimmed.split(/\s+/).filter(Boolean);
  if (wordsOnly.length >= 1 && wordsOnly.length <= 3) {
    const allAlpha = wordsOnly.every(w => /^[A-Za-z]{2,20}$/.test(w));
    const noneStopWords = wordsOnly.every(w => !NAME_STOP_WORDS.has(w.toLowerCase()));
    if (allAlpha && noneStopWords) {
      return formatName(trimmed);
    }
  }

  // 3. Positional extraction when mixed with phone or country (e.g. "Mohsin 7248437226 canada")
  const clean = trimmed
    .replace(/(?:\+91[\s.-]?|91[\s.-]?|0)?[6-9](?:[\s.-]?\d){9}\b/g, ' ')
    .replace(/\b\d{5}[\s.-]?\d{5}\b/g, ' ')
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ' ')
    .replace(/[^\w\s]/g, ' ');

  const tokens = clean.trim().split(/\s+/).filter(Boolean);
  const potentialNameTokens = [];

  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (!NAME_STOP_WORDS.has(lower) && /^[A-Za-z]{2,25}$/.test(token)) {
      potentialNameTokens.push(token);
    }
  }

  if (potentialNameTokens.length >= 1 && potentialNameTokens.length <= 3) {
    return formatName(potentialNameTokens.join(' '));
  }

  return null;
}

// Helper to extract target destination country
function extractCountry(text) {
  if (!text) return 'General Study Abroad';
  const lower = text.toLowerCase();
  const countryMap = [
    { key: 'canada', name: 'Canada' },
    { key: 'australia', name: 'Australia' },
    { key: 'united kingdom', name: 'United Kingdom' },
    { key: 'uk', name: 'United Kingdom' },
    { key: 'germany', name: 'Germany' },
    { key: 'united states', name: 'USA' },
    { key: 'usa', name: 'USA' },
    { key: 'us', name: 'USA' },
    { key: 'new zealand', name: 'New Zealand' },
    { key: 'ireland', name: 'Ireland' },
    { key: 'singapore', name: 'Singapore' },
    { key: 'malta', name: 'Malta' },
    { key: 'netherlands', name: 'Netherlands' },
    { key: 'netherland', name: 'Netherlands' },
    { key: 'holland', name: 'Netherlands' },
    { key: 'dutch', name: 'Netherlands' },
    { key: 'switzerland', name: 'Switzerland' },
    { key: 'dubai', name: 'Dubai / UAE' },
  ];
  for (const item of countryMap) {
    const regex = new RegExp(`\\b${item.key}\\b`, 'i');
    if (regex.test(lower)) {
      return item.name;
    }
  }
  return 'General Study Abroad';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages = [] } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Please provide conversation messages' }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1]?.content || '';
    const allUserMessages = messages.filter((m) => m.role === 'user').map((m) => m.content);
    const allUserText = allUserMessages.join(' ');

    const phone = extractPhoneNumber(latestUserMessage) || extractPhoneNumber(allUserText);
    const email = extractEmail(latestUserMessage) || extractEmail(allUserText);

    // Prioritized Name Detection:
    // 1. body.userName (from widget state)
    // 2. extractName from latest message (e.g. "Mohsin 7248437226 canada" -> "Mohsin")
    // 3. extractName from individual previous user messages
    // 4. extractName from allUserText
    let detectedName = body.userName || extractName(latestUserMessage);
    if (!detectedName) {
      for (let i = allUserMessages.length - 1; i >= 0; i--) {
        const cand = extractName(allUserMessages[i]);
        if (cand) {
          detectedName = cand;
          break;
        }
      }
    }
    if (!detectedName) {
      detectedName = extractName(allUserText);
    }

    const country =
      extractCountry(latestUserMessage) !== 'General Study Abroad'
        ? extractCountry(latestUserMessage)
        : extractCountry(allUserText);

    // Helper function to save or update lead in MongoDB
    async function persistLead(resolvedName) {
      if (!phone && !email) return false;
      try {
        await dbConnect();
        const validName = resolvedName && resolvedName !== 'AI Chat Student Lead' ? resolvedName : null;

        // Check if lead already exists by phone or email to prevent duplicate entries
        const orConditions = [];
        if (phone && phone !== 'Provided via Chat') orConditions.push({ phone });
        if (email && !email.endsWith('@chatlead.13dreams.com')) orConditions.push({ email });

        let existing = null;
        if (orConditions.length > 0) {
          existing = await Enquiry.findOne({ $or: orConditions }).sort({ createdAt: -1 });
        }

        if (existing) {
          const updates = {};
          const isPlaceholder = !existing.name || existing.name === 'AI Chat Student Lead' || existing.name === 'AI Chat Student';
          if (validName && isPlaceholder) {
            updates.name = validName;
          }
          if (country && country !== 'General Study Abroad' && (existing.preferredDestination === 'General' || existing.preferredDestination === 'General Study Abroad')) {
            updates.preferredDestination = country;
          }
          if (latestUserMessage) {
            updates.interest = `Student Message: "${latestUserMessage}"`;
          }
          if (phone && existing.phone === 'Provided via Chat') {
            updates.phone = phone;
          }
          if (email && existing.email.endsWith('@chatlead.13dreams.com')) {
            updates.email = email;
          }

          if (Object.keys(updates).length > 0) {
            await Enquiry.updateOne({ _id: existing._id }, { $set: updates });

            // Notify manager when real name is associated
            if (updates.name) {
              try {
                await sendEnquiryNotification({
                  ...existing.toObject(),
                  name: updates.name,
                  interest: `Lead name identified: "${updates.name}" (Message: "${latestUserMessage}")`,
                });
              } catch (emailErr) { }
            }
          }
          return true;
        }

        // New lead creation
        const leadData = {
          name: validName || 'AI Chat Student Lead',
          phone: phone || 'Provided via Chat',
          email: email || `${phone || 'student'}@chatlead.13dreams.com`,
          preferredDestination: country,
          qualification: 'Counseling via AI Chatbot',
          preferredIntake: 'Upcoming Intake',
          source: 'AI Counselor Chatbot',
          interest: `Student Message: "${latestUserMessage}"`,
          counseling: 'In Person or Virtual',
          office: 'Bareilly / Khatima',
          consent: true,
        };

        await Enquiry.create(leadData);

        // 1. Send admin notification
        try {
          await sendEnquiryNotification(leadData);
        } catch (emailErr) {
          console.warn('[AIChat] Manager notification non-blocking warning:', emailErr.message);
        }

        // 2. Automated student greeting if real email provided
        if (email && !email.endsWith('@chatlead.13dreams.com')) {
          try {
            await sendStudentEnquiryGreeting(leadData);
          } catch (studentEmailErr) {
            console.warn('[AIChat] Student greeting non-blocking warning:', studentEmailErr.message);
          }
        }
        return true;
      } catch (err) {
        console.warn('[AIChat] Lead saving fallback:', err.message);
        return false;
      }
    }

    // Support either 100% Free Groq API or OpenAI API
    const groqKey = process.env.GROQ_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    let aiClient = null;
    let selectedModel = 'openai/gpt-oss-120b';
    let providerName = '';

    if (groqKey && groqKey !== 'your_groq_api_key_here') {
      aiClient = new OpenAI({
        apiKey: groqKey,
        baseURL: 'https://api.groq.com/openai/v1',
      });
      selectedModel = 'openai/gpt-oss-120b';
      providerName = 'Groq (100% Free Tier)';
    } else if (openAiKey && openAiKey !== 'your_openai_api_key_here') {
      aiClient = new OpenAI({
        apiKey: openAiKey,
      });
      selectedModel = 'gpt-4o-mini';
      providerName = 'OpenAI';
    }

    if (!aiClient) {
      const leadSaved = await persistLead(detectedName);
      const smartFallback =
        `👋 Hello! I am **Priya**, Senior Counselor at **13 Dreams Consultants**.\n\n` +
        `We provide 100% FREE profile evaluation and student visa guidance for **Canada, Australia, UK, Germany, USA, New Zealand, Netherlands, Malta, and Singapore**, along with high-score **IELTS & PTE coaching**.\n\n` +
        (leadSaved
          ? `🎉 **Thank you${detectedName ? ' ' + detectedName : ''} for sharing your contact details!** Our senior counselor in Bareilly has received your query and will call you within 24 hours.\n\n`
          : `💡 *To enable live dynamic AI chat, add your \`GROQ_API_KEY\` (100% Free from [console.groq.com](https://console.groq.com)) or \`OPENAI_API_KEY\` in your \`.env.local\` file.*\n\n`) +
        `📞 **Need immediate counseling right now?**\n` +
        `- **Call / WhatsApp**: [+91 9759053463](https://wa.me/919759053463)\n` +
        `- **Bareilly Office**: Luthra Tower, Ekta Nagar, Bareilly (UP)\n` +
        `- **Khatima Office**: Uttarakhand`;

      return NextResponse.json({
        reply: smartFallback,
        leadSaved,
        detectedName: detectedName || undefined,
        requiresApiKey: true,
      });
    }

    // Inject dynamically retrieved, token-efficient knowledge base (< 2,500 tokens)
    const dynamicKnowledge = getRelevantRagKnowledge(messages);

    const systemInstruction = {
      role: 'system',
      content: `You are "Priya", the friendly, highly experienced Senior Study Abroad & Visa Counselor at 13 Dreams Consultants.
Your mission is to guide Indian students with authentic, 100% accurate information on overseas education, IELTS & PTE coaching, and student visa filing.

KNOWLEDGE BASE:
${dynamicKnowledge}

GUIDELINES:
1. Always base your answers strictly on the knowledge base above. Never guess or hallucinate.
2. Maintain a warm, encouraging, professional, and trustworthy tone.
3. Keep your answers concise, practical, and easy to read (use short bullet points and bold highlights). Do NOT output markdown heading symbols like "###" or "##" or horizontal divider dashes like "---". Use clean bold text (e.g. "**Next Steps:**") and clean bullet points.
4. If the student has NOT shared their contact number yet, naturally encourage them to share their WhatsApp number so our senior human counselor in Bareilly can prepare a customized university shortlist for free.
5. If the student shares their contact info, thank them warmly by name (e.g. "Thank you, [Name]!") and reassure them that our senior counselor will connect with them within 24 hours.
6. If asked about non-educational topics (politics, general tech, gossip), politely steer back: "I am 13 Dreams' Study Abroad AI Counselor. I can assist you with university admissions, IELTS/PTE coaching, and student visa filing. How may I help your foreign education plans?"`,
    };

    // Keep conversation context within last 6 messages for token safety
    const trimmedHistory = messages.slice(-6);

    let reply = '';
    const modelsToTry = [selectedModel, 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
    let lastError = null;

    for (const modelCandidate of modelsToTry) {
      try {
        const completion = await aiClient.chat.completions.create({
          model: modelCandidate,
          messages: [systemInstruction, ...trimmedHistory],
          temperature: 0.3,
          max_tokens: 600,
        });
        reply = completion.choices[0]?.message?.content || '';
        if (reply) break;
      } catch (callErr) {
        lastError = callErr;
        console.warn(`[AIChat] Model ${modelCandidate} failed: ${callErr.message}. Trying next available model...`);
      }
    }

    if (!reply) {
      if (lastError) throw lastError;
      reply = 'Thank you for reaching out! How can I assist with your study abroad dreams?';
    }

    // If name wasn't detected earlier, inspect the AI's greeting (e.g., "Thank you, Mohsin!")
    if (!detectedName) {
      const llmGreetingMatch = reply.match(/(?:Thank you|Thanks|Hello|Hi|Welcome|Greetings),?\s+([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)[!.,]/i);
      if (llmGreetingMatch && llmGreetingMatch[1]) {
        const cand = llmGreetingMatch[1].trim();
        const candLower = cand.toLowerCase();
        if (!NAME_STOP_WORDS.has(candLower) && !['student', 'there', 'user', 'friend', 'sir', 'madam'].includes(candLower)) {
          detectedName = formatName(cand);
        }
      }
    }

    // Persist or update lead with the final resolved name
    const leadSaved = await persistLead(detectedName);

    return NextResponse.json({
      reply,
      leadSaved,
      detectedName: detectedName || undefined,
    });
  } catch (error) {
    console.error('[AIChat API Error]:', error);
    return NextResponse.json(
      {
        error: error.message || 'Error processing AI chat message',
        fallbackReply:
          'Our AI counselor is temporarily connecting. You can talk directly to our senior study abroad advisor on WhatsApp at +91 9759053463 or visit our Bareilly office at Luthra Tower, Ekta Nagar.',
      },
      { status: 500 }
    );
  }
}
