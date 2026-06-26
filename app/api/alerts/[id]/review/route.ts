import Visit from "@/models/Visit";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Patient from "@/models/Patient";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const session = await auth();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (session.user.role !== "doctor") {
    return Response.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const { id } = await params;

  console.log("Review API HIT");
  console.log("ID:", id);

  const visit = await Visit.findById(id);

  if (!visit) {
    return Response.json(
      { error: "Visit not found" },
      { status: 404 }
    );
  }

  const patient = await Patient.findOne({
    _id: visit.patientId,
    district: session.user.district,
  });

  if (!patient) {
    return Response.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  visit.reviewedByDoctor = true;

  await visit.save();

  console.log(
    "Updated visit:",
    visit?.reviewedByDoctor
  );

  return Response.json({
    success: true,
  });
}