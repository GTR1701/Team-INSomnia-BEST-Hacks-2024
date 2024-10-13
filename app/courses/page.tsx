import { getCourses } from "@/data/queries";
import Courses from "./Courses";


export default async function Page(){
    const courses = await getCourses()
    return <Courses courses={courses} />;
    
          
}