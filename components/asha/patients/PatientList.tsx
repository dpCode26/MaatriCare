import { Search } from "lucide-react";
import PatientCard from "./PatientCard";
import RiskBadge from "@/components/shared/RiskBadge";

const patients = [
  {
    name: "Matri",
    village: "Apamai Mah",
    risk: "high",
  },
  {
    name: "Suman Devi",
    village: "Mithapur",
    risk: "medium",
  },
  {
    name: "Radha Kumari",
    village: "Patna",
    risk: "low",
  },
  {
    name: "Neha Singh",
    village: "Nalanda",
    risk: "low",
  },
];

export default function PatientList() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-4 h-full min-h-[400px] overflow-y-auto">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-[#1f2a44]">
          Patient List
        </h2>

        <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium">
          View All
        </button>

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
          className="w-full h-9 rounded-2xl border border-gray-200 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-300"
        />

      </div>

      <h3 className="mt-6 text-gray-500 font-medium">
        Patient Lists
      </h3>

      <div className="mt-2">

        {patients.map((patient, index) => (
          <PatientCard
            key={index}
            name={patient.name}
            village={patient.village}
            risk={patient.risk as "low" | "medium" | "high"}
          />
        ))}

      </div>

    </div>
  );
}