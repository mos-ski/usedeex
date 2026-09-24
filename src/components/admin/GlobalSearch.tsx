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
    User: "bg-blue-50 text-blue-700",
    Order: "bg-amber-50 text-amber-700",
    Payout: "bg-emerald-50 text-emerald-700",
    Bill: "bg-orange-50 text-orange-700",
  })[t];

  return (
    <div ref={ref} className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search users, orders, payouts…"
        className="h-9 w-44 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-8 text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 md:w-64 md:text-sm"
      />
      {q && (
        <button onClick={() => { setQ(""); setOpen(false); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {open && q && (
        <div className="absolute right-0 z-50 mt-2 max-h-[60vh] w-[min(90vw,420px)] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">No results for "{q}"</div>
          ) : (
            <div className="py-1">
              {results.map((r, i) => (
                <button key={i}
                  onClick={() => { r.onClick(); setOpen(false); setQ(""); }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50">
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColor(r.type)}`}>{r.type}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-900">{r.title}</p>
                    <p className="truncate text-xs text-gray-500">{r.subtitle}</p>
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
