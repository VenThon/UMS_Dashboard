"use client";

import {
  FormControl,
  FormDescription,
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
import { RequestLeaveFormValues } from "@/db/validation/leave-request";

import {
  CalendarClock,
  CalendarDays,
  Clock,
  FileText,
  Tag,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { calculateTotalLeaveDays, getTodayDate } from "../lib";

export function RequestLeaveFields() {
  const today = getTodayDate();
  const form = useFormContext<RequestLeaveFormValues>();

  const startDate = useWatch({
    control: form.control,
    name: "startDate",
  });

  const endDate = useWatch({
    control: form.control,
    name: "endDate",
  });

  const durationDays = useWatch({
    control: form.control,
    name: "durationDays",
  });

  const totalLeaveDays = calculateTotalLeaveDays({
    startDate,
    endDate,
    durationType: durationDays,
  });

  return (
    <div>
      <FormField
        control={form.control}
        name="leaveType"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-1.5">
              <Tag className="size-4" />
              <FormLabel>Leave type</FormLabel>
            </div>

            <Select value={field.value} onValueChange={field.onChange}>
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

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <FormLabel>Start date</FormLabel>
              </div>

              <FormControl>
                <Input
                  type="date"
                  min={today}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);

                    const selectedStartDate = event.target.value;
                    const currentEndDate = form.getValues("endDate");

                    if (currentEndDate && currentEndDate < selectedStartDate) {
                      form.setValue("endDate", selectedStartDate, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
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
              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                <FormLabel>End date</FormLabel>
              </div>

              <FormControl>
                <Input
                  type="date"
                  min={startDate || today}
                  disabled={!startDate}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="durationDays"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <FormLabel>Leave duration</FormLabel>
            </div>

            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select leave duration" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {Object.values(LEAVE_DURATION_TYPES).map((durationType) => (
                  <SelectItem key={durationType} value={durationType}>
                    {LEAVE_DURATION_LABELS[durationType]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormDescription>
              Half-day morning or afternoon applies to a single leave date.
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/40 rounded-lg border p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-green-100 p-2 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CalendarClock className="size-5" />
            </div>

            <div>
              <p className="font-medium">Total requested leave</p>

              <p className="text-muted-foreground text-sm">
                Calculated from the selected dates and duration.
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-2xl font-semibold text-green-700 dark:text-green-400">
              {totalLeaveDays}
            </p>

            <p className="text-muted-foreground text-sm">
              {totalLeaveDays === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-1.5">
              <FileText className="size-4" />
              <FormLabel>Reason</FormLabel>
            </div>

            <FormControl>
              <Textarea
                placeholder="Explain the reason for your leave request..."
                className="min-h-32 resize-y"
                {...field}
              />
            </FormControl>

            <FormDescription>
              Provide enough information for the reviewer.
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
export { calculateTotalLeaveDays };
