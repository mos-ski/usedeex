import { useState } from "react";
import { ChevronDown, Inbox } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface ResponsiveColumn<T> {
  key: string;
  label: string;
  /** Show on mobile condensed view (max 3-4 columns) */
  mobile?: boolean;
  render: (row: T, index: number) => React.ReactNode;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: ResponsiveColumn<T>[];
  onRowClick?: (row: T, index: number) => void;
  startIndex?: number;
}

export function ResponsiveTable<T>({ data, columns, onRowClick, startIndex = 0 }: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const mobileColumns = columns.filter(c => c.mobile);
  const hiddenColumns = columns.filter(c => !c.mobile);
  const displayColumns = isMobile ? mobileColumns : columns;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="grid gap-0 border-b border-gray-200 bg-gray-50"
        style={{ gridTemplateColumns: isMobile ? `${mobileColumns.map(() => "1fr").join(" ")} 32px` : columns.map(() => "1fr").join(" ") }}>
        {displayColumns.map(col => (
          <div key={col.key} className="flex h-11 items-center px-3 text-xs font-medium uppercase tracking-wider text-gray-500 md:px-4">
            {col.label}
          </div>
        ))}
        {isMobile && <div className="flex h-11 items-center px-1" />}
      </div>

      {/* Body */}
      {data.map((row, i) => {
        const isExpanded = expandedRow === i;
        return (
          <div key={i} className="border-b border-gray-100 last:border-0">
            <div
              className={`grid gap-0 transition-colors hover:bg-gray-50 ${onRowClick || isMobile ? "cursor-pointer" : ""}`}
              style={{ gridTemplateColumns: isMobile ? `${mobileColumns.map(() => "1fr").join(" ")} 32px` : columns.map(() => "1fr").join(" ") }}
              onClick={() => {
                if (isMobile) {
                  setExpandedRow(isExpanded ? null : i);
                } else if (onRowClick) {
                  onRowClick(row, startIndex + i);
                }
              }}
            >
              {displayColumns.map(col => (
                <div key={col.key} className="px-3 md:px-4 py-3 flex items-center min-h-[48px]">
                  {col.render(row, startIndex + i)}
                </div>
              ))}
              {isMobile && (
                <div className="flex items-center justify-center px-1 py-3">
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              )}
            </div>

            {/* Expanded details on mobile */}
            {isMobile && isExpanded && hiddenColumns.length > 0 && (
              <div className="space-y-2 bg-gray-50 px-3 pb-3 pt-1">
                {hiddenColumns.map(col => (
                  <div key={col.key} className="flex items-center justify-between gap-2">
                    <span className="shrink-0 text-[11px] text-gray-500">{col.label}</span>
                    <div className="text-right">{col.render(row, startIndex + i)}</div>
                  </div>
                ))}
                {onRowClick && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onRowClick(row, startIndex + i); }}
                    className="mt-1 h-8 w-full rounded-lg bg-amber-500 text-xs font-medium text-white transition-colors hover:bg-amber-600"
                  >
                    View Details
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Inbox className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-semibold text-gray-900">No records found</p>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search</p>
        </div>
      )}
    </div>
  );
}
