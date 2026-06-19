"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  UserRound,
  ShieldAlert,
  CalendarDays,
  Activity,
  Phone,
  MapPin,
  HeartPulse,
  Clock3,
  ChevronRight,
  FileText,
  Plus,
  Baby,
  Droplets,
} from "lucide-react";

export default function PatientDetailsPage() {

  const params = useParams();

  const [patient, setPatient] = useState<any>(null);
  const [visits, setVisits] = useState<any[]>([]);
  const latestVisit = visits?.[0];
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);


  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    try {
      const res = await fetch(`/api/patients/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch patient");
      }

      const data = await res.json();

      setPatient(data.patient);
      setVisits(data.visits || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-10">
        Patient not found
      </div>
    );
  }

  const riskScore =
    latestVisit?.aiRiskResult?.riskLevel === "critical"
      ? 95
      : latestVisit?.aiRiskResult?.riskLevel === "high"
        ? 75
        : latestVisit?.aiRiskResult?.riskLevel === "medium"
          ? 50
          : 20;

  return (
    <main className="min-h-screen p-2">

      <div className="mb-4 flex items-center justify-between">

        <Link
          href="/asha/patients"
          className="
            inline-flex items-center gap-2
            rounded-2xl
            border border-slate-200
            bg-white
            px-4 py-3
            text-sm font-semibold
            text-slate-700
            transition-all duration-300
            hover:bg-slate-50
          "
        >
          <ArrowLeft size={18} />
          Back To Patients
        </Link>

        <Link
          href={`/asha/patients/${patient._id}/log-visit`}
          className="
            inline-flex items-center gap-2
            rounded-2xl
            bg-slate-900
            px-5 py-3
            text-sm font-semibold
            text-white
            shadow-lg
            transition-all duration-300
            hover:scale-[1.02]
          "
        >
          <Plus size={18} />
          Log Visit
        </Link>
      </div>

      <section
        className="
          overflow-hidden
          rounded-[36px]
          border border-slate-200
          bg-white
          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
        "
      >

        {/* TOP */}

        <div className="border-b border-slate-100 p-8">

          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">

            {/* LEFT */}

            <div className="flex gap-5">

              {/* AVATAR */}

              <div
                className="
                  flex h-14 w-14 shrink-0 items-center justify-center
                  rounded-[30px]
                  bg-gradient-to-br
                  from-[rgba(42,157,143,0.15)]
                  to-[rgba(42,157,143,0.05)]
                "
              >
                <UserRound
                  size={46}
                  className="text-[var(--accent)]"
                />
              </div>

              {/* INFO */}

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1
                    className="
                      text-3xl font-black
                      tracking-[-0.05em]
                      text-slate-900
                    "
                  >
                    {patient.userId?.name}
                  </h1>

                  <div
                    className={`rounded-full px-3 py-1 text-sm font-semibold
                        ${patient.riskLevel === "critical"
                        ? "bg-red-200 text-red-700"
                        : patient.riskLevel === "high"
                          ? "bg-red-100 text-red-600"
                          : patient.riskLevel === "medium"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                      }`}
                  >
                    {patient.riskLevel?.toUpperCase()}
                  </div>

                </div>

                <div className="mt-4 flex flex-wrap gap-3">

                  {[
                    patient._id,
                    `${patient.weeksPregnant || 0} Weeks Pregnant`,
                    `${patient.bloodGroup || "N/A"} Blood Group`,
                    `Age ${patient.age || "-"}`,
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="
      rounded-2xl
      border border-slate-200
      bg-slate-50
      px-4 py-2
      text-sm font-medium
      text-slate-700
    "
                    >
                      {item}
                    </div>
                  ))}

                </div>

                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-500">
                  Maternal healthcare profile with AI-powered pregnancy risk
                  monitoring, village-level tracking, and continuous visit
                  records for safer delivery outcomes.
                </p>

              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
                rounded-[28px]
                border border-slate-200
                bg-slate-50
                p-5
                xl:w-[280px]
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    AI Risk Score
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-900">
                    {riskScore}%
                  </h2>

                </div>

                <div
                  className="
                    flex h-16 w-16 items-center justify-center
                    rounded-2xl
                    bg-red-100
                  "
                >
                  <ShieldAlert
                    size={30}
                    className="text-red-500"
                  />
                </div>

              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-red-100">

                <div className="h-full w-[72%] rounded-full bg-red-500" />
                <div
                  className={`
    h-full rounded-full
    ${riskScore >= 75
                      ? "bg-red-500"
                      : riskScore >= 50
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }
  `}
                  style={{ width: `${riskScore}%` }}
                />

                <p
                  className={`
    mt-1 text-sm font-semibold
    ${latestVisit?.aiRiskResult?.riskLevel === "critical"
                      ? "text-red-600"
                      : latestVisit?.aiRiskResult?.riskLevel === "high"
                        ? "text-orange-600"
                        : latestVisit?.aiRiskResult?.riskLevel === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                    }
  `}
                >
                  {latestVisit?.aiRiskResult?.riskLevel?.toUpperCase() || "LOW"}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {latestVisit?.aiRiskResult?.recommendation ||
                  "No recommendation available"}
              </p>

            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="grid gap-0 md:grid-cols-4">

          {[
            {
              title: "EDD",
              value: patient.edd
                ? new Date(patient.edd).toLocaleDateString("en-IN")
                : "N/A",
              icon: CalendarDays,
            },
            {
              title: "Gravida",
              value: patient.gravida,
              icon: Baby,
            },
            {
              title: "Parity",
              value: patient.parity,
              icon: Activity,
            },
            {
              title: "Outcome",
              value: patient.outcome,
              icon: HeartPulse,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  border-t border-slate-100
                  p-3
                  md:border-r
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex h-14 w-14 items-center justify-center
                      rounded-2xl
                      bg-slate-100
                    "
                  >
                    <Icon
                      size={24}
                      className="text-slate-700"
                    />
                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      {item.title}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold capitalize text-slate-900">
                      {item.value}
                    </h3>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN GRID */}

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

        {/* LEFT */}

        <div className="space-y-6">

          {/* RISK FLAGS */}

          <section
            className="
              rounded-[32px]
              border border-slate-200
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            "
          >

            <div className="mb-7 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-900">
                  Risk Indicators
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  AI-detected maternal complications
                </p>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-red-50
                  px-4 py-2
                  text-sm font-semibold
                  text-red-600
                "
              >
                {latestVisit?.aiRiskResult?.escalate
  ? "Immediate Attention"
  : "Routine Monitoring"}
              </div>

            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {latestVisit?.aiRiskResult?.flags?.length ? (
                latestVisit.aiRiskResult.flags.map((risk: string) => (
                  <div
                    key={risk}
                    className="
        rounded-3xl
        border border-red-100
        bg-red-50/60
        p-5
      "
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-3 w-3 rounded-full bg-red-500" />

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {risk}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
                          Detected during latest visit.
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-500">
                  No active risk indicators.
                </div>
              )}
            </div>
          </section>

          {/* VISITS */}

          <section
            className="
              rounded-[32px]
              border border-slate-200
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            "
          >

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-900">
                  Recent Visits
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Maternal healthcare visit timeline
                </p>

              </div>

              <button
                className="
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  px-4 py-2
                  text-sm font-semibold
                  text-slate-700
                "
              >
                View All
              </button>

            </div>

            <div className="space-y-4">

              {visits.map((visit, index) => (
                <div
                  key={visit._id}
                  className="
      rounded-[28px]
      border border-slate-100
      bg-slate-50/70
      p-5
      transition-all duration-300
      hover:border-slate-200
      hover:bg-white
    "
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-4">
                      <div
                        className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-white
            shadow-sm
          "
                      >
                        <CalendarDays
                          size={24}
                          className="text-slate-700"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Visit #{visits.length - index}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {new Date(
                            visit.visitDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="
            rounded-full
            bg-orange-100
            px-4 py-2
            text-sm font-semibold
            text-orange-600
          "
                      >
                        {visit.aiRiskResult?.riskLevel?.toUpperCase() ||
                          "LOW"}
                      </div>

                      <ChevronRight
                        size={20}
                        className="text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>
        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* CONTACT */}

          <section
            className="
              rounded-[32px]
              border border-slate-200
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            "
          >

            <div className="mb-6 flex items-center gap-3">

              <Phone
                size={24}
                className="text-slate-700"
              />

              <h2 className="text-2xl font-black text-slate-900">
                Emergency Contact
              </h2>

            </div>

            <div className="space-y-5">

              <div
                className="
                  rounded-2xl
                  border border-slate-100
                  bg-slate-50
                  p-5
                "
              >

                <p className="text-sm text-slate-500">
                  Contact Person
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {patient.emergencyContact}
                </h3>

              </div>

              <div
                className="
                  rounded-2xl
                  border border-slate-100
                  bg-slate-50
                  p-5
                "
              >

                <p className="text-sm text-slate-500">
                  Phone Number
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {patient.emergencyPhone}
                </h3>

              </div>

            </div>
          </section>

          {/* LOCATION */}

          <section
            className="
              rounded-[32px]
              border border-slate-200
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            "
          >

            <div className="mb-6 flex items-center gap-3">

              <MapPin
                size={24}
                className="text-slate-700"
              />

              <h2 className="text-2xl font-black text-slate-900">
                Village Information
              </h2>

            </div>

            <div className="space-y-5">

              <div
                className="
                  rounded-2xl
                  border border-slate-100
                  bg-slate-50
                  p-5
                "
              >

                <p className="text-sm text-slate-500">
                  Village
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {patient.village}
                </h3>

              </div>

              <div
                className="
                  rounded-2xl
                  border border-slate-100
                  bg-slate-50
                  p-5
                "
              >

                <p className="text-sm text-slate-500">
                  District
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {patient.district}
                </h3>

              </div>

            </div>
          </section>

          {/* HEALTH SNAPSHOT */}

          <section
            className="
              overflow-hidden
              rounded-[32px]
              bg-slate-900
              p-7
              text-white
              shadow-[0_12px_40px_rgba(15,23,42,0.15)]
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-300">
                  Health Snapshot
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Stable Monitoring
                </h2>

              </div>

              <div
                className="
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl
                  bg-white/10
                "
              >
                <HeartPulse size={30} />
              </div>

            </div>

            <div className="mt-8 space-y-5">

              {[
                [
                  "Blood Pressure",
                  latestVisit
                    ? `${latestVisit.bpSystolic}/${latestVisit.bpDiastolic}`
                    : "N/A",
                ],
                [
                  "Hemoglobin",
                  latestVisit?.hemoglobin
                    ? `${latestVisit.hemoglobin} g/dL`
                    : "N/A",
                ],
                [
                  "Fetal Heart Rate",
                  latestVisit?.fetalHeartRate
                    ? `${latestVisit.fetalHeartRate} bpm`
                    : "N/A",
                ],
                [
                  "Weight",
                  latestVisit?.weightKg
                    ? `${latestVisit.weightKg} kg`
                    : "N/A",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between"
                >

                  <p className="text-slate-300">
                    {label}
                  </p>

                  <h3 className="font-bold">
                    {value}
                  </h3>

                </div>
              ))}

            </div>

          </section>
        </div>
      </section>
      {selectedVisit && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onClick={() => setSelectedVisit(null)}
  >
    <div
      className="w-full max-w-lg rounded-3xl bg-white p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Visit Details</h2>

        <button
          onClick={() => setSelectedVisit(null)}
          className="rounded-lg bg-slate-100 px-3 py-1"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3 text-sm">

        <p>
          <strong>Date:</strong>{" "}
          {new Date(selectedVisit.visitDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Risk:</strong>{" "}
          {selectedVisit.aiRiskResult?.riskLevel?.toUpperCase()}
        </p>

        <p>
          <strong>BP:</strong>{" "}
          {selectedVisit.bpSystolic}/{selectedVisit.bpDiastolic}
        </p>

        <p>
          <strong>Hb:</strong>{" "}
          {selectedVisit.hemoglobin} g/dL
        </p>

        <p>
          <strong>Weight:</strong>{" "}
          {selectedVisit.weightKg} kg
        </p>

        <p>
          <strong>Fetal Movement:</strong>{" "}
          {selectedVisit.fetalMovement}
        </p>

        <p>
          <strong>Bleeding:</strong>{" "}
          {selectedVisit.bleeding ? "Yes" : "No"}
        </p>

        <p>
          <strong>Swelling:</strong>{" "}
          {selectedVisit.swellingFace ? "Yes" : "No"}
        </p>

        {selectedVisit.aiRiskResult?.flags?.length > 0 && (
          <div>
            <strong>Flags:</strong>
            <ul className="mt-1 list-disc pl-5">
              {selectedVisit.aiRiskResult.flags.map((flag: string) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 rounded-xl bg-slate-100 p-3">
          <strong>Recommendation:</strong>
          <p className="mt-1">
            {selectedVisit.aiRiskResult?.recommendation}
          </p>
        </div>

      </div>
    </div>
  </div>
)}
    </main>
  );
}