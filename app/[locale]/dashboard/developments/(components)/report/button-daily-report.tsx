import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { Plus } from "lucide-react";

export function ButtonCreateDailyReport() {
  return (
    <Button asChild className="w-full sm:w-auto" variant="outline">
      <Link
        href="/dashboard/developments/report/create"
        className="flex items-center gap-2"
      >
        <Plus
          className="size-4 rounded-full bg-gray-200 p-0.5 text-gray-800"
          aria-hidden="true"
        />
        <span>Create Report</span>
      </Link>
    </Button>
  );
}
