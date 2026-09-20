import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AmountEntry, parseAmount } from "@/components/dashboard/AmountEntry";
import { FaceIdOverlay, ReviewSheet } from "@/components/dashboard/ReviewSheet";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { ArrowRightIcon, BankIcon } from "@/components/dashboard/icons";
import OptionSheet from "@/components/dashboard/OptionSheet";
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

/** Flat fee taken from the payout. */
const DEEX_FEE = 50;


const SellCrypto = () => {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [symbol, setSymbol] = useState("USDT");
  const [bank, setBank] = useState(banks[0]);
  const [raw, setRaw] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  const asset = assets.find((a) => a.symbol === symbol) ?? assets[0];
  const amount = parseAmount(raw);
  const ngn = amount * asset.usdPrice * NGN_PER_USD;
  const ready = amount > 0;

  /** Biometric beat, then the confirmation screen (Figma 299:28195). */
  const confirm = () => {
    setReviewOpen(false);
    setAuthenticating(true);
    window.setTimeout(() => {
      setAuthenticating(false);
      setDone(true);
    }, 1400);
  };

  /* ---------------- Sold (Figma 299:28195) ---------------- */
  if (done) {
    return (
      <SuccessScreen
        title="Sale completed!"
        message={`You have successfully sold ${trimZeros(amount.toFixed(8))} ${asset.symbol} for ${formatNgn(ngn)} to ${bank.account} · ${bank.name}.`}
        onPrimary={() => navigate("/dashboard")}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "sell",
              data: {
                type: "Sell Crypto",
                amount: formatNgn(ngn),
                destination: `${bank.account} - ${bank.name}`,
                status: "Completed",
              },
            },
          })
        }
      />
    );
  }

  /* Review is a sheet over the amount screen (Figma 285:10690). */
  const reviewRows: [string, string, string?][] = [
    ["Amount", `${trimZeros(amount.toFixed(8))} ${asset.symbol}`],
    ["Wallet", "Crypto"],
    ["Rate", `${formatNgn(asset.usdPrice * NGN_PER_USD)}/${asset.symbol}`],
    ["Expected Payout", formatNgn(ngn)],
    ["Bank details", `${bank.account} - ${bank.name}`, "Precious Isioma"],
    ["DeeX Fee", formatNgn(DEEX_FEE)],
  ];


  /* ---------------- Amount entry (Figma 269:6883) ---------------- */
  return (
    <>
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
                <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{bank.name}</span>
                <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                  {bank.account}
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
        value={String(bank.id)}
        options={banks.map((b) => ({
          value: String(b.id),
          label: b.account,
          detail: b.name,
          mark: (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue500 text-white">
              <BankIcon className="size-3" />
            </span>
          ),
        }))}
        onSelect={(id) => setBank(banks.find((b) => String(b.id) === id) ?? banks[0])}
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

      {/* Review (Figma 285:10690) — the trade is confirmed in a sheet, not a page. */}
      <ReviewSheet
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        rows={reviewRows}
        onAction={confirm}
      />

      <FaceIdOverlay active={authenticating} />
    </>
  );
};

export default SellCrypto;
