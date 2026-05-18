"use client";

import {
  AlertTriangle,
  BellRing,
  MapPinned,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    patient: "Aarti Gupta",
    condition: "Severe Pre-eclampsia",
    time: "2m ago",
    risk: "Red",
    message:
      "Increased high-risk cases in eastern Patna; common severe pre-eclampsia.",
    color: "red",
  },
  {
    id: 2,
    patient: "Aarata Sharma",
    condition: "Critical Kansipaa",
    time: "2m ago",
    risk: "Critical",
    message:
      "Patient condition worsening with low hemoglobin and hypertension.",
    color: "orange",
  },
  {
    id: 3,
    patient: "Minti Gupta",
    condition: "Severe Pre-eclampsia",
    time: "3m ago",
    risk: "Red",
    message:
      "Increased hypertension patterns detected in rural areas.",
    color: "green",
  },
];

export default function DoctorDashboardPage() {
  return (
    <div className="min-h-screen p-2 md:p-6 overflow-y-auto">
      <div className="space-y-5">
        
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Alerts Panel
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Monitor critical maternal health alerts across districts.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-5 xl:grid-cols-2">

          {/* ALERTS SECTION */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold uppercase tracking-wide text-slate-800">
                  Critical Patient Alerts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Real-time emergency monitoring
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span>Socket.io Live</span>
              </div>
            </div>

            {/* ALERT LIST */}
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-2xl border-l-4 p-4 shadow-sm transition-all hover:shadow-md
                    ${
                      alert.color === "red"
                        ? "border-red-500 bg-red-50"
                        : alert.color === "orange"
                        ? "border-orange-500 bg-orange-50"
                        : "border-emerald-500 bg-emerald-50"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* LEFT */}
                    <div className="flex gap-3">
                      
                      <div
                        className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full
                          ${
                            alert.color === "red"
                              ? "bg-red-100 text-red-600"
                              : alert.color === "orange"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-emerald-100 text-emerald-600"
                          }
                        `}
                      >
                        <AlertTriangle className="h-5 w-5" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">
                            {alert.patient}
                          </h3>

                          <span className="text-slate-500">•</span>

                          <p className="font-medium text-slate-700">
                            {alert.condition}
                          </p>

                          <span className="text-sm text-slate-500">
                            {alert.time}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {alert.message}
                        </p>
                      </div>
                    </div>

                    {/* BADGE */}
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          alert.color === "red"
                            ? "bg-red-100 text-red-700"
                            : alert.color === "orange"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-emerald-100 text-emerald-700"
                        }
                      `}
                    >
                      {alert.risk}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DISTRICT RISK SECTION */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold uppercase tracking-wide text-slate-800">
                  District Risk Visualization
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Patna District Risk Density Monitoring
                </p>
              </div>

              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <MapPinned className="h-5 w-5" />
              </div>
            </div>

            {/* MAP */}
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                alt="District Risk Map"
                className="h-[280px] w-full object-cover"
              />
            </div>

            {/* SUMMARY */}
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BellRing className="h-4 w-4 text-emerald-600" />

                <h3 className="font-semibold text-slate-800">
                  Gemini AI Summary
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                Increased high-risk cases detected in eastern Patna.
                Common patterns include low hemoglobin and hypertension
                among rural maternal patients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}