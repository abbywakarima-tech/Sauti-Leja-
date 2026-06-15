import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Mock: In production, send actual email
    return NextResponse.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 400 });
  }
}
