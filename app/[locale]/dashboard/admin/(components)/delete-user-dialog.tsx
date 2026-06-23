"use clientt";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteUser } from "@/hooks/admin/users.hook";

import { ShieldQuestionMark, Trash2 } from "lucide-react";

type DeleteProps = {
  id: string;
};

export function DeleteUserDialog({ id }: DeleteProps) {
  const deleteUserMutation = useDeleteUser();
  const handleDelete = useCallback(() => {
    deleteUserMutation.mutate(id);
  }, [deleteUserMutation, id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Trash2 className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <ShieldQuestionMark size={32} className="text-amber-600" />
            </div>
          </div>
          <DialogTitle className="mt-4 text-center">Delete User</DialogTitle>
          <DialogDescription className="mt-2 text-center">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="submit"
            onClick={handleDelete}
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
