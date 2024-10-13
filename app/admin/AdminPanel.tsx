"use client"

import { Button } from "@/components/ui/button"
import { getCookie } from "cookies-next"
import Link from "next/link"

export default function AdminPanel() {
    const currentUser = getCookie('currentUser')
    return currentUser && (
        <>
            <div>
                <h1 className="text-4xl font-bold text-white text-center">Admin Panel</h1>
                <div className="grid grid-cols-2 gap-20 m-10">
                    <Button variant="singIn"><Link href="/admin/addCourse">Dodaj Kurs</Link></Button>
                    <Button variant="singIn"><Link href="/admin/addLesson">Dodaj Lekcję</Link></Button>
                </div>
            </div>
        </>
    )
}