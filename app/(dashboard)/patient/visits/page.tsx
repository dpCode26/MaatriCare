"use client";

import { useEffect, useState } from "react";

type Visit = {
  _id: string;
  visitDate?: string;
  riskLevel?: string;

  bpSystolic?: number;
  bpDiastolic?: number;

  hemoglobin?: number;
  weightKg?: number;

  fetalMovement?: string;
  bleeding?: boolean;
  swelling?: boolean;

  fundalHeightCm?: number;
  urineAlbumin?: string;
  vomitingLevel?: string;

  flags?: string[];
  recommendation?: string;
};

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="font-semibold">{value ?? "--"}</p>
    </div>
  );
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVisits() {
      try {
        const res = await fetch("/api/patients/visits");

        if (!res.ok) {
          throw new Error("Failed to fetch visits");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setVisits(data);
        } else if (Array.isArray(data?.visits)) {
          setVisits(data.visits);
        } else {
          setVisits([]);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load visit history.");
      } finally {
        setLoading(false);
      }
    }

    loadVisits();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading visits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Visit History
        </h1>

        {visits.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            No visits found.
          </div>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => {
              const formattedDate = visit.visitDate
                ? new Date(
                    visit.visitDate
                  ).toLocaleDateString()
                : "--";

              return (
                <div
                  key={visit._id}
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                  "
                >
                  {/* HEADER */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        Visit Date
                      </p>

                      <h3 className="text-lg font-bold">
                        {formattedDate}
                      </h3>
                    </div>

                    <span
                      className={`
                        w-fit rounded-full px-3 py-1 text-sm font-semibold
                        ${
                          visit.riskLevel === "critical"
                            ? "bg-red-100 text-red-700"
                            : visit.riskLevel === "high"
                            ? "bg-orange-100 text-orange-700"
                            : visit.riskLevel === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-emerald-100 text-emerald-700"
                        }
                      `}
                    >
                      {visit.riskLevel
                        ? visit.riskLevel.toUpperCase()
                        : "UNKNOWN"}
                    </span>
                  </div>

                  {/* VITALS */}
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Blood Pressure
                      </p>

                      <p className="text-lg font-bold">
                        {visit.bpSystolic ?? "--"}
                        /
                        {visit.bpDiastolic ?? "--"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Hemoglobin
                      </p>

                      <p className="text-lg font-bold">
                        {visit.hemoglobin ?? "--"} g/dL
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">
                        Weight
                      </p>

                      <p className="text-lg font-bold">
                        {visit.weightKg ?? "--"} kg
                      </p>
                    </div>
                  </div>

                  {/* OBSERVATIONS */}
                  <div className="mt-6">
                    <h4 className="mb-3 font-semibold">
                      Pregnancy Observations
                    </h4>

                    <div className="grid gap-3 md:grid-cols-2">
                      <Info
                        label="Fetal Movement"
                        value={visit.fetalMovement}
                      />

                      <Info
                        label="Bleeding"
                        value={
                          visit.bleeding === undefined
                            ? "--"
                            : visit.bleeding
                            ? "Yes"
                            : "No"
                        }
                      />

                      <Info
                        label="Swelling"
                        value={
                          visit.swelling === undefined
                            ? "--"
                            : visit.swelling
                            ? "Yes"
                            : "No"
                        }
                      />

                      <Info
                        label="Fundal Height"
                        value={
                          visit.fundalHeightCm != null
                            ? `${visit.fundalHeightCm} cm`
                            : "--"
                        }
                      />

                      <Info
                        label="Urine Albumin"
                        value={visit.urineAlbumin}
                      />

                      <Info
                        label="Vomiting"
                        value={visit.vomitingLevel}
                      />
                    </div>
                  </div>

                  {/* FLAGS */}
                  {visit.flags &&
                    visit.flags.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold">
                          Flags
                        </h4>

                        <ul className="mt-2 list-disc pl-5 text-sm text-red-600">
                          {visit.flags.map((flag) => (
                            <li key={flag}>
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* RECOMMENDATION */}
                  {visit.recommendation && (
                    <div className="mt-6 rounded-2xl bg-amber-50 p-4">
                      <p className="font-semibold">
                        Recommendation
                      </p>

                      <p className="mt-1 text-sm">
                        {visit.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}