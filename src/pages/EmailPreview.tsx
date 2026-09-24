import { useEffect, useMemo, useRef, useState } from "react";
import { emailCatalog, emailCategories, emailSamples, renderEmail, type EmailName } from "@/emails";
import { EMAIL_WIDTH } from "@/emails/layout";

type ZoomMode = "fit" | "actual";

const LOCAL_ASSET_BASE = "/emails/";
const PRODUCTION_ASSET_BASE = "https://deex.com/emails/";

/** Development-only catalogue for reviewing every operational email. */
const EmailPreview = () => {
  const [active, setActive] = useState<EmailName>("welcome");
  const [query, setQuery] = useState("");
  const [zoomMode, setZoomMode] = useState<ZoomMode>("fit");
  const [emailHeight, setEmailHeight] = useState(1100);
  const [viewport, setViewport] = useState({ width: 900, height: 900 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const html = useMemo(
    () => renderEmail(active, emailSamples[active] as never).replaceAll(PRODUCTION_ASSET_BASE, LOCAL_ASSET_BASE),
    [active],
  );

  const visibleCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return emailCategories
      .map((category) => ({
        ...category,
        templateIds: category.templateIds.filter((id) => {
          const definition = emailCatalog[id];
          return !normalized || `${definition.label} ${category.label}`.toLowerCase().includes(normalized);
        }),
      }))
      .filter((category) => category.templateIds.length > 0);
  }, [query]);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setViewport({ width: Math.max(320, rect.width - 40), height: Math.max(320, rect.height - 40) });
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scale = zoomMode === "fit" ? Math.min(1, viewport.width / EMAIL_WIDTH, viewport.height / emailHeight) : 1;
  const selected = emailCatalog[active];

  return (
    <div className="h-[100dvh] overflow-hidden bg-[#071625] font-roboto text-white">
      <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-1">
        <aside className="hidden min-h-0 flex-col border-r border-white/10 bg-[#091B2C] md:flex">
          <div className="border-b border-white/10 p-5">
            <p className="font-gasoek text-xl uppercase leading-none">DeeX Mail</p>
            <p className="mt-2 text-xs text-white/50">{Object.keys(emailCatalog).length} operational templates</p>
            <label className="mt-4 block">
              <span className="sr-only">Search email templates</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates" className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-blue500" />
            </label>
          </div>

          <nav aria-label="Email templates" className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            {visibleCategories.length ? visibleCategories.map((category) => (
              <section key={category.id} className="mb-5">
                <h2 className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">{category.label}</h2>
                <div className="space-y-1">
                  {category.templateIds.map((id) => {
                    const definition = emailCatalog[id];
                    const selectedTemplate = id === active;
                    return (
                      <button key={id} type="button" onClick={() => setActive(id)} aria-current={selectedTemplate ? "page" : undefined} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${selectedTemplate ? "bg-brand-blue500 text-white" : "text-white/70 hover:bg-white/[0.06] hover:text-white"}`}>
                        {definition.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            )) : <p className="px-2 py-8 text-center text-sm text-white/45">No templates found.</p>}
          </nav>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-col">
          <header className="flex min-h-[72px] shrink-0 items-center gap-3 border-b border-white/10 px-4 md:px-6">
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold md:text-lg">{selected.label}</p>
              <p className="truncate text-xs text-white/45">{selected.subject}</p>
            </div>
            <select aria-label="Select email template" value={active} onChange={(event) => setActive(event.target.value as EmailName)} className="max-w-[150px] rounded-lg border border-white/10 bg-[#0D2438] px-2 py-2 text-xs text-white md:hidden">
              {emailCategories.flatMap((category) => category.templateIds.map((id) => <option key={id} value={id}>{emailCatalog[id].label}</option>))}
            </select>
            <div className="flex items-center rounded-lg bg-white/[0.06] p-1 text-xs font-semibold">
              <button type="button" aria-label="Fit preview" aria-pressed={zoomMode === "fit"} onClick={() => setZoomMode("fit")} className={`rounded-md px-3 py-2 ${zoomMode === "fit" ? "bg-brand-blue500 text-white" : "text-white/55"}`}>Fit</button>
              <button type="button" aria-label="Show at 100%" aria-pressed={zoomMode === "actual"} onClick={() => setZoomMode("actual")} className={`rounded-md px-3 py-2 ${zoomMode === "actual" ? "bg-brand-blue500 text-white" : "text-white/55"}`}>100%</button>
            </div>
          </header>

          <div ref={canvasRef} className={`min-h-0 flex-1 bg-[#E8EDF2] p-5 ${zoomMode === "actual" ? "overflow-auto" : "overflow-hidden"}`}>
            <div className="flex min-h-full min-w-full justify-center">
              <div className="relative shrink-0 overflow-hidden bg-white" style={{ width: EMAIL_WIDTH * scale, height: emailHeight * scale }}>
                <iframe
                  key={active}
                  title={`Email preview: ${active}`}
                  srcDoc={html}
                  onLoad={(event) => {
                    const document = event.currentTarget.contentDocument;
                    const measuredHeight = Math.max(document?.documentElement.scrollHeight ?? 0, document?.body.scrollHeight ?? 0);
                    if (measuredHeight > 0) setEmailHeight(Math.max(700, measuredHeight));
                  }}
                  className="absolute left-0 top-0 border-0 bg-white"
                  style={{ width: EMAIL_WIDTH, height: emailHeight, transform: `scale(${scale})`, transformOrigin: "top left" }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailPreview;
