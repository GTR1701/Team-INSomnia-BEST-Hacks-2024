"use server"

import { LoginSchema } from "@/schemas";
import * as z from 'zod';
import bcrypt from 'bcrypt'
import { prisma } from "@/prisma/prisma";

export async function loginUser(credentials: z.infer<typeof LoginSchema>) {
    const username = credentials.username
    const passwordDb = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            password: true,
            id: true
        }
    })
    
    if (!passwordDb) {
        return {message: 'User not found'}
    }

    const passwordOK = bcrypt.compareSync(credentials.password, passwordDb.password)

    if (!passwordOK) {
        return {message: 'Invalid password'}
    }

    return {message: 'Logged in', uuid: passwordDb.id}
}