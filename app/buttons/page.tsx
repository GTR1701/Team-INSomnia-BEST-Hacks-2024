import { Button } from "@/components/ui/button"; 
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <>
    
      <Button variant={"accept"}  className="transition" asChild>
        <Link href="">
         Akceptuj
        </Link>
      </Button>
      <Button variant={"cancel"} className="transition">
         <Link href="">
         Anuluj
        </Link>
      </Button>
      <Button variant={"goTo"} className="transition">
      <Link href="">
         Przejdź
        </Link>
      </Button>
      <Button variant={"logIn"} className="transition">
      <Link href="">
         Zaloguj się
        </Link>
      </Button>
      <Button variant={"singIn"} className="transition">
      <Link href="">
         Założ konto już teraz
        </Link>
      </Button>
      <Button variant={"send"} className="transition">
      <Link href="">
         Prześlij
        </Link>
      </Button>
      
    </>
  )
}