import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type RequestLeaveListingSkeletonProps = {
  rows?: number;
};

export function RequestLeaveListingSkeleton({
  rows = 10,
}: RequestLeaveListingSkeletonProps) {
  return (
    <div className="space-y-8">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-7 w-52" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Skeleton className="h-9 w-full sm:w-32" />
            <Skeleton className="h-9 w-full sm:w-40" />
          </div>
        </CardHeader>
      </Card>

      <Card className="border-border/60 overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="hidden border-b px-4 py-3 md:grid md:grid-cols-7 md:gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="ml-auto h-4 w-14" />
          </div>

          <div className="divide-y">
            {Array.from({ length: rows }).map((_, index) => (
              <div
                key={index}
                className="grid gap-4 px-4 py-4 md:grid-cols-7 md:items-center"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20 md:hidden" />
                </div>

                <Skeleton className="h-6 w-24 rounded-full" />

                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-4 w-20" />

                <Skeleton className="h-6 w-32 rounded-full" />

                <div className="flex justify-end">
                  <Skeleton className="size-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-44" />

        <div className="flex gap-2">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}
