import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Toaster } from 'sonner';
import {
  LayoutDashboard,
  Code2,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Eye,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',      href: '/dashboard',                  icon: LayoutDashboard, match: 'dashboard' },
  { label: 'Tracking Codes', href: '/settings/tracking-codes',    icon: Code2,           match: 'settings.tracking-codes' },
  { label: 'Customer Page',  href: '/customer/preview',           icon: Eye,             match: 'customer' },
  { label: 'Profile',        href: '/profile',                    icon: UserCircle,       match: 'profile' },
];

function NavItem({
  href, icon: Icon, label, active, onClick,
}: {
  href: string; icon: React.ElementType; label: string; active: boolean; onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? 'bg-primary text-white shadow-sm'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      <Icon className={`size-4 shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
      <span className="flex-1">{label}</span>
      {active && <ChevronRight className="size-3 text-white/60" />}
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { auth } = usePage<PageProps>().props;

  function isActive(match: string) {
    try { return route().current(`${match}*`) ?? false; } catch { return false; }
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-100 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm">
          <Code2 className="size-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">TrackingApp</p>
          <p className="text-[10px] text-gray-400">Analytics Manager</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={isActive(item.match)}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* User footer */}
      <div className="shrink-0 border-t border-gray-100 p-3">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {auth.user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-gray-900">{auth.user.name}</p>
            <p className="truncate text-[11px] text-gray-400">{auth.user.email}</p>
          </div>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
            title="Log out"
          >
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthenticatedLayout({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-gray-100 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-100 shadow-xl transition-transform duration-200 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-100 bg-white px-4 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex-1">{header}</div>

          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X className="size-5" />
            </button>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
