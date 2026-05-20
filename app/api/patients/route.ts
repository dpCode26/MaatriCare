import { connectDB } from '@/lib/db';
import Patient from '@/models/Patient';
import User from '@/models/User';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const patients = await Patient.find({ ashaId: session.user.id })
    .populate('userId', 'name phone village')
    .sort({ createdAt: -1 });

  return NextResponse.json(patients);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  const user = await User.create({
    name: body.name,
    email: body.email,
    password: body.password || 'maatricare123',
    role: 'patient',
    phone: body.phone,
    village: body.village,
    district: body.district,
  });

  const patient = await Patient.create({
    userId: user._id,
    ashaId: session.user.id,
    age: body.age,
    lmp: body.lmp,
    bloodGroup: body.bloodGroup,
    gravida: body.gravida,
    parity: body.parity,
    emergencyContact: body.emergencyContact,
    emergencyPhone: body.emergencyPhone,
    village: body.village,
    district: body.district,
    address: body.address,
  });

  return NextResponse.json(patient, { status: 201 });
}