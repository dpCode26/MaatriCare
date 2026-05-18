"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardPlus,
  CalendarDays,
  RefreshCw,
  ChevronDown,
  Activity,
  MapPinned,
  UserRound,
  HeartPulse,
  FileText,
} from "lucide-react";

const ashaMenu = [
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

const doctorMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/doctor",
  },
  {
    title: "High-Risk Patients",
    icon: HeartPulse,
    href: "/doctor/high-risk",
  },
  {
    title: "District Heatmap",
    icon: MapPinned,
    href: "/doctor/heatmap",
  },
];

const patientMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/patient",
  },
  {
    title: "My Profile",
    icon: UserRound,
    href: "/patient/profile",
  },
  {
    title: "Health Records",
    icon: FileText,
    href: "/patient/records",
  },
  {
    title: "My Visits",
    icon: Activity,
    href: "/patient/visits",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  let menuItems = ashaMenu;

  if (pathname.startsWith("/doctor")) {
    menuItems = doctorMenu;
  } else if (pathname.startsWith("/patient")) {
    menuItems = patientMenu;
  }

  return (
    <aside className="w-[260px] h-screen bg-primary/20 border-r border-[#f08b95]/20 flex flex-col justify-between">

      <div>

        <div className="h-16 sm:h-20 flex items-center px-6 border-b border-[#f08b95]/50">

          <h1 className="text-2xl font-bold text-[#1f2a44] ">
            MaatriCARE
          </h1>

        </div>

        <nav className="mt-4 px-3">

          <ul className="space-y-2">

            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <li key={index}>

                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-white shadow-sm"
                        : "hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-4">

                      <Icon
                        size={22}
                        className="text-[#1f2a44]"
                      />

                      <span className="text-[15px] font-medium text-[#1f2a44]">
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

      <div className="p-4">

        <div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-blue-200" />

            <div>
              <p className="text-sm text-gray-500">
                Welcome
              </p>

              <h3 className="font-bold text-md text-[#1f2a44]">
                Suman G.
              </h3>
            </div>

          </div>

          <ChevronDown size={17} />

        </div>
      </div>
    </aside>
  );
}