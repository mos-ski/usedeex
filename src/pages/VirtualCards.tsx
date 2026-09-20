import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { TextField } from "@/components/dashboard/FormFields";
import { StatusPill } from "@/components/dashboard/SettingsList";
import {
  CardEditIcon,
  CopyIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  InfoCircleIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  TrendArrowIcon,
} from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";
import cardPreview from "@/assets/cards/deex-card-preview.png";

type CardStatus = "active" | "frozen";
type View = "list" | "create" | "detail" | "fund" | "limits" | "manage";

interface VCard {
  id: number;
  last4: string;
  label: string;
  balance: string;
  balanceNum: number;
  status: CardStatus;
  created: string;
  dailyLimit: number;
  monthlyLimit: number;
  transactions: { desc: string; amount: string; date: string; type: "debit" | "credit" }[];
}

const mockCards: VCard[] = [
  {
    id: 1,
    last4: "4291",
    label: "Shopping Card",
    balance: "$245.80",
    balanceNum: 245.8,
    status: "active",
    created: "Feb 15, 2026",
    dailyLimit: 500,
    monthlyLimit: 5000,
    transactions: [
      { desc: "Netflix Subscription", amount: "-$15.99", date: "Mar 7, 2026", type: "debit" },
      { desc: "Card funding", amount: "+$100.00", date: "Mar 2, 2026", type: "credit" },
      { desc: "Spotify Premium", amount: "-$9.99", date: "Feb 28, 2026", type: "debit" },
    ],
  },
  {
    id: 2,
    last4: "7734",
    label: "Subscriptions",
    balance: "$48.20",
    balanceNum: 48.2,
    status: "frozen",
    created: "Jan 3, 2026",
    dailyLimit: 200,
    monthlyLimit: 1000,
    transactions: [{ desc: "Adobe Creative Cloud", amount: "-$52.99", date: "Mar 1, 2026", type: "debit" }],
  },
];

const wallets = ["USDT", "BTC", "ETH"];

/** Wallet chooser shared by the create and fund steps. */
const WalletPicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs leading-[1.3] text-brand-bodyText">From wallet</span>
    <div className="flex items-center gap-1 rounded bg-brand-barBg p-0.5">
      {wallets.map((w) => (
        <button
          key={w}
          type="button"
          onClick={() => onChange(w)}
          className={cn(
            "flex-1 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
            value === w ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
          )}
        >
          {w}
        </button>
      ))}
    </div>
  </div>
);

