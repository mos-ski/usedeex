import { useState } from "react";
import {
  Check, X, Eye, Image, Plus, Edit2, Trash2, TrendingUp, CreditCard,
  Settings, BarChart3, Search, Filter, ChevronDown, ChevronUp, Download
} from "lucide-react";
import { toast } from "sonner";
import ProviderIcon from "@/components/ProviderIcon";
import {
  giftcardStore, GiftCardOrder, GiftCardBrand, GiftCardRateTier
} from "@/data/giftcardData";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from "recharts";

const statusTabs = ["All", "Pending", "Approved", "Rejected"];
const CATEGORIES = ["Shopping", "Entertainment", "Gaming", "Prepaid"] as const;

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    approved: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    rejected: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
  };
  return (
    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
};

const formatNgn = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

const AdminGiftCards = () => {
  const [subTab, setSubTab] = useState<"orders" | "brands" | "analytics">("orders");
  const [orders, setOrders] = useState(giftcardStore.getOrders());
  const [brands, setBrands] = useState(giftcardStore.getBrands());
  const [orderFilter, setOrderFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<GiftCardOrder | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Brand editing
  const [editingBrand, setEditingBrand] = useState<GiftCardBrand | null>(null);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrand, setNewBrand] = useState({
    name: "", category: "Shopping" as GiftCardBrand["category"], countries: ["USA"],
    cardTypes: ["Physical Card", "E-Code"] as GiftCardBrand["cardTypes"],
    denominations: "25, 50, 100", defaultRate: "1300",
  });

  // Order filtering
  const filteredOrders = orders
    .filter(o => orderFilter === "All" || o.status === orderFilter.toLowerCase())
    .filter(o => !searchQuery || o.userName.toLowerCase().includes(searchQuery.toLowerCase()) || o.brandName.toLowerCase().includes(searchQuery.toLowerCase()));

  const pendingCount = orders.filter(o => o.status === "pending").length;

  // Analytics data
  const brandVolume = brands.map(b => {
    const brandOrders = orders.filter(o => o.brandId === b.id);
    return {
      name: b.name,
      orders: brandOrders.length,
      volume: brandOrders.reduce((sum, o) => sum + o.ngnPayout, 0),
    };
  }).filter(b => b.orders > 0).sort((a, b) => b.volume - a.volume);

  const statusDistribution = [
    { name: "Pending", value: orders.filter(o => o.status === "pending").length, color: "hsl(var(--warning))" },
    { name: "Approved", value: orders.filter(o => o.status === "approved").length, color: "hsl(var(--success))" },
    { name: "Rejected", value: orders.filter(o => o.status === "rejected").length, color: "hsl(var(--destructive))" },
  ];

  const totalVolume = orders.reduce((sum, o) => sum + o.ngnPayout, 0);
  const totalApprovedVolume = orders.filter(o => o.status === "approved").reduce((sum, o) => sum + o.ngnPayout, 0);
  const avgOrderValue = orders.length > 0 ? totalVolume / orders.length : 0;

  // Handlers
  const handleApprove = (order: GiftCardOrder) => {
    const updated = giftcardStore.updateOrder(order.id, {
      status: "approved",
      reviewedAt: new Date().toISOString(),
      reviewedBy: "Admin",
      notes: reviewNote || undefined,
    });
    setOrders(updated);
    setSelectedOrder(null);
    setReviewNote("");
    toast.success(`Approved! ${formatNgn(order.ngnPayout)} credited to ${order.userName}.`);
  };

  const handleReject = (order: GiftCardOrder) => {
    const updated = giftcardStore.updateOrder(order.id, {
      status: "rejected",
      reviewedAt: new Date().toISOString(),
      reviewedBy: "Admin",
      notes: reviewNote || undefined,
    });
    setOrders(updated);
    setSelectedOrder(null);
    setReviewNote("");
    toast.error(`Order rejected.`);
  };

  const handleToggleBrand = (id: string) => {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    const updated = giftcardStore.updateBrand(id, { enabled: !brand.enabled });
    setBrands(updated);
    toast.success(`${brand.name} ${brand.enabled ? "disabled" : "enabled"}.`);
  };

  const handleDeleteBrand = (id: string) => {
    const updated = giftcardStore.removeBrand(id);
    setBrands(updated);
    toast.success("Brand removed.");
  };

  const handleAddBrand = () => {
    const id = newBrand.name.toLowerCase().replace(/\s+/g, "-");
    const denoms = newBrand.denominations.split(",").map(d => parseInt(d.trim())).filter(d => !isNaN(d));
    const rate = parseInt(newBrand.defaultRate) || 1300;
    const rates: Record<string, GiftCardRateTier[]> = {};
    newBrand.countries.forEach(c => {
      rates[c] = [{ min: Math.min(...denoms), max: Math.max(...denoms), rate }];
    });

    const brand: GiftCardBrand = {
      id, name: newBrand.name, category: newBrand.category,
      countries: newBrand.countries, cardTypes: newBrand.cardTypes,
      denominations: denoms, rates, enabled: true,
    };
    const updated = giftcardStore.addBrand(brand);
    setBrands(updated);
    setShowAddBrand(false);
    setNewBrand({ name: "", category: "Shopping", countries: ["USA"], cardTypes: ["Physical Card", "E-Code"], denominations: "25, 50, 100", defaultRate: "1300" });
    toast.success(`${brand.name} added.`);
  };

  const handleSaveRates = (brandId: string, country: string, tiers: GiftCardRateTier[]) => {
    const brand = brands.find(b => b.id === brandId);
    if (!brand) return;
    const newRates = { ...brand.rates, [country]: tiers };
    const updated = giftcardStore.updateBrand(brandId, { rates: newRates });
    setBrands(updated);
    toast.success("Rates updated.");
  };

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 w-fit">
      {([
          { key: "orders" as const, label: "Orders", icon: CreditCard, badge: pendingCount },
          { key: "brands" as const, label: "Brands & Rates", icon: Settings, badge: 0 },
          { key: "analytics" as const, label: "Analytics", icon: BarChart3, badge: 0 },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setSubTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              subTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.badge > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--warning))] text-[10px] font-bold text-background">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ===== ORDERS TAB ===== */}
      {subTab === "orders" && (
        <div className="space-y-4">
          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Pending", value: pendingCount.toString(), color: "text-[hsl(var(--warning))]" },
              { label: "Total Orders", value: orders.length.toString(), color: "text-foreground" },
              { label: "Total Volume", value: formatNgn(totalVolume), color: "text-[hsl(var(--success))]" },
              { label: "Avg. Order", value: `$${(avgOrderValue > 0 ? (orders.reduce((s, o) => s + o.amount, 0) / orders.length) : 0).toFixed(0)}`, color: "text-foreground" },
            ].map(m => (
              <div key={m.label} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {statusTabs.map(tab => {
                const count = tab === "All" ? orders.length : orders.filter(o => o.status === tab.toLowerCase()).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setOrderFilter(tab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      orderFilter === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                    <span className="text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by user or brand..."
                className="h-9 w-56 bg-secondary rounded-lg pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["User", "Brand", "Country/Type", "Amount", "Rate", "Payout", "Status", "Date", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-8 text-muted-foreground text-sm">No orders found</td></tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{order.userName}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ProviderIcon name={order.brandName} size="sm" />
                          <span className="text-sm text-foreground">{order.brandName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-foreground">{order.country}</p>
                        <p className="text-[10px] text-muted-foreground">{order.cardType}</p>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">${order.amount}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">₦{order.rate}/$</td>
                      <td className="px-4 py-3 text-sm font-bold text-[hsl(var(--success))]">{formatNgn(order.ngnPayout)}</td>
                      <td className="px-4 py-3">{statusBadge(order.status)}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { setSelectedOrder(order); setReviewNote(""); }}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </button>
                          {order.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(order)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10 transition-colors"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleReject(order)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/10 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== BRANDS TAB ===== */}
      {subTab === "brands" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{brands.length} brands configured</p>
            <button
              onClick={() => setShowAddBrand(true)}
              className="h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Brand
            </button>
          </div>

          {/* Add brand form */}
          {showAddBrand && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Add New Brand</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Brand Name</label>
                  <input
                    value={newBrand.name}
                    onChange={e => setNewBrand(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Xbox"
                    className="w-full h-9 bg-secondary rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Category</label>
                  <select
                    value={newBrand.category}
                    onChange={e => setNewBrand(p => ({ ...p, category: e.target.value as GiftCardBrand["category"] }))}
                    className="w-full h-9 bg-secondary rounded-lg px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Denominations (comma-separated)</label>
                  <input
                    value={newBrand.denominations}
                    onChange={e => setNewBrand(p => ({ ...p, denominations: e.target.value }))}
                    placeholder="25, 50, 100"
                    className="w-full h-9 bg-secondary rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Default Rate (₦/$)</label>
                  <input
                    value={newBrand.defaultRate}
                    onChange={e => setNewBrand(p => ({ ...p, defaultRate: e.target.value }))}
                    placeholder="1300"
                    className="w-full h-9 bg-secondary rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Countries</label>
                <div className="flex gap-2">
                  {["USA", "UK", "Canada", "EU"].map(c => (
                    <button
                      key={c}
                      onClick={() => setNewBrand(p => ({
                        ...p,
                        countries: p.countries.includes(c) ? p.countries.filter(x => x !== c) : [...p.countries, c],
                      }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        newBrand.countries.includes(c) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleAddBrand} disabled={!newBrand.name} className="h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-50">
                  Add Brand
                </button>
                <button onClick={() => setShowAddBrand(false)} className="h-9 px-4 bg-secondary text-foreground rounded-lg text-sm font-medium">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Brands list */}
          <div className="space-y-3">
            {brands.map(brand => (
              <BrandCard
                key={brand.id}
                brand={brand}
                isEditing={editingBrand?.id === brand.id}
                onToggle={() => handleToggleBrand(brand.id)}
                onEdit={() => setEditingBrand(editingBrand?.id === brand.id ? null : brand)}
                onDelete={() => handleDeleteBrand(brand.id)}
                onSaveRates={handleSaveRates}
              />
            ))}
          </div>
        </div>
      )}

      {/* ===== ANALYTICS TAB ===== */}
      {subTab === "analytics" && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Orders", value: orders.length.toString() },
              { label: "Total Volume", value: formatNgn(totalVolume) },
              { label: "Approved Volume", value: formatNgn(totalApprovedVolume) },
              { label: "Approval Rate", value: orders.length > 0 ? `${((orders.filter(o => o.status === "approved").length / orders.length) * 100).toFixed(0)}%` : "0%" },
            ].map(m => (
              <div key={m.label} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                <p className="text-xl font-bold text-foreground">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Volume by brand */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Volume by Brand</h3>
              {brandVolume.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={brandVolume}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                    <XAxis dataKey="name" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }}
                      formatter={(value: number) => [formatNgn(value), "Volume"]}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>
              )}
            </div>

            {/* Status distribution */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Order Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {statusDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center mt-2">
                {statusDistribution.map(s => (
                  <span key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name} ({s.value})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Top trades table */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Approved Trades</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["User", "Brand", "Amount", "Payout", "Date"].map(h => (
                    <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.filter(o => o.status === "approved").slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-sm text-foreground">{order.userName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ProviderIcon name={order.brandName} size="sm" />
                        <span className="text-sm text-foreground">{order.brandName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">${order.amount}</td>
                    <td className="px-4 py-3 text-sm font-bold text-[hsl(var(--success))]">{formatNgn(order.ngnPayout)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== ORDER DETAIL DIALOG ===== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Order #{selectedOrder.id}</h3>
              {statusBadge(selectedOrder.status)}
            </div>

            {/* Card image */}
            {selectedOrder.cardImage ? (
              <img src={selectedOrder.cardImage} alt="Gift card" className="w-full rounded-lg mb-4" />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground bg-secondary rounded-lg mb-4">
                <Image className="h-10 w-10 mb-2" />
                <p className="text-sm">No image uploaded</p>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 mb-4">
              {[
                { label: "User", value: selectedOrder.userName },
                { label: "Brand", value: selectedOrder.brandName, icon: true },
                { label: "Country", value: selectedOrder.country },
                { label: "Card Type", value: selectedOrder.cardType },
                { label: "Amount", value: `$${selectedOrder.amount} ${selectedOrder.currency}` },
                { label: "Rate", value: `₦${selectedOrder.rate}/$` },
                { label: "Payout", value: formatNgn(selectedOrder.ngnPayout), bold: true },
                ...(selectedOrder.cardCode ? [{ label: "Card Code", value: selectedOrder.cardCode, mono: true }] : []),
                { label: "Submitted", value: new Date(selectedOrder.createdAt).toLocaleString("en-NG") },
                ...(selectedOrder.reviewedAt ? [
                  { label: "Reviewed", value: new Date(selectedOrder.reviewedAt).toLocaleString("en-NG") },
                  { label: "Reviewed By", value: selectedOrder.reviewedBy || "—" },
                ] : []),
                ...(selectedOrder.notes ? [{ label: "Notes", value: selectedOrder.notes }] : []),
              ].map(d => (
                <div key={d.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{d.label}</span>
                  <div className="flex items-center gap-2">
                    {"icon" in d && d.icon && <ProviderIcon name={selectedOrder.brandName} size="sm" />}
                    <span className={`text-sm ${
                      "bold" in d && d.bold ? "font-bold text-[hsl(var(--success))]" :
                      "mono" in d && d.mono ? "font-mono text-foreground" :
                      "text-foreground"
                    }`}>{d.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Review actions */}
            {selectedOrder.status === "pending" && (
              <div className="border-t border-border pt-4 space-y-3">
                <textarea
                  value={reviewNote}
                  onChange={e => setReviewNote(e.target.value)}
                  placeholder="Add review notes (optional)..."
                  className="w-full h-20 bg-secondary rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedOrder)}
                    className="flex-1 h-10 bg-[hsl(var(--success))] text-background rounded-lg text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4 w-4" /> Approve & Credit
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrder)}
                    className="flex-1 h-10 bg-[hsl(var(--destructive))] text-destructive-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-3 w-full h-9 bg-secondary text-foreground rounded-lg text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== Brand Card Component =====
const BrandCard = ({
  brand, isEditing, onToggle, onEdit, onDelete, onSaveRates,
}: {
  brand: GiftCardBrand;
  isEditing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSaveRates: (brandId: string, country: string, tiers: GiftCardRateTier[]) => void;
}) => {
  const [editRates, setEditRates] = useState<Record<string, GiftCardRateTier[]>>({});

  const initRates = (country: string) => {
    if (!editRates[country]) {
      setEditRates(prev => ({ ...prev, [country]: [...(brand.rates[country] || [])] }));
    }
  };

  return (
    <div className={`bg-card border rounded-xl overflow-hidden transition-colors ${brand.enabled ? "border-border" : "border-border opacity-60"}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <ProviderIcon name={brand.name} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{brand.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{brand.category}</span>
              {!brand.enabled && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]">Disabled</span>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {brand.countries.join(", ")} · {brand.cardTypes.join(", ")} · ${brand.denominations.join(", $")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onToggle} className={`h-8 px-3 rounded-lg text-xs font-medium transition-colors ${brand.enabled ? "bg-secondary text-muted-foreground hover:text-foreground" : "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"}`}>
            {brand.enabled ? "Disable" : "Enable"}
          </button>
          <button onClick={onEdit} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
            {isEditing ? <ChevronUp className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          </button>
          <button onClick={onDelete} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))] transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded rate editor */}
      {isEditing && (
        <div className="border-t border-border p-4 space-y-4">
          <h4 className="text-xs font-semibold text-muted-foreground tracking-wider">RATE TIERS BY COUNTRY</h4>
          {brand.countries.map(country => {
            const tiers = editRates[country] || brand.rates[country] || [];
            return (
              <div key={country} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{country}</p>
                <div className="space-y-1.5">
                  {tiers.map((tier, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-8">Min</span>
                      <input
                        type="number"
                        value={tier.min}
                        onChange={e => {
                          initRates(country);
                          setEditRates(prev => {
                            const updated = [...(prev[country] || tiers)];
                            updated[i] = { ...updated[i], min: parseInt(e.target.value) || 0 };
                            return { ...prev, [country]: updated };
                          });
                        }}
                        className="w-20 h-8 bg-secondary rounded-lg px-2 text-sm text-foreground outline-none text-center"
                      />
                      <span className="text-xs text-muted-foreground w-8">Max</span>
                      <input
                        type="number"
                        value={tier.max}
                        onChange={e => {
                          initRates(country);
                          setEditRates(prev => {
                            const updated = [...(prev[country] || tiers)];
                            updated[i] = { ...updated[i], max: parseInt(e.target.value) || 0 };
                            return { ...prev, [country]: updated };
                          });
                        }}
                        className="w-20 h-8 bg-secondary rounded-lg px-2 text-sm text-foreground outline-none text-center"
                      />
                      <span className="text-xs text-muted-foreground w-12">Rate ₦/$</span>
                      <input
                        type="number"
                        value={tier.rate}
                        onChange={e => {
                          initRates(country);
                          setEditRates(prev => {
                            const updated = [...(prev[country] || tiers)];
                            updated[i] = { ...updated[i], rate: parseInt(e.target.value) || 0 };
                            return { ...prev, [country]: updated };
                          });
                        }}
                        className="w-24 h-8 bg-secondary rounded-lg px-2 text-sm text-foreground outline-none text-center font-bold"
                      />
                      <button
                        onClick={() => {
                          initRates(country);
                          setEditRates(prev => {
                            const updated = [...(prev[country] || tiers)];
                            updated.splice(i, 1);
                            return { ...prev, [country]: updated };
                          });
                        }}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      initRates(country);
                      setEditRates(prev => {
                        const current = prev[country] || tiers;
                        const lastMax = current.length > 0 ? current[current.length - 1].max : 0;
                        return { ...prev, [country]: [...current, { min: lastMax + 1, max: lastMax + 100, rate: 1300 }] };
                      });
                    }}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add tier
                  </button>
                  {editRates[country] && (
                    <button
                      onClick={() => {
                        onSaveRates(brand.id, country, editRates[country]);
                        setEditRates(prev => {
                          const next = { ...prev };
                          delete next[country];
                          return next;
                        });
                      }}
                      className="text-xs text-[hsl(var(--success))] hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Save rates
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminGiftCards;
