import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import EmptyState from "@/components/EmptyState";
import SkeletonRows, { useListLoading } from "@/components/dashboard/SkeletonRows";
import { AppShell, SectionCard } from "@/components/dashboard/AppShell";
import FloatingNav from "@/components/dashboard/FloatingNav";
import BalanceToggle from "@/components/dashboard/BalanceToggle";
import { maskAmount, useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import AssetMark from "@/components/dashboard/AssetMark";
import {
  ArrowLeftIcon,
  FilterLinesIcon,
  SearchIcon,
} from "@/components/dashboard/icons";
import TransactionFilterSheet, {
  defaultTransactionFilters,
  type TransactionFilters,
} from "@/components/dashboard/TransactionFilterSheet";
import { NGN_PER_USD, formatNgn, formatUsd, splitUsdForDisplay } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  activityTransactions,
  type ActivityCategory,
  type ActivityTransaction,
} from "@/data/activityTransactions";

type TabKey = ActivityCategory | "all";

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "crypto", label: "Crypto" },
  { key: "giftcards", label: "Giftcards" },
  { key: "bills", label: "Bills" },
  { key: "payouts", label: "Payouts" },
];

const ActivityPage = () => {
  const navigate = useNavigate();
  const { hidden } = useBalanceVisibility();
  const [tab, setTab] = useState<TabKey>("all");
  const [filters, setFilters] = useState<TransactionFilters>(defaultTransactionFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const loadingList = useListLoading();

  const filtered = useMemo(
    () =>
      activityTransactions.filter((tx) => {
        const matchTab = tab === "all" || tx.category === tab;
        const matchAction = filters.action === "all" || tx.action === filters.action;
        const matchStatus = filters.status === "all"
          || (filters.status === "completed" && tx.status === "Success")
          || (filters.status === "pending" && tx.status === "Pending")
          || (filters.status === "failed" && tx.status === "Failed");
        const transactionDate = new Date(`${tx.occurredAt}T00:00:00`);
        const now = new Date();
        const rangeDays = filters.dateRange === "last-week" ? 7 : filters.dateRange === "last-month" ? 30 : filters.dateRange === "last-3-months" ? 90 : null;
        const matchDate = rangeDays === null || transactionDate >= new Date(now.getTime() - rangeDays * 86_400_000);
        const q = query.trim().toLowerCase();
        const matchQuery =
          !q || tx.hashId?.toLowerCase().includes(q) || tx.title.toLowerCase().includes(q);
        return matchTab && matchAction && matchStatus && matchDate && matchQuery;
      }),
    [tab, filters, query],
  );

  const grouped = useMemo(
    () =>
      filtered.reduce<Record<string, ActivityTransaction[]>>((acc, tx) => {
        (acc[tx.month] = acc[tx.month] || []).push(tx);
        return acc;
      }, {}),
    [filtered],
  );

  const total = splitUsdForDisplay(filtered.reduce((sum, tx) => sum + tx.ngn, 0) / NGN_PER_USD);
  const activeLabel = tabs.find((t) => t.key === tab)?.label ?? "";
  const hasActiveFilters = filters.action !== "all" || filters.status !== "all" || filters.dateRange !== "all-time";

  return (
    // Mobile mirrors the Figma: navy summary flush against the white list, which
    // runs to the bottom edge. From `sm` up both become cards in the shell.
    <AppShell topColor="bg-brand-deepNavy" innerClassName="flex min-h-[100dvh] flex-col pb-0 sm:block sm:min-h-0 sm:pb-36">
      <PageTransition className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col sm:gap-3 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-5 lg:pt-6">
          {/* Summary */}
          <section className="bg-brand-deepNavy text-white lg:sticky lg:top-6">
            <header className="flex h-14 items-center gap-1 px-4 lg:px-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <ArrowLeftIcon className="size-6" />
              </button>
              <h1 className="min-w-0 flex-1 truncate text-[19px] font-bold leading-[1.4] lg:text-2xl">Activity</h1>
            </header>

            <div className="flex flex-col items-center gap-1 px-6 py-[18px] lg:py-8">
              <p className="flex items-center justify-center gap-0.5 text-center text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600 lg:text-xs">
                Total • {activeLabel} ({filters.status === "all" ? "all" : filters.status})
                <BalanceToggle />
              </p>
              <p className="whitespace-nowrap font-gasoek leading-[1.4]">
                {hidden ? (
                  <span className="text-[33px] lg:text-[42px]">{maskAmount(total.lead + total.cents)}</span>
                ) : (
                  <>
                    <span className="text-[33px] lg:text-[42px]">{total.lead}</span>
                    <span className="text-[17px] lg:text-[22px]">{total.cents}</span>
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-3 px-4 py-3 lg:px-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] font-semibold leading-[1.4]">Missing or pending transactions?</p>
                <button
                  type="button"
                  onClick={() => setSearchOpen((v) => !v)}
                  aria-expanded={searchOpen}
                  className="flex shrink-0 items-center gap-1 text-[10px] font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-80"
                >
                  <SearchIcon className="size-[13.5px]" />
                  Find with Hash ID
                </button>
              </div>

              {searchOpen && (
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a hash ID or transaction name"
                  className="w-full border-b border-white/20 bg-transparent py-2 text-[15px] leading-[1.4] text-white outline-none placeholder:text-white/40 focus:border-brand-blue500"
                />
              )}
            </div>
          </section>

          {/* Filters + list */}
          <div className="flex flex-1 flex-col sm:gap-3 lg:gap-5">
            <SectionCard className="px-4 py-3">
              <div className="flex items-center gap-2">
                <div
                  role="tablist"
                  aria-label="Transaction type"
                  className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto rounded bg-brand-barBg p-0.5"
                >
                  {tabs.map(({ key, label }) => (
                    <button
                      key={key}
                      role="tab"
                      type="button"
                      aria-selected={tab === key}
                      onClick={() => setTab(key)}
                      className={cn(
                        "shrink-0 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                        tab === key ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Filter transactions"
                  aria-expanded={filtersOpen}
                  onClick={() => setFiltersOpen(true)}
                  className={cn(
                    "flex shrink-0 items-center rounded p-2 text-brand-blue500 transition-colors hover:bg-brand-grey50",
                    hasActiveFilters && "bg-brand-primary100/50",
                  )}
                >
                  <FilterLinesIcon className="size-[18px]" />
                </button>
              </div>
            </SectionCard>

            <SectionCard className="flex-1 px-4 pb-28 sm:pb-3 lg:pb-5">
              {loadingList ? (
                <SkeletonRows rows={5} />
              ) : Object.keys(grouped).length === 0 ? (
                <EmptyState
                  title="No transactions yet"
                  description="Transactions in this category will appear here once you start trading"
                />
              ) : (
                Object.entries(grouped).map(([month, txns]) => {
                  return (
                    <div key={month}>
                      <div className="flex items-start gap-[18px] py-1.5">
                        <h2 className="min-w-0 flex-1 text-xs font-semibold leading-[1.4] text-brand-grey900 lg:text-sm">
                          {month}
                        </h2>
                      </div>

                      <div className="flex flex-col">
                        {txns.map((tx) => (
                          <button
                            key={tx.id}
                            type="button"
                            onClick={() =>
                              navigate("/receipt", { state: { type: tx.receiptType, data: tx } })
                            }
                            className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
                          >
                            <AssetMark symbol={tx.symbol} />
                            <span className="flex min-w-0 flex-1 flex-col">
                              <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                                {tx.title}
                              </span>
                              <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                                {tx.date} •{" "}
                                <span
                                  className={
                                    tx.status === "Success" ? "text-brand-successText" : "text-brand-warning400"
                                  }
                                >
                                  {tx.status}
                                </span>
                              </span>
                            </span>
                            <span className="flex shrink-0 flex-col items-end">
                              <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                                {formatNgn(tx.ngn)}
                              </span>
                              <span className="whitespace-nowrap text-xs leading-[1.3] text-brand-bodyText">
                                {tx.secondaryOverride ?? formatUsd(tx.ngn / NGN_PER_USD)}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </SectionCard>
          </div>
        </div>
      </PageTransition>

      <FloatingNav />
      <TransactionFilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} value={filters} onApply={setFilters} />
    </AppShell>
  );
};

export default ActivityPage;
