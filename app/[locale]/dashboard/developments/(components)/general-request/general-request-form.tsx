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
  CreateGeneralRequestFormValues,
  createGeneralRequestSchema,
} from "@/db/validation/general-request";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { GeneralRequestFields } from "./general-request-fields";

export function CreateGeneralRequestForm() {
  const router = useRouter();

  const form = useForm<CreateGeneralRequestFormValues>({
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

  async function onSubmit(values: CreateGeneralRequestFormValues) {
    const payload = {
      ...values,
      requiredDate: values.requiredDate || undefined,
      expectedBenefit: values.expectedBenefit || undefined,
      estimatedCost: values.estimatedCost ?? undefined,
      currency:
        values.estimatedCost !== undefined ? values.currency : undefined,
    };

    console.log("General request payload:", payload);
  }

  return (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader className="border-b">
        <CardTitle>Create General Request</CardTitle>

        <CardDescription>
          Submit a request for training, equipment, software, workplace support,
          or another staff requirement.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <GeneralRequestFields />
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={form.formState.isSubmitting}
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={form.formState.isSubmitting}
              >
                <Send className="size-4" />

                {form.formState.isSubmitting
                  ? "Submitting..."
                  : "Submit Request"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
