// delete-general-request-dialog.tsx
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

import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useDeleteGeneralRequest } from "../../general-request/_hooks/use-general-request";
import { GeneralRequestItem } from "../../general-request/general-request-types";

// import type { GeneralRequestItem } from "../../_api/general-request-types";
// import { useDeleteGeneralRequest } from "../../_hooks/use-general-request";

type DeleteGeneralRequestDialogProps = {
  request: GeneralRequestItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteGeneralRequestDialog({
  request,
  open,
  onOpenChange,
}: DeleteGeneralRequestDialogProps) {
  const deleteRequest = useDeleteGeneralRequest();

  async function handleDelete() {
    if (!request) {
      return;
    }

    try {
      await deleteRequest.mutateAsync(request.id);

      toast.success("General request deleted successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete general request.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="size-5 text-red-600" />
            Delete General Request
          </DialogTitle>

          <DialogDescription>
            Permanently delete <strong>{request?.title}</strong>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
          Only draft requests can be deleted.
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={deleteRequest.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={deleteRequest.isPending}
            onClick={handleDelete}
          >
            {deleteRequest.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}

            {deleteRequest.isPending ? "Deleting..." : "Delete Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
