import ZAI from 'z-ai-web-dev-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are Mini Doc, a world-class multimodal personal AI assistant.
          
Your objective is to help the user manage their digital life, paperwork, and personal bureaucracy with extreme precision and security.

CONTEXT:
You have visual and text access to the documents attached to this message.
- If the user asks about these documents, analyze them visually to provide the most accurate details.
- If the information is not in the documents, look at the connected app data or use your general intelligence.
- ALWAYS prioritize data security and privacy.

STYLE:
- Professional yet helpful and reassuring.
- Concise and action-oriented.
- If you see a date or deadline, ask the user if they'd like to add it to their calendar.
- Keep responses focused and helpful.
- Be friendly but professional.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const response = completion.choices[0]?.message?.content || "I processed your request. How can I help you further?";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
