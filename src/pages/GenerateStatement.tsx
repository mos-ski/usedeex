import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Calendar, FileText } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const months = [
  { label: "March 2026", key: "2026-03" },
  { label: "February 2026", key: "2026-02" },
  { label: "January 2026", key: "2026-01" },
  { label: "December 2025", key: "2025-12" },
  { label: "November 2025", key: "2025-11" },
  { label: "October 2025", key: "2025-10" },
];

const GenerateStatement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"monthly" | "custom">("monthly");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleMonthlyDownload = (month: string) => {
    toast.success(`Statement for ${month} downloaded`, { description: "PDF saved to your device" });
  };

  const handleCustomDownload = () => {
    if (!startDate || !endDate) return;
    toast.success("Custom statement generated", { description: `${format(startDate, "MMM d, yyyy")} — ${format(endDate, "MMM d, yyyy")}` });
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Generate Statement</h2>
            <NewBadge />
          </div>

          <div className="flex bg-secondary rounded-full p-1 mb-6">
            <button onClick={() => setActiveTab("monthly")} className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "monthly" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </button>
            <button onClick={() => setActiveTab("custom")} className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${activeTab === "custom" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
              Custom Range <NewBadge />
            </button>
          </div>

          {activeTab === "monthly" ? (
            <div className="space-y-2">
              {months.map(m => (
                <button key={m.key} onClick={() => handleMonthlyDownload(m.label)} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                  </div>
                  <Download className="w-4 h-4 text-primary" />
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn("w-full h-12 bg-secondary rounded-xl px-4 flex items-center gap-2 text-left", !startDate && "text-muted-foreground")}>
                        <Calendar className="w-4 h-4" />
                        {startDate ? format(startDate, "PPP") : "Select start date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn("w-full h-12 bg-secondary rounded-xl px-4 flex items-center gap-2 text-left", !endDate && "text-muted-foreground")}>
                        <Calendar className="w-4 h-4" />
                        {endDate ? format(endDate, "PPP") : "Select end date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <button onClick={handleCustomDownload}
                className={`w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 ${startDate && endDate ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Download className="w-5 h-5" /> Generate Statement
              </button>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default GenerateStatement;
