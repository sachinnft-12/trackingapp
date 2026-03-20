import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { PageProps } from '@/types';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';

type TrackingCode = {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
};

type Props = { trackingCodes: TrackingCode[] };

export default function TrackingCodesIndex({ trackingCodes }: Props) {
  const { flash } = usePage<PageProps>().props;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error)   toast.error(flash.error, { duration: 10000 });
  }, [flash]);

  function openDelete(id: number)  { setToDelete(id); setDeleteOpen(true); }
  function closeDelete()            { setToDelete(null); setDeleteOpen(false); }

  function handleDelete(id: number) {
    router.delete(route('settings.tracking-codes.destroy', id), {
      onSuccess: closeDelete,
      onError: () => toast.error('Failed to delete tracking code.'),
    });
  }

  return (
    <Layout title="Tracking Codes" back="/dashboard">
      <Head title="Tracking Codes" />

      <div className="flex justify-end">
        <Button asChild className="gap-2">
          <Link href={route('settings.tracking-codes.create')}>
            <PlusIcon className="size-3.5" />
            Add Tracking Code
          </Link>
        </Button>
      </div>

      <div className="h-6" />

      {trackingCodes.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-sm font-semibold text-gray-700">No tracking codes yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first tracking code to start collecting analytics.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 empty:hidden">
        {trackingCodes.map((tc) => (
          <div
            key={tc.id}
            className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-6 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.05),0px_1px_2px_0px_hsla(0,0%,0%,0.06)]"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-base font-semibold text-gray-900">{tc.name}</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tc.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {tc.is_active ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-muted-foreground">Added {tc.created_at}</span>
              </div>
            </div>

            <div className="ml-4 flex shrink-0 items-center gap-1">
              <Link
                href={route('settings.tracking-codes.edit', tc.id)}
                className="inline-flex items-center p-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <PencilIcon className="size-4" />
              </Link>
              <button
                type="button"
                onClick={() => openDelete(tc.id)}
                className="inline-flex items-center p-2 text-muted-foreground transition-colors hover:text-destructive"
              >
                <TrashIcon className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="sm:text-center">Delete Tracking Code</DialogTitle>
              <DialogDescription className="sm:text-center">
                Are you sure? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" size="sm" onClick={closeDelete}>Cancel</Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => toDelete && handleDelete(toDelete)}
              >
                Yes, delete
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
