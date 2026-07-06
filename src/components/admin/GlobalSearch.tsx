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
    User: "bg-primary/20 text-primary",
    Order: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
    Payout: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    Bill: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
  })[t];

  return (
    <div ref={ref} className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search users, orders, payouts…"
        className="h-9 w-44 md:w-72 bg-secondary rounded-lg pl-8 pr-8 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
      />
      {q && (
        <button onClick={() => { setQ(""); setOpen(false); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {open && q && (
        <div className="absolute right-0 mt-2 w-[min(90vw,420px)] max-h-[60vh] overflow-y-auto bg-card border border-border rounded-xl shadow-xl z-50">
          {results.length === 0 ? (
            <div className="p-4 text-xs text-muted-foreground text-center">No results for "{q}"</div>
          ) : (
            <div className="py-1">
              {results.map((r, i) => (
                <button key={i}
                  onClick={() => { r.onClick(); setOpen(false); setQ(""); }}
                  className="w-full text-left px-3 py-2.5 hover:bg-secondary flex items-center gap-3 transition-colors">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${typeColor(r.type)}`}>{r.type}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
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
