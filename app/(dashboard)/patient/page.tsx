"use client";

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
    label: "मतली",
    emoji: "🤢",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "सिरदर्द",
    emoji: "🤕",
    color: "bg-violet-100 text-violet-700",
  },
  {
    label: "कमजोरी",
    emoji: "😔",
    color: "bg-amber-100 text-amber-700",
  },
  {
    label: "पेट दर्द",
    emoji: "🤰",
    color: "bg-rose-100 text-rose-700",
  },
];

export default function PatientDashboardPage() {
  return (
    <div className="bg-[#f6faf7] p-3 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* WELCOME SECTION */}
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-gradient-to-r from-[var(--primary)] via-[#ee7f88] to-[var(--secondary)] p-5 text-[var(--primary-foreground)] shadow-xl">
          
          <div className="flex items-start justify-between">
            
            <div>
              <p className="text-sm text-emerald-50">
                नमस्ते 👋
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                स्वागत है, सुमन जी
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
                    सामान्य जोखिम
                  </h3>
                </div>

                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                  Normal
                </div>
              </div>
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
                    25 अक्टूबर, सुबह 10 बजे
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
                key={symptom.label}
                className={`rounded-full px-4 py-3 text-sm font-semibold transition-all hover:scale-105 ${symptom.color}`}
              >
                {symptom.label} {symptom.emoji}
              </button>
            ))}
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
                  सिरदर्द के लिए आराम करें और पर्याप्त पानी पिएं।
                  यदि दर्द लगातार बना रहे तो डॉक्टर से संपर्क करें।
                </p>
              </div>

              <button className="rounded-full bg-[#f4a261]/90 p-2 text-white hover:bg-emerald-700">
                <ChevronRight className="h-4 w-4" />
              </button>
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
                  120
                </h3>

                <p className="mt-1 text-xs text-emerald-600">
                  सामान्य
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  वजन
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  62
                </h3>

                <p className="mt-1 text-xs text-emerald-600">
                  स्थिर
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">
                  हीमोग्लोबिन
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  11.2
                </h3>

                <p className="mt-1 text-xs text-amber-600">
                  ध्यान दें
                </p>
              </div>
            </div>

            <button className="mt-5 w-full rounded-2xl border border-[#f4a261]/20 bg-[#f4a261]/10 py-3 font-semibold text-[#e76f7a] transition-all hover:bg-emerald-100">
              View Full Records
            </button>
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
                    ASHA Worker / Doctor Helpline
                  </p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-2xl bg-red-600 py-4 text-lg font-bold text-white transition-all hover:bg-red-700">
                Call Now
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm leading-relaxed text-slate-600">
                यदि तेज दर्द, अत्यधिक रक्तस्राव, या बच्चे की हलचल कम लगे,
                तो तुरंत सहायता लें।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}