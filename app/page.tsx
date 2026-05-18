import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-3 lg:px-16">

      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-primary/15 blur-3xl" />

      <div className="absolute bottom-[-140px] right-[-120px] h-[340px] w-[340px] rounded-full bg-accent/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center">

        <div className="grid w-full items-center gap-30 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <div className="space-y-3 text-center lg:text-left">

            <div className="inline-flex items-center rounded-full border border-primary/30 bg-secondary/30 px-4 py-1 text-sm font-semibold text-brown">
              AI-Powered Maternal Healthcare Platform
            </div>

            <div className="space-y-7">

              <h1 className="text-2xl font-black leading-[1.06] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

                Smarter Care
                <br />

                For Every
                <span className="block text-primary">
                  Mother
                </span>
              </h1>

              <p className="max-w-xl text-md leading-6 text-muted-foreground">
                MaatriCare empowers ASHA workers, doctors, and pregnant women
                with AI-driven maternal risk analysis, real-time health
                tracking, and multilingual care support across rural India.
              </p>
            </div>

            <div className="flex flex-col gap-4 py-5 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                href="/register"
                className="flex h-12 items-center justify-center rounded-2xl bg-primary px-6 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="flex h-12 items-center justify-center rounded-2xl border border-border bg-white/80 px-6 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white"
              >
                Login
              </Link>
            </div>

            {/* <div className="flex flex-wrap justify-center gap-8 pt-4 lg:justify-start">

              <div>
                <h3 className="text-3xl font-black text-primary">1200+</h3>
                <p className="text-sm text-muted-foreground">
                  Mothers Monitored
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-accent">85%</h3>
                <p className="text-sm text-muted-foreground">
                  Faster Risk Detection
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-secondary">24/7</h3>
                <p className="text-sm text-muted-foreground">
                  AI Health Tracking
                </p>
              </div>

            </div> */}
          </div>

          {/* RIGHT SIDE */}

          <div className="relative">

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/60 bg-white/80 p-5 shadow-[0_20px_80px_rgba(231,111,122,0.15)] backdrop-blur-xl">

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Monitoring
                    </p>

                    <h2 className="mt-2 text-4xl font-black text-foreground">
                      1,247
                    </h2>
                  </div>

                  <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-primary/10 text-3xl">
                    🤱
                  </div>
                </div>

                {/* ALERT CARD */}

                <div className="rounded-4xl border border-red-100 bg-red-50 p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-red-400">
                        High Risk Alerts
                      </p>

                      <h3 className="mt-2 text-2xl font-black text-red-500">
                        12 Critical
                      </h3>
                    </div>

                    <div className="text-3xl">
                      🚨
                    </div>
                  </div>
                </div>

                {/* AI CARD */}

                <div className="rounded-3xl border border-accent/10 bg-accent/5 p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-accent">
                        Gemini AI Analysis
                      </p>

                      <h3 className="mt-2 text-2xl font-black text-foreground">
                        24/7 &nbsp; Risk Prediction
                      </h3>
                    </div>

                    <div className="text-3xl">
                      📊
                    </div>
                  </div>
                </div>

                {/* HINDI SUPPORT */}

                <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-orange-500">
                        Multilingual Support
                      </p>

                      <h3 className="mt-2 text-2xl font-black text-foreground">
                        हिंदी Enabled
                      </h3>
                    </div>

                    <div className="text-3xl">
                      🌏
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