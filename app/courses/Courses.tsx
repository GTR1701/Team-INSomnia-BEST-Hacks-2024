"use client"

import { getCookie } from "cookies-next"

export default function Courses() {
    const currentUser = getCookie('currentUser')
    return currentUser && (
        <>
            <div>
            </div>
        </>
    )
}