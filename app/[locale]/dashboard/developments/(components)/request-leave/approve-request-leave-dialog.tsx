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

import { useApproveRequestLeave } from "../../leave-request/_hooks/use-request-leave";

type ApproveRequestLeaveDialogProps = {
  requestLeaveId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ApproveRequestLeaveDialog({
  requestLeaveId,
  open,
  onOpenChange,
}: ApproveRequestLeaveDialogProps) {
  const [comment, setComment] = useState("");
  const approveRequestLeave = useApproveRequestLeave();

  function handleApprove() {
    approveRequestLeave.mutate(
      {
        id: requestLeaveId,
        comment: comment.trim() || undefined,
      },
      {
        onSuccess: () => {
          setComment("");
          onOpenChange(false);
        },
      },
    );
  }

  function handleOpenChange(nextOpen: boolean) {
    if (approveRequestLeave.isPending) {
      return;
    }

    if (!nextOpen) {
      setComment("");
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/50">
            <CheckCircle2 className="size-5 text-green-700 dark:text-green-400" />
          </div>

          <DialogTitle>Approve leave request?</DialogTitle>

          <DialogDescription>
            Confirm that you want to approve this leave request. A comment is
            optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="approval-comment">Comment</Label>

          <Textarea
            id="approval-comment"
            value={comment}
            maxLength={1000}
            disabled={approveRequestLeave.isPending}
            placeholder="Add an optional approval comment..."
            className="min-h-28 resize-y"
            onChange={(event) => setComment(event.target.value)}
          />

          <p className="text-muted-foreground text-right text-xs">
            {comment.length}/1000
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={approveRequestLeave.isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={approveRequestLeave.isPending}
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleApprove}
          >
            {approveRequestLeave.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}

            {approveRequestLeave.isPending ? "Approving..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
