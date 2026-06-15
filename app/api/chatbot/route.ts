import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    const body = await request.json();
    const { message } = body;

    // Mock response - in production, use OpenAI API
    const responses: any = {
      'how much did i sell': 'Based on your transactions, you sold KES 425,000 this month with 156 transactions.',
      'best selling': 'Your best-selling product is Tomatoes with 100 units sold this month.',
      'restock': 'You should restock Bananas and Onions. They\'re selling faster than average.',
      'revenue': 'Your monthly revenue is KES 425,000, showing a 12.5% increase from last month.',
    };

    let response = 'I\'m not sure about that. Try asking about your sales, products, or inventory.';
    for (const [key, value] of Object.entries(responses)) {
      if (message.toLowerCase().includes(key)) {
        response = value;
        break;
      }
    }

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
