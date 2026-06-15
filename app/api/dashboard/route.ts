import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return demo data
    return NextResponse.json({
      user: {
        fullName: 'Jane Doe',
        email: decoded.email,
      },
      todaySales: 15400,
      weeklySales: 98250,
      monthlySales: 425000,
      inventoryCount: 45,
      lowStockAlerts: 3,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
