import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

import Patient from "@/models/Patient";
import Symptom from "@/models/Symptom";

export async function GET() {
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

    const symptoms = await Symptom.find({
      patientId: patient._id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(symptoms);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch symptoms",
      },
      {
        status: 500,
      }
    );
  }
}