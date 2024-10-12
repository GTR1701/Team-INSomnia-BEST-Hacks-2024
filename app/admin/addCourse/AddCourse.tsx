"use client"

import { getCookie } from "cookies-next"

export default function AddCourse() {
    const currentUser = getCookie('currentUser')
    return currentUser && (
        <>
            <div></div>
        </>
    )
}