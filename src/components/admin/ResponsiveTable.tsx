import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    <div className="bg-brand-surface border border-brand-grey100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className={`grid gap-0 border-b border-brand-grey100 bg-brand-grey50 ${isMobile ? "" : ""}`}
        style={{ gridTemplateColumns: isMobile ? `${mobileColumns.map(() => "1fr").join(" ")} 32px` : columns.map(() => "1fr").join(" ") }}>
        {displayColumns.map(col => (
          <div key={col.key} className="h-12 px-3 md:px-4 flex items-center text-xs font-medium text-brand-grey500 uppercase tracking-wider">
            {col.label}
          </div>
        ))}
        {isMobile && <div className="h-12 px-1 flex items-center" />}
      </div>

      {/* Body */}
      {data.map((row, i) => {
        const isExpanded = expandedRow === i;
        return (
          <div key={i} className="border-b border-brand-grey100 last:border-0">
            <div
              className={`grid gap-0 transition-colors hover:bg-brand-tint/50 ${onRowClick || isMobile ? "cursor-pointer" : ""}`}
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
                <div className="px-1 py-3 flex items-center justify-center">
                  <ChevronDown className={`w-4 h-4 text-brand-grey500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              )}
            </div>

            {/* Expanded details on mobile */}
            {isMobile && isExpanded && hiddenColumns.length > 0 && (
              <div className="px-3 pb-3 pt-1 bg-brand-grey50 space-y-2">
                {hiddenColumns.map(col => (
                  <div key={col.key} className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-brand-grey500 shrink-0">{col.label}</span>
                    <div className="text-right">{col.render(row, startIndex + i)}</div>
                  </div>
                ))}
                {onRowClick && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onRowClick(row, startIndex + i); }}
                    className="w-full mt-1 h-8 bg-brand-blue500/10 text-brand-blue500 rounded-lg text-xs font-medium"
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
        <div className="px-4 py-8 text-center text-sm text-brand-grey500">
          No records found
        </div>
      )}
    </div>
  );
}
