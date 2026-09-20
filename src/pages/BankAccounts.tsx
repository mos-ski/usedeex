import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import AssetMark from "@/components/dashboard/AssetMark";
import { SelectField, TextField } from "@/components/dashboard/FormFields";
import { StatusPill } from "@/components/dashboard/SettingsList";
import { BankIcon, PhoneCallIcon, PlusIcon } from "@/components/dashboard/icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type Tab = "banks" | "wallets" | "bills";

const tabs: { key: Tab; label: string; cta: string }[] = [
  { key: "banks", label: "Banks", cta: "Add Bank Account" },
  { key: "wallets", label: "Wallets", cta: "Add Wallet Address" },
  { key: "bills", label: "Bills", cta: "Add Bill Beneficiary" },
];

const bankNames = ["PalmPay", "Opay", "GTBank", "Access Bank", "UBA", "Zenith Bank", "First Bank"].map((b) => ({
  value: b,
  label: b,
}));

const billTypes = ["Airtime", "Data", "Electricity", "Betting"].map((t) => ({ value: t, label: t }));

const initialBanks = [
  { id: 1, bank: "PalmPay", account: "8103674006", name: "JOHN DOE", isDefault: true, verified: true },
  { id: 2, bank: "Opay", account: "9012345678", name: "JOHN DOE", isDefault: false, verified: true },
  { id: 3, bank: "GTBank", account: "0123456789", name: "JOHN DOE", isDefault: false, verified: false },
];

