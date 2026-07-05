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
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import {
  CreateDailyReportFormValues,
  createDailyReportFormSchema,
} from "@/db/validation/dialyreport";
import { useCreateDailyReport } from "@/hooks/report/use-daily-report";
import { useRouter } from "@/i18n/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Save, Send } from "lucide-react";
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

  function onSaveDraft() {
    const values = form.getValues();

    createDailyReport.mutate({
      ...values,
      reportDate: format(values.reportDate, "yyyy-MM-dd"),
      status: DAILY_REPORT_STATUS.DRAFT,
    });
  }
  function onSubmit(values: CreateDailyReportFormValues) {
    createDailyReport.mutate({
      ...values,
      reportDate: format(values.reportDate, "yyyy-MM-dd"),
      status: DAILY_REPORT_STATUS.PENDING,
    });
  }

  return (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader className="border-b">
        <CardTitle>Create Daily Report</CardTitle>

        <CardDescription>
          Record your completed work, current progress, blockers, and plan for
          the next working day.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DailyReportFields />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={createDailyReport.isPending}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="secondary"
                disabled={createDailyReport.isPending}
                onClick={onSaveDraft}
              >
                <Save className="size-4" />
                Save Draft
              </Button>

              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={createDailyReport.isPending}
              >
                <Send className="size-4" />
                {createDailyReport.isPending
                  ? "Submitting..."
                  : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
