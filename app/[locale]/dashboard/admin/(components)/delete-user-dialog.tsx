import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldQuestionMark, Trash2 } from "lucide-react";
type DeleteProps = {
  id: string;
};

export function DeleteUserDialog({}: DeleteProps) {
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
          <DialogDescription className="text-center mt-2">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" type="submit">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
