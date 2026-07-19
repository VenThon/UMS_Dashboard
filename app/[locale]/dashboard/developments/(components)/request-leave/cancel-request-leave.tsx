"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Ban, Loader2, TriangleAlert } from "lucide-react";

import { useCancelRequestLeave } from "../../leave-request/_hooks/use-request-leave";

type CancelRequestLeaveDialogProps = {
  requestLeaveId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CancelRequestLeaveDialog({
  requestLeaveId,
  open,
  onOpenChange,
}: CancelRequestLeaveDialogProps) {
  const cancelRequestLeave = useCancelRequestLeave();

  function handleCancelRequest() {
    cancelRequestLeave.mutate(requestLeaveId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <TriangleAlert className="size-5 text-gray-600 dark:text-gray-300" />
          </div>

          <AlertDialogTitle>Cancel leave request?</AlertDialogTitle>

          <AlertDialogDescription>
            The request will remain in the system as cancelled and cannot be
            reviewed further.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={cancelRequestLeave.isPending}>
            Keep Request
          </AlertDialogCancel>

          <Button
            type="button"
            variant="destructive"
            disabled={cancelRequestLeave.isPending}
            onClick={handleCancelRequest}
          >
            {cancelRequestLeave.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Ban className="size-4" />
            )}

            {cancelRequestLeave.isPending ? "Cancelling..." : "Cancel Request"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
