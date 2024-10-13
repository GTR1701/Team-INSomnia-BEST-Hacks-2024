"use server"

import { prisma } from "@/prisma/prisma"
import { AddLessonSchema } from "@/schemas"
import * as z from "zod"
export async function getUserTypes() {
    return await prisma.userTypes.findMany()
}

export async function getCourseIdAndNames() {
    return await prisma.course.findMany({ select: { id: true, title: true } })
}

export async function createLesson(data: z.infer<typeof AddLessonSchema>) {
    await prisma.lesson.create({ data: {
        lessonName: data.lessonName,
        courseId: data.course,
        route: data.route,
        description: data.description,
        codeEditorDefault: data.codeEditorDefault,
        codeEditorSolution: data.codeEditorSolution,
        nextLesson: data.nextLesson,
        previousLesson: data.previousLesson,
        reward: data.reward
    }})

    return { success: true }
}

export async function getCourses() {
    return await prisma.course.findMany()
}