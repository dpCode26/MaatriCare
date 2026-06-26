import { getDistrictSummary } from '@/lib/gemini';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session.user.role !== "doctor") {
    return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
    );
}

  const stats = await req.json();
  const summary = await getDistrictSummary(stats);
  return NextResponse.json({ summary });
}