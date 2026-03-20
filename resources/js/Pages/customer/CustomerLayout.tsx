import { PropsWithChildren } from 'react';
import { CookieBanner } from './CookieBanner';
import { useTrackingCodes } from './useTrackingCodes';

type Props = PropsWithChildren<{
  creatorUserId: number;
}>;

/**
 * Wrap all /customer/* routes with this layout.
 * Handles cookie consent banner + tracking script injection.
 */
export function CustomerLayout({ children, creatorUserId }: Props) {
  const { runTrackingCodes } = useTrackingCodes(creatorUserId);

  return (
    <>
      {children}
      <CookieBanner onAccept={runTrackingCodes} />
    </>
  );
}
