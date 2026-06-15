import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const inventoryItems: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    return NextResponse.json(inventoryItems);
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

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    const body = await request.json();

    const item = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    inventoryItems.push(item);
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 400 });
  }
}
