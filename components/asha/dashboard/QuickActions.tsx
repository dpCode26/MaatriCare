import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        Quick Actions
      </h2>

      <div className="mt-4 grid gap-3">

        <Link
          href="/asha/patients/new"
          className="rounded-2xl bg-[#2a9d8f] text-white p-4 text-center"
        >
          Register Patient
        </Link>

        <Link
          href="/asha/visits/new"
          className="rounded-2xl bg-[#e76f7a] text-white p-4 text-center"
        >
          Log Visit
        </Link>

        <Link
          href="/asha/patients"
          className="rounded-2xl bg-[#264653] text-white p-4 text-center"
        >
          View Patients
        </Link>

      </div>
    </div>
  );
}