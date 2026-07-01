import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { Plus } from "lucide-react";

export function ButtonCreateDailyReport() {
  return (
    <Button
      asChild
      className="w-full bg-green-600 text-white hover:bg-green-700 sm:w-auto"
    >
      <Link
        href="/dashboard/developments/report/create"
        className="flex items-center gap-2"
      >
        <Plus
          className="size-4 rounded-full bg-white p-0.5 text-green-600"
          aria-hidden="true"
        />
        <span>Create Report</span>
      </Link>
    </Button>
  );
}
