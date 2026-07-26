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
  type UpdateGeneralRequestValue,
  updateGeneralRequestSchema,
} from "@/db/validation/general-request";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GeneralRequestItem } from "../../general-request/_hooks/general-request-types";
import { useUpdateGeneralRequest } from "../../general-request/_hooks/use-general-request";
import { GeneralRequestFields } from "./general-request-fields";

type EditGeneralRequestDialogProps = {
  request: GeneralRequestItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditGeneralRequestDialog({
  request,
  open,
  onOpenChange,
}: EditGeneralRequestDialogProps) {
  const updateRequest = useUpdateGeneralRequest();

  const form = useForm<UpdateGeneralRequestValue>({
    resolver: zodResolver(updateGeneralRequestSchema),
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

  async function onSubmit(values: UpdateGeneralRequestValue) {
    if (!request) {
      return;
    }

    try {
      await updateRequest.mutateAsync({
        id: request.id,
        values,
      });

      toast.success("General request updated successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update general request.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit General Request</DialogTitle>

          <DialogDescription>
            Update the request information before it is reviewed.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <GeneralRequestFields />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={updateRequest.isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={updateRequest.isPending}>
                {updateRequest.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}

                {updateRequest.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
