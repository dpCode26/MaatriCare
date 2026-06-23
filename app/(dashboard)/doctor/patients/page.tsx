"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/api/doctor/patients")
      .then((res) => res.json())
      .then(setPatients);
  }, []);

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Patients
      </h1>

      <div className="overflow-hidden rounded-3xl border bg-white">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Village</th>
              <th className="p-4 text-left">Risk</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient: any) => (
              <tr
                key={patient._id}
                className="border-t"
              >
                <td className="p-4">
                  {patient.userId?.name}
                </td>

                <td className="p-4">
                  {patient.village}
                </td>

                <td className="p-4">
                  {patient.riskLevel}
                </td>

                <td className="p-4">
                  <Link
                    href={`/doctor/patients/${patient._id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}