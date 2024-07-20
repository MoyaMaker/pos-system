"use client";
import { ModeToggle } from "@/lib/components/mode-toggle";
import { Button } from "@/lib/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 container">
        <ModeToggle />
      </header>
      <aside className="w-80 bg-slate-500"></aside>
      <main className="container mx-auto">
        <Button variant="link" asChild>
          <Link href="/order">Take order</Link>
        </Button>
      </main>
    </>
  );
}
