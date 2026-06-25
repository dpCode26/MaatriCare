"use client";
import { useEffect, useState } from "react";

export default function HighRiskPanel() {
  const [patients, setPatients] =
    useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/patients");

    const data = await res.json();

    setPatients(
      data.filter(
        (p: any) =>
          p.riskLevel === "high" ||
          p.riskLevel === "critical"
      )
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        High Risk Patients
      </h2>

      <div className="mt-4 space-y-3">

        {patients.map((p) => (
          <div
            key={p._id}
            className="
              rounded-2xl
              border
              p-3
            "
          >
            <h3 className="font-semibold">
              {p.userId?.name}
            </h3>

            <p className="text-sm text-gray-500">
              {p.village}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}