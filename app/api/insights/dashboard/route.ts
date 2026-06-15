import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);

    // Mock insights data
    return NextResponse.json([
      {
        id: 1,
        title: 'Top Selling Product',
        description: 'Tomatoes are your best-selling product',
        priority: 'high',
      },
      {
        id: 2,
        title: 'Restock Alert',
        description: 'Bananas need restocking soon',
        priority: 'high',
      },
      {
        id: 3,
        title: 'Revenue Growth',
        description: 'Your revenue increased by 12.5% this month',
        priority: 'medium',
      },
    ]);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
