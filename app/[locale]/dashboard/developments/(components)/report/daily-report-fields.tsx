"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CreateDailyReportFormValues } from "@/db/validation/dialyreport";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import {
  Ban,
  CalendarIcon,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  ListTodo,
  MessageSquareText,
  StepForward,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

export function DailyReportFields() {
  const form = useFormContext<CreateDailyReportFormValues>();
  return (
    <>
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">General information</h2>

          <p className="text-muted-foreground text-sm">
            Select the project and reporting date.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <FolderKanban className="size-4" />
                  <FormLabel>Project name</FormLabel>
                </div>

                <FormControl>
                  <Input
                    placeholder="Enter the project name"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reportDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="size-4" />
                  <FormLabel>Report date</FormLabel>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />

                        {field.value
                          ? format(field.value, "dd MMMM yyyy")
                          : "Select a report date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Task information</h2>

          <p className="text-muted-foreground text-sm">
            Provide a clear summary of your daily development work.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="previousTasks"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <ClipboardList className="size-4" />
                  <FormLabel>Previous tasks</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Describe the tasks assigned previously..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Include tasks planned or assigned before this report.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="completedTasks"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4" />
                  <FormLabel>Completed tasks</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Describe the tasks completed today..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Mention completed features, bug fixes, or code reviews.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inProgressTasks"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <ListTodo className="size-4" />
                  <FormLabel>Tasks in progress</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Describe the tasks currently in progress..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Include the current progress or completion percentage.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blockers"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <Ban className="size-4" />
                  <FormLabel>Blockers</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Describe any blockers or challenges..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Leave this empty when there are no blockers.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Next plan and remarks</h2>

          <p className="text-muted-foreground text-sm">
            Add your plan for tomorrow and any additional information.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="tomorrowPlan"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <StepForward className="size-4" />
                  <FormLabel>Tomorrow&apos;s plan</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Describe the tasks planned for tomorrow..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  List the tasks you expect to continue or begin.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <MessageSquareText className="size-4" />
                  <FormLabel>Remarks</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Enter additional remarks..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>This field is optional.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
    </>
  );
}
