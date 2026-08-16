"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const COOLDOWN = 60;

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestId = searchParams.get("requestId");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(COOLDOWN);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [countdown]);

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!requestId) {
      setError("Invalid password reset request.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter exactly six digits.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password/verify", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          requestId,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      router.push(`/new-password?token=${encodeURIComponent(data.resetToken)}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!requestId || countdown > 0) {
      return;
    }

    setError("");
    setResending(true);

    try {
      const response = await fetch("/api/auth/forgot-password/resend", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          requestId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);

        if (data.retryAfter) {
          setCountdown(data.retryAfter);
        }

        return;
      }

      setOtp("");
      setCountdown(data.cooldownSeconds ?? COOLDOWN);
    } catch {
      setError("Unable to resend the code.");
    } finally {
      setResending(false);
    }
  }

  return (
    <form onSubmit={handleVerify} className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verify Code</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Enter the six-digit verification code sent to your email.
        </p>
      </div>

      <Input
        value={otp}
        onChange={(event) => {
          const value = event.target.value.replace(/\D/g, "").slice(0, 6);

          setOtp(value);
        }}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="000000"
        className="h-14 text-center text-2xl tracking-[0.5em]"
      />

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </Button>

      <Button
        type="button"
        variant="ghost"
        disabled={countdown > 0 || resending}
        onClick={handleResend}
        className="w-full"
      >
        {resending
          ? "Sending..."
          : countdown > 0
            ? `Resend code in ${countdown}s`
            : "Resend Code"}
      </Button>
    </form>
  );
}
