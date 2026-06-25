// app/(dashboard)/asha/patients/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  User2,
  HeartPulse,
  CalendarDays,
  ShieldAlert,
  Phone,
  MapPin,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const patientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  age: z.coerce.number().min(15).max(50),
  aadhaarLast4: z.string().max(4).optional(),
  bloodGroup: z.string(),
  lmp: z.string(),
  gravida: z.coerce.number(),
  parity: z.coerce.number(),
  abortions: z.coerce.number(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  village: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export default function NewPatientPage() {
  const {
  register,
  handleSubmit,
} = useForm({
  resolver: zodResolver(patientSchema),
});

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: PatientFormValues) => {
    try {
      setLoading(true);

      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Patient registered successfully");

      console.log(data);

      // OPTIONAL:
      // redirect after success
      // router.push("/asha/patients");

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-[28px] border border-[#f1d6d1] bg-gradient-to-br from-[#e76f7a] via-[#ec8a93] to-[#f4a261] p-6 md:p-8 shadow-sm">

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-black/5 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between">

          <div>
            <p className="text-sm font-medium text-white/80">
              Maternal Care Registration
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Register New Patient
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Add maternal health details, pregnancy information,
              emergency contacts, and village-level records for
              continuous monitoring and safer care.
            </p>
          </div>

          <div className="hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur md:flex">
            <HeartPulse className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        {/* IDENTITY */}
        <section className="rounded-[28px] border border-[#f1d6d1] bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6 flex items-center gap-4">

            <div className="rounded-2xl bg-[#fff1ee] p-3 text-[#e76f7a]">
              <User2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1f2937]">
                Identity Details
              </h2>

              <p className="text-sm text-gray-500">
                Basic patient identification information
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Patient Name
              </label>

              <Input
                placeholder="Enter patient name"
                {...register("name")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Phone Number
              </label>

              <Input
                placeholder="Enter phone number"
                {...register("phone")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Age
              </label>

              <Input
                type="number"
                {...register("age")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Blood Group
              </label>

              <select
                {...register("bloodGroup")}
                className="h-12 w-full rounded-2xl border border-[#ead7d2] bg-white px-4 text-sm outline-none"
              >
                <option value="">Select</option>

                {[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Aadhaar Last 4 Digits
              </label>

              <Input
                maxLength={4}
                {...register("aadhaarLast4")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

          </div>

        </section>

        {/* PREGNANCY */}
        <section className="rounded-[28px] border border-[#f1d6d1] bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6 flex items-center gap-4">

            <div className="rounded-2xl bg-[#fff5eb] p-3 text-[#f4a261]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1f2937]">
                Pregnancy Details
              </h2>

              <p className="text-sm text-gray-500">
                Pregnancy cycle and history
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-4">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                LMP Date
              </label>

              <Input
                type="date"
                {...register("lmp")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Gravida
              </label>

              <Input
                type="number"
                {...register("gravida")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Parity
              </label>

              <Input
                type="number"
                {...register("parity")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Abortions
              </label>

              <Input
                type="number"
                {...register("abortions")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="rounded-[28px] border border-[#f1d6d1] bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6 flex items-center gap-4">

            <div className="rounded-2xl bg-[#eefaf8] p-3 text-[#2a9d8f]">
              <Phone className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1f2937]">
                Emergency Contact
              </h2>

              <p className="text-sm text-gray-500">
                Family support information
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Contact Name
              </label>

              <Input
                placeholder=""
                {...register("emergencyContact")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#1f2937]">
                Emergency Phone
              </label>

              <Input
                placeholder=""
                {...register("emergencyPhone")}
                className="h-12 rounded-2xl border-[#ead7d2]"
              />
            </div>
          </div>
        </section>

        {/* ADDRESS */}
        <section className="rounded-[28px] border border-[#f1d6d1] bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6 flex items-center gap-4">

            <div className="rounded-2xl bg-[#fff1ee] p-3 text-[#e76f7a]">
              <MapPin className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1f2937]">
                Address Details
              </h2>

              <p className="text-sm text-gray-500">
                Village and district information
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <Input
              placeholder="Village"
              {...register("village")}
              className="h-12 rounded-2xl border-[#ead7d2]"
            />

            <Input
              placeholder="District"
              {...register("district")}
              className="h-12 rounded-2xl border-[#ead7d2]"
            />
          </div>

          <Input
            placeholder="Full Address"
            {...register("address")}
            className="mt-5 h-12 rounded-2xl border-[#ead7d2]"
          />
        </section>

        {/* RISK STATUS */}
        <section className="rounded-[28px] border border-[#f1d6d1] bg-white p-5 shadow-sm md:p-7">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-red-50 p-3 text-red-500">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1f2937]">
                Risk Monitoring
              </h2>

              <p className="text-sm text-gray-500">
                AI-assisted maternal risk tracking
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <select className="h-12 rounded-2xl border border-[#ead7d2] bg-white px-4 text-sm outline-none">
              <option>Low Risk</option>
              <option>Medium Risk</option>
              <option>High Risk</option>
              <option>Critical Risk</option>
            </select>

            <select className="h-12 rounded-2xl border border-[#ead7d2] bg-white px-4 text-sm outline-none">
              <option>Ongoing</option>
              <option>Delivered</option>
              <option>Loss</option>
              <option>Referred</option>
            </select>
          </div>
        </section>

        <Button
          type="submit" disabled={loading}
          className="h-14 w-full rounded-2xl bg-[#e76f7a] text-base font-semibold text-white hover:bg-[#de5f6c]"
        >
          {loading ? "Registering..." : "Register Patient"}
        </Button>
      </form>
    </div>
  );
}