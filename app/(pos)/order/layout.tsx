"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/lib/components/ui/button";

export default function OrderLayout({
  sections,
}: {
  children: React.ReactNode;
  sections: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <header className="h-14 sticky top-0 border-b px-4 py-2 flex items-center gap-2">
        <Button variant={pathname === "/order" ? "secondary" : "ghost"} asChild>
          <Link href="/order">Order</Link>
        </Button>
        <Button
          variant={pathname === "/order/ongoing" ? "secondary" : "ghost"}
          asChild
        >
          <Link href="/order/ongoing">Order ongoing</Link>
        </Button>
      </header>
      <section className="p-4">{sections}</section>
    </>
  );
}
