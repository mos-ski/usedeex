import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { AmountEntry } from "@/components/dashboard/AmountEntry";
import { TextField } from "@/components/dashboard/FormFields";
import { StatusPill } from "@/components/dashboard/SettingsList";
import PinEntry from "@/components/dashboard/PinEntry";
import OptionSheet from "@/components/dashboard/OptionSheet";
import CoinPicker from "@/components/dashboard/CoinPicker";
import { depositExtras, NAIRA_DEPOSIT } from "@/components/dashboard/depositDestinations";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import { ReviewSheet } from "@/components/dashboard/ReviewSheet";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
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
import BalanceToggle from "@/components/dashboard/BalanceToggle";
import { maskAmount, useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";

const figmaTopUpIcon = "https://www.figma.com/api/mcp/asset/ffe8128f-528b-48be-9a92-a374a93fc0cf/2ba4d.svg";
const figmaManageIcon = "https://www.figma.com/api/mcp/asset/ffe8128f-528b-48be-9a92-a374a93fc0cf/9dfcd.svg";
const figmaViewIcon = "https://www.figma.com/api/mcp/asset/ffe8128f-528b-48be-9a92-a374a93fc0cf/e8f0f.svg";

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
  transactions: {
    desc: string;
    amount: string;
    date: string;
    type: "debit" | "credit";
    status?: "failed" | "pending" | "success";
  }[];
}

const mockCards: VCard[] = [
  {
    id: 1,
    last4: "4242",
    label: "Shopping Card",
    balance: "$245.80",
    balanceNum: 245.8,
    status: "active",
    created: "Feb 15, 2026",
    dailyLimit: 500,
    monthlyLimit: 5000,
    transactions: [
      { desc: "Netflix Subscription", amount: "-$15.99", date: "Mar 7, 2026", type: "debit", status: "success" },
      { desc: "Card funding", amount: "+$100.00", date: "Mar 2, 2026", type: "credit", status: "success" },
      { desc: "Spotify Premium", amount: "-$9.99", date: "Feb 28, 2026", type: "debit", status: "pending" },
      { desc: "Amazon Marketplace", amount: "-$42.50", date: "Feb 26, 2026", type: "debit", status: "failed" },
      { desc: "Card funding", amount: "+$75.00", date: "Feb 22, 2026", type: "credit", status: "success" },
      { desc: "Adobe Creative Cloud", amount: "-$52.99", date: "Feb 18, 2026", type: "debit", status: "success" },
      { desc: "Uber Eats", amount: "-$28.40", date: "Feb 15, 2026", type: "debit", status: "success" },
      { desc: "Card funding", amount: "+$200.00", date: "Feb 15, 2026", type: "credit", status: "pending" },
    ],
  },
  {
    id: 2,
    last4: "1111",
    label: "Subscriptions",
    balance: "$48.20",
    balanceNum: 48.2,
    status: "frozen",
    created: "Jan 3, 2026",
    dailyLimit: 200,
    monthlyLimit: 1000,
      transactions: [
        { desc: "Adobe Creative Cloud", amount: "-$52.99", date: "Mar 1, 2026", type: "debit", status: "success" },
        { desc: "Card funding", amount: "+$50.00", date: "Feb 25, 2026", type: "credit", status: "pending" },
        { desc: "Spotify Premium", amount: "-$9.99", date: "Feb 20, 2026", type: "debit", status: "failed" },
      ],
  },
];

const wallets = ["USDT", "BTC", "ETH"];
const topUpWallets = ["NGN", "USDT", "USDC"];
const walletBalances: Record<string, string> = {
  NGN: "₦1,250,000.00",
  USDT: "5,420.00",
  USDC: "2,100.00",
};

const topUpCoins = [
  { symbol: "USDT", name: "Tether", networks: [], usd: 5420 },
  { symbol: "USDC", name: "US Dollar Coin", networks: [], usd: 2100 },
];

