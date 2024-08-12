import prisma from "@/lib/db";
import z from 'zod'
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'

//Zod Schema for User
const userZod = z.object({
    name: z.string().min(5, 'Username must have at least 5 characters.'),
    email: z.string().email('Invalid email.'),
    password: z.string().min(6, 'Password must have at leats 6 characters.'),
    passwordConfirm: z.string().min(1, 'Confirm password is requires')
})
.refine(({password, passwordConfirm}) => password === passwordConfirm, {
    message: "Passwords doesn't match",
    path: ['passwordConfirm']
})

export async function POST(req: Request) {
    const body = await req.json()
    const { name, email, password, passwordConfirm } = body
    const user = {
        name,
        email,
        password,
        passwordConfirm
    }
    try {
        userZod.parse(user)
        const existUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(existUser){
            return NextResponse.json({
                message: 'Email already exists.'
            }, {status: 409})
        }
        const hashedPassword = await hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json(
            {message: `User ${newUser.name} created successfully.`},
            {status: 201}
        )
    } catch(error) {
        return NextResponse.json(
            error
        )
    }
}