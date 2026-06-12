import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

export async function GET() {
  await connectDB();

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [
    totalPatients,
    highRiskPatients,
    todayVisits,
  ] = await Promise.all([
    Patient.countDocuments({
      isActive: true,
    }),

    Patient.countDocuments({
      riskLevel: {
        $in: ["high", "critical"],
      },
    }),

    Visit.countDocuments({
      visitDate: {
        $gte: start,
        $lte: end,
      },
    }),
  ]);

  return NextResponse.json({
    totalPatients,
    highRiskPatients,
    todayVisits,
  });
}
