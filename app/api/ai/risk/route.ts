import { analyzePregnancyRisk } from '@/lib/gemini';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { visitData, patientData, previousVisits } = await req.json();
  const result = await analyzePregnancyRisk(visitData, patientData, previousVisits);
  return NextResponse.json(result);
}