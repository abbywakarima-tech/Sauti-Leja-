import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: 'Item deleted' });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return NextResponse.json({ ...body, id: params.id });
}
