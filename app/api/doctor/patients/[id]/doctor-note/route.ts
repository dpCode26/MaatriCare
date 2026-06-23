import { NextRequest, NextResponse } from "next/server";

import Patient from "@/models/Patient";
import { connectDB } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: any
) {
  await connectDB();

  const body = await req.json();

  const patient = await Patient.findByIdAndUpdate(
    params.id,
    {
      doctorRecommendation:
        body.doctorRecommendation,
    },
    { new: true }
  );

  return NextResponse.json(patient);
}