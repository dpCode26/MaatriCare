"use client";

import { Users, AlertTriangle, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsGrid() {
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    critical: 0,
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/patients");
    const patients = await res.json();

    setStats({
      total: patients.length,

      high: patients.filter(
        (p: any) =>
          p.riskLevel === "high"
      ).length,

      critical: patients.filter(
        (p: any) =>
          p.riskLevel === "critical"
      ).length,
    });
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">

      <Card
        title="Patients"
        value={stats.total}
        icon={<Users />}
      />

      <Card
        title="High Risk"
        value={stats.high}
        icon={<Activity />}
      />

      <Card
        title="Critical"
        value={stats.critical}
        icon={<AlertTriangle />}
      />

    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="h-12 w-12 rounded-2xl bg-[#f4a261]/10 flex items-center justify-center text-[#e76f7a]">
          {icon}
        </div>
      </div>

    </div>
  );
}