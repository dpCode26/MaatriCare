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

    const body = await req.json();

    const patient = await Patient.findOne({
      userId: session.user.id,
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    const symptom = await Symptom.create({
      patientId: patient._id,
      symptoms: body.symptoms,
      severity: body.severity,
      notes: body.notes,
      aiAdvice: body.aiAdvice,
    });

    return NextResponse.json(symptom);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}