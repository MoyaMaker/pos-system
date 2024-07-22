import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { Sidebar } from "./components/sidebar";

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-[auto_1fr] h-dvh">
      <Sidebar />
      <ScrollArea className="w-full h-dvh">{children}</ScrollArea>
    </main>
  );
}
