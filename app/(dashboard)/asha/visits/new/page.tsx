//Log visit form
"use client";
import { useState } from "react";

import {
  CalendarDays,
  Upload,
  HeartPulse,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function LogVisitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [reportUrl, setReportUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    patientId: "",

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

  const uploadToCloudinary = async () => {
    if (!file) return "";

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      return data.secure_url;
    } catch (err) {
      console.error(err);
      alert("File upload failed");
      return "";
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const uploadedUrl = await uploadToCloudinary();

      const res = await fetch(
        "/api/visits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            reportUrl: uploadedUrl,
          }),
        }
      );
      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error
        );
      }

      alert(
        "Visit saved successfully"
      );

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <main className="mx-auto max-w-7xl space-y-6">
      <div className="relative overflow-hidden rounded-[28px] border border-[#f1d6d1] bg-gradient-to-br from-[#e76f7a] via-[#ec8a93] to-[#f4a261] p-6 md:p-8 shadow-sm">

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-black/5 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between">

          <div>
            <p className="text-sm font-medium text-white/80">
              Maternal Health Monitoring
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Patient Visit
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Record maternal vitals, pregnancy observations,
              lab reports, and AI-assisted risk analysis
              during every village healthcare visit.
            </p>
          </div>

          <div className="hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur md:flex">
            <HeartPulse className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* FORM */}

      <form className="grid gap-6 lg:grid-cols-3">

        {/* LEFT COLUMN */}

        <div className="space-y-6 lg:col-span-2">

          {/* PATIENT DETAILS */}

          <section className="
            rounded-[32px]
            border border-[rgba(231,111,122,0.12)]
            bg-white/90
            p-7
            shadow-[0_10px_40px_rgba(231,111,122,0.06)]
            backdrop-blur-xl
          ">

            <div className="mb-6 flex items-center gap-3">

              <div className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-[rgba(231,111,122,0.12)]
              ">
                <HeartPulse
                  size={22}
                  className="text-[var(--primary)]"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  Patient Information
                </h2>

                <p className="text-sm text-[var(--muted-foreground)]">
                  Basic visit details
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                  Patient ID
                </label>

                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patientId: e.target.value,
                    })
                  }
                  placeholder="Enter patient ID"
                  className="
                    h-12 w-full rounded-2xl
                    border border-[var(--border)]
                    bg-white px-4
                    text-sm
                    transition-all duration-200
                    focus:border-[var(--primary)]
                    focus:ring-4
                    focus:ring-[rgba(231,111,122,0.15)]
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                  Next Visit Date
                </label>

                <input
                  type="date"
                  value={formData.nextVisitDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nextVisitDate: e.target.value,
                    })
                  }
                  className="
                    h-12 w-full rounded-2xl
                    border border-[var(--border)]
                    bg-white px-4
                    text-sm
                    transition-all duration-200
                    focus:border-[var(--primary)]
                    focus:ring-4
                    focus:ring-[rgba(231,111,122,0.15)]
                  "
                />
              </div>

            </div>
          </section>

          {/* VITALS */}

          <section className="
            rounded-[32px]
            border border-[rgba(42,157,143,0.10)]
            bg-white/90
            p-7
            shadow-[0_10px_40px_rgba(42,157,143,0.06)]
          ">

            <div className="mb-6 flex items-center gap-3">

              <div className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-[rgba(42,157,143,0.10)]
              ">
                <Activity
                  size={22}
                  className="text-[var(--accent)]"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  Maternal Vitals
                </h2>

                <p className="text-sm text-[var(--muted-foreground)]">
                  Record medical observations
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label>Weight (kg)</label>

                <input
                  type="number"
                  name="weightKg"
                  value={formData.weightKg}
                  onChange={handleChange}
                  placeholder="Enter Weight"
                  className="
                      h-12 w-full rounded-2xl
                      border border-[var(--border)]
                      bg-white px-4
                      text-sm
                      transition-all duration-200
                      focus:border-[var(--primary)]
                      focus:ring-4
                      focus:ring-[rgba(231,111,122,0.15)]
                    "
                />
              </div>

              <div>
                <label>BP Systolic</label>

                <input
                  type="number"
                  name="bpSystolic"
                  value={formData.bpSystolic}
                  onChange={handleChange}
                  placeholder="Enter BP Systolic"
                  className="
                      h-12 w-full rounded-2xl
                      border border-[var(--border)]
                      bg-white px-4
                      text-sm
                      transition-all duration-200
                      focus:border-[var(--primary)]
                      focus:ring-4
                      focus:ring-[rgba(231,111,122,0.15)]
                    "
                />
              </div>

              <div>
                <label>BP Diastolic</label>

                <input
                  type="number"
                  name="bpDiastolic"
                  value={formData.bpDiastolic}
                  onChange={handleChange}
                  placeholder="Enter BP Diastolic"
                  className="
                      h-12 w-full rounded-2xl
                      border border-[var(--border)]
                      bg-white px-4
                      text-sm
                      transition-all duration-200
                      focus:border-[var(--primary)]
                      focus:ring-4
                      focus:ring-[rgba(231,111,122,0.15)]
                    "
                />
              </div>

              <div>
                <label>Hemoglobin</label>

                <input
                  type="number"
                  name="hemoglobin"
                  value={formData.hemoglobin}
                  onChange={handleChange}
                  placeholder="Enter Hemoglobin"
                  className="
                      h-12 w-full rounded-2xl
                      border border-[var(--border)]
                      bg-white px-4
                      text-sm
                      transition-all duration-200
                      focus:border-[var(--primary)]
                      focus:ring-4
                      focus:ring-[rgba(231,111,122,0.15)]
                    "
                />
              </div>

              <div>
                <label>Fundal Height</label>

                <input
                  type="number"
                  name="fundalHeight"
                  value={formData.fundalHeight}
                  onChange={handleChange}
                  placeholder="Enter Fundal Height"
                  className="
                      h-12 w-full rounded-2xl
                      border border-[var(--border)]
                      bg-white px-4
                      text-sm
                      transition-all duration-200
                      focus:border-[var(--primary)]
                      focus:ring-4
                      focus:ring-[rgba(231,111,122,0.15)]
                    "
                />
              </div>

              <div>
                <label>Fetal Heart Rate</label>

                <input
                  type="number"
                  name="fetalHeartRate"
                  value={formData.fetalHeartRate}
                  onChange={handleChange}
                  placeholder="Enter Fetal Heart Rate"
                  className="
                      h-12 w-full rounded-2xl
                      border border-[var(--border)]
                      bg-white px-4
                      text-sm
                      transition-all duration-200
                      focus:border-[var(--primary)]
                      focus:ring-4
                      focus:ring-[rgba(231,111,122,0.15)]
                    "
                />
              </div>
            </div>
          </section>

          {/* OBSERVATIONS */}

          <section className="
            rounded-[32px]
            border border-[rgba(244,162,97,0.12)]
            bg-white/90
            p-7
            shadow-[0_10px_40px_rgba(244,162,97,0.08)]
          ">

            <div className="mb-6 flex items-center gap-3">

              <div className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-[rgba(244,162,97,0.12)]
              ">
                <AlertTriangle
                  size={22}
                  className="text-[var(--secondary)]"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  Symptoms & Observations
                </h2>

                <p className="text-sm text-[var(--muted-foreground)]">
                  Monitor pregnancy complications
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Fetal Movement */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                  Fetal Movement
                </label>

                <select
                  name="fetalMovement"
                  value={formData.fetalMovement}
                  onChange={handleChange}
                  className="
                    h-12 w-full rounded-2xl
                    border border-[var(--border)]
                    bg-white px-4
                    text-sm
                    focus:border-[var(--primary)]
                    focus:ring-4
                    focus:ring-[rgba(231,111,122,0.15)]
                  "
                >
                  <option>Normal</option>
                  <option>Reduced</option>
                  <option>None</option>
                  <option>Not Checked</option>
                </select>
              </div>

              {/* Vomiting */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                  Vomiting
                </label>

                <select
                  name="vomiting"
                  value={formData.vomiting}
                  onChange={handleChange}
                  className="
                    h-12 w-full rounded-2xl
                    border border-[var(--border)]
                    bg-white px-4
                    text-sm
                    focus:border-[var(--primary)]
                    focus:ring-4
                    focus:ring-[rgba(231,111,122,0.15)]
                  "
                >
                  <option>None</option>
                  <option>Mild</option>
                  <option>Severe</option>
                </select>
              </div>

              {/* Albumin */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                  Urine Albumin
                </label>

                <select
                  name="urineAlbumin"
                  value={formData.urineAlbumin}
                  onChange={handleChange}
                  className="
                    h-12 w-full rounded-2xl
                    border border-[var(--border)]
                    bg-white px-4
                    text-sm
                    focus:border-[var(--primary)]
                    focus:ring-4
                    focus:ring-[rgba(231,111,122,0.15)]
                  "
                >
                  <option>Negative</option>
                  <option>Trace</option>
                  <option>Positive</option>
                  <option>Not Checked</option>
                </select>
              </div>

            </div>

            {/* TOGGLES */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="swellingFeet"
                  checked={formData.swellingFeet}
                  onChange={handleCheckbox}
                  className="
                    flex items-center justify-between
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--muted)]
                    px-5 py-4
                  "
                />
                SwellingFeet
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="swellingFace"
                  checked={formData.swellingFace}
                  onChange={handleCheckbox}
                  className="
                    flex items-center justify-between
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--muted)]
                    px-5 py-4
                  "
                />
                SwellingFace
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="bleeding"
                  checked={formData.bleeding}
                  onChange={handleCheckbox}
                  className="
                    flex items-center justify-between
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--muted)]
                    px-5 py-4
                  "
                />
                Bleeding
              </label>
            </div>

          </section>

          {/* NOTES */}

          <section className="
            rounded-[32px]
            border border-[rgba(231,111,122,0.12)]
            bg-white/90
            p-7
          ">

            <h2 className="mb-5 text-2xl font-bold text-[var(--foreground)]">
              Additional Notes
            </h2>

            <textarea
              rows={5}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add doctor notes, symptoms, concerns..."
              className="
                w-full rounded-3xl
                border border-[var(--border)]
                bg-white p-5
                text-sm
                focus:border-[var(--primary)]
                focus:ring-4
                focus:ring-[rgba(231,111,122,0.15)]
              "
            />
          </section>
        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-6">

          {/* LAB REPORT */}

          <section className="
            rounded-[32px]
            border border-[rgba(231,111,122,0.12)]
            bg-white/90
            p-7
          ">

            <h2 className="mb-5 text-2xl font-bold text-[var(--foreground)]">
              Upload Reports
            </h2>

            <label
              className="
                flex cursor-pointer flex-col items-center justify-center
                rounded-3xl
                border-2 border-dashed border-[rgba(231,111,122,0.18)]
                bg-[var(--muted)]
                p-10
                transition-all duration-300
                hover:border-[var(--primary)]
                hover:bg-[rgba(231,111,122,0.05)]
              "
            >
              <Upload
                size={36}
                className="mb-4 text-[var(--primary)]"
              />

              <h3 className="font-semibold text-[var(--foreground)]">
                Upload Lab Report
              </h3>

              {file && (
                <p className="mt-3 text-sm text-green-600 font-medium">
                  Selected: {file.name}
                </p>
              )}

              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </section>

          {/* AI RISK */}

          <section className="
            rounded-[32px]
            border border-red-100
            bg-gradient-to-br
            from-red-50
            to-orange-50
            p-7
            shadow-[0_10px_30px_rgba(239,68,68,0.08)]
          ">

            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)]">
              AI Risk Prediction
            </h2>

            <div className="
              rounded-2xl
              bg-white/80
              p-5
            ">

              <div className="mb-3 flex items-center justify-between">

                <p className="font-medium text-[var(--foreground)]">
                  Current Risk
                </p>

                <span className="
                  rounded-full
                  bg-red-100
                  px-4 py-1
                  text-sm font-semibold
                  text-red-500
                ">
                  High
                </span>
              </div>

              <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                Elevated blood pressure and reduced fetal movement detected.
                Immediate doctor consultation recommended.
              </p>
            </div>
          </section>

          {/* SUBMIT */}

          <button
            type="submit"
            onClick={handleSubmit}
            className="
              h-14 w-full rounded-2xl
              bg-gradient-to-r
              from-[var(--primary)]
              to-[var(--secondary)]
              text-base font-semibold text-white
              shadow-[0_15px_40px_rgba(231,111,122,0.25)]
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_50px_rgba(231,111,122,0.35)]
            "
          >
            {uploading
              ? "Uploading Report..."
              : "Save Visit Record"}
          </button>
        </div>
      </form>
    </main>
  );
}