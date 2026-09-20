import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy, QrCode, Shield } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { AmountEntry, parseAmount } from "@/components/dashboard/AmountEntry";
import AssetMark from "@/components/dashboard/AssetMark";
import { ArrowRightIcon, BankIcon } from "@/components/dashboard/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NGN_PER_USD, formatNgn, trimZeros } from "@/lib/format";
import { cn } from "@/lib/utils";

const assets = [
  { symbol: "BTC", name: "Bitcoin", usdPrice: 67378.3, balance: 0.0234, network: "BEP-20", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { symbol: "ETH", name: "Ethereum", usdPrice: 3250.5, balance: 0.15, network: "ERC-20", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68" },
  { symbol: "USDT", name: "Tether", usdPrice: 1, balance: 5420, network: "BEP-20", address: "0xD31f1Ec12bd7AaBA453Ff6d1a2b90c7D46d6cc11" },
  { symbol: "USDC", name: "US Dollar Coin", usdPrice: 1, balance: 2100, network: "ERC-20", address: "0x892d35Cc6634C0532925a3b844Bc9e7595f2bD12" },
  { symbol: "TRX", name: "Tron", usdPrice: 0.14, balance: 1200, network: "TRC-20", address: "TJmVQ7xk2vGZ4pW8sN1cRb3dLh9fUyE6aQ" },
];

const banks = [
  { id: "palmpay", name: "PalmPay", account: "8103674006" },
  { id: "opay", name: "Opay", account: "9012345678" },
  { id: "gtb", name: "GTBank", account: "0123456789" },
];

/** Payouts above this are split into batches — surfaced as a hint on the row. */
const BATCH_THRESHOLD = 5_000_000;


type Step = "amount" | "review" | "deposit" | "pending";

const SellCrypto = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [symbol, setSymbol] = useState("USDT");
  const [bank, setBank] = useState(banks[0]);
  const [raw, setRaw] = useState("");
  const [copied, setCopied] = useState(false);

  const asset = assets.find((a) => a.symbol === symbol) ?? assets[0];
  const amount = parseAmount(raw);
  const ngn = amount * asset.usdPrice * NGN_PER_USD;
  const ready = amount > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(asset.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ---------------- Pending ---------------- */
  if (step === "pending") {
    return (
      <AppShell innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
        <PageTransition className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="mb-4 flex size-20 items-center justify-center rounded-full bg-brand-warning400/15 text-4xl">
              ⏳
            </span>
            <h2 className="text-2xl font-bold text-brand-grey900">Awaiting deposit</h2>
            <p className="text-sm text-brand-bodyText">
              Send {trimZeros(amount.toFixed(8))} {asset.symbol} to the address provided
            </p>
            <p className="text-xs text-brand-bodyText">You&apos;ll receive</p>
            <p className="text-lg font-semibold text-brand-successText">{formatNgn(ngn)}</p>
            <p className="mt-4 rounded bg-[#FBF7F2] px-2 py-1.5 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-amberBrown">
              We&apos;ll process your trade once the deposit is confirmed
            </p>
            <PrimaryButton className="mt-6 max-w-[343px]" onClick={() => navigate("/dashboard")}>
              Back to Home
            </PrimaryButton>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Deposit address ---------------- */
  if (step === "deposit") {
    return (
      <AppShell innerClassName="pb-10 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title={`Deposit ${asset.symbol}`} onBack={() => setStep("review")} />

          <SectionCard className="px-4">
            {([
              ["Selling", `${trimZeros(amount.toFixed(8))} ${asset.symbol}`],
              ["You'll receive", formatNgn(ngn)],
              ["Destination", `${bank.account} · ${bank.name}`],
            ] as [string, string][]).map(([label, value], i) => (
              <div
                key={label}
                className={cn("flex items-center justify-between gap-4 py-3", i < 2 && "border-b border-brand-grey100")}
              >
                <span className="text-sm text-brand-bodyText">{label}</span>
                <span className="text-right text-sm font-semibold text-brand-grey900">{value}</span>
              </div>
            ))}
          </SectionCard>

          <SectionCard className="mt-3 flex flex-col items-center px-4 py-6">
            <AssetMark symbol={asset.symbol} className="mb-4 size-12" />
            <div className="mb-4 flex size-52 items-center justify-center rounded-2xl border-4 border-brand-primary100 bg-brand-grey900">
              <QrCode className="size-36 text-white" />
            </div>
            <p className="mb-3 text-sm text-brand-bodyText">Your {asset.symbol} address</p>
            <div className="mb-4 flex w-full items-center justify-between gap-3 rounded-lg border border-brand-grey100 bg-brand-grey50 px-4 py-3.5">
              <p className="truncate font-mono text-sm text-brand-grey900">{asset.address}</p>
              <button type="button" onClick={handleCopy} aria-label="Copy address" className="shrink-0">
                {copied ? (
                  <Check className="size-5 text-brand-successText" />
                ) : (
                  <Copy className="size-5 text-brand-blue500" />
                )}
              </button>
            </div>
            <div className="mb-6 flex w-full gap-3 rounded-lg bg-brand-tint p-4">
              <Shield className="mt-0.5 size-8 shrink-0 text-brand-navy" />
              <div>
                <p className="text-sm leading-relaxed text-brand-grey900">
                  Only send <span className="font-bold">{asset.symbol}</span> on the{" "}
                  <span className="font-bold">{asset.network}</span> network.
                </p>
                <p className="mt-1 text-sm text-brand-bodyText">
                  Sending other coins may result in permanent loss.
                </p>
              </div>
            </div>
            <PrimaryButton onClick={() => setStep("pending")}>I&apos;ve sent the crypto</PrimaryButton>
          </SectionCard>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Review ---------------- */
  if (step === "review") {
    const rows: [string, string][] = [
      ["Asset", asset.name],
      ["Network", asset.network],
      ["Amount", `${trimZeros(amount.toFixed(8))} ${asset.symbol}`],
      ["Destination", `${bank.account} · ${bank.name}`],
      ["Rate", `${formatNgn(asset.usdPrice * NGN_PER_USD)}/${asset.symbol}`],
      ["You'll receive", formatNgn(ngn)],
    ];

    return (
      <AppShell innerClassName="pb-10 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title="Confirm trade" onBack={() => setStep("amount")} />
          <SectionCard className="px-4">
            {rows.map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-between gap-4 py-3.5",
                  i < rows.length - 1 && "border-b border-brand-grey100",
                )}
              >
                <span className="text-sm text-brand-bodyText">{label}</span>
                <span className="text-right text-sm font-semibold text-brand-grey900">{value}</span>
              </div>
            ))}
          </SectionCard>
          <div className="px-4 pt-4 sm:px-0">
            <PrimaryButton onClick={() => setStep("deposit")}>
              Proceed to deposit <ArrowRightIcon className="size-5" />
            </PrimaryButton>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Amount entry (Figma 269:6883) ---------------- */
  return (
    <AmountEntry
      title="Sell"
      onBack={() => navigate(-1)}
      value={raw}
      onValueChange={setRaw}
      fromSymbol={symbol}
      fromOptions={assets.map((a) => ({ symbol: a.symbol, hint: `${a.balance.toLocaleString("en-US")} available` }))}
      onFromChange={setSymbol}
      toSymbol="NGN"
      convertedText={ngn ? Math.round(ngn).toLocaleString("en-US") : "0"}
      footer={
        <Popover>
          <PopoverTrigger className="w-full border-b border-brand-grey100 py-3 text-left">
            <span className="flex items-center gap-4">
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-blue500 text-white">
                <BankIcon className="size-3" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{bank.name}</span>
                <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                  {bank.account}
                </span>
              </span>
              <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
            </span>
            {ngn > BATCH_THRESHOLD && (
              <span className="mt-0.5 inline-block rounded bg-[#FBF7F2] px-2 py-0.5 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-amberBrown">
                Payout more than 5M will be paid in batches
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 border-brand-grey100 bg-white p-1">
            {banks.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBank(b)}
                className={cn(
                  "flex w-full flex-col rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50",
                  bank.id === b.id && "bg-brand-tint",
                )}
              >
                <span className="text-[10px] text-brand-bodyText">{b.name}</span>
                <span className="text-xs font-semibold text-brand-grey900">{b.account}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate("/bank-accounts")}
              className="w-full rounded px-2 py-2 text-left text-xs font-medium text-brand-blue500 hover:bg-brand-grey50"
            >
              Manage accounts
            </button>
          </PopoverContent>
        </Popover>
      }
      submitDisabled={!ready}
      onSubmit={() => setStep("review")}
    />
  );
};

export default SellCrypto;
