import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#f6faf7]">

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-7">

          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            AI-Powered Maternal Healthcare Platform
          </div>

          <div className="space-y-6">

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#111827]">
              Smarter Healthcare For
              <span className="text-[#1f3c88]"><br/ >Every Mother</span>
            </h1>

            <p className="text-lg text-gray-600 leading-8 max-w-xl">
              MaatriCare helps ASHA workers, doctors, and patients
              collaborate through AI-driven maternal healthcare monitoring,
              risk analysis, and real-time care management.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/login"
              className="h-14 px-8 rounded-2xl bg-[#1f3c88] hover:bg-[#183170] text-white font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-200"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="h-14 px-8 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold flex items-center justify-center transition-all duration-200"
            >
              Register
            </Link>

          </div>
        </div>

        <div className="relative">

          <div className="bg-white rounded-[32px] p-10 shadow-xl border border-gray-100">

            <div className="space-y-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Active Monitoring
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    1,248 Patients
                  </h2>
                </div>

                <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                  ❤️
                </div>
              </div>

              <div className="space-y-4">

                <div className="rounded-2xl bg-[#f6faf7] p-5 border border-green-100">
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        High Risk Alerts
                      </p>

                      <h3 className="text-2xl font-bold text-red-500">
                        12 Critical
                      </h3>
                    </div>

                    <div className="text-2xl">
                      🚨
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#f6f8ff] p-5 border border-blue-100">
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        AI Risk Analysis
                      </p>

                      <h3 className="text-2xl font-bold text-[#1f3c88]">
                        Real-Time Monitoring
                      </h3>
                    </div>

                    <div className="text-2xl">
                      📊
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
