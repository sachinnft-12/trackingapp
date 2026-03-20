import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { TrackingCodeFormData, TrackingCodeFormFields } from './TrackingCodeFormFields';

export default function TrackingCodesCreate() {
  const { data, setData, post, processing, errors } = useForm<TrackingCodeFormData>({
    name: '',
    script: '',
    is_active: true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route('settings.tracking-codes.store'));
  }

  return (
    <Layout title="Add Tracking Code" back={route('settings.tracking-codes.index')}>
      <Head title="Add Tracking Code" />
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <TrackingCodeFormFields data={data} errors={errors} setData={setData} />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={processing}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Saving...' : 'Save Tracking Code'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
