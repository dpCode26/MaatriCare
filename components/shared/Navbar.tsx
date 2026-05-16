"use client";

import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-19 bg-[#000000] flex items-center justify-between px-10 border-b border-green-100">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-black">
          ASHA Worker Dashboard
        </h1>
      </div>

      <div className="relative w-[500px]">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={10}
        />

        <input
          type="text"
          placeholder="Search up specific patient by name or ID"
          className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-14 pr-4 text-lg outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>
    </header>
  );
}