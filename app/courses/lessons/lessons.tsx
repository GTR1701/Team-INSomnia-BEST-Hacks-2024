"use client"; 

import { getCookie } from "cookies-next";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Przykładowy komponent z shadcn/ui

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
        <h2 className="text-lg font-bold mb-4">Right Column</h2>
        <p className="text-gray-600">You selected: {selected}</p>
        {/* Dodatkowa treść, która będzie przewijalna */}
        <div className="mt-4">
          <p>Here you can add more content that would make the page scrollable.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non massa nulla. Integer vestibulum vehicula dapibus.</p>
          <p>Vivamus gravida nibh a dui convallis, at tempor felis hendrerit.</p>
          {/* Można dodać więcej treści */}
        </div>
      </div>
    </div>
  );
}
