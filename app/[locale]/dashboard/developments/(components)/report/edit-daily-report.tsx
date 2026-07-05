"use client";

import { useEffect, useState } from "react";

import { ReportTypesStatusBadge } from "@/components/badge/status-report";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  CreateDailyReportFormValues,
  createDailyReportFormSchema,
} from "@/db/validation/dialyreport";
import { useUpdateDailyReport } from "@/hooks/report/use-daily-report";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";

import { DailyReportFields } from "./daily-report-fields";
import { DailyReportItem } from "./daily-report.type";

type UpdateDailyReportDialogProps = {
  item: DailyReportItem;
};

export function UpdateDailyReportDialog({
  item,
}: UpdateDailyReportDialogProps) {
  const [open, setOpen] = useState(false);
  const updateDailyReport = useUpdateDailyReport();

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

  useEffect(() => {
    if (!open) return;

    form.reset({
      projectName: item.projectName ?? "",
      reportDate: item.reportDate ? new Date(item.reportDate) : undefined,
      previousTasks: item.previousTasks ?? "",
      completedTasks: item.completedTasks ?? "",
      inProgressTasks: item.inProgressTasks ?? "",
      blockers: item.blockers ?? "",
      tomorrowPlan: item.tomorrowPlan ?? "",
      remarks: item.remarks ?? "",
    });
  }, [open, item, form]);

  function onSubmit(values: CreateDailyReportFormValues) {
    updateDailyReport.mutate(
      {
        id: item.id,
        values: {
          ...values,
          reportDate: format(values.reportDate, "yyyy-MM-dd"),
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Update report"
          className="size-8 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/50"
        >
          <SquarePen className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-5xl">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex flex-col gap-4 pr-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                <SquarePen className="size-5 text-amber-600" />
                Update Daily Report
              </DialogTitle>

              <DialogDescription>
                Edit your daily report information before submitting the update.
              </DialogDescription>
            </div>

            <div className="shrink-0">
              <ReportTypesStatusBadge status={item.status} />
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-5">
              <DailyReportFields />
            </div>

            <div className="flex flex-col-reverse gap-3 px-6 py-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={updateDailyReport.isPending}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={updateDailyReport.isPending}
                className="bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500/30"
              >
                <SquarePen className="size-4" />
                {updateDailyReport.isPending ? "Updating..." : "Update Report"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
