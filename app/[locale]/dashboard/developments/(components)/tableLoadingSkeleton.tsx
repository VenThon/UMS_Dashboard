import { Skeleton } from "@/components/ui/skeleton";

type TableLoadingSkeletonProps = {
  rows?: number;
  columns?: number;
};

export function TableLoadingSkeleton({
  rows = 6,
  columns = 5,
}: TableLoadingSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div
        className="bg-muted/50 grid gap-4 border-b p-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 p-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <Skeleton key={columnIndex} className="h-4 w-full max-w-32" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
