import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

import Patient from "@/models/Patient";
import Visit from "@/models/Visit";

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

    const visits = await Visit.find({
      patientId: patient._id,
    }).sort({
      visitDate: -1,
    });

    return NextResponse.json(visits);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch visits" },
      { status: 500 }
    );
  }
}