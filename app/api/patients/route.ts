import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";

import Patient from "@/models/Patient";
import User from "@/models/User";

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

    let patients;

    if (session.user.role === "asha") {
      patients = await Patient.find({
        ashaId: session.user.id,
      })
        .populate("userId", "name phone village")
        .sort({ createdAt: -1 });
    }

    else if (session.user.role === "doctor") {
      patients = await Patient.find({
        district: session.user.district,
      })
        .populate("userId", "name phone village")
        .sort({ createdAt: -1 });
    }

    else {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(patients);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

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

    if (session.user.role !== "asha") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    console.log("PATIENT BODY:", body);

    // Required because your User model requires name + email
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password || "maatricare123",
      role: "patient",
      phone: body.phone,
      village: body.village,
      district: session.user.district,
    });

    const patient = await Patient.create({
      userId: user._id,

      ashaId: new mongoose.Types.ObjectId(
        session.user.id
      ),

      age: body.age,
      aadhaarLast4: body.aadhaarLast4,

      bloodGroup: body.bloodGroup,

      lmp: body.lmp,

      gravida: body.gravida,
      parity: body.parity,
      abortions: body.abortions,

      emergencyContact: body.emergencyContact,
      emergencyPhone: body.emergencyPhone,

      village: body.village,
      district: session.user.district,
      address: body.address,
    });

    return NextResponse.json(patient, {
      status: 201,
    });
  } catch (error: any) {
    console.error("PATIENT CREATE ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to create patient",
      },
      {
        status: 500,
      }
    );
  }
}