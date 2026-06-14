import { connectDB } from '@/lib/db';
import Visit from '@/models/Visit';
import Patient from '@/models/Patient';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { analyzePregnancyRisk } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
  await connectDB();

  const session = await auth();
  if (!session)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );

  const body = await req.json();
  if (!body.patientId) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

  const patient = await Patient.findById(body.patientId);
  if (!patient) {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }

  const previousVisits = await Visit.find({
    patientId: body.patientId,
  })
    .sort({ visitDate: -1 })
    .limit(3)
    .select("bpSystolic bpDiastolic");

  const aiRiskResult =
    await analyzePregnancyRisk(
      {
        bpSystolic: Number(body.bpSystolic),
        bpDiastolic: Number(body.bpDiastolic),
        weightKg: Number(body.weightKg),
        hemoglobin: Number(body.hemoglobin),

        swellingFeet: body.swellingFeet,
        swellingFace: body.swellingFace,

        fetalMovement: body.fetalMovement,

        bleeding: body.bleeding,

        urineAlbumin:
          body.urineAlbumin,
      },

      {
        weeksPregnant:
            patient.weeksPregnant ??
            0,

          age:
            patient.age ?? 0,

          gravida:
            patient.gravida ?? 0,

          parity:
            patient.parity ?? 0,
        },

        previousVisits
    );

  const finalRisk =
    aiRiskResult ?? {
      riskLevel: "medium",
      flags: ["AI unavailable"],
      recommendation:
        "Review manually",
      escalate: false,
    };

  const visit = await Visit.create({
    ...body,
    ashaId: session.user.id,
    aiRiskResult: finalRisk,
  });


  await Patient.findByIdAndUpdate(
    body.patientId,
    {
      riskLevel:
        finalRisk.riskLevel,

      lastVisitDate:
        new Date(),

      nextVisitDate:
        body.nextVisitDate,

      riskUpdatedAt: new Date(),
    });

  return NextResponse.json(
    {
      success: true,
      visit,
    },
    { status: 201 }
  );
} catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      error:
        "Failed to create visit",
    },
    { status: 500 }
  );
}
}

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get('patientId');

  const query = patientId ? { patientId } : { ashaId: session.user.id };
  const visits = await Visit.find(query).sort({ visitDate: -1 });

  return NextResponse.json(visits);
}