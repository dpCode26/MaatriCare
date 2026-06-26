import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Patient from "@/models/Patient";
import User from "@/models/User";
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

    if (session.user.role !== "doctor") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const patients = await Patient.find({
      district: session.user.district,
    })
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