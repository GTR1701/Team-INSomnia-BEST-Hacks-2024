"use client"; 

import { getCookie } from "cookies-next";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Przykładowy komponent z shadcn/ui
import CodeEditorLesson from "@/components/codeEditor/CodeEditorLesson";

export default function Lessons() {
  const currentUser = getCookie('currentUser');
  const [selected, setSelected] = useState("None"); // Stan do przechowywania wybranego elementu

  return currentUser && (
    <div className="flex h-screen overflow-hidden">
      {/* Lewa kolumna */}
      <div className="w-1/5 bg-gray-200 p-4 fixed left-0 top-0 h-full">
        <h2 className="text-lg font-bold mb-4">Left Column</h2>
        <Button onClick={() => setSelected("Item 1")} className="w-full mb-2">
          Select Item 1
        </Button>
        <Button onClick={() => setSelected("Item 2")} className="w-full mb-2">
          Select Item 2
        </Button>
        <Button onClick={() => setSelected("Item 3")} className="w-full">
          Select Item 3
        </Button>
      </div>

      {/* Prawa kolumna */}
      <div className="w-9/10 ml-[20%] bg-white p-4 overflow-y-auto h-full">
        <CodeEditorLesson description={""} codeEditorDefault={""} codeEditorSolution={""} nextLesson={""} previousLesson={""} />
      </div>
    </div>
  );
}
