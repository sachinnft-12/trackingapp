import { Head, Link } from '@inertiajs/react';
import { Code2, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

export default function Welcome() {
  return (
    <>
      <Head title="Welcome — TrackingApp" />

      <div className="flex min-h-screen flex-col bg-white">

        {/* Nav */}
        <header className="border-b border-gray-100">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-[hsl(232,99%,59%)]">
                <Code2 className="size-4 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900">TrackingApp</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[hsl(232,99%,59%)] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <span className="mb-4 inline-block rounded-full bg-[hsl(232,99%,59%)]/10 px-3 py-1 text-xs font-semibold text-[hsl(232,99%,59%)]">
            Assessment Demo
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Manage your tracking codes
            <br />
            <span className="text-[hsl(232,99%,59%)]">with consent built in.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-gray-500">
            Add Google Analytics, Meta Pixel, or any tracking script. A cookie consent
            banner automatically gates execution — fully GDPR-friendly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-[hsl(232,99%,59%)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Log in to demo <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/customer/preview"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              View customer page
            </Link>
          </div>

          {/* Demo credentials box */}
          <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-8 py-5 text-sm">
            <p className="font-semibold text-gray-700">Demo admin credentials</p>
            <div className="mt-2 space-y-1 text-gray-500">
              <p>Email: <span className="font-mono font-medium text-gray-800">admin@demo.com</span></p>
              <p>Password: <span className="font-mono font-medium text-gray-800">password</span></p>
            </div>
          </div>
        </main>

        {/* Features */}
        <section className="border-t border-gray-100 bg-gray-50 py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Code2,
                  color: 'bg-[hsl(232,99%,59%)]/10 text-[hsl(232,99%,59%)]',
                  title: 'Tracking Codes CRUD',
                  desc: 'Add, edit and delete tracking scripts from a clean settings page. Paste any JS without script tags.',
                },
                {
                  icon: ShieldCheck,
                  color: 'bg-green-50 text-green-600',
                  title: 'Cookie Consent Banner',
                  desc: 'Automatically shown on all customer-facing pages. Accept fires scripts. Reject keeps them silent.',
                },
                {
                  icon: Activity,
                  color: 'bg-blue-50 text-blue-600',
                  title: '30-Day Consent Memory',
                  desc: "Visitor choices are stored in localStorage for 30 days. No annoying repeated prompts.",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
                  <div className={`mb-3 inline-flex size-9 items-center justify-center rounded-xl ${f.color}`}>
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
          TrackingApp — Assessment Demo by Netfrux Technologies
        </footer>
      </div>
    </>
  );
}
