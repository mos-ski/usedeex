import { useState } from "react";
import { Calendar, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const months = ["September 2026", "August 2026", "July 2026", "June 2026", "May 2026", "April 2026"];

const GenerateStatement = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"monthly" | "custom">("monthly");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const download = (label: string) => toast.success(`${label} statement generated`, { description: "PDF saved to your device" });

  const dateField = (label: string, value: Date | undefined, setter: (date?: Date) => void) => (
    <label className="block">
      <span className="mb-2 block text-xs text-brand-bodyText">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className={cn("flex h-14 w-full items-center gap-3 rounded-lg border border-brand-grey100 px-4 text-left text-sm text-brand-grey900", !value && "text-brand-grey300")}>
            <Calendar className="size-5 text-brand-blue500" />{value ? format(value, "PPP") : `Select ${label.toLowerCase()}`}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-brand-grey100 bg-white p-0" align="start"><CalendarComponent mode="single" selected={value} onSelect={setter} initialFocus /></PopoverContent>
      </Popover>
    </label>
  );

  return (
    <AppShell className="bg-white" innerClassName="pb-10 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Generate statement" onBack={() => navigate(-1)} />
        <SectionCard className="px-4 py-3">
          <div role="tablist" className="flex rounded bg-brand-barBg p-0.5">
            {(["monthly", "custom"] as const).map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={cn("flex-1 rounded px-3 py-2 text-xs font-semibold capitalize", tab === item ? "bg-white text-brand-blue500" : "text-brand-grey900")}>{item === "custom" ? "Custom range" : item}</button>)}
          </div>
        </SectionCard>
        {tab === "monthly" ? (
          <SectionCard className="mt-3 px-4 py-0">
            {months.map((month, index) => <button key={month} type="button" onClick={() => download(month)} className={cn("flex w-full items-center gap-4 py-4 text-left", index < months.length - 1 && "border-b border-brand-grey100")}><span className="flex size-10 items-center justify-center rounded-full bg-brand-tint text-brand-blue500"><FileText className="size-5" /></span><span className="flex-1 text-sm font-semibold text-brand-grey900">{month}</span><Download className="size-5 text-brand-blue500" /></button>)}
          </SectionCard>
        ) : (
          <SectionCard className="mt-3 space-y-4 px-4 py-5">
            {dateField("Start date", startDate, setStartDate)}
            {dateField("End date", endDate, setEndDate)}
            <PrimaryButton className="mt-4" disabled={!startDate || !endDate} onClick={() => startDate && endDate && download(`${format(startDate, "MMM d")} – ${format(endDate, "MMM d, yyyy")}`)}><Download className="size-5" />Generate statement</PrimaryButton>
          </SectionCard>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default GenerateStatement;
