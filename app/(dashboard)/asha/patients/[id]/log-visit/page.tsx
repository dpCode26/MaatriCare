"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  HeartPulse,
  Activity,
  AlertTriangle,
  Upload,
} from "lucide-react";

type Patient = {
  _id: string;
  age: number;
  bloodGroup?: string;
  weeksPregnant: number;
  riskLevel: string;
  village?: string;
  aadhaarLast4?: string;
};

export default function LogVisitPage() {

  const params = useParams();
  const router = useRouter();

  const patientId = params.id as string;

  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [loadingPatient, setLoadingPatient] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [file, setFile] =
    useState<File | null>(null);

  const [formData, setFormData] = useState({
    weightKg: "",
    bpSystolic: "",
    bpDiastolic: "",
    hemoglobin: "",
    fundalHeight: "",
    fetalHeartRate: "",

    fetalMovement: "normal",
    vomiting: "none",
    urineAlbumin: "negative",

    swellingFeet: false,
    swellingFace: false,
    bleeding: false,

    notes: "",
    nextVisitDate: "",
  });

  useEffect(() => {
    async function loadPatient() {
      try {
        const res = await fetch(
          `/api/patients/${patientId}`
        );

        const data = await res.json();

        console.log("Patient API:", data);

        setPatient(data.patient);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPatient(false);
      }
    }

    loadPatient();
  }, [patientId]);

  const localRisk = (() => {
    const systolic = Number(formData.bpSystolic);
    const diastolic = Number(formData.bpDiastolic);
    const hb = Number(formData.hemoglobin);

    if (
      systolic >= 160 ||
      diastolic >= 110 ||
      hb < 7 ||
      formData.bleeding
    ) {
      return {
        level: "CRITICAL",
        text:
          "Immediate medical review required. Severe risk indicators detected.",
      };
    }

    if (
      systolic >= 140 ||
      diastolic >= 90 ||
      hb < 9 ||
      formData.swellingFace
    ) {
      return {
        level: "HIGH",
        text:
          "Possible hypertension or anemia. Monitor closely.",
      };
    }

    if (
      systolic >= 130 ||
      diastolic >= 80 ||
      hb < 11
    ) {
      return {
        level: "MEDIUM",
        text:
          "Moderate pregnancy risk detected.",
      };
    }

    return {
      level: "LOW",
      text:
        "No major risk indicators detected.",
    };
  })();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      let uploadedUrl = "";

      if (file) {
        const uploadForm =
          new FormData();

        uploadForm.append(
          "file",
          file
        );

        const uploadRes =
          await fetch(
            "/api/upload",
            {
              method: "POST",
              body: uploadForm,
            }
          );

        const uploadData =
          await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(
            uploadData.error ||
            "Upload failed"
          );
        }

        uploadedUrl =
          uploadData.url;
      }

      const res = await fetch(
        "/api/visits",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            patientId,
            ...formData,

            labReportUrl:
              uploadedUrl,

            labReportType:
              "medical_report",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
          "Failed to save visit"
        );
      }

      alert("Visit saved");

      router.push(
        `/asha/patients/${patientId}/visits`
      );
    } catch (err) {
      console.error(err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingPatient) {
    return (
      <div className="p-6">
        Loading patient...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6">

      {patient && (
        <section
          className="
          rounded-[32px]
          border border-[rgba(231,111,122,0.12)]
          bg-white/90
          p-7
          shadow-[0_10px_40px_rgba(231,111,122,0.06)]
        "
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Patient #{patient.aadhaarLast4}
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-4">

            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Age
              </p>

              <p className="mt-1 text-lg font-semibold">
                {patient.age}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Pregnancy Week
              </p>

              <p className="mt-1 text-lg font-semibold">
                {patient.weeksPregnant}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Blood Group
              </p>

              <p className="mt-1 text-lg font-semibold">
                {patient.bloodGroup ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Risk Level
              </p>

              <span
                className={`
                inline-flex rounded-full px-3 py-1 text-sm font-semibold
                ${patient.riskLevel === "critical"
                    ? "bg-red-100 text-red-600"
                    : patient.riskLevel === "high"
                      ? "bg-orange-100 text-orange-600"
                      : patient.riskLevel === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                  }
              `}
              >
                {patient.riskLevel}
              </span>
            </div>

          </div>
        </section>
      )}

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-3"
      >

        {/* LEFT COLUMN */}

        <div className="space-y-6 lg:col-span-2">

          {/* VITALS */}

          <section className="rounded-[32px] border bg-white/90 p-7">

            <h2 className="mb-6 text-2xl font-bold">
              Maternal Vitals
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                type="number"
                name="weightKg"
                value={formData.weightKg}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="h-12 rounded-2xl border px-4"
              />

              <input
                type="number"
                name="bpSystolic"
                value={formData.bpSystolic}
                onChange={handleChange}
                placeholder="BP Systolic"
                className="h-12 rounded-2xl border px-4"
              />

              <input
                type="number"
                name="bpDiastolic"
                value={formData.bpDiastolic}
                onChange={handleChange}
                placeholder="BP Diastolic"
                className="h-12 rounded-2xl border px-4"
              />

              <input
                type="number"
                name="hemoglobin"
                value={formData.hemoglobin}
                onChange={handleChange}
                placeholder="Hemoglobin"
                className="h-12 rounded-2xl border px-4"
              />

              <input
                type="number"
                name="fundalHeight"
                value={formData.fundalHeight}
                onChange={handleChange}
                placeholder="Fundal Height"
                className="h-12 rounded-2xl border px-4"
              />

              <input
                type="number"
                name="fetalHeartRate"
                value={formData.fetalHeartRate}
                onChange={handleChange}
                placeholder="Fetal Heart Rate"
                className="h-12 rounded-2xl border px-4"
              />

            </div>
          </section>

          {/* OBSERVATIONS */}

          <section className="rounded-[32px] border bg-white/90 p-7">

            <h2 className="mb-6 text-2xl font-bold">
              Symptoms & Observations
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <select
                name="fetalMovement"
                value={formData.fetalMovement}
                onChange={handleChange}
                className="h-12 rounded-2xl border px-4"
              >
                <option value="normal">Normal</option>
                <option value="reduced">Reduced</option>
                <option value="none">None</option>
                <option value="not_checked">Not Checked</option>
              </select>

              <select
                name="vomiting"
                value={formData.vomiting}
                onChange={handleChange}
                className="h-12 rounded-2xl border px-4"
              >
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="severe">Severe</option>
              </select>

            </div>

            <div className="mt-6 flex flex-wrap gap-6">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="swellingFeet"
                  checked={formData.swellingFeet}
                  onChange={handleCheckbox}
                />
                Swelling Feet
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="swellingFace"
                  checked={formData.swellingFace}
                  onChange={handleCheckbox}
                />
                Swelling Face
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="bleeding"
                  checked={formData.bleeding}
                  onChange={handleCheckbox}
                />
                Bleeding
              </label>

            </div>
          </section>

          {/* NOTES */}

          <section className="rounded-[32px] border bg-white/90 p-7">

            <h2 className="mb-5 text-2xl font-bold">
              Additional Notes
            </h2>

            <textarea
              rows={5}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add observations..."
              className="w-full rounded-3xl border p-5"
            />

          </section>

          {/* LAB REPORT */}

          <section className="rounded-[32px] border bg-white/90 p-7">

            <h2 className="mb-5 text-2xl font-bold">
              Lab Report Upload
            </h2>

            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] ?? null
                )
              }
              className="w-full rounded-2xl border p-4"
            />

            {file && (
              <p className="mt-3 text-sm text-green-600">
                Selected: {file.name}
              </p>
            )}

          </section>

        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-6">

          {/* AI CARD */}

          <section
            className="
            rounded-[32px]
            border border-red-100
            bg-gradient-to-br
            from-red-50
            to-orange-50
            p-7
          "
          >
            <h2 className="mb-4 text-2xl font-bold">
              AI Risk Prediction
            </h2>

            <div className="rounded-2xl bg-white p-5">

              <div className="mb-3 flex items-center justify-between">

                <p className="font-medium">
                  Current Risk
                </p>

                <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
                  {localRisk.level}
                </span>

              </div>

              <p className="text-sm">
                {localRisk.text}
              </p>

            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-[var(--primary)]
            to-[var(--secondary)]
            text-white
            font-semibold
          "
          >
            {saving
              ? "Saving..."
              : "Save Visit Record"}
          </button>

        </div>

      </form>

    </main>
  );
}