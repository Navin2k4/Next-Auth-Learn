import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function POST(request: Request) {
  const { success, data, error } = RegisterSchema.safeParse(await request.json());

  if (!success) {
    return NextResponse.json(
      { success: false, errors: error.errors },
      { status: 400 }
    );
  }

  const { email, password, name } = data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Send verification token email

    return NextResponse.json({ success: "User registered successfully" });
  } catch (error) {
    console.error("Database operation failed:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
