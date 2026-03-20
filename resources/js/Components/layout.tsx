import { PropsWithChildren } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

type Props = PropsWithChildren<{
  title: string;
  back?: string;
}>;

export default function Layout({ title, back, children }: Props) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center gap-2">
          {back && (
            <Link
              href={back}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <ChevronLeft className="size-4" />
            </Link>
          )}
          <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
        </div>
      }
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
