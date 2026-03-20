import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'cookie_consent';
const TTL_DAYS = 30;
export type ConsentValue = 'accepted' | 'rejected';

export function readConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: { value: ConsentValue; expiresAt: number } = JSON.parse(raw);
    if (Date.now() > parsed.expiresAt) { localStorage.removeItem(STORAGE_KEY); return null; }
    return parsed.value;
  } catch { return null; }
}

function writeConsent(value: ConsentValue) {
  const expiresAt = Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, expiresAt }));
}

type Props = { onAccept?: () => void; onReject?: () => void };

export function CookieBanner({ onAccept, onReject }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => { if (readConsent() === null) setVisible(true); }, []);

  if (!visible) return null;

  function handleAccept() { writeConsent('accepted'); setVisible(false); onAccept?.(); }
  function handleReject()  { writeConsent('rejected'); setVisible(false); onReject?.(); }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-5 shadow-[0px_8px_32px_0px_hsla(0,0%,0%,0.12)] sm:flex sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-gray-600">
          We use cookies and tracking technologies to improve your experience.
          You can accept or reject non-essential tracking below.
        </p>
        <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
          <Button variant="outline" size="sm" onClick={handleReject}>Reject all</Button>
          <Button size="sm" onClick={handleAccept}>Accept all</Button>
        </div>
      </div>
    </div>
  );
}
