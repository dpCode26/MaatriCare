import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

export async function GET() {
  await connectDB();

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const patientFilter =
    session.user.role === "doctor"
      ? {
        district: session.user.district,
        isActive: true,
      }
      : {
        ashaId: session.user.id,
        isActive: true,
      };

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [
    totalPatients,
    highRiskPatients,
    todayVisits,
  ] = await Promise.all([
    Patient.countDocuments(patientFilter),

    Patient.countDocuments({
      ...patientFilter,
      riskLevel: {
        $in: ["high", "critical"],
      },
    }),

    Visit.countDocuments({
      ...(session.user.role === "doctor"
        ? {}
        : { ashaId: session.user.id }),

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
