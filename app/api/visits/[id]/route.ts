import { connectDB } from '@/lib/db';
import Visit from '@/models/Visit';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}


export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const visit = await Visit.findById(params.id).populate('patientId');
  if (!visit) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(visit);
}


export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const visit = await Visit.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(visit);
}
