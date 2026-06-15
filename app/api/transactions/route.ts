import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Mock database
const transactions: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return mock transactions
    return NextResponse.json([
      {
        id: '1',
        productName: 'Tomatoes',
        category: 'Food',
        quantity: 10,
        sellingPrice: 50,
        revenue: 500,
        date: new Date().toISOString(),
        recordType: 'manual',
      },
    ]);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const transaction = {
      id: Date.now().toString(),
      ...body,
      date: new Date().toISOString(),
    };

    transactions.push(transaction);
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 400 });
  }
}
