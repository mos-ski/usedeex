import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "line" | "circle" | "transaction";
  count?: number;
}

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-muted rounded-lg", className)} />
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("bg-card border border-border rounded-2xl p-5 space-y-3", className)}>
    <SkeletonPulse className="h-3 w-24" />
    <SkeletonPulse className="h-8 w-40" />
    <SkeletonPulse className="h-3 w-32" />
  </div>
);

export const SkeletonTransaction = () => (
  <div className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
    <div className="flex items-center gap-3">
      <SkeletonPulse className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <SkeletonPulse className="h-3 w-24" />
        <SkeletonPulse className="h-2 w-16" />
      </div>
    </div>
    <div className="space-y-2 flex flex-col items-end">
      <SkeletonPulse className="h-3 w-16" />
      <SkeletonPulse className="h-2 w-12" />
    </div>
  </div>
);

export const SkeletonTransactionList = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonTransaction key={i} />
    ))}
  </div>
);

export const SkeletonAssetRow = () => (
  <div className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
    <div className="flex items-center gap-3">
      <SkeletonPulse className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <SkeletonPulse className="h-3 w-20" />
        <SkeletonPulse className="h-2 w-12" />
      </div>
    </div>
    <div className="space-y-2 flex flex-col items-end">
      <SkeletonPulse className="h-3 w-14" />
      <SkeletonPulse className="h-2 w-10" />
    </div>
  </div>
);

const SkeletonLoader = ({ variant = "line", count = 1, className }: SkeletonLoaderProps) => {
  if (variant === "card") return <SkeletonCard className={className} />;
  if (variant === "transaction") return <SkeletonTransactionList count={count} />;
  if (variant === "circle") return <SkeletonPulse className={cn("w-10 h-10 rounded-full", className)} />;
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonPulse key={i} className={cn("h-4 w-full", className)} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
