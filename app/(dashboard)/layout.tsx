"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [open, setOpen] = useState(false);

  return (
    <div className=" flex min-h-screen lg:h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 flex-col lg:h-screen lg:overflow-hidden">

        {/* Navbar */}
        <Navbar setOpen={setOpen} />

        {/* CONTENT */}
        <main
          className="
          flex-1
          p-2 sm:p-6 lg:p-4
          bg-secondary/10
          overflow-y-auto"
        >
          {children}
        </main>

      </div>
    </div>
  );
}