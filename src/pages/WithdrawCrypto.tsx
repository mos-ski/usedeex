import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { AmountEntry, groupDigits, parseAmount } from "@/components/dashboard/AmountEntry";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { ReviewSheet } from "@/components/dashboard/ReviewSheet";
import { ArrowRightIcon, BankIcon } from "@/components/dashboard/icons";
import OptionSheet from "@/components/dashboard/OptionSheet";
import { NGN_PER_USD, formatNgn } from "@/lib/format";
import { cn } from "@/lib/utils";

type Coin = { symbol: string; name: string; balance: number; usdPrice: number };

const coins: Coin[] = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.0234, usdPrice: 67378.3 },
  { symbol: "ETH", name: "Ethereum", balance: 0.15, usdPrice: 3250.5 },
  { symbol: "USDT", name: "Tether", balance: 5420, usdPrice: 1 },
  { symbol: "USDC", name: "US Dollar Coin", balance: 2100, usdPrice: 1 },
  { symbol: "TRX", name: "Tron", balance: 1200, usdPrice: 0.14 },
];

type BankAccount = { id: string; bank: string; number: string };

const bankAccounts: BankAccount[] = [
  { id: "access", bank: "Access Bank", number: "8899389220" },
  { id: "gtb", bank: "GTBank", number: "0123456789" },
  { id: "opay", bank: "Opay", number: "9012345678" },
];

/** Payouts above this are split into batches — surfaced as a hint on the row. */
const BATCH_THRESHOLD = 5_000_000;

type View = "amount" | "pin" | "success";

const WithdrawCrypto = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("amount");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [coin, setCoin] = useState(coins[0]);
  const [account, setAccount] = useState(bankAccounts[0]);
  const [raw, setRaw] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const amount = parseAmount(raw);
  const ngn = amount * coin.usdPrice * NGN_PER_USD;
  const exceedsBalance = amount > coin.balance;
  const ready = amount > 0 && !exceedsBalance;

  /* ---------------- Success (Figma 259:1401) ---------------- */
  if (view === "success") {
    return (
      <SuccessScreen
        title="Withdraw completed!"
        message={`You have successfully withdrawn ${formatNgn(ngn)} to your ${account.bank} account from your DeeX wallet.`}
        onPrimary={() => navigate("/wallet")}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "sell",
              data: {
                type: "Withdraw",
                amount: formatNgn(ngn),
                destination: `${account.number} - ${account.bank}`,
                status: "Completed",
              },
            },
          })
        }
      />
    );
  }

  /* ---------------- PIN ---------------- */
  if (view === "pin") {
    const handleDigit = (digit: string) => {
      if (pin.length >= 4) return;
      const next = pin + digit;
      setPin(next);
      setPinError(false);
      if (next.length === 4) {
        if (next === "1234") {
          setTimeout(() => setView("success"), 300);
        } else {
          setPinError(true);
          setTimeout(() => {
            setPin("");
            setPinError(false);
          }, 800);
        }
      }
    };

    return (
      <AppShell innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
        <PageTransition className="flex flex-1 flex-col">
          <PageHeader title="Enter PIN" onBack={() => setView("amount")} />
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <p className="mb-8 text-sm text-brand-bodyText">
              Confirm withdrawal of {groupDigits(raw)} {coin.symbol}
            </p>
            <div className="mb-8 flex gap-4">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "size-4 rounded-full transition-colors",
                    pinError ? "bg-[#D92D20]" : i < pin.length ? "bg-brand-blue500" : "bg-brand-grey100",
                  )}
                />
              ))}
            </div>
            {pinError && <p className="mb-4 text-xs text-brand-danger">Incorrect PIN, try again</p>}
            <div className="grid w-64 grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((k, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => (k === "del" ? setPin(pin.slice(0, -1)) : k !== null && handleDigit(String(k)))}
                  className={cn(
                    "h-14 rounded-lg text-lg font-semibold transition-colors",
                    k === null && "invisible",
                    k === "del"
                      ? "text-sm text-brand-grey500"
                      : k !== null && "bg-brand-grey50 text-brand-grey900 active:bg-brand-grey100",
                  )}
                >
                  {k === "del" ? "⌫" : k ?? ""}
                </button>
              ))}
            </div>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Confirm ---------------- */
  /* Review is a sheet over the amount screen (Figma 285:10690). */
  const reviewRows: [string, string, string?][] = [
    ["Asset", coin.symbol],
    ["Amount", `${groupDigits(raw)} ${coin.symbol}`],
    ["You receive", formatNgn(ngn)],
    ["Bank", account.bank],
    ["Account", account.number, "Verify the account details. Completed payouts cannot be reversed."],
  ];

  /* ---------------- Amount entry (Figma 269:7302) ---------------- */
  return (
    <>
      <AmountEntry
      title="Withdraw"
      onBack={() => navigate(-1)}
      value={raw}
      onValueChange={setRaw}
      fromSymbol={coin.symbol}
      fromOptions={coins.map((c) => ({ symbol: c.symbol, hint: `${c.balance.toLocaleString("en-US")} available` }))}
      onFromChange={(symbol) => setCoin(coins.find((c) => c.symbol === symbol) ?? coins[0])}
      toSymbol="NGN"
      convertedText={ngn ? Math.round(ngn).toLocaleString("en-US") : "0"}
      error={exceedsBalance ? `You only have ${coin.balance.toLocaleString("en-US")} ${coin.symbol}` : undefined}
      footer={
        <button
          type="button"
          onClick={() => setBankOpen(true)}
          aria-label="Choose payout account"
          className="w-full border-b border-brand-grey100 py-3 text-left"
        >
            <span className="flex items-center gap-4">
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-blue500 text-white">
                <BankIcon className="size-3" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{account.bank}</span>
                <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                  {account.number}
                </span>
              </span>
              <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
            </span>
            {ngn > BATCH_THRESHOLD && (
              <span className="mt-0.5 inline-block rounded bg-brand-noteAmber px-2 py-0.5 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-amberBrown">
                Payout more than 5M will be paid in batches
              </span>
            )}
        </button>
      }
      submitDisabled={!ready}
      onSubmit={() => setReviewOpen(true)}
    />

      <OptionSheet
        open={bankOpen}
        onOpenChange={setBankOpen}
        title="Payout account"
        value={account.id}
        options={bankAccounts.map((a) => ({
          value: a.id,
          label: a.number,
          detail: a.bank,
          mark: (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue500 text-white">
              <BankIcon className="size-3" />
            </span>
          ),
        }))}
        onSelect={(id) => setAccount(bankAccounts.find((a) => a.id === id) ?? bankAccounts[0])}
        footer={
          <button
            type="button"
            onClick={() => navigate("/bank-accounts")}
            className="w-full py-2 text-center text-xs font-semibold text-brand-blue500"
          >
            Manage accounts
          </button>
        }
      />

      <ReviewSheet
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        rows={reviewRows}
        actionLabel="Confirm withdrawal"
        withFaceId={false}
        onAction={() => {
          setReviewOpen(false);
          setPin("");
          setView("pin");
        }}
      />
    </>
  );
};

export default WithdrawCrypto;
