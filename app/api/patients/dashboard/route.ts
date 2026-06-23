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
    }).populate("userId");
    console.log("PATIENT FOUND:", patient);
    
    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    const latestVisit = await Visit.findOne({
      patientId: patient._id,
    }).sort({
      visitDate: -1,
    });

    // const doctorNotes = await DoctorNote.find({
    //   patientId: patient._id,
    // }).sort({
    //   createdAt: -1,
    // });

    return NextResponse.json({
      patient,
      latestVisit,
    //   doctorNotes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}