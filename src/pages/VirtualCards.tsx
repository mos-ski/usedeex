import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { TextField } from "@/components/dashboard/FormFields";
import { StatusPill } from "@/components/dashboard/SettingsList";
import {
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  InfoCircleIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  TrendArrowIcon,
} from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

type CardStatus = "active" | "frozen";
type View = "list" | "create" | "detail" | "fund" | "limits";

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
            value === w ? "bg-white text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
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
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-grey900">
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
                <span className="text-center text-[10px] leading-[1.6] text-black">{label}</span>
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
  return shell("Virtual Cards", () => navigate(-1), (
    <>
      {kycLevel < 2 && (
        <SectionCard className="px-4 py-4">
          <div className="flex items-start gap-3">
            <InfoCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-amberBrown" />
            <div>
              <p className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">KYC Level 2 Required</p>
              <p className="pt-1 text-xs leading-[1.6] text-brand-bodyText">
                You need at least KYC Level 2 to create a virtual card.
              </p>
              <button
                type="button"
                onClick={() => navigate("/kyc")}
                className="pt-2 text-xs font-semibold text-brand-blue500"
              >
                Complete KYC
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      <SectionCard className={cn("px-4 py-4", kycLevel < 2 && "mt-3")}>
        <p className="text-xs leading-[1.3] text-brand-bodyText">Visa Virtual Card • USD</p>
        <p className="pt-1 text-[15px] font-semibold leading-[1.4] text-brand-grey900">
          {cards.length}/{maxCards} cards created • ${creationFee} per card
        </p>
      </SectionCard>

      {cards.length === 0 ? (
        <SectionCard className="mt-3 px-4 py-12 text-center">
          <p className="text-sm leading-[1.6] text-brand-grey900">No virtual cards yet</p>
          <p className="pt-1 text-xs leading-[1.6] text-brand-bodyText">Create your first card to start spending</p>
        </SectionCard>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {cards.map((card) => (
            <SectionCard key={card.id} className="px-4 py-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedId(card.id);
                  setView("detail");
                }}
                className="w-full rounded-2xl bg-brand-deepNavy p-5 text-left text-white"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-xs leading-[1.3] text-brand-grey400">{card.label}</span>
                  {card.status === "frozen" && <StatusPill tone="neutral">Frozen</StatusPill>}
                </span>
                <span className="block pt-1 text-[17px] font-bold leading-[1.4]">{card.balance}</span>
                <span className="flex items-center justify-between pt-3">
                  <span className="text-sm tracking-widest text-brand-grey400">•••• •••• •••• {card.last4}</span>
                  <span className="text-[10px] font-bold tracking-wider text-brand-grey400">VISA</span>
                </span>
              </button>
            </SectionCard>
          ))}
        </div>
      )}

      {cards.length < maxCards && kycLevel >= 2 && (
        <div className="px-4 pt-6">
          <PrimaryButton onClick={() => setView("create")}>
            <PlusIcon className="size-5" />
            Create New Card (${creationFee})
          </PrimaryButton>
        </div>
      )}
    </>
  ));
};

export default VirtualCards;
