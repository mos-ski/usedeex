import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { customersList, ordersList, payoutsList, billPaymentsList } from "@/data/adminMockData";

type Result = {
  type: "User" | "Order" | "Payout" | "Bill";
  title: string;
  subtitle: string;
  onClick: () => void;
};

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results: Result[] = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    const out: Result[] = [];

    customersList.forEach((c, i) => {
      if (c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s)) {
        out.push({
          type: "User",
          title: c.name,
          subtitle: c.email,
          onClick: () => navigate(`/admin/users/${i}`),
        });
      }
    });

    ordersList.forEach((o) => {
      if (
        o.name.toLowerCase().includes(s) ||
        o.txId.toLowerCase().includes(s) ||
        o.payoutRef?.toLowerCase().includes(s) ||
        o.walletAddress?.toLowerCase().includes(s)
      ) {
        out.push({
          type: "Order",
          title: `${o.name} — ${o.asset}`,
          subtitle: `${o.amount} · ${o.txId.slice(0, 14)}…`,
          onClick: () => navigate("/admin?tab=orders"),
        });
      }
    });

    payoutsList.forEach((p) => {
      if (p.name.toLowerCase().includes(s) || p.orderRef.toLowerCase().includes(s)) {
        out.push({
          type: "Payout",
          title: p.name,
          subtitle: `${p.amount} · ${p.bank}`,
          onClick: () => navigate("/admin?tab=payouts"),
        });
      }
    });

    billPaymentsList.forEach((b) => {
      if (
        b.user.toLowerCase().includes(s) ||
        b.phone.includes(s) ||
        b.txRef.toLowerCase().includes(s) ||
        b.provider.toLowerCase().includes(s)
      ) {
        out.push({
          type: "Bill",
          title: `${b.user} — ${b.provider}`,
          subtitle: `${b.amount} · ${b.phone}`,
          onClick: () => navigate("/admin?tab=bill-payments"),
        });
      }
    });

    return out.slice(0, 20);
  }, [q, navigate]);

  const typeColor = (t: Result["type"]) => ({
    User: "bg-brand-blue500/10 text-brand-blue500",
    Order: "bg-brand-amber/10 text-brand-amber",
    Payout: "bg-brand-success/10 text-brand-success",
    Bill: "bg-brand-warning400/10 text-brand-warning400",
  })[t];

  return (
    <div ref={ref} className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-grey500 pointer-events-none" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search users, orders, payouts…"
        className="h-9 w-44 md:w-72 bg-white border border-brand-grey100 rounded-lg pl-8 pr-8 text-xs md:text-sm text-brand-grey900 placeholder:text-brand-grey400 outline-none focus:ring-1 focus:ring-brand-blue500"
      />
      {q && (
        <button onClick={() => { setQ(""); setOpen(false); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-grey500 hover:text-brand-grey900">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {open && q && (
        <div className="absolute right-0 mt-2 w-[min(90vw,420px)] max-h-[60vh] overflow-y-auto bg-brand-surface border border-brand-grey100 rounded-xl shadow-xl z-50">
          {results.length === 0 ? (
            <div className="p-4 text-xs text-brand-grey500 text-center">No results for "{q}"</div>
          ) : (
            <div className="py-1">
              {results.map((r, i) => (
                <button key={i}
                  onClick={() => { r.onClick(); setOpen(false); setQ(""); }}
                  className="w-full text-left px-3 py-2.5 hover:bg-brand-tint flex items-center gap-3 transition-colors">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${typeColor(r.type)}`}>{r.type}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-brand-grey900 truncate">{r.title}</p>
                    <p className="text-xs text-brand-grey500 truncate">{r.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
