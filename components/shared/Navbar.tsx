"use client";

import { Menu, Search } from "lucide-react";

export default function Navbar({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="h-12 sm:h-20 bg-[#1f2a44] flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-green-100">

      <div className="flex items-center gap-3">

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-white"
        >
          <Menu size={28} />
        </button>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#dcefdc]/20 to-[#b7d3b7]/10 px-5 py-1 shadow-md backdrop-blur-md">

          <div className="absolute inset-0 bg-white/5" />

          <h1 className="relative text-md sm:text-xl lg:text-2xl font-bold tracking-wide text-[#f4fff4]">
            DASHBOARD
          </h1>

        </div>

      </div>

      <div className="relative hidden md:block w-[260px] lg:w-[410px]">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />

        <input
          type="text"
          placeholder="Search patient by name or ID"
          className="w-full h-10 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-sm lg:text-md outline-none focus:ring-2 focus:ring-[#f08b95]/50"
        />
      </div>
    </header>
  );
}