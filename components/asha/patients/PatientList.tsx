"use client";
import { Search } from "lucide-react";
import PatientCard from "./PatientCard";
import RiskBadge from "@/components/shared/RiskBadge";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PatientList() {

  const [patients, setPatients] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((patient: any) =>
    patient.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    patient.village
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
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


  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-4">
        Loading patients...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-4 h-full min-h-[400px] overflow-y-auto">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-[#1f2a44]">
          Patient List
        </h2>

        <Link
          href="/asha/patients"
          className="
    px-4 py-2
    rounded-xl
    border border-gray-200
    text-sm font-medium
    inline-flex items-center
  "
        >
          View All
        </Link>

      </div>

      {/* RISK FILTERS */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        <RiskBadge level="high" />
        <RiskBadge level="medium" />
        <RiskBadge level="low" />
      </div>

      {/* SEARCH */}
      <div className="relative mt-6">

        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search patient"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 rounded-2xl border border-gray-200 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-300"
        />

      </div>

      <h3 className="mt-6 text-gray-500 font-medium">
        Patient Lists
      </h3>

      <div className="mt-2">
        {filteredPatients.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No patients found.
          </p>
        ) : (
          filteredPatients.slice(0, 5).map((patient: any) => (
            <PatientCard
              key={patient._id}
              id={patient._id}
              name={patient.userId?.name || "Unknown"}
              village={patient.village || "N/A"}
              risk={patient.riskLevel}
            />
          ))
        )}
      </div>

    </div>
  );
}