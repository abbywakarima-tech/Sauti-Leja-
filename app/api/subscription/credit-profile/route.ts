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

    return NextResponse.json({
      creditReadinessScore: 78,
      businessGrowthScore: 65,
      recordConsistencyScore: 85,
      inventoryStabilityScore: 72,
      totalRevenue: 425000,
      transactionCount: 156,
      monthlyConsistency: 89,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
