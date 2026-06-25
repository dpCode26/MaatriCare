import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Visit from "@/models/Visit";

export async function PATCH(
  req: NextRequest
) {
  try {
    await connectDB();

    const { visitId } =
      await req.json();

    await Visit.findByIdAndUpdate(
      visitId,
      {
        reviewedByDoctor: true,
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to review alert",
      },
      {
        status: 500,
      }
    );
  }
}