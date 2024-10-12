"use server"

import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from 'zod';
import bcrypt from 'bcrypt'
import { prisma } from "@/prisma/prisma";

export async function registerUser(credentials: z.infer<typeof RegisterSchema>) {
    const username = String(credentials.username);
    const password = String(credentials.password);
    const userExists = await prisma.user.findFirst({ where: { username } });

    if (userExists) {
        return {message: 'User not found'}
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            userType: credentials.userType
        },
    });

    return {message: 'User registered', uuid: newUser.id}
}