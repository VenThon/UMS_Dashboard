import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";

export function ButtonCreateUser() {
  return (
    <Button
      asChild
      className="w-full bg-green-600 hover:bg-green-600 text-white sm:w-auto"
    >
      <Link
        href="/dashboard/admin/users/create"
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4 rounded-full bg-white p-0.5 text-green-600" />
        <span>Create New</span>
      </Link>
    </Button>
  );
}
