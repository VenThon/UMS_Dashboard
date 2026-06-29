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
  GENERAL_REQUEST_TYPE_LABELS,
  GENERAL_REQUEST_TYPES,
  REQUEST_PRIORITIES,
  REQUEST_PRIORITY_LABELS,
} from "@/db/constants/general-request";
import { CreateGeneralRequestFormValues } from "@/db/validation/general-request";
import {
  Banknote,
  CalendarDays,
  FileText,
  Gift,
  ListChecks,
  MessageSquareText,
  Tag,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { getTodayDate } from "../lib";

export function GeneralRequestFields() {
  const today = getTodayDate();
  const form = useFormContext<CreateGeneralRequestFormValues>();
  const estimatedCost = useWatch({
    control: form.control,
    name: "estimatedCost",
  });

  return (
    <>
      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Request information</h2>

          <p className="text-muted-foreground text-sm">
            Select the request category and provide a clear title.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <Tag className="size-4" />
                  <FormLabel>Request type</FormLabel>
                </div>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {Object.values(GENERAL_REQUEST_TYPES).map((requestType) => (
                      <SelectItem key={requestType} value={requestType}>
                        {GENERAL_REQUEST_TYPE_LABELS[requestType]}
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
            name="priority"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <ListChecks className="size-4" />
                  <FormLabel>Priority</FormLabel>
                </div>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {Object.values(REQUEST_PRIORITIES).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {REQUEST_PRIORITY_LABELS[priority]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1.5">
                <FileText className="size-4" />
                <FormLabel>Request title</FormLabel>
              </div>

              <FormControl>
                <Input
                  placeholder="Example: Request for a new development laptop"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Request details</h2>

          <p className="text-muted-foreground text-sm">
            Explain what you need, why you need it, and how it will help.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <MessageSquareText className="size-4" />
                  <FormLabel>Description</FormLabel>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Describe what you are requesting..."
                    className="min-h-36 resize-y"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Include details such as course, equipment, or service
                  information.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

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
                    placeholder="Explain why this request is necessary..."
                    className="min-h-36 resize-y"
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

        <FormField
          control={form.control}
          name="expectedBenefit"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1.5">
                <Gift className="size-4" />
                <FormLabel>
                  Expected benefit
                  <span className="text-muted-foreground ml-1">(optional)</span>
                </FormLabel>
              </div>

              <FormControl>
                <Textarea
                  placeholder="Explain how this request will benefit your work, team, or organization..."
                  className="min-h-28 resize-y"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-base font-semibold">Schedule and cost</h2>

          <p className="text-muted-foreground text-sm">
            Add the required date and estimated cost when applicable.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="requiredDate"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  <FormLabel>
                    Required date
                    <span className="text-muted-foreground ml-1">
                      (optional)
                    </span>
                  </FormLabel>
                </div>

                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
            <FormField
              control={form.control}
              name="estimatedCost"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1.5">
                    <Banknote className="size-4" />
                    <FormLabel>
                      Estimated cost
                      <span className="text-muted-foreground ml-1">
                        (optional)
                      </span>
                    </FormLabel>
                  </div>

                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={field.value ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;

                        field.onChange(
                          value === "" ? undefined : Number(value),
                        );
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={estimatedCost === undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="KHR">KHR</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
}
