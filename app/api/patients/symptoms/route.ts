import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

import Patient from "@/models/Patient";
import Symptom from "@/models/Symptom";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const patient = await Patient.findOne({
      userId: session.user.id,
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const {
      symptoms,
      severity,
      notes,
    } = body;

    let aiAdvice =
      "स्थिति सामान्य प्रतीत होती है।";

    if (severity >= 8) {
      aiAdvice =
        "कृपया तुरंत डॉक्टर या ASHA कार्यकर्ता से संपर्क करें।";
    } else if (severity >= 5) {
      aiAdvice =
        "आराम करें, पानी पिएं और लक्षणों पर निगरानी रखें।";
    }

    const symptom = await Symptom.create({
      patientId: patient._id,
      symptoms: body.symptoms,
      severity: body.severity,
      notes: body.notes,
      aiAdvice: body.aiAdvice,
      escalated: severity >= 8,
    });

    return NextResponse.json(symptom);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save symptoms" },
      { status: 500 }
    );
  }
}