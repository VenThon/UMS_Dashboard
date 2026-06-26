"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  LEAVE_DURATION_TYPES,
  LEAVE_TYPES,
} from "@/db/constants/request-leave-status";
import {
  RequestLeaveFormValues,
  requestLeaveSchema,
} from "@/db/validation/leave-request";
import { useRouter } from "@/i18n/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import {
  RequestLeaveFields,
  calculateTotalLeaveDays,
} from "./request-leave-fields";

export function RequestLeaveForm() {
  const router = useRouter();
  const form = useForm<RequestLeaveFormValues>({
    resolver: zodResolver(requestLeaveSchema),
    defaultValues: {
      leaveType: LEAVE_TYPES.ANNUAL_LEAVE,
      startDate: "",
      endDate: "",
      durationDays: LEAVE_DURATION_TYPES.FULL_DAY,
      reason: "",
    },
  });
  const startDate = useWatch({
    control: form.control,
    name: "startDate",
  });

  const endDate = useWatch({
    control: form.control,
    name: "endDate",
  });

  const durationDays = useWatch({
    control: form.control,
    name: "durationDays",
  });

  const totalLeaveDays = calculateTotalLeaveDays({
    startDate,
    endDate,
    durationType: durationDays,
  });

  async function onSubmit(values: RequestLeaveFormValues) {
    const payload = {
      ...values,
      totalDays: totalLeaveDays,
    };

    console.log("Leave request payload:", payload);
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader className="border-b">
        <CardTitle>Request Leave</CardTitle>

        <CardDescription>
          Select your leave dates, duration, and provide a reason for the
          request.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RequestLeaveFields />
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={form.formState.isSubmitting}
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={form.formState.isSubmitting || totalLeaveDays === 0}
              >
                <Send className="size-4" />

                {form.formState.isSubmitting
                  ? "Submitting..."
                  : "Submit Request"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
