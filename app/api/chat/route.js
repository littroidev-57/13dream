import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RAG_KNOWLEDGE_BASE } from '@/lib/ragKnowledge';
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

// Helper to extract student name from chat message
function extractName(text) {
  if (!text) return null;
  const patterns = [
    /(?:my\s+name\s+is|i\s+am|this\s+is|name\s*[:\-])\s+([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)/i,
    /(?:myself)\s+([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      const lower = candidate.toLowerCase();
      const stopWords = ['interested', 'looking', 'student', 'planning', 'from', 'here', 'calling', 'want', 'need', 'trying', 'ready', 'asking', 'good', 'fine'];
      if (!stopWords.some(w => lower.startsWith(w))) {
        return candidate.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      }
    }
  }
  return null;
}

// Helper to extract target destination country
function extractCountry(text) {
  if (!text) return 'General Study Abroad';
  const lower = text.toLowerCase();
  const countries = [
    'canada',
    'australia',
    'uk',
    'united kingdom',
    'germany',
    'usa',
    'united states',
    'new zealand',
    'ireland',
    'singapore',
    'malta',
    'switzerland',
  ];
  for (const c of countries) {
    if (lower.includes(c)) {
      return c.charAt(0).toUpperCase() + c.slice(1);
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
    const newPhone = extractPhoneNumber(latestUserMessage);
    const newEmail = extractEmail(latestUserMessage);

    // If student shared their phone number or email, save as a lead in MongoDB Atlas enquiries table
    let leadSaved = false;
    if (newPhone || newEmail) {
      // Gather all user messages across the conversation to extract name, country, etc.
      const allUserText = messages
        .filter((m) => m.role === 'user')
        .map((m) => m.content)
        .join(' ');

      const phone = newPhone || extractPhoneNumber(allUserText);
      const email = newEmail || extractEmail(allUserText);
      const name = body.userName || extractName(allUserText) || extractName(latestUserMessage) || 'AI Chat Student Lead';
      const country =
        extractCountry(latestUserMessage) !== 'General Study Abroad'
          ? extractCountry(latestUserMessage)
          : extractCountry(allUserText);

      try {
        await dbConnect();
        const leadData = {
          name,
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
        leadSaved = true;

        // 1. Trigger manager email notification to admin (NOTIFICATION_EMAIL)
        try {
          await sendEnquiryNotification(leadData);
        } catch (emailErr) {
          console.warn('[AIChat] Manager email notification non-blocking warning:', emailErr.message);
        }

        // 2. If student gave a valid email address, trigger automated confirmation greeting
        if (email && !email.endsWith('@chatlead.13dreams.com')) {
          try {
            await sendStudentEnquiryGreeting(leadData);
          } catch (studentEmailErr) {
            console.warn('[AIChat] Student greeting email non-blocking warning:', studentEmailErr.message);
          }
        }
      } catch (dbErr) {
        console.warn('[AIChat] Lead saving fallback:', dbErr.message);
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
      // Graceful fallback response when neither Groq nor OpenAI key is provided yet
      const smartFallback =
        `👋 Hello! I am **Priya**, Senior Counselor at **13 Dreams Consultants**.\n\n` +
        `We provide 100% FREE profile evaluation and student visa guidance for **Canada, Australia, UK, Germany, USA, and New Zealand**, along with high-score **IELTS & PTE coaching**.\n\n` +
        (leadSaved
          ? `🎉 **Thank you for sharing your contact details!** Our senior counselor in Bareilly has received your query and will call you within 24 hours.\n\n`
          : `💡 *To enable live dynamic AI chat, add your \`GROQ_API_KEY\` (100% Free from [console.groq.com](https://console.groq.com)) or \`OPENAI_API_KEY\` in your \`.env.local\` file.*\n\n`) +
        `📞 **Need immediate counseling right now?**\n` +
        `- **Call / WhatsApp**: [+91 9759053463](https://wa.me/919759053463)\n` +
        `- **Bareilly Office**: Luthra Tower, Ekta Nagar, Bareilly (UP)\n` +
        `- **Khatima Office**: Uttarakhand`;

      return NextResponse.json({
        reply: smartFallback,
        leadSaved,
        requiresApiKey: true,
      });
    }

    // Inject 13 Dreams Knowledge Base into System Instructions
    const systemInstruction = {
      role: 'system',
      content: `You are "Priya", the friendly, highly experienced Senior Study Abroad & Visa Counselor at 13 Dreams Consultants.
Your mission is to guide Indian students with authentic, 100% accurate information on overseas education, IELTS & PTE coaching, and student visa filing.

KNOWLEDGE BASE:
${RAG_KNOWLEDGE_BASE}

GUIDELINES:
1. Always base your answers strictly on the knowledge base above. Never guess or hallucinate.
2. Maintain a warm, encouraging, professional, and trustworthy tone.
3. Keep your answers concise, practical, and easy to read (use short bullet points and bold highlights). Do NOT output markdown heading symbols like "###" or "##" or horizontal divider dashes like "---". Use clean bold text (e.g. "**Next Steps:**") and clean bullet points.
4. If the student has NOT shared their contact number yet, naturally encourage them to share their WhatsApp number so our senior human counselor in Bareilly can prepare a customized university shortlist for free.
5. If the student shares their contact info, thank them warmly and reassure them that our senior counselor will connect with them within 24 hours.
6. If asked about non-educational topics (politics, general tech, gossip), politely steer back: "I am 13 Dreams' Study Abroad AI Counselor. I can assist you with university admissions, IELTS/PTE coaching, and student visa filing. How may I help your foreign education plans?"`,
    };

    // Keep conversation context within last 8 messages for optimal token efficiency
    const trimmedHistory = messages.slice(-8);

    const completion = await aiClient.chat.completions.create({
      model: selectedModel,
      messages: [systemInstruction, ...trimmedHistory],
      temperature: 0.3,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content || 'Thank you for reaching out! How can I assist with your study abroad dreams?';

    return NextResponse.json({
      reply,
      leadSaved,
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