/** The card face is intentionally built as HTML/CSS so the card remains an interactive UI component. */
const VirtualCardFace = ({ last4 }: { last4: string }) => (
  <span
    className="relative mx-auto block aspect-[1.62/1] w-full max-w-[360px] overflow-hidden rounded-[18px] border border-white/10 bg-[#0E3155] text-left shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
    style={{
      backgroundImage:
        "radial-gradient(ellipse at 12% 92%, transparent 0 31%, rgba(142,180,207,.25) 31.5% 32%, transparent 32.5% 37%, rgba(142,180,207,.22) 37.5% 38%, transparent 38.5% 43%, rgba(142,180,207,.2) 43.5% 44%, transparent 44.5%), repeating-linear-gradient(155deg, transparent 0 17px, rgba(142,180,207,.22) 18px 19px, transparent 20px 27px)",
    }}
  >
    <span className="absolute inset-0 bg-gradient-to-br from-[#183F68]/80 via-transparent to-[#061A32]/60" />
    <span className="relative flex h-full flex-col justify-between p-5 text-white sm:p-6">
      <span className="flex items-center justify-between">
        <span className="text-[19px] font-black tracking-[-0.08em] text-white">❯DEEX</span>
        <span className="text-[11px] font-bold tracking-[0.18em] text-white/70">VIRTUAL</span>
      </span>
      <span className="flex flex-col gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">Card number</span>
        <span className="text-[15px] font-semibold tracking-[0.18em] text-white">•••• •••• •••• {last4}</span>
        <span className="flex items-end justify-between pt-1 text-[10px] uppercase tracking-[0.15em] text-white/70">
          <span>Alex Johnson</span>
          <span>12/30</span>
        </span>
      </span>
    </span>
  </span>
);

const CardDetailsModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [billingTab, setBillingTab] = useState<"local" | "us">("us");
  const fields = (billingTab === "us"
    ? [
        ["Card holder name", "Alex Johnson"],
        ["Card number", "4242 4242 4242 4242"],
        ["Expiry date", "12/30"],
        ["CVV", "000"],
        ["Billing address", "123 Demo Street, Wilmington, DE 19801, US"],
        ["Zip code", "19801"],
      ]
    : [
        ["Card holder name", "Alex Johnson"],
        ["Card number", "4242 4242 4242 4242"],
        ["Expiry date", "12/30"],
        ["CVV", "000"],
        ["Billing address", "12 Demo Street, Lagos, Nigeria"],
        ["Postal code", "100001"],
      ]) as readonly [string, string][];

  const copy = (value: string) => {
    navigator.clipboard?.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] border-brand-grey100 bg-brand-surface font-roboto">
        <DrawerTitle className="sr-only">Card details</DrawerTitle>
        <div className="mx-auto w-full max-w-[560px] overflow-y-auto px-5 pb-8 pt-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[17px] font-bold leading-[1.4] text-brand-grey900">Card details</p>
          </div>

          <div role="tablist" aria-label="Billing address" className="mb-5 flex items-center gap-3 rounded bg-brand-barBg p-0.5">
            <button
              type="button"
              role="tab"
              aria-selected={billingTab === "local"}
              onClick={() => setBillingTab("local")}
              className={cn(
                "flex-1 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                billingTab === "local" ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900",
              )}
            >
              Local Billing Address
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billingTab === "us"}
              onClick={() => setBillingTab("us")}
              className={cn(
                "flex-1 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                billingTab === "us" ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900",
              )}
            >
              US Billing Address
            </button>
          </div>

          <div className="flex flex-col">
            {fields.map(([label, value]) => (
              <div key={label} className="flex items-start gap-3 border-b border-brand-grey100 py-3 last:border-b-0">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm leading-[1.4] text-brand-bodyText">{label}</span>
                  <span className="block pt-1 text-[15px] leading-[1.4] text-brand-grey900">{value}</span>
                </span>
                <button
                  type="button"
                  onClick={() => copy(value)}
                  aria-label={`Copy ${label}`}
                  className="mt-2 shrink-0 rounded-md p-1 text-brand-blue500 transition-colors hover:bg-brand-tint"
                >
                  <CopyIcon className="size-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <PrimaryButton onClick={() => onOpenChange(false)}>Done</PrimaryButton>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

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
  const location = useLocation();
  const [view, setView] = useState<View>(() => (location.state?.requirePin ? "pin" : "list"));
  const [cards, setCards] = useState(mockCards);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pinReturn, setPinReturn] = useState<"list" | "detail">("list");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);
  const [pinFromMenu] = useState(() => Boolean(location.state?.requirePin));
  const [showNumber, setShowNumber] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [wallet, setWallet] = useState(wallets[0]);
  const [topUpWallet, setTopUpWallet] = useState(topUpWallets[0]);
  const [showTopUpAssetPicker, setShowTopUpAssetPicker] = useState(false);
  const [topUpReviewOpen, setTopUpReviewOpen] = useState(false);
  const [createLabel, setCreateLabel] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const { hidden: balancesHidden } = useBalanceVisibility();

  /** Mocked: cards need KYC level 2 or above. */
  const kycLevel = 2;
  const maxCards = 3;
  const creationFee = 2;

  useEffect(() => {
    if (view !== "pin" || pin.length !== 4) return;
    const timeout = window.setTimeout(() => {
      if (pin !== "1234") {
        setPinError("Incorrect PIN, try again");
        setPin("");
        return;
      }

      setPinError("");
      setPin("");
      navigate("/virtual-cards", { replace: true, state: null });
      if (pinReturn === "detail") setView("detail");
      else {
        setView("list");
        setShowCardDetails(true);
      }
    }, 150);
    return () => window.clearTimeout(timeout);
  }, [navigate, pin, pinReturn, view]);

  // Read from `cards` so edits show without re-selecting.
  const selected = cards.find((c) => c.id === selectedId) ?? null;

  const manageOptions = [
    { value: "block", label: "Block Card", detail: "Temporarily stop all card activity", mark: null },
    {
      value: "freeze",
      label: selected?.status === "frozen" ? "Unfreeze Card" : "Freeze Card",
      detail: "Pause spending and unpause anytime",
      mark: null,
    },
    { value: "pin", label: "Change PIN", detail: "Set a new card PIN", mark: null },
  ];

  if (view === "pin") {
    return (
      <PinEntry
        title="Enter PIN"
        caption="Enter your PIN to view card details"
        value={pin}
        onChange={(value) => {
          setPin(value);
          setPinError("");
        }}
        length={4}
        error={pinError}
        onBack={() => {
          setPin("");
          setPinError("");
          if (pinFromMenu) navigate(-1);
          else setView("list");
        }}
        onBiometric={() => setPin("1234")}
      />
    );
  }

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
                last4: "4242",
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
    const topUpReviewRows: [string, string, string?][] = [
      ["Asset", topUpWallet],
      ["Amount", `${fundAmount || "0.00"} ${topUpWallet}`],
      ["Card", `${selected.label} ••••${selected.last4}`],
      ["Available balance", `${walletBalances[topUpWallet]} ${topUpWallet}`],
    ];

    return (
      <>
        <AmountEntry
          title="Top Up"
          onBack={() => setView("list")}
          value={fundAmount}
          onValueChange={setFundAmount}
          fromSymbol={topUpWallet}
          fromOptions={topUpWallets.map((symbol) => ({ symbol, hint: `${walletBalances[symbol]} available` }))}
          onFromChange={setTopUpWallet}
          onFromPress={() => setShowTopUpAssetPicker(true)}
          fromPicker={
            <CoinPicker
              open={showTopUpAssetPicker}
              onOpenChange={setShowTopUpAssetPicker}
              placeholder="Search asset"
              coins={topUpCoins}
              extras={depositExtras.filter((option) => option.value === NAIRA_DEPOSIT)}
              onSelect={(symbol) => setTopUpWallet(symbol)}
            />
          }
          toSymbol="USD"
          convertedText={`$${fundAmount || "0.00"}`}
          footer={
            <div className="flex items-center justify-between border-b border-brand-grey100 py-3">
              <span className="text-xs leading-[1.3] text-brand-bodyText">Available balance</span>
              <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                {walletBalances[topUpWallet]} {topUpWallet}
              </span>
            </div>
          }
          submitLabel="Top Up"
          submitDisabled={!fundAmount || Number(fundAmount) <= 0}
          onSubmit={() => setTopUpReviewOpen(true)}
        />
        <ReviewSheet
          open={topUpReviewOpen}
          onOpenChange={setTopUpReviewOpen}
          title="Review Top Up"
          rows={topUpReviewRows}
          actionLabel="Confirm Top Up"
          withFaceId={false}
          onAction={() => {
            toast.success(`${fundAmount} ${topUpWallet} funded to card`);
            setTopUpReviewOpen(false);
            setFundAmount("");
            setView("list");
          }}
        />
      </>
    );
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
                {showNumber ? `4242 4242 4242 ${selected.last4}` : `•••• •••• •••• ${selected.last4}`}
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
                    navigator.clipboard?.writeText(`424242424242${selected.last4}`);
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
                    <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                      {tx.date} <span className={cn(
                        tx.status === "failed" ? "text-brand-danger" : tx.status === "pending" ? "text-brand-warning400" : "text-brand-successText",
                      )}>• {(tx.status ?? "success").replace(/^./, (char) => char.toUpperCase())}</span>
                    </span>
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
              setPinReturn("list");
              setPin("");
              setPinError("");
              setView("pin");
            }}
            className="mt-3 block w-full text-left"
            aria-label="Open DeeX card details"
          >
            <span className="flex flex-col items-center gap-2">
              <VirtualCardFace last4={primaryCard?.last4 ?? "4242"} />
              <span className="flex items-center gap-1 text-[10px] uppercase leading-[1.6] text-white/55">
                Balance <BalanceToggle className="text-white/55" />
              </span>
              <span className="font-gasoek text-[38px] leading-[1.15] text-white">
                {balancesHidden ? maskAmount(primaryCard?.balance ?? "$0.00") : primaryCard?.balance ?? "$0.00"}
              </span>
            </span>
          </button>
        </section>

        <SectionCard className="mt-3 px-4 py-4">
          <SectionHeader title="Quick Actions" />
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => {
                setSelectedId(primaryCard?.id ?? null);
                setView("fund");
              }}
              className="flex h-[60px] flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint text-brand-navy transition-colors hover:bg-brand-primary100"
            >
              <img src={figmaTopUpIcon} alt="" className="size-6" />
              <span className="text-[10px] leading-[1.4] text-brand-grey900">Top Up</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedId(primaryCard?.id ?? null);
                setManageOpen(true);
              }}
              className="flex h-[60px] flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint text-brand-navy transition-colors hover:bg-brand-primary100"
            >
              <img src={figmaManageIcon} alt="" className="size-6" />
              <span className="text-[10px] leading-[1.4] text-brand-grey900">Manage Card</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedId(primaryCard?.id ?? null);
                setPinReturn("list");
                setPin("");
                setPinError("");
                setView("pin");
              }}
              className="flex h-[60px] flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint text-brand-navy transition-colors hover:bg-brand-primary100"
            >
              <img src={figmaViewIcon} alt="" className="size-6" />
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
                    <span className="block text-xs leading-[1.3] text-brand-bodyText">
                      {tx.date} <span className={cn(
                        tx.status === "failed" ? "text-brand-danger" : tx.status === "pending" ? "text-brand-warning400" : "text-brand-successText",
                      )}>• {(tx.status ?? "success").replace(/^./, (char) => char.toUpperCase())}</span>
                    </span>
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
      <CardDetailsModal open={showCardDetails} onOpenChange={setShowCardDetails} />
      <OptionSheet
        open={manageOpen}
        onOpenChange={setManageOpen}
        title="Manage Card"
        options={manageOptions}
        onSelect={(value) => {
          if (value === "pin") {
            setManageOpen(false);
            navigate("/change-pin");
            return;
          }
          if (value === "freeze") {
            if (primaryCard) toggleFreeze(primaryCard.id);
            return;
          }
          setManageOpen(false);
          setBlockConfirmOpen(true);
        }}
      />
      <ConfirmDialog
        open={blockConfirmOpen}
        onOpenChange={setBlockConfirmOpen}
        title="Block card?"
        message="Blocking this card will stop all card activity until you unblock it."
        icon={<LockIcon className="size-6" />}
        confirmLabel="Block card"
        destructive
        onConfirm={() => {
          if (!primaryCard) return;
          setCards((list) => list.map((card) => (card.id === primaryCard.id ? { ...card, status: "frozen" } : card)));
          toast.success("Card blocked");
        }}
      />
    </AppShell>
  );
};

export default VirtualCards;