const VirtualCards = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("list");
  const [cards, setCards] = useState(mockCards);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showNumber, setShowNumber] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [wallet, setWallet] = useState(wallets[0]);
  const [createLabel, setCreateLabel] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");

  /** Mocked: cards need KYC level 2 or above. */
  const kycLevel = 2;
  const maxCards = 3;
  const creationFee = 2;

  // Read from `cards` so edits show without re-selecting.
  const selected = cards.find((c) => c.id === selectedId) ?? null;

  const toggleFreeze = (id: number) => {
    setCards((list) =>
      list.map((c) => (c.id === id ? { ...c, status: c.status === "active" ? "frozen" : "active" } : c)),
    );
    toast.success("Card updated");
  };

  const deleteCard = (id: number) => {
    setCards((list) => list.filter((c) => c.id !== id));
    toast.success("Card deleted");
    setSelectedId(null);
    setView("list");
  };

  const shell = (title: string, onBack: () => void, children: React.ReactNode) => (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title={title} onBack={onBack} />
        {children}
      </PageTransition>
    </AppShell>
  );

  /* ---------------- Create ---------------- */
  if (view === "create") {
    return shell("Create Virtual Card", () => setView("list"), (
      <>
        <SectionCard className="px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-blue500">
              <TrendArrowIcon className="size-6" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">Visa Virtual Card</span>
              <span className="text-xs leading-[1.3] text-brand-bodyText">
                USD denominated • International payments
              </span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-brand-grey50 p-3 text-xs">
            <span className="text-brand-bodyText">Creation Fee</span>
            <span className="font-semibold text-brand-grey900">${creationFee}.00</span>
          </div>
        </SectionCard>

        <SectionCard className="mt-3 flex flex-col gap-4 px-4 py-5">
          <TextField
            label="Card Label"
            placeholder="E.g Shopping, Subscriptions"
            value={createLabel}
            onChange={(e) => setCreateLabel(e.target.value)}
          />
          <WalletPicker value={wallet} onChange={setWallet} />

          <p className="flex gap-1 text-xs leading-[1.6] text-brand-amberBrown">
            <InfoCircleIcon className="mt-0.5 size-4 shrink-0" />${creationFee}.00 will be deducted from your {wallet}{" "}
            wallet to create this card.
          </p>

          <PrimaryButton
            disabled={!createLabel.trim()}
            onClick={() => {
              const card: VCard = {
                id: Date.now(),
                last4: String(Math.floor(1000 + Math.random() * 9000)),
                label: createLabel.trim(),
                balance: "$0.00",
                balanceNum: 0,
                status: "active",
                created: "Mar 8, 2026",
                dailyLimit: 500,
                monthlyLimit: 5000,
                transactions: [],
              };
              setCards((list) => [...list, card]);
              toast.success("Virtual card created");
              setCreateLabel("");
              setView("list");
            }}
          >
            Create Card
          </PrimaryButton>
        </SectionCard>
      </>
    ));
  }

  /* ---------------- Fund ---------------- */
  if (view === "fund" && selected) {
    return shell("Fund Card", () => setView("detail"), (
      <>
        <SectionCard className="px-4 py-4">
          <p className="text-xs leading-[1.3] text-brand-bodyText">{selected.label}</p>
          <p className="text-[17px] font-bold leading-[1.4] text-brand-grey900">{selected.balance}</p>
        </SectionCard>

        <SectionCard className="mt-3 flex flex-col gap-4 px-4 py-5">
          <TextField
            label="Amount (USD)"
            inputMode="decimal"
            placeholder="0.00"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value.replace(/[^\d.]/g, ""))}
          />
          <WalletPicker value={wallet} onChange={setWallet} />

          <PrimaryButton
            disabled={!fundAmount || Number(fundAmount) <= 0}
            onClick={() => {
              toast.success(`$${fundAmount} funded to card`);
              setFundAmount("");
              setView("detail");
            }}
          >
            Fund Card
          </PrimaryButton>
        </SectionCard>
      </>
    ));
  }

  /* ---------------- Limits ---------------- */
  if (view === "limits" && selected) {
    return shell("Spending Limits", () => setView("detail"), (
      <SectionCard className="flex flex-col gap-4 px-4 py-5">
        <TextField
          label="Daily Limit (USD)"
          inputMode="numeric"
          value={dailyLimit || String(selected.dailyLimit)}
          onChange={(e) => setDailyLimit(e.target.value.replace(/\D/g, ""))}
        />
        <TextField
          label="Monthly Limit (USD)"
          inputMode="numeric"
          value={monthlyLimit || String(selected.monthlyLimit)}
          onChange={(e) => setMonthlyLimit(e.target.value.replace(/\D/g, ""))}
        />

        <PrimaryButton
          onClick={() => {
            setCards((list) =>
              list.map((c) =>
                c.id === selected.id
                  ? {
                      ...c,
                      dailyLimit: Number(dailyLimit) || c.dailyLimit,
                      monthlyLimit: Number(monthlyLimit) || c.monthlyLimit,
                    }
                  : c,
              ),
            );
            toast.success("Limits updated");
            setDailyLimit("");
            setMonthlyLimit("");
            setView("detail");
          }}
        >
          Save Limits
        </PrimaryButton>
      </SectionCard>
    ));
  }

  /* ---------------- Manage card ---------------- */
  if (view === "manage" && selected) {
    return shell("Manage Card", () => setView("list"), (
      <SectionCard className="flex flex-col gap-2 px-4 py-4">
        <button
          type="button"
          onClick={() => {
            setCards((list) => list.map((card) => (card.id === selected.id ? { ...card, status: "frozen" } : card)));
            toast.success("Card blocked");
            setView("detail");
          }}
          className="flex items-center gap-3 rounded-lg border border-brand-grey100 px-4 py-4 text-left transition-colors hover:bg-brand-grey50"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-danger/10 text-brand-danger">
            <LockIcon className="size-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">Block Card</span>
            <span className="text-xs leading-[1.4] text-brand-bodyText">Temporarily stop all card activity</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            toggleFreeze(selected.id);
            setView("detail");
          }}
          className="flex items-center gap-3 rounded-lg border border-brand-grey100 px-4 py-4 text-left transition-colors hover:bg-brand-grey50"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-tint text-brand-blue500">
            <EyeOffIcon className="size-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
              {selected.status === "frozen" ? "Unfreeze Card" : "Freeze Card"}
            </span>
            <span className="text-xs leading-[1.4] text-brand-bodyText">Pause spending and unpause anytime</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/change-pin")}
          className="flex items-center gap-3 rounded-lg border border-brand-grey100 px-4 py-4 text-left transition-colors hover:bg-brand-grey50"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-tint text-brand-blue500">
            <CardEditIcon className="size-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">Change PIN</span>
            <span className="text-xs leading-[1.4] text-brand-bodyText">Set a new card PIN</span>
          </span>
        </button>
      </SectionCard>
    ));
  }

  /* ---------------- Detail ---------------- */
  if (view === "detail" && selected) {
    const actions = [
      { label: "Fund", Icon: PlusIcon, onClick: () => setView("fund"), tone: "text-brand-blue500" },
      {
        label: selected.status === "active" ? "Freeze" : "Unfreeze",
        Icon: LockIcon,
        onClick: () => toggleFreeze(selected.id),
        tone: "text-brand-blue400",
      },
      { label: "Limits", Icon: TrendArrowIcon, onClick: () => setView("limits"), tone: "text-brand-grey600" },
      { label: "Delete", Icon: MinusIcon, onClick: () => deleteCard(selected.id), tone: "text-brand-danger" },
    ];

    return shell(selected.label, () => {
      setView("list");
      setShowNumber(false);
    }, (
      <>
        {/* Card face */}
        <SectionCard className="px-4 py-4">
          <div className="relative overflow-hidden rounded-2xl bg-brand-deepNavy p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs leading-[1.3] text-brand-grey400">Balance</p>
                <p className="text-2xl font-bold leading-[1.4]">{selected.balance}</p>
              </div>
              <span className="text-sm font-bold tracking-widest text-brand-grey400">VISA</span>
            </div>

            <div className="flex items-center gap-2 pt-8">
              <p className="text-sm tracking-widest">
                {showNumber ? `4532 7891 2345 ${selected.last4}` : `•••• •••• •••• ${selected.last4}`}
              </p>
              <button
                type="button"
                onClick={() => setShowNumber((v) => !v)}
                aria-label={showNumber ? "Hide card number" : "Show card number"}
                className="text-brand-grey400"
              >
                {showNumber ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
              </button>
              {showNumber && (
                <button
                  type="button"
                  aria-label="Copy card number"
                  onClick={() => {
                    navigator.clipboard?.writeText(`4532789123456${selected.last4}`);
                    toast.success("Card number copied");
                  }}
                  className="text-brand-grey400"
                >
                  <CopyIcon className="size-4" />
                </button>
              )}
            </div>

            <div className="flex gap-6 pt-3 text-xs text-brand-grey400">
              <span>
                <span className="block text-[10px]">EXPIRY</span>
                <span className="text-white">03/29</span>
              </span>
              <span>
                <span className="block text-[10px]">CVV</span>
                <span className="text-white">{showNumber ? "412" : "***"}</span>
              </span>
            </div>

            {selected.status === "frozen" && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-brand-deepNavy/70">
                <span className="flex items-center gap-2 rounded-full bg-brand-surface px-4 py-2 text-sm font-medium text-brand-grey900">
                  <LockIcon className="size-4 text-brand-blue400" /> Card Frozen
                </span>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Actions */}
        <SectionCard className="mt-3 px-4 py-3">
          <div className="grid grid-cols-4 gap-1">
            {actions.map(({ label, Icon, onClick, tone }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="flex flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint px-2 py-2 transition-colors hover:bg-brand-primary100"
              >
                <Icon className={cn("size-6 shrink-0", tone)} />
                <span className="text-center text-[10px] leading-[1.6] text-brand-grey900">{label}</span>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Limits */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Spending Limits" actionLabel="Edit" onAction={() => setView("limits")} />
          <div className="flex gap-6 pb-1">
            <span>
              <span className="block text-[10px] leading-[1.6] text-brand-bodyText">Daily</span>
              <span className="text-sm font-medium text-brand-grey900">${selected.dailyLimit}</span>
            </span>
            <span>
              <span className="block text-[10px] leading-[1.6] text-brand-bodyText">Monthly</span>
              <span className="text-sm font-medium text-brand-grey900">${selected.monthlyLimit}</span>
            </span>
          </div>
        </SectionCard>

        {/* Transactions */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Transactions" />
          {selected.transactions.length === 0 ? (
            <p className="py-8 text-center text-sm text-brand-bodyText">No transactions yet</p>
          ) : (
            <div className="flex flex-col">
              {selected.transactions.map((tx, index) => (
                <div
                  key={`${tx.desc}-${index}`}
                  className="flex items-center gap-4 border-b border-brand-grey100 py-3 last:border-b-0"
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                      {tx.desc}
                    </span>
                    <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{tx.date}</span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-[15px] font-semibold leading-[1.4]",
                      tx.type === "credit" ? "text-brand-successText" : "text-brand-grey900",
                    )}
                  >
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </>
    ));
  }

  /* ---------------- List ---------------- */
  const primaryCard = cards[0];

  return (
    <AppShell topColor="bg-brand-deepNavy" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <section className="bg-brand-deepNavy px-4 pb-5 pt-2 text-white">
          <header className="flex h-12 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeftIcon className="size-6" />
            </button>
            <h1 className="flex-1 text-[19px] font-bold leading-[1.4]">DeeX Card</h1>
          </header>

          <button
            type="button"
            onClick={() => {
              setSelectedId(primaryCard?.id ?? null);
              setView("detail");
            }}
            className="mt-3 block w-full text-left"
            aria-label="Open DeeX card details"
          >
            <img
              src={cardPreview}
              alt="DeeX virtual card ending in 1234"
              className="mx-auto block aspect-[348/222] w-full max-w-[348px] rounded-[20px] object-cover shadow-[8px_10px_16px_rgba(0,0,0,0.05)]"
            />
          </button>

          <div className="pt-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/45">Balance</p>
            <p className="font-manrope text-[34px] font-extrabold leading-none tracking-[-0.06em]">
              {primaryCard?.balance ?? "$0.00"}
            </p>
          </div>
        </section>

        <SectionCard className="mt-3 px-4 py-4">
          <SectionHeader title="Quick Actions" />
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => {
                setSelectedId(primaryCard?.id ?? null);
                setView("manage");
              }}
              className="flex h-[60px] flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint text-brand-navy transition-colors hover:bg-brand-primary100"
            >
              <CardEditIcon className="size-5" />
              <span className="text-[10px] leading-[1.4] text-brand-grey900">Manage Card</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedId(primaryCard?.id ?? null);
                setView("detail");
              }}
              className="flex h-[60px] flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint text-brand-navy transition-colors hover:bg-brand-primary100"
            >
              <EyeIcon className="size-5" />
              <span className="text-[10px] leading-[1.4] text-brand-grey900">View Details</span>
            </button>
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-4">
          <SectionHeader title="July 2026" />
          {primaryCard?.transactions.length ? (
            <div className="flex flex-col">
              {primaryCard.transactions.map((tx, index) => (
                <div key={`${tx.desc}-${index}`} className="flex items-center gap-3 border-b border-brand-grey100 py-3 last:border-b-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-xs font-bold text-brand-blue500">
                    {tx.type === "credit" ? "+" : "−"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{tx.desc}</span>
                    <span className="block text-xs leading-[1.3] text-brand-bodyText">{tx.date} <span className="text-brand-successText">• Success</span></span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-[15px] font-semibold leading-[1.4] text-brand-grey900">{tx.amount}</span>
                    <span className="block text-xs leading-[1.3] text-brand-bodyText">{tx.type === "credit" ? "Card credit" : "Card payment"}</span>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-brand-bodyText">No transactions yet</p>
          )}
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default VirtualCards;
