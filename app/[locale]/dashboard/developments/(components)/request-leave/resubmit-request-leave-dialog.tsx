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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  LEAVE_DURATION_LABELS,
  LEAVE_DURATION_TYPES,
  LEAVE_TYPES,
  LEAVE_TYPES_LABELS,
} from "@/db/constants/request-leave-status";
import {
  type ResubmitRequestLeaveValue,
  resubmitRequestLeaveSchema,
} from "@/db/validation/leave-request";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Loader2, RotateCcw } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import {
  useRequestLeaveById,
  useResubmitRequestLeave,
} from "../../leave-request/_hooks/use-request-leave";

type ResubmitRequestLeaveDialogProps = {
  requestLeaveId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ResubmitRequestLeaveDialog({
  requestLeaveId,
  open,
  onOpenChange,
}: ResubmitRequestLeaveDialogProps) {
  const requestLeaveQuery = useRequestLeaveById(requestLeaveId);
  const resubmitRequestLeave = useResubmitRequestLeave();

  const form = useForm<ResubmitRequestLeaveValue>({
    resolver: zodResolver(resubmitRequestLeaveSchema),
    defaultValues: {
      leaveType: LEAVE_TYPES.ANNUAL_LEAVE,
      startDate: "",
      endDate: "",
      durationType: LEAVE_DURATION_TYPES.FULL_DAY,
      reason: "",
    },
  });

  const startDate = useWatch({
    control: form.control,
    name: "startDate",
  });

  const requestLeave = requestLeaveQuery.data?.data;

  useEffect(() => {
    if (!open || !requestLeave) {
      return;
    }

    form.reset({
      leaveType: requestLeave.leaveType,
      startDate: requestLeave.startDate,
      endDate: requestLeave.endDate,
      durationType: requestLeave.durationType,
      reason: requestLeave.reason,
    });
  }, [form, open, requestLeave]);

  useEffect(() => {
    const endDate = form.getValues("endDate");

    if (startDate && endDate && endDate < startDate) {
      form.setValue("endDate", "", {
        shouldValidate: true,
      });
    }
  }, [form, startDate]);

  function onSubmit(values: ResubmitRequestLeaveValue) {
    resubmitRequestLeave.mutate(
      {
        id: requestLeaveId,
        values,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  }

  function handleOpenChange(nextOpen: boolean) {
    if (resubmitRequestLeave.isPending) {
      return;
    }

    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex size-11 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50">
            <RotateCcw className="size-5 text-blue-700 dark:text-blue-400" />
          </div>

          <DialogTitle>Resubmit leave request</DialogTitle>

          <DialogDescription>
            Update the rejected leave request and submit it again for first
            approval.
          </DialogDescription>
        </DialogHeader>

        {requestLeaveQuery.isLoading ? (
          <div className="flex min-h-52 items-center justify-center">
            <Loader2 className="text-muted-foreground size-6 animate-spin" />
          </div>
        ) : requestLeaveQuery.isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            {requestLeaveQuery.error.message}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="leaveType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave type</FormLabel>

                      <Select
                        value={field.value}
                        disabled={resubmitRequestLeave.isPending}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {Object.values(LEAVE_TYPES).map((leaveType) => (
                            <SelectItem key={leaveType} value={leaveType}>
                              {LEAVE_TYPES_LABELS[leaveType]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="durationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>

                      <Select
                        value={field.value}
                        disabled={resubmitRequestLeave.isPending}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {Object.values(LEAVE_DURATION_TYPES).map(
                            (durationType) => (
                              <SelectItem
                                key={durationType}
                                value={durationType}
                              >
                                {LEAVE_DURATION_LABELS[durationType]}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start date</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                          <Input
                            type="date"
                            className="pl-9"
                            disabled={resubmitRequestLeave.isPending}
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End date</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                          <Input
                            type="date"
                            className="pl-9"
                            min={startDate || undefined}
                            disabled={resubmitRequestLeave.isPending}
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Explain the reason for your leave request..."
                        className="min-h-32 resize-y"
                        maxLength={1000}
                        disabled={resubmitRequestLeave.isPending}
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
                  disabled={resubmitRequestLeave.isPending}
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={resubmitRequestLeave.isPending}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  {resubmitRequestLeave.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <RotateCcw className="size-4" />
                  )}

                  {resubmitRequestLeave.isPending
                    ? "Resubmitting..."
                    : "Resubmit Request"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
