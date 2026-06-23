import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link } from "@/i18n/navigation";

import { ArrowLeft, RefreshCwIcon } from "lucide-react";

export function VerifyEmailForm() {
  return (
    <section>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span className="font-medium">m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field className="gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>

              <Button variant="outline" size="xs" className="w-fit">
                <RefreshCwIcon className="size-3" />
                Resend Code
              </Button>
            </div>

            <InputOTP
              maxLength={6}
              id="otp-verification"
              required
              className="w-full justify-center"
            >
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:w-14 *:data-[slot=input-otp-slot]:text-lg sm:*:data-[slot=input-otp-slot]:h-12 sm:*:data-[slot=input-otp-slot]:w-16">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator className="mx-1" />

              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:w-14 *:data-[slot=input-otp-slot]:text-lg sm:*:data-[slot=input-otp-slot]:h-12 sm:*:data-[slot=input-otp-slot]:w-16">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </CardContent>
        <CardFooter className="grid grid-cols-1 space-y-4">
          <Button type="submit" className="w-full">
            <Link href="/new-password">Verify</Link>
          </Button>
          <div>
            <Link
              href={`/forgot-password`}
              className="flex items-center justify-center gap-2 text-sm underline-offset-4 hover:underline"
            >
              <ArrowLeft size={17} />
              <span>Back to forgot password</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <div>
        <p className="mt-6 text-center text-xs">
          If you are having trouble, please contact our {""}
          <a
            href="mailto:example@gmail.com"
            className="font-medium text-blue-600 hover:underline"
            target="_blank"
          >
            support team.
          </a>
        </p>
      </div>
    </section>
  );
}
