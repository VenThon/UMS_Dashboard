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
import { RejectRequestLeaveValue, rejectRequestLeaveSchema } from "@/db/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { useRejectRequestLeave } from "../../leave-request/_hooks/use-request-leave";

type RejectRequestLeaveDialogProps = {
  requestLeaveId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RejectRequestLeaveDialog({
  requestLeaveId,
  open,
  onOpenChange,
}: RejectRequestLeaveDialogProps) {
  const rejectRequestLeave = useRejectRequestLeave();

  const form = useForm<RejectRequestLeaveValue>({
    resolver: zodResolver(rejectRequestLeaveSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        comment: "",
      });
    }
  }, [form, open]);

  function onSubmit(values: RejectRequestLeaveValue) {
    rejectRequestLeave.mutate(
      {
        id: requestLeaveId,
        comment: values.comment,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  }

  function handleOpenChange(nextOpen: boolean) {
    if (rejectRequestLeave.isPending) {
      return;
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
            <CircleX className="size-5 text-red-700 dark:text-red-400" />
          </div>

          <DialogTitle>Reject leave request?</DialogTitle>

          <DialogDescription>
            Provide a clear reason so the requester understands what needs to be
            corrected.
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
                      placeholder="Explain why this leave request is being rejected..."
                      className="min-h-32 resize-y"
                      maxLength={1000}
                      disabled={rejectRequestLeave.isPending}
                      {...field}
                    />
                  </FormControl>

                  <div className="text-muted-foreground text-right text-xs">
                    {field.value.length}/1000
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={rejectRequestLeave.isPending}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="destructive"
                disabled={rejectRequestLeave.isPending}
              >
                {rejectRequestLeave.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CircleX className="size-4" />
                )}

                {rejectRequestLeave.isPending
                  ? "Rejecting..."
                  : "Reject Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
