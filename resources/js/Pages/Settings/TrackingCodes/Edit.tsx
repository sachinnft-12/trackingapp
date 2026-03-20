import Layout from '@/Components/layout';
import { Head, useForm } from '@inertiajs/react';
import { TrackingCodeFormData, TrackingCodeFormFields } from './TrackingCodeFormFields';

type Props = {
  trackingCode: TrackingCodeFormData & { id: number };
};

export default function TrackingCodesEdit({ trackingCode }: Props) {
  const { data, setData, put, processing, errors } = useForm<TrackingCodeFormData>({
    name: trackingCode.name,
    script: trackingCode.script,
    is_active: trackingCode.is_active,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('settings.tracking-codes.update', trackingCode.id));
  }

  return (
    <Layout title="Edit Tracking Code" back={route('settings.tracking-codes.index')}>
      <Head title="Edit Tracking Code" />
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <TrackingCodeFormFields data={data} errors={errors} setData={setData} />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              disabled={processing}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {processing ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
