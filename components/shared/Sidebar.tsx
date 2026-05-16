"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ClipboardPlus,
  CalendarDays,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/asha",
  },
  {
    title: "Patient List",
    icon: Users,
    href: "/asha/patients",
  },
  {
    title: "Register Patient",
    icon: ClipboardPlus,
    href: "/asha/patients/new",
  },
  {
    title: "Log Visit",
    icon: CalendarDays,
    href: "/asha/visits/new",
  },
  {
    title: "Sync Data",
    icon: RefreshCw,
    href: "#",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-[260px] min-h-screen bg-[#dff3df] border-r border-green-100 flex flex-col justify-between">

      {/* TOP SECTION */}
      <div>
        <div className="h-19 flex items-center px-6 border-b border-green-100">
          <h1 className="text-2xl items-center font-bold text-[#1f2a44]">
            MAATRICARE
          </h1>
        </div>

        {/* MENU */}
        <nav className="mt-4 px-4">
          <ul className="space-y-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-200
                    ${
                      index === 0
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={22} className="text-black" />

                      <span className="text-lg text-black font-medium">
                        {item.title}
                      </span>
                    </div>

                    {item.title === "Sync Data" && (
                      <ChevronDown size={18} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* USER PROFILE */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full object-cover"
            ></div>

            <div>
              <p className="text-sm text-gray-500">Welcome</p>

              <h3 className="font-bold text-lg">
                Suman G.
              </h3>
            </div>
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </aside>
  );
}