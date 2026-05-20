import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const exists = await User.findOne({ email: body.email });
  if (exists) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

  const user = await User.create(body);
  return NextResponse.json({ id: user._id }, { status: 201 });
}