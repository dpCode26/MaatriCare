import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Visit from "@/models/Visit";
import "@/models/Patient";
import "@/models/User";

import mongoose from "mongoose";

console.log("MODELS:", mongoose.modelNames());

export async function GET() {
  try {
    await connectDB();

    const alerts = await Visit.find({
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