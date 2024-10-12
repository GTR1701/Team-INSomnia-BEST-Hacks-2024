"use client";

import { getCookie } from "cookies-next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Importujemy komponent Image z Next.js

// Przykładowa lista kursów (z dodanymi ścieżkami do zdjęć)
const courses = [
  { id: 1, title: "React Fundamentals", description: "Learn the basics of React.", image: "/images/react-course.jpg" },
  { id: 2, title: "Next.js Advanced", description: "Master server-side rendering with Next.js.", image: "/images/nextjs-course.jpg" },
  { id: 3, title: "Tailwind CSS Deep Dive", description: "Build beautiful UIs with Tailwind CSS.", image: "/images/tailwind-course.jpg" },
  { id: 4, title: "TypeScript Essentials", description: "Level up your JavaScript with TypeScript.", image: "/images/typescript-course.jpg" },
  { id: 5, title: "Node.js Backend", description: "Build scalable backend applications with Node.js.", image: "/images/nodejs-course.jpg" },
];

export default function Courses() {
  const currentUser = getCookie('currentUser');
  const [selected, setSelected] = useState("None");

  return currentUser && (
    <div className="p-6">
      {/* Kontener z zaokrąglonymi rogami i białym tłem na wysokości nagłówka */}
      <div className="bg-white py-6 shadow-md rounded-lg">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-gray-600 mt-2">Select a course to get started</p>
        </header>
      </div>

      {/* Siatka kursów */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
            {/* Miejsce na zdjęcie kursu */}
            <div className="mb-4">
              <Image 
                src={course.image} 
                alt={course.title} 
                width={400} 
                height={200} 
                className="w-full h-48 object-cover rounded-md" // Zaokrąglone rogi dla obrazka
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <Button onClick={() => setSelected(course.title)} className="w-full">
              Select {course.title}
            </Button>
          </div>
        ))}
      </div>

      {/* Wybrany kurs */}
      {selected !== "None" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Selected Course:</h2>
          <p className="text-gray-700">{selected}</p>
        </div>
      )}
    </div>
  );
}
