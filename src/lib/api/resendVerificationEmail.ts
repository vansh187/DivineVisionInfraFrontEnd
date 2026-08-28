const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://vstichbyanjalinandapythonbackend.onrender.com';

export type ResendVerificationResult =
  | { ok: true; message: string }
  | { ok: false; status: number; message: string; redirectToLogin?: boolean };

export async function resendVerificationEmail(userId: number): Promise<ResendVerificationResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/resend-verification-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vstitch_user_id: userId }),
    });

    const result = (await response.json().catch(() => ({}))) as {
      message?: string;
      detail?: string;
    };

    if (response.ok) {
      return {
        ok: true,
        message: result.message ?? 'Verification email sent. Please check your inbox.',
      };
    }

    if (response.status === 400) {
      return {
        ok: false,
        status: response.status,
        message: 'Your email is already verified. Please login.',
        redirectToLogin: true,
      };
    }

    return {
      ok: false,
      status: response.status,
      message: result.detail ?? 'Failed to resend verification email. Please try again later.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      message: 'Failed to resend verification email. Please try again later.',
    };
  }
}
