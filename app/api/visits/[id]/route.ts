import { connectDB } from '@/lib/db';
import Visit from '@/models/Visit';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Patient from '@/models/Patient';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();

  const session = await auth();
  if (!session) return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );

  const { id } = await params;

  let visit;

  if (session.user.role === "asha") {

    visit = await Visit.findOne({
      _id: id,
      ashaId: session.user.id,
    }).populate("patientId");

  }
  else if (session.user.role === "doctor") {

    const patients = await Patient.find({
      district: session.user.district,
    }).select("_id");

    visit = await Visit.findOne({
      _id: id,
      patientId: {
        $in: patients.map((p) => p._id),
      },
    }).populate("patientId");

  }
  else {

    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );

  }
  if (!visit) return NextResponse.json(
    { error: 'Not found' },
    { status: 404 });

  return NextResponse.json(visit);
}


export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );

  const body = await req.json();
  const { id } = await params;
  let visit;

  if (session.user.role === "asha") {

    visit = await Visit.findOneAndUpdate(
      {
        _id: id,
        ashaId: session.user.id,
      },
      body,
      { new: true }
    );

  }
  else if (session.user.role === "doctor") {

    const patients = await Patient.find({
      district: session.user.district,
    }).select("_id");

    visit = await Visit.findOneAndUpdate(
      {
        _id: id,
        patientId: {
          $in: patients.map((p) => p._id),
        },
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

  if (!visit) {
    return NextResponse.json(
      { error: "Visit not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(visit);
}
