import { connectDB } from '@/lib/db';
import Patient from '@/models/Patient';
import Visit from "@/models/Visit";
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

  let patient;

  if (session.user.role === "asha") {
    patient = await Patient.findOne({
      _id: id,
      ashaId: session.user.id,
    })
      .populate("userId", "name phone village")
      .populate("ashaId", "name phone");
  }
  else if (session.user.role === "doctor") {
    patient = await Patient.findOne({
      _id: id,
      district: session.user.district,
    })
      .populate("userId", "name phone village")
      .populate("ashaId", "name phone");
  }
  else {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  if (!patient) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  const visits = await Visit.find({
    patientId: patient._id,
  })
    .sort({ visitDate: -1 })
    .lean();

  return NextResponse.json({
    patient,
    visits,
  });
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

  let patient;

  if (session.user.role === "asha") {

    patient = await Patient.findOneAndUpdate(
      {
        _id: id,
        ashaId: session.user.id,
      },
      body,
      { new: true }
    );

  }
  else if (session.user.role === "doctor") {

    patient = await Patient.findOneAndUpdate(
      {
        _id: id,
        district: session.user.district,
      },
      body,
      { new: true }
    );

  }
  else {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  if (!patient) {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }

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

  let patient;

  if (session.user.role === "asha") {

    patient = await Patient.findOneAndUpdate(
      {
        _id: id,
        ashaId: session.user.id,
      },
      {
        isActive: false,
      }
    );

  }
  else if (session.user.role === "doctor") {

    patient = await Patient.findOneAndUpdate(
      {
        _id: id,
        district: session.user.district,
      },
      {
        isActive: false,
      }
    );

  }
  else {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  if (!patient) {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}