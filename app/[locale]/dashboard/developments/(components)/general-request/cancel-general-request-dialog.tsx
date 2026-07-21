// cancel-general-request-dialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Ban, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useCancelGeneralRequest } from "../../general-request/_hooks/use-general-request";
import { GeneralRequestItem } from "../../general-request/general-request-types";

type CancelGeneralRequestDialogProps = {
  request: GeneralRequestItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CancelGeneralRequestDialog({
  request,
  open,
  onOpenChange,
}: CancelGeneralRequestDialogProps) {
  const cancelRequest = useCancelGeneralRequest();

  async function handleCancel() {
    if (!request) {
      return;
    }

    try {
      await cancelRequest.mutateAsync(request.id);

      toast.success("General request cancelled successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to cancel general request.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ban className="size-5 text-orange-600" />
            Cancel General Request
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to cancel <strong>{request?.title}</strong>?
            This request will no longer continue through the approval process.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-300">
          The approval history will remain available after cancellation.
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={cancelRequest.isPending}
            onClick={() => onOpenChange(false)}
          >
            Keep Request
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={cancelRequest.isPending}
            onClick={handleCancel}
          >
            {cancelRequest.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Ban className="size-4" />
            )}

            {cancelRequest.isPending ? "Cancelling..." : "Cancel Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
