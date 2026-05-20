import { connectDB } from '@/lib/db';
import Alert from '@/models/Alert';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const alerts = await Alert.find({ doctorId: session.user.id })
    .populate('patientId', 'userId riskLevel')
    .sort({ createdAt: -1 });

  return NextResponse.json(alerts);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const alert = await Alert.create(body);
  return NextResponse.json(alert, { status: 201 });
}