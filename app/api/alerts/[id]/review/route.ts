import Visit from "@/models/Visit";
import { connectDB } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: any
) {
  await connectDB();

  await Visit.findByIdAndUpdate(
    params.id,
    {
      reviewedByDoctor: true,
    }
  );

  return Response.json({
    success: true,
  });
}