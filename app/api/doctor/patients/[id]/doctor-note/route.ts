import { NextRequest, NextResponse } from "next/server";
import Patient from "@/models/Patient";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";


export async function PATCH(
  req: NextRequest,
  { params }: any
) {
  await connectDB();
  const session = await auth();

if (!session) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

if (session.user.role !== "doctor") {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}

  const body = await req.json();

  const patient = await Patient.findOneAndUpdate(
  {
    _id: params.id,
    district: session.user.district,
  },
  {
    doctorRecommendation: body.doctorRecommendation,
  },
  { new: true }
);

if (!patient) {
  return NextResponse.json(
    { error: "Patient not found" },
    { status: 404 }
  );
}

  return NextResponse.json(patient);
}