"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCircle2, XCircle } from "lucide-react";

import { ReviewStatusDialog } from "../(components)/review-daily-report-dailog";

type ReviewStatus = "approved" | "rejected";

export default function RequestReviewActions() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ReviewStatus>("approved");
  const [isPending, setIsPending] = useState(false);

  const openDialog = (reviewStatus: ReviewStatus) => {
    setStatus(reviewStatus);
    setOpen(true);
  };

  const handleConfirm = async ({
    status,
    reason,
  }: {
    status: ReviewStatus;
    reason?: string;
  }) => {
    try {
      setIsPending(true);

      console.log({
        status,
        reason,
      });

      // Example API request:
      // await reviewRequestMutation.mutateAsync({
      //   requestId: "request-id",
      //   status,
      //   reason,
      // });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-3xl space-y-5">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Daily Report Review</CardTitle>
            <CardDescription>
              Daily report submitted for June 26, 2026. Please verify the report
              before making your final decision.
            </CardDescription>
          </div>
          <p className="mt-1 font-medium text-amber-600">Pending review</p>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={() => openDialog("rejected")}
          >
            <XCircle />
            Reject Request
          </Button>

          <Button
            type="button"
            className="w-full bg-green-100 text-green-700 sm:w-auto"
            onClick={() => openDialog("approved")}
          >
            <CheckCircle2 />
            Approve Request
          </Button>
        </CardContent>
      </Card>

      <ReviewStatusDialog
        open={open}
        onOpenChange={setOpen}
        status={status}
        requestTitle="Daily report for June 26, 2026"
        isPending={isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
