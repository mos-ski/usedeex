import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import InviteCodeInput from "@/components/InviteCodeInput";
import { useInviteCode } from "@/contexts/InviteCodeContext";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { AmountEntry, BalanceShortcuts, parseAmount } from "@/components/dashboard/AmountEntry";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { FaceIdOverlay, ReviewSheet } from "@/components/dashboard/ReviewSheet";
import Walkthrough, { shouldShowWalkthrough, type WalkthroughStep } from "@/components/dashboard/Walkthrough";
import { trimZeros } from "@/lib/format";
import { cn } from "@/lib/utils";

/** `rate` is the asset's USD price; swaps convert through it. */
const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.0234, rate: 67378.3 },
  { symbol: "ETH", name: "Ethereum", balance: 0.15, rate: 3250.5 },
  { symbol: "USDT", name: "Tether", balance: 5420, rate: 1 },
  { symbol: "USDC", name: "US Dollar Coin", balance: 2100, rate: 1 },
  { symbol: "TRX", name: "Tron", balance: 1200, rate: 0.14 },
];

const bySymbol = (symbol: string) => assets.find((a) => a.symbol === symbol) ?? assets[0];


type View = "amount" | "success";

/** First-run coach marks for the swap screen. */
const SWAP_TOUR_KEY = "deex.tour.swap";
const swapTour: WalkthroughStep[] = [
  { anchor: "amount", title: "Start with what you're paying", description: "Type the amount and pick the coin you want to swap from." },
  { anchor: "converted", title: "See what you get back", description: "The converted amount updates live at today's rate." },
  { anchor: "footer", title: "Use your balance", description: "Tap 25%, 50%, 75% or Max to fill the amount from what you hold, then Done." },
];

const SwapCrypto = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("amount");
  const [fromSymbol, setFromSymbol] = useState("BTC");
  const [toSymbol, setToSymbol] = useState("USDT");
  const [raw, setRaw] = useState("");
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const { appliedCode, tradeCompleted, applyCode, completeTrade } = useInviteCode();

  const from = bySymbol(fromSymbol);
  const to = bySymbol(toSymbol);
  const amount = parseAmount(raw);
  const received = (amount * from.rate) / to.rate;
  const fee = amount * 0.005;
  const exceedsBalance = amount > from.balance;
  const ready = amount > 0 && !exceedsBalance;

  useEffect(() => {
    if (view === "success" && appliedCode && !tradeCompleted) {
      completeTrade();
      toast.success(`You earned ${appliedCode.tradeReward} DeeXpoints for trading!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  /** Picking the same asset on both sides swaps them instead of duplicating. */
  const pickFrom = (symbol: string) => {
    if (symbol === toSymbol) setToSymbol(fromSymbol);
    setFromSymbol(symbol);
  };
  const pickTo = (symbol: string) => {
    if (symbol === fromSymbol) setFromSymbol(toSymbol);
    setToSymbol(symbol);
  };

  useEffect(() => {
    if (view !== "amount" || !shouldShowWalkthrough(SWAP_TOUR_KEY)) return;
    const timer = window.setTimeout(() => setTourOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, [view]);

  if (view === "success") {
    return (
      <SuccessScreen
        title="Swap completed!"
        message={`You have successfully swapped ${trimZeros(amount.toFixed(8))} ${from.symbol} for ${trimZeros(received.toFixed(6))} ${to.symbol}.`}
        onPrimary={() => navigate("/wallet")}
        onSecondary={() => navigate("/activity")}
        secondaryLabel="View history"
      />
    );
  }

  /* Review is a sheet over the amount screen (Figma 285:10690). */
  const reviewRows: [string, string][] = [
    ["You pay", `${trimZeros(amount.toFixed(8))} ${from.symbol}`],
    ["You receive", `${trimZeros(received.toFixed(6))} ${to.symbol}`],
    ["Rate", `1 ${from.symbol} = ${trimZeros((from.rate / to.rate).toFixed(6))} ${to.symbol}`],
    ["Fee (0.5%)", `${trimZeros(fee.toFixed(8))} ${from.symbol}`],
  ];

  const confirm = () => {
    setReviewOpen(false);
    setAuthenticating(true);
    window.setTimeout(() => {
      setAuthenticating(false);
      setView("success");
    }, 1400);
  };

  return (
    <>
      <AmountEntry
        title="Swap"
        onBack={() => navigate(-1)}
        value={raw}
        onValueChange={setRaw}
        fromSymbol={fromSymbol}
        fromOptions={assets.map((a) => ({ symbol: a.symbol, hint: `${a.balance.toLocaleString("en-US")} available` }))}
        onFromChange={pickFrom}
        toSymbol={toSymbol}
        toOptions={assets.map((a) => ({ symbol: a.symbol, hint: a.name }))}
        onToChange={pickTo}
        convertedText={received ? trimZeros(received.toFixed(6)) : "0"}
        error={exceedsBalance ? `You only have ${from.balance.toLocaleString("en-US")} ${from.symbol}` : undefined}
        footer={
          <BalanceShortcuts
            balanceLabel={`Bal: ${trimZeros(from.balance.toFixed(8))} ${from.symbol}`}
            onPick={(fraction) => setRaw(trimZeros((from.balance * fraction).toFixed(8)))}
          />
        }
        submitDisabled={!ready}
        onSubmit={() => setReviewOpen(true)}
      />

      <ReviewSheet open={reviewOpen} onOpenChange={setReviewOpen} rows={reviewRows} actionLabel="Confirm swap" onAction={confirm} />

      <FaceIdOverlay active={authenticating} />

      <Walkthrough
        steps={swapTour}
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        storageKey={SWAP_TOUR_KEY}
      />

      {showInviteCode && (
        <InviteCodeInput
          onApply={(code) => {
            applyCode(code);
            setShowInviteCode(false);
          }}
          onClose={() => setShowInviteCode(false)}
        />
      )}
    </>
  );
};

export default SwapCrypto;
