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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  type RejectGeneralRequestValue,
  rejectGeneralRequestSchema,
} from "@/db/validation/general-request";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GeneralRequestItem } from "../../general-request/_hooks/general-request-types";
import { useRejectGeneralRequest } from "../../general-request/_hooks/use-general-request";

type RejectGeneralRequestDialogProps = {
  request: GeneralRequestItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RejectGeneralRequestDialog({
  request,
  open,
  onOpenChange,
}: RejectGeneralRequestDialogProps) {
  const rejectRequest = useRejectGeneralRequest();

  const form = useForm<RejectGeneralRequestValue>({
    resolver: zodResolver(rejectGeneralRequestSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        comment: "",
      });
    }
  }, [open, form]);

  async function onSubmit(values: RejectGeneralRequestValue) {
    if (!request) {
      return;
    }

    try {
      await rejectRequest.mutateAsync({
        id: request.id,
        values,
      });

      toast.success("General request rejected successfully.");

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to reject general request.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleX className="size-5 text-red-600" />
            Reject General Request
          </DialogTitle>

          <DialogDescription>
            Reject <strong>{request?.title}</strong>. The rejection reason is
            required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rejection reason</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Explain why this request is rejected..."
                      className="min-h-32 resize-y"
                      maxLength={2000}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={rejectRequest.isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="destructive"
                disabled={rejectRequest.isPending}
              >
                {rejectRequest.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CircleX className="size-4" />
                )}

                {rejectRequest.isPending ? "Rejecting..." : "Reject Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
