"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Definiujemy stan dla zmiennej 'lvl' z domyślną wartością "przyszły"
  const [lvl, setLvl] = useState("przyszły");

  // Funkcja, która przełącza wartość zmiennej 'lvl'
  const toggleLvl = () => {
    setLvl(lvl === "przyszły" ? "" : "przyszły");
  };

  return (
   

        <div className="container  bg-neutral-900 custom-shadow m-10 rounded-md">
          <h1 className="text-slate-100 font-medium text-4xl text-center my-10">
            Witaj {lvl} programisto
          </h1>

          {/* Przełącznik On/Off */}
          <div className="flex justify-center items-center my-6">
            {/* Toggle switch container */}
            <div
              className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                lvl === "przyszły" ? "bg-gray-200" : "bg-violet-600"
              }`}
              onClick={toggleLvl}
            >
              {/* Switch circle */}
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  lvl === "przyszły" ? "translate-x-0" : "translate-x-8"
                }`}
              ></div>
            </div>

            {/* Tekst On/Off */}
            <span className="ml-4 text-slate-100 text-l">
              {lvl === "przyszły" ? "Umiem Programować" : "Nie umiem programować"}
            </span>
          </div>
          <div className="flex justify-center items-center my-6 flex-col">
            <h2 className="text-slate-100 font-medium text-3xl text-center my-20">
                  Pierwszy raz na stronie?
            </h2>
            <Button asChild>
              <Link href="/auth/register">Załóż konto już teraz</Link>
            </Button>
          </div>
          <div>
            <h2 className="text-slate-100 font-medium text-3xl text-center my-20">Czym Jest CodeWise?</h2>
            <p className="text-slate-100 font-medium text-xl text-center m-16">CodeWise to innowacyjna platforma edukacyjna dedykowana nauce programowania,
                która łączy różnorodne metody nauczania, w tym interaktywne kursy, quizy oraz społeczność uczących się.
                Dzięki elastycznemu podejściu, użytkownicy mogą rozwijać swoje umiejętności w programowaniu,
                uczestnicząc w praktycznych projektach oraz wymieniając doświadczenia z innymi pasjonatami technologii.
                CodeWise ma na celu nie tylko naukę, ale także budowanie społeczności,
                w której każdy może znaleźć wsparcie i inspirację w swojej drodze do zostania lepszym programistą.</p>
          </div>
        </div>
        
       

  );
}
