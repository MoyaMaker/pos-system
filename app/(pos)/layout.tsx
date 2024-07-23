import { Sidebar } from "./components/sidebar";

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-[auto_1fr] h-dvh">
      <Sidebar />
      {children}
    </main>
  );
}
