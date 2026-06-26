import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Patient from "@/models/Patient";
import { connectDB } from "@/lib/db";

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

  const patient = await Patient.findByIdAndUpdate(
    params.id,
    {
      _id: params.id,
      district: session.user.district,
      doctorRecommendation:
        body.doctorRecommendation,
    },
    { new: true }
  );

  return NextResponse.json(patient);
}