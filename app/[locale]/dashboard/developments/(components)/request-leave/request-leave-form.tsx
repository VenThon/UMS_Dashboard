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
import { ArrowLeft, CalendarDays, FileText, Info, Send } from "lucide-react";
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
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
              <CalendarDays className="text-primary size-5" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Request Leave
              </h1>

              <p className="text-muted-foreground text-sm">
                Submit a new leave request for approval.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="bg-muted/30 border-b px-5 py-2 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="bg-background flex size-10 shrink-0 items-center justify-center rounded-xl border">
              <FileText className="text-muted-foreground size-5" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-lg">Leave Information</CardTitle>

              <CardDescription className="max-w-2xl">
                Select the leave type, dates, duration, and provide a clear
                reason for your request.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RequestLeaveFields />

              <div className="bg-muted/30 flex items-start gap-3 rounded-xl border p-4">
                <Info className="text-muted-foreground mt-0.5 size-4 shrink-0" />

                <div className="space-y-1">
                  <p className="text-sm font-medium">Total requested leave</p>

                  <p className="text-muted-foreground text-sm">
                    {totalLeaveDays > 0
                      ? `${totalLeaveDays} ${
                          totalLeaveDays === 1 ? "day" : "days"
                        }`
                      : "Select valid start and end dates to calculate the total leave."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={form.formState.isSubmitting}
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:w-auto"
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
    </div>
  );
}
