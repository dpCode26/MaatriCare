'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  ShieldCheck,
  HeartPulse,
  UserRound,
  Mail,
  Lock,
  Phone,
  MapPin,
} from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const form = e.currentTarget

    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLSelectElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      district: (form.elements.namedItem('district') as HTMLInputElement).value,
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const err = await res.json()

      setError(err.error || 'Registration failed')
      setLoading(false)

      return
    }

    router.push('/login?registered=true')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff9f7]">

      {/* BACKGROUND */}

      <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#e76f7a]/10 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-100px] h-[300px] w-[300px] rounded-full bg-[#2a9d8f]/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-8">

        <div className="grid w-full items-center gap-10 lg:grid-cols-2">

          {/* LEFT SECTION */}

          <div className="hidden lg:flex flex-col justify-center">

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fde9e4] px-4 py-2 text-sm font-semibold text-[#1f2a44]">

              <ShieldCheck size={15} />

              AI-Powered Maternal Healthcare

            </div>

            <h1 className="mt-6 text-6xl font-black leading-[0.95] tracking-[-0.05em] text-[#16233b]">

              Join
              <br />

              <span className="bg-gradient-to-r from-[#e76f7a] to-[#f4a261] bg-clip-text text-transparent">
                MaatriCare
              </span>

            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-500">

              Helping ASHA workers, doctors, and mothers
              monitor pregnancy health with AI-powered
              maternal healthcare tools.

            </p>

            {/* STATS */}

            <div className="mt-8 flex gap-4">

              <div className="rounded-3xl border border-[#f1d6d1] bg-white px-5 py-4 shadow-sm">

                <h3 className="text-3xl font-black text-[#e76f7a]">
                  1200+
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Mothers monitored
                </p>

              </div>

              <div className="rounded-3xl border border-[#dcefeb] bg-white px-5 py-4 shadow-sm">

                <h3 className="text-3xl font-black text-[#2a9d8f]">
                  24/7
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  AI risk analysis
                </p>

              </div>

            </div>
          </div>

          {/* RIGHT SECTION */}

          <div className="relative">

            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#e76f7a]/10 to-[#f4a261]/10 blur-3xl" />

            <div className="relative rounded-[32px] border border-[#f1d6d1] bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-7">

              {/* HEADER */}

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e76f7a] to-[#f4a261] shadow-lg">

                  <HeartPulse className="text-white" size={24} />

                </div>

                <div>

                  <h2 className="text-2xl font-black text-[#16233b]">
                    Create Account
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Register to continue
                  </p>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-3"
              >

                <div className="relative">

                  <UserRound
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="name"
                    required
                    placeholder="Full Name"
                    className="h-11 w-full rounded-xl border border-[#ecd7d2] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#e76f7a] focus:ring-4 focus:ring-[#e76f7a]/10"
                  />

                </div>

                <div className="relative">

                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="h-11 w-full rounded-xl border border-[#ecd7d2] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#e76f7a] focus:ring-4 focus:ring-[#e76f7a]/10"
                  />

                </div>

                <div className="relative">

                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="password"
                    type="password"
                    minLength={6}
                    required
                    placeholder="Password"
                    className="h-11 w-full rounded-xl border border-[#ecd7d2] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#e76f7a] focus:ring-4 focus:ring-[#e76f7a]/10"
                  />

                </div>

                <select
                  name="role"
                  required
                  className="h-11 w-full rounded-xl border border-[#ecd7d2] bg-white px-4 text-sm outline-none transition-all focus:border-[#e76f7a] focus:ring-4 focus:ring-[#e76f7a]/10"
                >

                  <option value="">
                    Select Role
                  </option>

                  <option value="asha">
                    ASHA Worker
                  </option>

                  <option value="patient">
                    Patient
                  </option>

                  <option value="doctor">
                    Doctor / PHC
                  </option>

                </select>

                <div className="grid grid-cols-2 gap-3">

                  <div className="relative">

                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="phone"
                      placeholder="Phone"
                      className="h-11 w-full rounded-xl border border-[#ecd7d2] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#e76f7a] focus:ring-4 focus:ring-[#e76f7a]/10"
                    />

                  </div>

                  <div className="relative">

                    <MapPin
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="district"
                      placeholder="District"
                      className="h-11 w-full rounded-xl border border-[#ecd7d2] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#e76f7a] focus:ring-4 focus:ring-[#e76f7a]/10"
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-11 w-full rounded-xl bg-gradient-to-r from-[#e76f7a] to-[#f4a261] text-sm font-semibold text-white shadow-lg shadow-[#e76f7a]/20 transition-all hover:scale-[1.01] disabled:opacity-60"
                >

                  {loading
                    ? 'Creating account...'
                    : 'Create Account'}

                </button>

              </form>

              {/* FOOTER */}

              <p className="mt-5 text-center text-sm text-slate-500">

                Already registered?{' '}

                <Link
                  href="/login"
                  className="font-semibold text-[#e76f7a] hover:underline"
                >
                  Login
                </Link>

              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}