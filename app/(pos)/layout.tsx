import { Sidebar } from "./components/sidebar";

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-dvh">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}
