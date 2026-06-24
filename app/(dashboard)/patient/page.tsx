"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  CalendarDays,
  ChevronRight,
  HeartPulse,
  Phone,
  Stethoscope,
} from "lucide-react";

const symptoms = [
  {
    label: "सिरदर्द",
    value: "headache",
    color: "bg-violet-100 text-violet-700",
  },
  {
    label: "चक्कर",
    value: "dizziness",
    color: "bg-amber-100 text-amber-700",
  },
  {
    label: "कमजोरी",
    value: "weakness",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "उल्टी",
    value: "vomiting",
    color: "bg-rose-100 text-rose-700",
  },
  {
    label: "बुखार",
    value: "fever",
    color: "bg-red-100 text-red-700",
  },
];

export default function PatientDashboardPage() {
  const [patient, setPatient] = useState<any>(null);
  const [latestVisit, setLatestVisit] = useState<any>(null);
  const [doctorNotes, setDoctorNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState("");
  const [latestSymptom, setLatestSymptom] = useState<any>(null);
  const [nextAppointment, setNextAppointment] = useState<any>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch(
          "/api/patients/dashboard"
        );

        if (!res.ok) {
          throw new Error(
            `Request failed: ${res.status}`
          );
        }

        const data = await res.json();
        console.log(data);

        setPatient(data.patient);
        setLatestVisit(data.latestVisit);
        setDoctorNotes(data.doctorNotes || []);
        setLatestSymptom(data.latestSymptom || null);
        setNextAppointment(data.nextAppointment);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const toggleSymptom = (
    symptom: string
  ) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter(
          (item) => item !== symptom
        )
        : [...prev, symptom]
    );
  };

  const submitSymptoms = async () => {
    try {
      const res = await fetch(
        "/api/patients/symptoms",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            symptoms: selectedSymptoms,
            severity,
            notes,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save symptoms");
      }

      const data = await res.json();
      setLatestSymptom(data.symptom || null);
      setNextAppointment(data.nextAppointment);

      alert("Symptoms logged successfully");

      // setLatestSymptom({
      //   aiAdvice,
      // });

      setSelectedSymptoms([]);
      setSeverity(5);
      setNotes("");

    } catch (error) {
      console.error(error);
      alert("Failed to log symptoms");
    }
  };

  return (
    <div className="p-3 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* WELCOME SECTION */}
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-gradient-to-r from-[var(--primary)] via-[#ee7f88] to-[var(--secondary)] p-5 text-[var(--primary-foreground)] shadow-xl">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-emerald-50">
                नमस्ते 👋
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                स्वागत है, {patient?.userId?.name} जी
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-emerald-50">
                आपकी गर्भावस्था निगरानी सुरक्षित रूप से जारी है।
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <HeartPulse className="h-7 w-7" />
            </div>
          </div>

          {/* STATUS CARDS */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">

            {/* RISK STATUS */}
            <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    आपकी वर्तमान स्थिति
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {patient?.riskLevel || "Low Risk"}
                  </h3>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${patient?.riskLevel === "critical"
                    ? "bg-red-100 text-red-700"
                    : patient?.riskLevel === "high"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                    }`}
                >
                  {patient?.riskLevel?.toUpperCase()} Risk
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Pregnancy Progress
              </p>

              <h3 className="text-2xl font-bold text-emerald-700">
                {patient?.weeksPregnant ?? "--"} Weeks
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Expected Delivery:
                {" "}
                {patient?.edd
                  ? new Date(patient.edd).toLocaleDateString("en-IN")
                  : "--"}
              </p>
            </div>

            {/* NEXT APPOINTMENT */}
            <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-sm">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    अगला अपॉइंटमेंट
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {nextAppointment
                      ? new Date(nextAppointment)
                        .toLocaleDateString("hi-IN")
                      : "कोई अपॉइंटमेंट नहीं"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SYMPTOM LOGGER */}
        <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Symptom Logger
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                आज के लक्षण चुनें
              </p>
            </div>

            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
              <Activity className="h-5 w-5" />
            </div>
          </div>

          {/* SYMPTOMS */}
          <div className="flex flex-wrap gap-3">
            {symptoms.map((symptom) => (
              <button
                key={symptom.value}
                type="button"
                onClick={() =>
                  toggleSymptom(symptom.value)
                }
                className={`
      rounded-full px-4 py-3
      text-sm font-semibold
      transition-all

      ${selectedSymptoms.includes(
                  symptom.value
                )
                    ? "bg-red-500 text-white"
                    : symptom.color
                  }
    `}
              >
                {symptom.label}
              </button>
            ))}
          </div>

          <div className="mt-6">

            <label className="text-sm font-medium">
              Severity: {severity}/10
            </label>

            <input
              type="range"
              min={1}
              max={10}
              value={severity}
              onChange={(e) =>
                setSeverity(
                  Number(e.target.value)
                )
              }
              className="mt-2 w-full"
            />
            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="अपनी समस्या हिंदी में लिखें..."
              className="
    mt-4
    h-28
    w-full
    rounded-2xl
    border
    p-3
  "
            />
            <button
              type="button"
              onClick={submitSymptoms}
              className="
    mt-4
    rounded-2xl
    bg-emerald-600
    px-5
    py-3
    text-white
    hover:bg-emerald-700
  "
            >
              Submit Symptoms
            </button>
            <Link
              href="/patient/records"
              className="
    ml-3
    rounded-2xl
    border
    px-5
    py-3
    hover:bg-red-100
    bg-[#f4a261]/30
  "
            >
              View History
            </Link>

          </div>

          {/* AI SUGGESTION */}
          <div className="mt-6 rounded-2xl bg-[#f4a261]/10 p-4">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Stethoscope className="h-6 w-6 text-emerald-600" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">
                  AI स्वास्थ्य सुझाव
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {
                    latestSymptom?.aiAdvice ||
                    "आज कोई स्वास्थ्य सलाह उपलब्ध नहीं है।"
                  }
                </p>
              </div>

              {/* <button className="rounded-full bg-[#f4a261]/90 p-2 text-white hover:bg-emerald-700">
                <ChevronRight className="h-4 w-4" />
              </button> */}
            </div>
          </div>
        </div>

        {/* RECORDS + EMERGENCY */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* HEALTH RECORDS */}
          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Health Records
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  आपके स्वास्थ्य रिकॉर्ड
                </p>
              </div>

              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <Activity className="h-5 w-5" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  रक्तचाप
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {latestVisit?.bpSystolic || "--"}
                </h3>

                <p
                  className={`mt-1 text-xs font-medium ${latestVisit?.bpSystolic >= 140
                    ? "text-red-600"
                    : "text-emerald-600"
                    }`}
                >
                  {latestVisit?.bpSystolic >= 140
                    ? "उच्च"
                    : "सामान्य"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  वजन
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {latestVisit?.weightKg || "--"}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Latest Recorded
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  हीमोग्लोबिन
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {latestVisit?.hemoglobin || "--"}
                </h3>

                <p className="mt-1 text-xs text-amber-600">
                  {
                    latestVisit?.hemoglobin < 11
                      ? "एनीमिया जोखिम"
                      : "सामान्य"
                  }
                </p>
              </div>
            </div>

            <Link
              href="/patient/visits"
              className="
    mt-5
    block
    w-full
    rounded-2xl
    border
    border-[#f4a261]/20
    bg-[#f4a261]/10
    py-3
    text-center
    font-semibold
    text-[#e76f7a]
    transition-all
    hover:bg-red-100
  "
            >
              View Full Records
            </Link>
          </div>

          {/* EMERGENCY */}
          <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Emergency Support
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  तत्काल सहायता हेतु संपर्क करें
                </p>
              </div>

              <div className="rounded-xl bg-red-100 p-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-2xl bg-red-50 p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                  <Phone className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Emergency Contact
                  </h3>

                  <p className="text-sm text-slate-600">
                    {patient?.emergencyPhone}
                  </p>
                </div>
              </div>

              <button className="mt-3 w-full rounded-2xl bg-red-600 text-lg font-bold text-white transition-all hover:bg-red-700">
                <a
                  href={`tel:${patient?.emergencyPhone}`}
                  className="
    mt-5
    block
    w-full
    rounded-2xl
    bg-red-600
    py-2
    text-center
    text-lg
    font-bold
    text-white
    hover:bg-red-700
  "
                >
                  Call Now
                </a>
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm leading-relaxed text-slate-600">
                यदि तेज दर्द, अत्यधिक रक्तस्राव, या बच्चे की हलचल कम लगे,
                तो तुरंत सहायता लें।
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-xl font-bold">
              Doctor Notes
            </h2>
            {
              doctorNotes.length === 0 ? (
                <p className="text-slate-500">
                  No notes available.
                </p>
              ) : (
                <div className="space-y-3">
                  {doctorNotes.map((note, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-slate-50 p-4"
                    >
                      <p className="text-sm">
                        {note.note}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}