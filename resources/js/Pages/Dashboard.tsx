import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Code2, Activity, XCircle, Plus, PencilIcon,
  ArrowRight, Eye, CheckCircle2, ShieldCheck,
} from 'lucide-react';

type TrackingCode = {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
};

type Props = PageProps & {
  stats?: { total: number; active: number; inactive: number };
  recentCodes?: TrackingCode[];
};

function StatCard({ label, value, icon: Icon, bgColor, textColor, sub }: {
  label: string; value: number; icon: React.ElementType;
  bgColor: string; textColor: string; sub: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${bgColor}`}>
          <Icon className={`size-5 ${textColor}`} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ stats, recentCodes }: Props) {
  const { auth } = usePage<Props>().props;
  const safeStats  = stats      ?? { total: 0, active: 0, inactive: 0 };
  const safeCodes  = recentCodes ?? [];
  const hour       = new Date().getHours();
  const greeting   = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <AuthenticatedLayout header={<h1 className="text-sm font-semibold text-gray-800">Dashboard</h1>}>
      <Head title="Dashboard" />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-md">
            <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-6 right-20 size-28 rounded-full bg-white/5" />
            <p className="text-sm text-white/70">{greeting},</p>
            <h2 className="mt-0.5 text-xl font-bold">{auth.user.name} 👋</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Manage your tracking codes from one place. Scripts only execute after visitor cookie consent.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/settings/tracking-codes/create"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-opacity hover:opacity-90"
              >
                <Plus className="size-4" /> Add Tracking Code
              </Link>
              <Link
                href="/customer/preview"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
              >
                <Eye className="size-4" /> View Customer Page
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total Codes" value={safeStats.total}    icon={Code2}    bgColor="bg-primary/10" textColor="text-primary"    sub="All tracking scripts" />
            <StatCard label="Active"       value={safeStats.active}   icon={Activity} bgColor="bg-green-50"   textColor="text-green-600" sub="Currently executing" />
            <StatCard label="Inactive"     value={safeStats.inactive} icon={XCircle}  bgColor="bg-red-50"     textColor="text-red-500"   sub="Currently paused" />
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Recent codes */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Tracking Codes</h3>
                <Link href="/settings/tracking-codes" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  View all <ArrowRight className="size-3" />
                </Link>
              </div>
              {safeCodes.length === 0 ? (
                <div className="py-8 text-center">
                  <Code2 className="mx-auto size-8 text-gray-200" />
                  <p className="mt-2 text-sm text-gray-400">No tracking codes yet</p>
                  <Link href="/settings/tracking-codes/create" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    <Plus className="size-3" /> Add your first code
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {safeCodes.map((tc) => (
                    <div key={tc.id} className="flex items-center justify-between rounded-lg bg-gray-50/50 px-3 py-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className={`size-2 shrink-0 rounded-full ${tc.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="truncate text-sm font-medium text-gray-800">{tc.name}</span>
                      </div>
                      <div className="ml-2 flex shrink-0 items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tc.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {tc.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <Link href={`/settings/tracking-codes/${tc.id}/edit`} className="text-gray-400 hover:text-primary">
                          <PencilIcon className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* How it works */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
              <h3 className="mb-4 text-sm font-semibold text-gray-800">How It Works</h3>
              <div className="space-y-4">
                {[
                  { icon: Plus,         color: 'bg-primary/10 text-primary', title: 'Add tracking scripts',  desc: 'Paste any third-party code (GA4, Meta Pixel, etc.) without script tags.' },
                  { icon: ShieldCheck,  color: 'bg-green-50 text-green-600', title: 'Cookie consent gate',   desc: 'A banner appears on customer pages. Scripts only run after acceptance.' },
                  { icon: CheckCircle2, color: 'bg-blue-50 text-blue-600',   title: '30-day consent memory', desc: "Visitor choices are saved for 30 days — no repeated prompts." },
                ].map((step) => (
                  <div key={step.title} className="flex gap-3">
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${step.color}`}>
                      <step.icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{step.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
