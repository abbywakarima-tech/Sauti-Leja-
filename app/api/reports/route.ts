import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const reports: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
    return NextResponse.json(reports);
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

    const report = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    reports.push(report);
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 400 });
  }
}
