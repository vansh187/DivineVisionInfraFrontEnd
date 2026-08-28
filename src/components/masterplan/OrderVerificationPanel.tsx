'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { resendVerificationEmail } from '@/lib/api/resendVerificationEmail';
import { useMasterplanStore } from '@/lib/store/masterplanStore';
import type { Township } from '@/lib/masterplan/types';

interface OrderVerificationPanelProps {
  township: Township;
}

type Feedback = { tone: 'success' | 'error'; message: string } | null;

function getStoredUserId() {
  const rawUserId = window.localStorage.getItem('vstitch_user_id');
  const userId = Number(rawUserId);
  return Number.isInteger(userId) && userId > 0 ? userId : null;
}

function hasVerifiedEmail() {
  const verificationKeys = [
    'email_verified',
    'is_email_verified',
    'isVerified',
    'vstitch_email_verified',
  ];

  return verificationKeys.some((key) => {
    const value = window.localStorage.getItem(key);
    return value === 'true' || value === '1' || value === 'yes';
  });
}

export function OrderVerificationPanel({ township }: OrderVerificationPanelProps) {
  const router = useRouter();
  const selectedPlotId = useMasterplanStore((s) => s.selectedPlotId);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isResending, setIsResending] = useState(false);
  const [isBlockedForVerification, setIsBlockedForVerification] = useState(false);

  const selectedPlot = useMemo(
    () => township.plots.find((plot) => plot.id === selectedPlotId),
    [selectedPlotId, township.plots],
  );

  if (!selectedPlot) return null;

  const unavailable = selectedPlot.status !== 'available';

  const handleOrderClick = async () => {
    setFeedback(null);

    if (unavailable) {
      setFeedback({ tone: 'error', message: 'This plot is not available for ordering.' });
      return;
    }

    if (hasVerifiedEmail()) {
      setFeedback({
        tone: 'success',
        message: 'Email verified. You can continue with ordering.',
      });
      return;
    }

    setIsBlockedForVerification(true);
    await handleResendClick();
  };

  const handleResendClick = async () => {
    const userId = getStoredUserId();

    if (!userId) {
      setFeedback({
        tone: 'error',
        message: 'Please sign up or log in before ordering this plot.',
      });
      return;
    }

    setIsResending(true);
    const result = await resendVerificationEmail(userId);
    setIsResending(false);

    if (result.ok) {
      setFeedback({ tone: 'success', message: result.message });
      return;
    }

    setFeedback({ tone: result.redirectToLogin ? 'success' : 'error', message: result.message });

    if (result.redirectToLogin) {
      window.setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <aside className="absolute right-6 top-28 z-10 w-[min(22rem,calc(100vw-3rem))] rounded-lg border border-hairline bg-surface/95 p-4 shadow-[0_18px_40px_rgba(19,21,17,0.18)] backdrop-blur-xl sm:right-10">
      <div className="eyebrow-label text-terracotta">{township.name}</div>
      <h2 className="font-display mt-2 text-xl font-bold text-ink">{selectedPlot.plotNumber}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-ink">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-ink-muted">Size</div>
          <div>{selectedPlot.sizeSqYd} sq yd</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-ink-muted">Facing</div>
          <div className="capitalize">{selectedPlot.facing.replace('-', ' ')}</div>
        </div>
      </div>

      {isBlockedForVerification && (
        <p className="mt-4 text-sm text-ink-muted">
          Please verify your email before ordering. We sent a verification link to your inbox.
        </p>
      )}

      {feedback && (
        <p className={`mt-4 text-sm ${feedback.tone === 'success' ? 'text-green' : 'text-terracotta'}`}>
          {feedback.message}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isResending || unavailable}
          onClick={handleOrderClick}
          className="eyebrow-label rounded-md bg-green px-4 py-2.5 text-xs text-white transition-colors hover:bg-chrome disabled:cursor-not-allowed disabled:bg-ink-muted/35"
        >
          Order plot
        </button>
        {isBlockedForVerification && (
          <button
            type="button"
            disabled={isResending}
            onClick={handleResendClick}
            className="eyebrow-label rounded-md border border-green/60 px-4 py-2.5 text-xs text-green transition-colors hover:bg-green hover:text-white disabled:cursor-wait disabled:border-ink-muted/30 disabled:text-ink-muted"
          >
            {isResending ? 'Sending...' : 'Resend link'}
          </button>
        )}
      </div>
    </aside>
  );
}
