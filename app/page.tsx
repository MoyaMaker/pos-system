"use client";
import { ModeToggle } from "@/lib/components/mode-toggle";
import { Combobox } from "@/lib/components/ui/combobox";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 container">
        <ModeToggle />
      </header>
      <aside className="w-80 bg-slate-500"></aside>
      <main className="container mx-auto">
        <h1>Hello there</h1>

        <Combobox
          multiple
          options={[
            {
              label: "México",
              value: "MEX",
            },
            {
              label: "USA",
              value: "USA",
            },
            {
              label: "Canada",
              value: "CAN",
            },
          ]}
          onChange={(values) => console.log(values)}
        />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam rem
          quod hic architecto est nemo doloremque officia quo. Facilis debitis
          accusamus aperiam porro sint deleniti cupiditate saepe, quaerat minima
          ducimus.
        </p>
      </main>
    </>
  );
}
