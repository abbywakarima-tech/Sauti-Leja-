import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    return NextResponse.json({ ...body, id: params.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 400 });
  }
}
