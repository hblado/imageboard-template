import prisma from "@/lib/db";
import z from "zod";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

// Zod Schema for User
const userZod = z
  .object({
    name: z.string().min(5, "Username must have at least 5 characters."),
    password: z.string().min(6, "Password must have at least 6 characters."),
    passwordConfirm: z.string().min(1, "Confirm password is required."),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export async function POST(req: Request) {
  const body = await req.json();
  const { name, password, passwordConfirm } = body;

  try {
    // Validate input data
    userZod.parse({ name, password, passwordConfirm });

    // Check if the user already exists
    const existUser = await prisma.admin.findFirst({where: {name: name}})

    if (existUser) {
      return NextResponse.json(
        {
          message: "This name has already been taken.",
        },
        { status: 409 }
      );
    }

    // Hash the password and create a new user
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.admin.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: `User ${newUser.name} created successfully.` },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // If the error is a known Error instance
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An unexpected error occurred.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Handle any other unknown errors
    return NextResponse.json(
      {
        message: "An unexpected error occurred.",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
