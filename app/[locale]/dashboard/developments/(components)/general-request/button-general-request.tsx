import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { Plus } from "lucide-react";

export function ButtonSubmitGeneralRequest() {
  return (
    <Button
      asChild
      className="w-full bg-green-600 text-white hover:bg-green-600 sm:w-auto"
    >
      <Link
        href="/dashboard/developments/general-request/create"
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4 rounded-full bg-white p-0.5 text-green-600" />
        <span>Request</span>
      </Link>
    </Button>
  );
}
