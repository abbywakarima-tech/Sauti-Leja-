import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET);

    // Simulate voice processing with OpenAI
    const body = await request.json();
    const { audioUrl, language } = body;

    // Mock response - in production, use OpenAI Whisper API
    return NextResponse.json({
      success: true,
      extractedData: {
        productName: 'Tomatoes',
        quantity: 10,
        revenue: 500,
        category: 'Food',
        language,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process voice' }, { status: 400 });
  }
}
