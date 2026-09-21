import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** One shimmering placeholder block. */
const Bar = ({ className }: { className?: string }) => (
  <span className={cn("block animate-pulse rounded bg-brand-grey100", className)} />
);

/**
 * Placeholder for a list of AssetRows while it loads — same mark, same two
 * lines left and right, same hairlines — so nothing shifts when the real
 * rows arrive.
 */
export const SkeletonRows = ({
  rows = 3,
  /** Leave off for lists whose rows carry no right-hand figure. */
  trailing = true,
  className,
}: {
  rows?: number;
  trailing?: boolean;
  className?: string;
}) => (
  <div className={cn("flex flex-col", className)} aria-hidden="true">
    {Array.from({ length: rows }, (_, i) => (
      <div
        key={i}
        className={cn("flex items-center gap-4 py-3", i < rows - 1 && "border-b border-brand-grey100")}
      >
        <Bar className="size-8 shrink-0 rounded-full" />
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Bar className="h-3 w-[55%]" />
          <Bar className="h-2.5 w-[30%]" />
        </span>
        {trailing && (
          <span className="flex shrink-0 flex-col items-end gap-1.5">
            <Bar className="h-3 w-20" />
            <Bar className="h-2.5 w-12" />
          </span>
        )}
      </div>
    ))}
  </div>
);

/**
 * True until the list has had a beat to arrive. One place to swap for a real
 * pending flag once these lists come off an API.
 */
export const useListLoading = (ms = 700) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return loading;
};

export default SkeletonRows;
