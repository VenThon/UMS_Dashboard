"use client";

import { useState } from "react";

import { useDeleteDailyReport } from "@/app/[locale]/dashboard/developments/report/_hooks/use-daily-report";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2, TriangleAlert } from "lucide-react";

type DeleteDailyReportDialogProps = {
  id: string;
};

export function DeleteDailyReportDialog({ id }: DeleteDailyReportDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteDailyReport = useDeleteDailyReport();

  function handleDelete() {
    deleteDailyReport.mutate(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Delete draft report"
          className="size-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/50"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-md">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex gap-3 pr-10">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <TriangleAlert className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle>Delete draft report?</DialogTitle>
              <DialogDescription>
                This draft report will be deleted permanently. This action
                cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400">
            Only draft reports should be deleted. Submitted or approved reports
            should stay in the system history.
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteDailyReport.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/30"
            onClick={handleDelete}
            disabled={deleteDailyReport.isPending}
          >
            <Trash2 className="size-4" />
            {deleteDailyReport.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
