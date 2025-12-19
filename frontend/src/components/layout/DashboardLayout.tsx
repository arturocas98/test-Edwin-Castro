import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold">Project Manager</h1>
      </header>

      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