const initialWallets = [
  { id: 1, label: "Main BTC Wallet", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin", symbol: "BTC" },
  { id: 2, label: "Trading USDT", address: "TJYs...X8nP", network: "TRC-20", symbol: "USDT" },
  { id: 3, label: "@adebayo", address: "@adebayo", network: "DeeX Username", symbol: "NGN" },
];

const initialBills = [
  { id: 1, label: "MTN - Personal", type: "Airtime", number: "08103674006", provider: "MTN" },
  { id: 2, label: "IKEDC - Home", type: "Electricity", number: "04521234567", provider: "IKEDC" },
  { id: 3, label: "Bet9ja", type: "Betting", number: "BET9JA-123456", provider: "Bet9ja" },
];

/** One saved destination: mark, label over detail, then the row's actions. */
const BeneficiaryRow = ({
  mark,
  title,
  detail,
  pills,
  actions,
}: {
  mark: React.ReactNode;
  title: string;
  detail: string;
  pills?: React.ReactNode;
  actions: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2 border-b border-brand-grey100 py-3 last:border-b-0">
    <div className="flex items-center gap-4">
      {mark}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{title}</span>
          {pills}
        </span>
        <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{detail}</span>
      </span>
    </div>
    <div className="flex items-center gap-4 pl-12">{actions}</div>
  </div>
);

const actionClass = "text-xs font-semibold leading-[1.4] transition-opacity hover:opacity-70";

/** Bank and Cards — the saved payout destinations, reached from Account. */
const BankAccounts = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("banks");
  const [addOpen, setAddOpen] = useState(false);

  const [banks, setBanks] = useState(initialBanks);
  const [wallets, setWallets] = useState(initialWallets);
  const [bills, setBills] = useState(initialBills);

  // New-entry draft, reused by all three sheets.
  const [draft, setDraft] = useState({ bank: bankNames[0].value, account: "", label: "", address: "", network: "", type: billTypes[0].value, number: "" });
  const patch = (next: Partial<typeof draft>) => setDraft((d) => ({ ...d, ...next }));

  const closeSheet = () => {
    setAddOpen(false);
    setDraft({ bank: bankNames[0].value, account: "", label: "", address: "", network: "", type: billTypes[0].value, number: "" });
  };

  const addEntry = () => {
    if (tab === "banks") {
      setBanks((list) => [...list, { id: Date.now(), bank: draft.bank, account: draft.account, name: "JOHN DOE", isDefault: false, verified: false }]);
      toast.success("Bank added");
    } else if (tab === "wallets") {
      setWallets((list) => [...list, { id: Date.now(), label: draft.label, address: draft.address, network: draft.network || "DeeX Username", symbol: "USDT" }]);
      toast.success("Wallet saved");
    } else {
      setBills((list) => [...list, { id: Date.now(), label: draft.label, type: draft.type, number: draft.number, provider: draft.label.split(" ")[0] }]);
      toast.success("Beneficiary saved");
    }
    closeSheet();
  };

  const canAdd =
    tab === "banks"
      ? draft.account.length >= 10
      : tab === "wallets"
        ? Boolean(draft.label.trim() && draft.address.trim())
        : Boolean(draft.label.trim() && draft.number.trim());

  const active = tabs.find((t) => t.key === tab)!;

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Bank and Cards" onBack={() => navigate(-1)} />

        <SectionCard className="px-4 py-3">
          <div role="tablist" aria-label="Beneficiary type" className="flex items-center gap-3 rounded bg-brand-barBg p-0.5">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "shrink-0 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                  tab === t.key ? "bg-white text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-0">
          {tab === "banks" &&
            banks.map((b) => (
              <BeneficiaryRow
                key={b.id}
                mark={<AssetMark symbol={b.bank} />}
                title={b.bank}
                detail={`${b.account} • ${b.name}`}
                pills={
                  <>
                    {b.isDefault && <StatusPill tone="good">Default</StatusPill>}
                    {!b.verified && <StatusPill tone="neutral">Pending</StatusPill>}
                  </>
                }
                actions={
                  <>
                    {!b.isDefault && (
                      <button
                        type="button"
                        onClick={() => setBanks((list) => list.map((x) => ({ ...x, isDefault: x.id === b.id })))}
                        className={cn(actionClass, "text-brand-blue500")}
                      >
                        Set default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setBanks((list) => list.filter((x) => x.id !== b.id));
                        toast.success("Bank removed");
                      }}
                      className={cn(actionClass, "ml-auto text-brand-danger")}
                    >
                      Remove
                    </button>
                  </>
                }
              />
            ))}

          {tab === "wallets" &&
            wallets.map((w) => (
              <BeneficiaryRow
                key={w.id}
                mark={<AssetMark symbol={w.symbol} />}
                title={w.label}
                detail={`${w.network} • ${w.address}`}
                actions={
                  <button
                    type="button"
                    onClick={() => {
                      setWallets((list) => list.filter((x) => x.id !== w.id));
                      toast.success("Wallet removed");
                    }}
                    className={cn(actionClass, "ml-auto text-brand-danger")}
                  >
                    Remove
                  </button>
                }
              />
            ))}

          {tab === "bills" &&
            bills.map((b) => (
              <BeneficiaryRow
                key={b.id}
                mark={
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blue500">
                    <PhoneCallIcon className="size-4" />
                  </span>
                }
                title={b.label}
                detail={`${b.type} • ${b.number}`}
                actions={
                  <button
                    type="button"
                    onClick={() => {
                      setBills((list) => list.filter((x) => x.id !== b.id));
                      toast.success("Beneficiary removed");
                    }}
                    className={cn(actionClass, "ml-auto text-brand-danger")}
                  >
                    Remove
                  </button>
                }
              />
            ))}

          {((tab === "banks" && banks.length === 0) ||
            (tab === "wallets" && wallets.length === 0) ||
            (tab === "bills" && bills.length === 0)) && (
            <p className="py-12 text-center text-sm text-brand-bodyText">Nothing saved yet.</p>
          )}
        </SectionCard>

        <div className="px-4 pt-6">
          <PrimaryButton onClick={() => setAddOpen(true)}>
            <PlusIcon className="size-5" />
            {active.cta}
          </PrimaryButton>
        </div>
      </PageTransition>

      <Drawer open={addOpen} onOpenChange={(open) => (open ? setAddOpen(true) : closeSheet())}>
        <DrawerContent className="border-brand-grey100 bg-white font-roboto">
          <DrawerTitle className="sr-only">{active.cta}</DrawerTitle>
          <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4 px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">{active.cta}</p>

            {tab === "banks" && (
              <>
                <SelectField label="Bank" value={draft.bank} options={bankNames} onChange={(bank) => patch({ bank })} />
                <TextField
                  label="Account number"
                  inputMode="numeric"
                  placeholder="0123456789"
                  value={draft.account}
                  onChange={(e) => patch({ account: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                />
              </>
            )}

            {tab === "wallets" && (
              <>
                <TextField label="Label" placeholder="E.g Main BTC Wallet" value={draft.label} onChange={(e) => patch({ label: e.target.value })} />
                <TextField label="Wallet address or @username" placeholder="0x… or @username" value={draft.address} onChange={(e) => patch({ address: e.target.value })} />
                <TextField label="Network" placeholder="E.g TRC-20" value={draft.network} onChange={(e) => patch({ network: e.target.value })} />
              </>
            )}

            {tab === "bills" && (
              <>
                <TextField label="Label" placeholder="E.g MTN - Personal" value={draft.label} onChange={(e) => patch({ label: e.target.value })} />
                <SelectField label="Type" value={draft.type} options={billTypes} onChange={(type) => patch({ type })} />
                <TextField label="Phone, meter or account number" value={draft.number} onChange={(e) => patch({ number: e.target.value })} />
              </>
            )}

            <PrimaryButton className="mt-2" disabled={!canAdd} onClick={addEntry}>
              {tab === "banks" ? "Verify & Add" : "Save"}
            </PrimaryButton>
          </div>
        </DrawerContent>
      </Drawer>
    </AppShell>
  );
};

export default BankAccounts;
