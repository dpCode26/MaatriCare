import { connectDB } from '@/lib/db';
import Visit from '@/models/Visit';
import Patient from '@/models/Patient';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  const visit = await Visit.create({
    ...body,
    ashaId: session.user.id,
  });

  await Patient.findByIdAndUpdate(body.patientId, {
    riskUpdatedAt: new Date(),
  });

  return NextResponse.json(visit, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get('patientId');

  const query = patientId ? { patientId } : { ashaId: session.user.id };
  const visits = await Visit.find(query).sort({ visitDate: -1 });

  return NextResponse.json(visits);
}