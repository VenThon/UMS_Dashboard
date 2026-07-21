// approve-general-request-dialog.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useApproveGeneralRequest } from "../../general-request/_hooks/use-general-request";
import { GeneralRequestItem } from "../../general-request/general-request-types";

type ApproveGeneralRequestDialogProps = {
  request: GeneralRequestItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ApproveGeneralRequestDialog({
  request,
  open,
  onOpenChange,
}: ApproveGeneralRequestDialogProps) {
  const [comment, setComment] = useState("");
  const approveRequest = useApproveGeneralRequest();

  async function handleApprove() {
    if (!request) {
      return;
    }

    try {
      await approveRequest.mutateAsync({
        id: request.id,
        values: {
          comment: comment.trim() || undefined,
        },
      });

      toast.success("General request approved successfully.");

      setComment("");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to approve general request.",
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setComment("");
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-green-600" />
            Approve General Request
          </DialogTitle>

          <DialogDescription>
            Approve <strong>{request?.title}</strong>. A comment is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="approval-comment">Comment</Label>

          <Textarea
            id="approval-comment"
            value={comment}
            placeholder="Add an optional approval comment..."
            className="min-h-28 resize-y"
            maxLength={2000}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={approveRequest.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={approveRequest.isPending}
            onClick={handleApprove}
          >
            {approveRequest.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}

            {approveRequest.isPending ? "Approving..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
