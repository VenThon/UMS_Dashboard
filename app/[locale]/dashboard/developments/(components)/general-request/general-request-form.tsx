"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { REQUEST_PRIORITIES } from "@/db/constants/general-request";
import {
  CreateGeneralRequestInput,
  createGeneralRequestSchema,
} from "@/db/validation/general-request";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ClipboardPlus, FileText, Info, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateGeneralRequest } from "../../general-request/_hooks/use-general-request";
import { GeneralRequestFields } from "./general-request-fields";

export function CreateGeneralRequestForm() {
  const router = useRouter();

  const form = useForm<CreateGeneralRequestInput>({
    resolver: zodResolver(createGeneralRequestSchema),
    defaultValues: {
      requestType: undefined,
      title: "",
      description: "",
      reason: "",
      expectedBenefit: "",
      priority: REQUEST_PRIORITIES.MEDIUM,
      requiredDate: "",
      estimatedCost: undefined,
      currency: undefined,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const createRequest = useCreateGeneralRequest();

  async function onSubmit(values: CreateGeneralRequestInput) {
    try {
      await createRequest.mutateAsync(values);

      toast.success("General request created successfully.");

      form.reset();
      router.push("/dashboard/developments/general-request");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create general request.",
      );
    }
  }

  return (
    <div className="mx-auto w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 flex size-11 shrink-0 items-center justify-center rounded-xl">
            <ClipboardPlus className="text-primary size-5" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create General Request
            </h1>

            <p className="text-muted-foreground text-sm">
              Submit a new request for review and approval.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <div className="bg-muted/30 flex items-start gap-3 rounded-xl border p-4">
        <Info className="text-primary mt-0.5 size-5 shrink-0" />

        <div className="space-y-1">
          <p className="text-sm font-medium">Request guidelines</p>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Provide clear and complete information about your request, including
            its purpose, expected benefit, priority, required date, and
            estimated cost when applicable.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="bg-muted/30 border-b px-5 py-2 sm:px-4">
          <div className="flex items-start gap-3">
            <div className="bg-background flex size-10 shrink-0 items-center justify-center rounded-xl border">
              <FileText className="text-muted-foreground size-5" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-lg">
                General Request Information
              </CardTitle>

              <CardDescription className="max-w-2xl">
                Submit a request for training, equipment, software, workplace
                support, or another staff requirement.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <GeneralRequestFields />

              <div className="flex flex-col-reverse gap-4 border-t pt-6 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Please review the information before submitting. Required
                  fields must be completed.
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={createRequest.isPending}
                  >
                    <Send className="size-4" />

                    {createRequest.isPending
                      ? "Submitting..."
                      : "Submit Request"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
