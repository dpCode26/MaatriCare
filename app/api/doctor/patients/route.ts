import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Patient from "@/models/Patient";
import User from "@/models/User";
import Visit from "@/models/Visit";

export async function GET() {
  try {
    await connectDB();

    const patients = await Patient.find()
      .populate("userId", "name")
      .sort({ updatedAt: -1 });

    return NextResponse.json(patients);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}