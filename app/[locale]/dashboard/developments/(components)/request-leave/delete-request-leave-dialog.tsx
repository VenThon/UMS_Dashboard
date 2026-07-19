"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2, Trash2, TriangleAlert } from "lucide-react";

import { useDeleteRequestLeave } from "../../leave-request/_hooks/use-request-leave";

type DeleteRequestLeaveDialogProps = {
  requestLeaveId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteRequestLeaveDialog({
  requestLeaveId,
  open,
  onOpenChange,
}: DeleteRequestLeaveDialogProps) {
  const deleteRequestLeave = useDeleteRequestLeave();

  function handleDelete() {
    deleteRequestLeave.mutate(requestLeaveId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    if (deleteRequestLeave.isPending) {
      return;
    }

    onOpenChange(nextOpen);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
            <TriangleAlert className="size-5 text-red-600 dark:text-red-400" />
          </div>

          <AlertDialogTitle>Delete leave request?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The leave request and its review
            history will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteRequestLeave.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteRequestLeave.isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
          >
            {deleteRequestLeave.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}

            {deleteRequestLeave.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
