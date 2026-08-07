"use client";

import { useCreateDailyReport } from "@/app/[locale]/dashboard/developments/report/_hooks/use-daily-report";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import {
  CreateDailyReportFormValues,
  createDailyReportFormSchema,
} from "@/db/validation/dialyreport";
import { useRouter } from "@/i18n/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  ArrowLeft,
  ClipboardList,
  FileText,
  Info,
  Save,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { DailyReportFields } from "./daily-report-fields";

export function CreateDailyReportForm() {
  const router = useRouter();
  const createDailyReport = useCreateDailyReport();

  const form = useForm<CreateDailyReportFormValues>({
    resolver: zodResolver(createDailyReportFormSchema),
    defaultValues: {
      projectName: "",
      reportDate: undefined,
      previousTasks: "",
      completedTasks: "",
      inProgressTasks: "",
      blockers: "",
      tomorrowPlan: "",
      remarks: "",
    },
  });

  const isSubmitting = createDailyReport.isPending;

  function createReport(
    values: CreateDailyReportFormValues,
    status:
      | typeof DAILY_REPORT_STATUS.DRAFT
      | typeof DAILY_REPORT_STATUS.PENDING,
  ) {
    createDailyReport.mutate({
      ...values,
      reportDate: format(values.reportDate, "yyyy-MM-dd"),
      status,
    });
  }

  const handleSaveDraft = form.handleSubmit((values) => {
    createReport(values, DAILY_REPORT_STATUS.DRAFT);
  });

  const handleSubmitReport = form.handleSubmit((values) => {
    createReport(values, DAILY_REPORT_STATUS.PENDING);
  });

  return (
    <div className="mx-auto w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 flex size-11 shrink-0 items-center justify-center rounded-xl">
            <ClipboardList className="text-primary size-5" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Daily Report
            </h1>

            <p className="text-muted-foreground text-sm">
              Record your work progress and submit it for review.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <div className="bg-muted/30 flex items-start gap-3 rounded-xl border p-4">
        <Info className="text-primary mt-0.5 size-5 shrink-0" />

        <div className="space-y-1">
          <p className="text-sm font-medium">Before submitting</p>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Provide clear information about completed tasks, ongoing work,
            blockers, and your plan for the next working day. You can save the
            report as a draft and submit it later.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="bg-muted/30 border-b px-5 py-2 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="bg-background flex size-10 shrink-0 items-center justify-center rounded-xl border">
              <FileText className="text-muted-foreground size-5" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-lg">
                Daily Report Information
              </CardTitle>

              <CardDescription className="max-w-2xl">
                Complete the form below with your latest project activities and
                work updates.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          <Form {...form}>
            <form
              onSubmit={handleSubmitReport}
              className="space-y-4"
              noValidate
            >
              <DailyReportFields />

              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground text-xs">
                  Fields marked as required must be completed before saving or
                  submitting.
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                    onClick={handleSaveDraft}
                  >
                    <Save className="size-4" />

                    {isSubmitting ? "Saving..." : "Save Draft"}
                  </Button>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    <Send className="size-4" />

                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
