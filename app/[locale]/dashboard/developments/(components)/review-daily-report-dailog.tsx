"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CheckCircle2, XCircle } from "lucide-react";

type ReviewStatus = "approved" | "rejected";

interface ReviewStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: ReviewStatus;
  requestTitle?: string;
  isPending?: boolean;
  onConfirm: (data: {
    status: ReviewStatus;
    reason?: string;
  }) => Promise<void> | void;
}

export function ReviewStatusDialog({
  open,
  onOpenChange,
  status,
  requestTitle,
  isPending = false,
  onConfirm,
}: ReviewStatusDialogProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const isApproved = status === "approved";

  const handleConfirm = async () => {
    if (!isApproved && !reason.trim()) {
      setError("Please provide a reason for rejecting this request.");
      return;
    }

    await onConfirm({
      status,
      reason: isApproved ? undefined : reason.trim(),
    });

    setReason("");
    setError("");
    onOpenChange(false);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setReason("");
      setError("");
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center justify-center">
          <div
            className={`mb-3 flex size-16 items-center justify-center rounded-full ${
              isApproved
                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
            }`}
          >
            {isApproved ? (
              <CheckCircle2 className="size-6" />
            ) : (
              <XCircle className="size-6" />
            )}
          </div>

          <DialogTitle>
            {isApproved ? "Approve request" : "Reject request"}
          </DialogTitle>

          <DialogDescription>
            {isApproved
              ? "Are you sure you want to approve this request?"
              : "Please provide a reason before rejecting this request."}
          </DialogDescription>
        </DialogHeader>

        {requestTitle && (
          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground text-xs">Request</p>
            <p className="mt-1 text-sm font-medium">{requestTitle}</p>
          </div>
        )}

        {!isApproved && (
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">
              Rejection reason <span className="text-destructive">*</span>
            </Label>

            <Textarea
              id="rejection-reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="Explain why this request is being rejected..."
              rows={5}
              disabled={isPending}
              aria-invalid={Boolean(error)}
            />

            <div className="flex items-center justify-between">
              {error ? (
                <p className="text-destructive text-sm">{error}</p>
              ) : (
                <span />
              )}

              <p className="text-muted-foreground text-xs">
                {reason.length}/500
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant={isApproved ? "default" : "destructive"}
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending
              ? isApproved
                ? "Approving..."
                : "Rejecting..."
              : isApproved
                ? "Confirm approval"
                : "Confirm rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
