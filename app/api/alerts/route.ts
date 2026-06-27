import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Visit from "@/models/Visit";
import Patient from "@/models/Patient";
import User from "@/models/User";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

console.log("MODELS:", mongoose.modelNames());

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

    if (session.user.role !== "doctor") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const patients = await Patient.find({
      district: session.user.district,
    }).select("_id");

    const alerts = await Visit.find({
      patientId: {
        $in: patients.map((p) => p._id),
      },
      "aiRiskResult.escalate": true,
      reviewedByDoctor: false,
    })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load alerts" },
      { status: 500 }
    );
  }
}