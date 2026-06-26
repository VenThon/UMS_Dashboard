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
  CreateDailyReportFormValues,
  createDailyReportSchema,
} from "@/db/validation/dialyreport";
import { useRouter } from "@/i18n/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Save, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { DailyReportFields } from "./daily-report-fields";

export function CreateDailyReportForm() {
  const router = useRouter();
  const form = useForm<CreateDailyReportFormValues>({
    resolver: zodResolver(createDailyReportSchema),
    defaultValues: {
      projectName: "",
      reportDate: new Date(),
      previousTasks: "",
      completedTasks: "",
      inProgressTasks: "",
      blockers: "",
      tomorrowPlan: "",
      remarks: "",
    },
  });

  const onSubmit = async (values: CreateDailyReportFormValues) => {
    const payload = {
      ...values,
      reportDate: format(values.reportDate, "yyyy-MM-dd"),
    };

    console.log("Daily report payload:", payload);
  };

  return (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader className="border-b">
        <CardTitle>Create Daily Report</CardTitle>

        <CardDescription>
          Record your completed work, current progress, blockers, and plan for
          the next working day.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DailyReportFields />
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="secondary"
                disabled={form.formState.isSubmitting}
                onClick={() => {
                  const values = form.getValues();
                  console.log("Save draft:", values);
                }}
              >
                <Save className="size-4" />
                Save Draft
              </Button>

              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={form.formState.isSubmitting}
              >
                <Send className="size-4" />

                {form.formState.isSubmitting
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
