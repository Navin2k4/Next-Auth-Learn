import { NextResponse } from 'next/server';
import { LoginSchema } from '@/schemas';

export async function POST(request: Request) {
  const { success, data, error } = LoginSchema.safeParse(await request.json());

  if (!success) {
    return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
  }

  const { email, password } = data;
  return NextResponse.json({ success: true });
}
