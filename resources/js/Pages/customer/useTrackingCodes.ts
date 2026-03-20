import { useEffect, useCallback } from 'react';
import { readConsent } from './CookieBanner';

const INJECTED_ATTR = 'data-tracking-id';

function injectScript(id: number, script: string) {
  if (document.querySelector(`[${INJECTED_ATTR}="${id}"]`)) return;
  const tag = document.createElement('script');
  tag.setAttribute(INJECTED_ATTR, String(id));
  tag.textContent = script;
  document.head.appendChild(tag);
}

export function useTrackingCodes(creatorUserId: number | null | undefined) {
  const runTrackingCodes = useCallback(async () => {
    if (!creatorUserId) return;
    // Read fresh every call — avoids stale-closure bug
    if (readConsent() !== 'accepted') return;
    try {
      const res = await fetch(`/customer/tracking-codes/${creatorUserId}`);
      if (!res.ok) return;
      const codes: { id: number; script: string }[] = await res.json();
      codes.forEach(({ id, script }) => injectScript(id, script));
    } catch { /* never break the page */ }
  }, [creatorUserId]);

  useEffect(() => { runTrackingCodes(); }, [runTrackingCodes]);

  return { runTrackingCodes };
}
