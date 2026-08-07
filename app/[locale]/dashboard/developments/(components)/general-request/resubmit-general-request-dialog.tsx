"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  ResubmitGeneralRequestInput,
  type ResubmitGeneralRequestValue,
  resubmitGeneralRequestSchema,
} from "@/db/validation/general-request";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GeneralRequestItem } from "../../general-request/_hooks/general-request-types";
import { useResubmitGeneralRequest } from "../../general-request/_hooks/use-general-request";
import { GeneralRequestFields } from "./general-request-fields";

type ResubmitGeneralRequestDialogProps = {
  request: GeneralRequestItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ResubmitGeneralRequestDialog({
  request,
  open,
  onOpenChange,
}: ResubmitGeneralRequestDialogProps) {
  const resubmitRequest = useResubmitGeneralRequest();

  const form = useForm<
    ResubmitGeneralRequestInput,
    unknown,
    ResubmitGeneralRequestValue
  >({
    resolver: zodResolver(resubmitGeneralRequestSchema),
    defaultValues: {
      requestType: undefined,
      title: "",
      description: "",
      reason: "",
      expectedBenefit: "",
      priority: undefined,
      requiredDate: "",
      estimatedCost: undefined,
      currency: undefined,
      attachments: [],
    },
  });
  useEffect(() => {
    if (!request) {
      return;
    }

    form.reset({
      requestType: request.requestType,
      title: request.title,
      description: request.description,
      reason: request.reason,
      expectedBenefit: request.expectedBenefit,
      priority: request.priority,
      requiredDate: request.requiredDate ?? "",
      estimatedCost: request.estimatedCost
        ? Number(request.estimatedCost)
        : undefined,
      currency: request.currency ?? undefined,
      attachments: request.attachments,
    });
  }, [request, form]);

  async function onSubmit(values: ResubmitGeneralRequestValue) {
    if (!request) {
      return;
    }

    try {
      await resubmitRequest.mutateAsync({
        id: request.id,
        values,
      });

      toast.success("General request resubmitted successfully.");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resubmit general request.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="size-5" />
            Resubmit General Request
          </DialogTitle>

          <DialogDescription>
            Update the rejected request and submit it for approval again. The
            previous review history will be preserved.
          </DialogDescription>
        </DialogHeader>

        {request?.reviewerComment && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">
              Rejection comment
            </p>

            <p className="mt-1 text-sm whitespace-pre-wrap text-red-700 dark:text-red-300">
              {request.reviewerComment}
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <GeneralRequestFields />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={resubmitRequest.isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={resubmitRequest.isPending}>
                {resubmitRequest.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <RotateCcw className="size-4" />
                )}

                {resubmitRequest.isPending
                  ? "Resubmitting..."
                  : "Resubmit Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
