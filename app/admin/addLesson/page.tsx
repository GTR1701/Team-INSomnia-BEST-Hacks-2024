import { getCourseIdAndNames } from "@/data/queries";
import AddLesson from "./AddLesson";

export default async function Page() {
    const courses = await getCourseIdAndNames()
    return (
        <>
            <AddLesson courses={courses} />
        </>
    )
}