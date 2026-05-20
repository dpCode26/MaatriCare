//Log visit form
"use client";

import {
  CalendarDays,
  Upload,
  HeartPulse,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function LogVisitPage() {
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

              {[
                "Weight (kg)",
                "BP Systolic",
                "BP Diastolic",
                "Hemoglobin",
                "Fundal Height",
                "Fetal Heart Rate",
              ].map((item) => (
                <div key={item}>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    {item}
                  </label>

                  <input
                    type="number"
                    placeholder={`Enter ${item}`}
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
              ))}

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

              {[
                "Swelling Feet",
                "Swelling Face",
                "Bleeding",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center justify-between
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--muted)]
                    px-5 py-4
                  "
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {item}
                  </span>

                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[var(--primary)]"
                  />
                </div>
              ))}

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

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                PDF, JPG or PNG
              </p>

              <input type="file" hidden />
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
            Save Visit Record
          </button>
        </div>
      </form>
    </main>
  );
}