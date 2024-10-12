"use server"

import { prisma } from "@/prisma/prisma"

export default async function getUserTypes() {
    return await prisma.userTypes.findMany()
}