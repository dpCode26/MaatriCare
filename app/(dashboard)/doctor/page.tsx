"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { io } from "socket.io-client";
import { socket } from "@/lib/socket-client";

import {
  AlertTriangle,
  BellRing,
  MapPinned,
} from "lucide-react";

export default function DoctorPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchAlerts() {
  //     try {
  //       const res = await fetch("/api/alerts");
  //       const data = await res.json();
  //       console.log("ALERT API RESPONSE:", data);
  //       setAlerts(Array.isArray(data) ? data : []);

  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchAlerts();
  // }, []);

const fetchAlerts = async () => {
  try {
    const res = await fetch("/api/alerts");

    const data = await res.json();

    console.log(data);

    setAlerts(
      Array.isArray(data)
        ? data
        : []
    );
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchAlerts().finally(() =>
    setLoading(false)
  );

  socket.on(
    "new-alert",
    (data) => {
      console.log(
        "NEW HIGH RISK PATIENT",
        data
      );

      fetchAlerts();
    }
  );

  return () => {
    socket.off(
      "new-alert"
    );
  };
}, []);

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case "critical":
        return "red";

      case "high":
        return "orange";

      default:
        return "green";
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto p-2 md:p-6">
      <div className="space-y-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Alerts Panel
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Monitor critical maternal health alerts across districts.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">

          {/* ALERTS SECTION */}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

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
                <span>Live Monitoring</span>
              </div>
            </div>

            {loading ? (
              <div className="py-10 text-center text-slate-500">
                Loading alerts...
              </div>
            ) : alerts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 p-6 text-center text-slate-500">
                No active alerts found.
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert: any) => {
                  const color = getRiskColor(
                    alert.aiRiskResult?.riskLevel
                  );

                  const risk =
                    alert.aiRiskResult?.riskLevel?.toUpperCase() ||
                    "LOW";

                  return (
                    <div
                      key={alert._id}
                      className={`rounded-2xl border-l-4 p-4 shadow-sm transition-all hover:shadow-md
                      ${color === "red"
                          ? "border-red-500 bg-red-50"
                          : color === "orange"
                            ? "border-orange-500 bg-orange-50"
                            : "border-emerald-500 bg-emerald-50"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-4">

                        <div className="flex gap-3">

                          <div
                            className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full
                            ${color === "red"
                                ? "bg-red-100 text-red-600"
                                : color === "orange"
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-emerald-100 text-emerald-600"
                              }`}
                          >
                            <AlertTriangle className="h-5 w-5" />
                          </div>

                          <div>

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="font-semibold text-slate-900">
                                {alert.patientId?.userId?.name ||
                                  "Unknown Patient"}
                              </h3>

                              <span className="text-slate-500">•</span>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {alert.aiRiskResult?.flags?.map((flag: string) => (
                                  <span
                                    key={flag}
                                    className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                                  >
                                    {flag}
                                  </span>
                                ))}
                              </div>

                              <span className="text-sm text-slate-500">
                                {new Date(
                                  alert.createdAt
                                ).toLocaleString()}
                              </span>

                            </div>

                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {alert.aiRiskResult?.recommendation ||
                                "No recommendation available."}
                            </p>

                            <div className="mt-4 flex gap-2">
                              <Link href={`/doctor/patients/${alert.patientId?._id}`}>
                                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                                  View Patient
                                </button>
                              </Link>

                              <button
                                onClick={async () => {
                                  await fetch(
                                    `/api/alerts/${alert._id}/review`,
                                    {
                                      method: "PATCH",
                                    }
                                  );

                                  setAlerts((prev) =>
                                    prev.filter(
                                      (item) => item._id !== alert._id
                                    )
                                  );
                                }}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium"
                              >
                                Mark Reviewed
                              </button>
                            </div>

                          </div>
                        </div>

                        <div
                          className={`rounded-full px-3 py-1 text-xs font-semibold
                          ${color === "red"
                              ? "bg-red-100 text-red-700"
                              : color === "orange"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                        >
                          {alert.aiRiskResult?.riskLevel?.toUpperCase() ||
                            "LOW"}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* DISTRICT RISK SECTION */}
          {/* <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

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

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                alt="District Risk Map"
                className="h-[280px] w-full object-cover"
              />
            </div>

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
          </div>*/}
        </div>  
      </div>
    </div>
  );
}