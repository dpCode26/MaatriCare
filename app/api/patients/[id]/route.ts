import { connectDB } from '@/lib/db';
import Patient from '@/models/Patient';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const patient = await Patient.findById(id)
    .populate("userId", "name phone village")
    .populate("ashaId", "name phone");

  if (!patient) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(patient);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const body = await req.json();

  const patient = await Patient.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(patient);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  await Patient.findByIdAndUpdate(id, {
    isActive: false,
  });

  return NextResponse.json({
    success: true,
  });
}