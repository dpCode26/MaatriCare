import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

export async function GET() {
  await connectDB();

  const alerts = await Visit.find({
    "aiRiskResult.escalate": true,
  })
    .populate({
      path: "patientId",
      populate: {
        path: "userId",
      },
    })
    .sort({ visitDate: -1 })
    .limit(10);

  return NextResponse.json({
    alerts,
  });
}