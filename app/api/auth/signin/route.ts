// here using the api routes if we need the server action refer the action folder

import { NextResponse } from 'next/server';
import { LoginSchema } from '@/schemas';

export async function POST(request:Request) {
  // Parse the request body
  const body = await request.json(); // Extract the JSON from the request body

  // Validate the parsed JSON using zod schema
  const validatedFields = LoginSchema.safeParse(body);

  // If validation fails, return a 400 error with the validation errors
  if (!validatedFields.success) {
    return NextResponse.json({ success: false, errors: validatedFields.error.errors },
      { status: 400 }
    );
  }

  const { email, password } = validatedFields.data;
console.log(email,password);

  // Here you can implement your authentication logic, e.g., checking user credentials

  // For demonstration purposes, we're returning a success response
  return NextResponse.json({ success: true });
}
