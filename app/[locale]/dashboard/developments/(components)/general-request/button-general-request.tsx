import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { Plus } from "lucide-react";

export function ButtonSubmitGeneralRequest() {
  return (
    <Button asChild variant="outline" className="w-full sm:w-auto">
      <Link
        href="/dashboard/developments/general-request/create"
        className="flex items-center gap-2"
      >
        <Plus
          className="size-4 rounded-full bg-gray-200 p-0.5 text-gray-800"
          aria-hidden="true"
        />
        <span>Request</span>
      </Link>
    </Button>
  );
}
