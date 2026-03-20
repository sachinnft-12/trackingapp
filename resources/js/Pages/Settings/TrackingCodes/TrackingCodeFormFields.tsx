import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";

export type TrackingCodeFormData = {
  name: string;
  script: string;
  is_active: boolean;
};

type Props = {
  data: TrackingCodeFormData;
  errors: Partial<Record<keyof TrackingCodeFormData, string>>;
  setData: <K extends keyof TrackingCodeFormData>(key: K, value: TrackingCodeFormData[K]) => void;
};

export function TrackingCodeFormFields({ data, errors, setData }: Props) {
  return (
    <div className="space-y-6">

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="e.g. Google Analytics, Meta Pixel"
          className={errors.name ? 'border-destructive' : ''}
          autoFocus
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        <p className="text-sm text-muted-foreground">
          A descriptive label so you can identify this tracking code later.
        </p>
      </div>

      {/* Script */}
      <div className="space-y-2">
        <Label htmlFor="script">Tracking Code Script</Label>
        <Textarea
          id="script"
          value={data.script}
          onChange={(e) => setData('script', e.target.value)}
          rows={8}
          placeholder={
            "// Paste your tracking code here WITHOUT <script> tags\n" +
            "// Example:\n" +
            "window.dataLayer = window.dataLayer || [];\n" +
            "function gtag(){dataLayer.push(arguments);}\n" +
            "gtag('js', new Date());\n" +
            "gtag('config', 'G-XXXXXXXXXX');"
          }
          className={`font-mono text-sm ${errors.script ? 'border-destructive' : ''}`}
        />
        {errors.script && <p className="text-sm text-destructive">{errors.script}</p>}
        <p className="text-sm text-muted-foreground">
          Paste the JavaScript without &lt;script&gt; tags — we wrap it automatically.
        </p>
      </div>

      {/* Active toggle */}
      <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-4">
        <div className="space-y-0.5">
          <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
          <p className="text-sm text-muted-foreground">
            When disabled, this script will not execute on customer pages.
          </p>
        </div>
        <Switch
          id="is_active"
          checked={data.is_active}
          onCheckedChange={(checked) => setData('is_active', checked)}
        />
      </div>

    </div>
  );
}
