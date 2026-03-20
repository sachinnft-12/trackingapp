import { Head } from '@inertiajs/react';
import { CustomerLayout } from './CustomerLayout';
import { Code2, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

type Props = {
  creatorUserId: number;
};

export default function CustomerPreview({ creatorUserId }: Props) {
  return (
    <CustomerLayout creatorUserId={creatorUserId}>
      <Head title="Customer Page Preview" />

      <div className="min-h-screen bg-gray-50">

        {/* Simple top bar */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                <Code2 className="size-4 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900">TrackingApp</span>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-800"
            >
              <ArrowLeft className="size-3.5" />
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-white pb-16 pt-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Customer Page Preview
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              This is a demo customer-facing page
            </h1>
            <p className="mt-4 text-base text-gray-500">
              The cookie consent banner appears at the bottom of this page. Tracking
              scripts are only injected into the page after the visitor clicks{' '}
              <strong>Accept all</strong>.
            </p>
          </div>
        </section>

        {/* How cookie consent works */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-lg font-semibold text-gray-800">
              How cookie consent works on this page
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  color: 'bg-primary/10 text-primary',
                  step: '1',
                  title: 'Banner appears',
                  desc: 'On first visit, the cookie consent banner shows at the bottom of the screen.',
                },
                {
                  icon: CheckCircle2,
                  color: 'bg-green-50 text-green-600',
                  step: '2',
                  title: 'Visitor chooses',
                  desc: '"Accept all" injects tracking scripts immediately. "Reject all" — nothing executes.',
                },
                {
                  icon: Code2,
                  color: 'bg-blue-50 text-blue-600',
                  step: '3',
                  title: 'Saved 30 days',
                  desc: "The visitor's choice is stored in localStorage for 30 days. No repeated prompts.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]"
                >
                  <div className={`mb-3 inline-flex size-9 items-center justify-center rounded-xl ${item.color}`}>
                    <item.icon className="size-5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Step {item.step}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Test instructions box */}
        <section className="pb-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">
                🧪 Testing the cookie banner
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
                <li>• <strong>First visit:</strong> The banner appears at the bottom.</li>
                <li>• <strong>Accept all:</strong> Check browser DevTools → Elements → &lt;head&gt; — tracking script tags appear immediately.</li>
                <li>• <strong>Reject all:</strong> No script tags are added.</li>
                <li>
                  • <strong>Reset banner:</strong> Open DevTools → Application → Local Storage →
                  delete the <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">cookie_consent</code> key → refresh.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Spacer so content doesn't hide behind banner */}
        <div className="h-32" />
      </div>
    </CustomerLayout>
  );
}
