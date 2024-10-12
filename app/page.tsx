import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button className="transition" asChild>
        <Link href="/test">
        Shadcn Button
        </Link>
      </Button>
    </>
  )
}
