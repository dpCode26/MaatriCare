import { connectDB } from '@/lib/db';
import Symptom from '@/models/Symptom';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const symptom = await Symptom.create({
    patientId: body.patientId,
    symptoms: body.symptoms,
    severity: body.severity,
    notes: body.notes,
  });

  return NextResponse.json(symptom, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get('patientId');

  const symptoms = await Symptom.find({ patientId }).sort({ loggedAt: -1 });
  return NextResponse.json(symptoms);
}