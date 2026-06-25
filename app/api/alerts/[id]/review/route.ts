import Visit from "@/models/Visit";
import { connectDB } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  console.log("Review API HIT");
  console.log("ID:", id);

  const visit =
    await Visit.findByIdAndUpdate(
      id,
      {
        reviewedByDoctor: true,
      },
      {
        returnDocument: "after",
      }
    );

  console.log(
    "Updated visit:",
    visit?.reviewedByDoctor
  );

  return Response.json({
    success: true,
  });
}