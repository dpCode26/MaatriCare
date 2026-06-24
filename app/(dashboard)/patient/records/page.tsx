"use client";

import { useEffect, useState } from "react";

export default function SymptomHistoryPage() {
  const [symptoms, setSymptoms] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadSymptoms() {
      const res = await fetch(
        "/api/patients/symptoms/history"
      );

      const data = await res.json();

      setSymptoms(data);
      setLoading(false);
    }

    loadSymptoms();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Symptom History
      </h1>

      <div className="space-y-4">

        {symptoms.map((item) => (
          <div
            key={item._id}
            className="
              rounded-3xl
              border
              bg-white
              p-5
              shadow-sm
            "
          >

            <div className="flex justify-between">

              <h3 className="font-bold">
                {item.symptoms.join(", ")}
              </h3>

              <span
                className={`
                  rounded-full
                  px-3 py-1
                  text-sm

                  ${
                    item.escalated
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }
                `}
              >
                {item.escalated
                  ? "Escalated"
                  : "Normal"}
              </span>

            </div>

            <p className="mt-3">
              Severity:
              {" "}
              {item.severity}/10
            </p>

            <p className="mt-2">
              Notes:
              {" "}
              {item.notes || "None"}
            </p>

            <div className="mt-4 rounded-xl bg-amber-50 p-3">

              <p className="font-medium">
                AI Advice
              </p>

              <p className="text-sm">
                {item.aiAdvice}
              </p>

            </div>

            <p className="mt-4 text-xs text-slate-500">
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}