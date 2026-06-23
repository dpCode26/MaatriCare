"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
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
  LogOut,
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
    title: "Patients",
    icon: HeartPulse,
    href: "/doctor/patients",
  },
  // {
  //   title: "District Heatmap",
  //   icon: MapPinned,
  //   href: "/doctor/district",
  // },
];

const patientMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/patient",
  },
  // {
  //   title: "My Profile",
  //   icon: UserRound,
  //   href: "/patient/profile",
  // },
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
  const { data: session } = useSession();

  const pathname = usePathname();

  let menuItems = ashaMenu;

  if (pathname.startsWith("/doctor")) {
    menuItems = doctorMenu;
  } else if (pathname.startsWith("/patient")) {
    menuItems = patientMenu;
  }

  return (
    <aside
      className="w-[260px] h-screen bg-gradient-to-b from-[#fff7f5] via-[#fffaf8] to-[#fdf3ef] border-r border-[rgba(231,111,122,0.12)] backdrop-blur-xl shadow-[4px_0_30px_rgba(231,111,122,0.05)] flex flex-col justify-between"
    >
      <div>

        <div className="h-12 sm:h-20 flex items-center px-6 border-b border-[rgba(231,111,122,0.12)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e76f7a] to-[#f4a261] shadow-lg">

            <HeartPulse className="text-white" size={24} />

          </div>
          &nbsp;
          <h1 className="text-2xl font-bold text-[#1f2937] tracking-[-0.01em]">
            MAATRICARE
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
                    ${isActive
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
        <div className="bg-white rounded-2xl p-3 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center">
                <UserRound size={22} className="text-[#1f2a44]" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Welcome
                </p>

                <h3 className="font-bold text-md text-[#1f2a44]">
                  {session?.user?.name || "User"}
                </h3>
              </div>

            </div>

            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="
          flex items-center gap-2
          rounded-xl
          px-3 py-2
          text-red-500
          hover:bg-red-50
          transition-all
        "
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>
      </div>
    </aside>
  );
}