import Link from "next/link";

export default function RegisterButton() {
  return (
    <Link
  href="/asha/patients/new"
  className="
    fixed bottom-10 right-6
    flex h-12 items-center justify-center
    rounded-2xl px-6
    bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
    text-sm font-semibold text-white
    shadow-[0_12px_30px_rgba(231,111,122,0.28)]
    transition-all duration-300
    hover:scale-[1.03]
    hover:shadow-[0_16px_40px_rgba(231,111,122,0.38)]
  "
>
  Register New Patient
</Link>
  );
}