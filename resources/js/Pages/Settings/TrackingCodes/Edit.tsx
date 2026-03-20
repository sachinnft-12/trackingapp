import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
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
            <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={processing}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
