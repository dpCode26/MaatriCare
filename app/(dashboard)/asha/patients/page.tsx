//Patient list
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Search,
  Users,
  ShieldAlert,
  Plus,
  ChevronRight,
  MapPin,
  Baby,
  Activity,
  CalendarDays,
  HeartPulse,
} from "lucide-react";


export default function PatientsPage() {

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayVisits, setTodayVisits] = useState(0);

  useEffect(() => {
    fetchPatients();
    fetchDashboardStats();
  }, []);

  async function fetchPatients() {
    try {
      const res = await fetch("/api/patients");

      if (!res.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await res.json();

      setPatients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchDashboardStats() {
    try {
      const res = await fetch("/api/dashboard/stats");

      if (!res.ok) return;

      const data = await res.json();

      setTodayVisits(data.todayVisits);
    } catch (err) {
      console.error(err);
    }
  }

  const totalPatients = patients.length;

  const highRiskPatients = patients.filter(
    (p) =>
      p.riskLevel === "high" ||
      p.riskLevel === "critical"
  ).length;

  return (
    <main className="min-h-screen">

      {/* HERO */}

      <section
        className="
          overflow-hidden
          rounded-[36px]
          border border-slate-200
          bg-white
          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
        "
      >

        <div className="p-6 lg:p-10">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            {/* LEFT */}

            <div className="max-w-2xl">

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-slate-200
                  bg-slate-50
                  px-4 py-2
                  text-sm font-semibold
                  text-slate-700
                "
              >
                <Users size={16} />
                Maternal Patient Monitoring
              </div>

              <h1
                className="
                  mt-5 text-5xl font-black
                  tracking-[-0.05em]
                  text-slate-900
                  sm:text-3xl
                "
              >
                Patient Registry
              </h1>

              <p
                className="
                  mt-3 max-w-3xl
                  text-[13px] leading-8
                  text-slate-500
                "
              >
                Monitor maternal health records, identify high-risk pregnancies,
                track village-level visits, and maintain continuous pregnancy
                care through AI-assisted monitoring.
              </p>

            </div>

            {/* RIGHT */}

            <div className="grid gap-10 sm:grid-cols-2">

              {
                [
                  {
                    label: "Total Patients",
                    value: totalPatients,
                    icon: Users,
                  },
                  {
                    label: "Today's Visits",
                    value: todayVisits,
                    icon: CalendarDays,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="
                      rounded-[28px]
                      border border-slate-200
                      bg-slate-50
                      p-2
                      min-w-[120px]
                    "
                    >

                      <div className="flex items-center justify-between">

                        <div
                          className="
                          flex h-7 w-7 items-center justify-center
                          rounded-2xl
                          bg-white
                        "
                        >
                          <Icon
                            size={22}
                            className="text-slate-700"
                          />
                        </div>

                        <h2 className="text-2xl font-black text-slate-900">
                          {item.value}
                        </h2>

                      </div>

                      <p className="mt-5 text-sm font-medium text-slate-500">
                        {item.label}
                      </p>

                    </div>
                  );
                })}

            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            border-t border-slate-100
            bg-slate-50/70
            px-8 py-5
          "
        >

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="relative w-full max-w-md">

              <Search
                size={18}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Search patients, village or ID..."
                className="
                  h-12 w-full rounded-2xl
                  border border-slate-200
                  bg-white
                  pl-12 pr-4
                  text-sm
                  text-slate-700
                  outline-none
                  transition-all duration-300
                  focus:border-slate-400
                  focus:ring-4
                  focus:ring-slate-200
                "
              />

            </div>

            {/* FILTERS */}

            <div className="flex flex-wrap gap-3">

              {[
                {
                  label: "High Risk",
                  style:
                    "bg-red-100 text-red-600 border-red-200",
                },
                {
                  label: "Medium Risk",
                  style:
                    "bg-orange-100 text-orange-600 border-orange-200",
                },
                {
                  label: "Low Risk",
                  style:
                    "bg-green-100 text-green-700 border-green-200",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`
                    rounded-2xl
                    border
                    px-4 py-2
                    text-sm font-semibold
                    transition-all duration-300
                    hover:scale-[1.02]
                    ${item.style}
                  `}
                >
                  {item.label}
                </button>
              ))}

              <Link
                href="/asha/patients/new"
                className="
                  inline-flex items-center gap-2
                  rounded-2xl
                  bg-slate-900
                  px-5 py-2
                  text-sm font-semibold
                  text-white
                  shadow-lg
                  transition-all duration-300
                  hover:scale-[1.02]
                "
              >
                <Plus size={17} />
                Register Patient
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* PATIENT GRID */}

      <section className="mt-8 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">

        {patients.map((patient) => (

          <Link
            key={patient.id}
            href={`/asha/patients/${patient._id}`}
            className="
              group overflow-hidden
              rounded-[32px]
              border border-slate-200
              bg-white
              p-6
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-slate-300
              hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]
            "
          >

            {/* TOP */}

            <div className="flex items-start justify-between">

              {/* LEFT */}

              <div className="flex items-start gap-4">

                <div
                  className="
                    flex h-16 w-16 items-center justify-center
                    rounded-[24px]
                    bg-gradient-to-br
                    from-[rgba(42,157,143,0.12)]
                    to-[rgba(42,157,143,0.04)]
                  "
                >

                  <Baby
                    size={30}
                    className="text-[var(--accent)]"
                  />

                </div>

                <div>

                  <h2
                    className="
                      text-2xl font-black
                      tracking-[-0.03em]
                      text-slate-900
                    "
                  >
                    {patient.userId?.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2">

                    <MapPin
                      size={15}
                      className="text-slate-400"
                    />

                    <p className="text-sm text-slate-500">
                      {patient.village || "N/A"}, {patient.district || "N/A"}
                    </p>

                  </div>
                </div>
              </div>

              {/* RISK */}

              <div
                className={`
                  rounded-full
                  px-4 py-2
                  text-xs font-bold
                  border
                  ${patient.riskLevel === "high"
                    ? "bg-red-100 text-red-600 border-red-200"
                    : patient.riskLevel === "medium"
                      ? "bg-orange-100 text-orange-600 border-orange-200"
                      : "bg-green-100 text-green-700 border-green-200"
                  }
                `}
              >
                {patient.riskLevel?.toUpperCase()}
              </div>
            </div>

            {/* METRICS */}

            <div className="mt-7 grid grid-cols-3 gap-3">

              {[
                {
                  label: "Weeks",
                  value: patient.weeksPregnant,
                  icon: CalendarDays,
                },
                {
                  label: "Blood",
                  value: patient.bloodGroup,
                  icon: Activity,
                },
                {
                  label: "Visit",
                  value: patient.lastVisit,
                  icon: HeartPulse,
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      border border-slate-100
                      bg-slate-50
                      p-4
                    "
                  >

                    <div className="flex items-center gap-2">

                      <Icon
                        size={15}
                        className="text-slate-400"
                      />

                      <p className="text-xs font-medium text-slate-500">
                        {item.label}
                      </p>

                    </div>

                    <h3 className="mt-3 text-lg font-black text-slate-900">
                      {item.value}
                    </h3>

                  </div>
                );
              })}

            </div>

            {/* FOOTER */}

            <div
              className="
                mt-7 flex items-center justify-between
                border-t border-slate-100
                pt-5
              "
            >

              <div>
                <p className="text-xs text-slate-400">
                  AI Monitoring Status
                </p>

                <h3 className="mt-1 font-semibold text-slate-700">
                  Continuous Tracking Active
                </h3>

              </div>

              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl
                  bg-slate-100
                  transition-all duration-300
                  group-hover:bg-slate-900
                "
              >

                <ChevronRight
                  size={18}
                  className="
                    text-slate-600
                    transition-all duration-300
                    group-hover:text-white
                  "
                />
              </div>
            </div>
          </Link>
        ))}

      </section>
    </main>
  );
}