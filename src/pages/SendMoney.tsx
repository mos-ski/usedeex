import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton } from "@/components/dashboard/AppShell";
import { AmountEntry, parseAmount } from "@/components/dashboard/AmountEntry";
import AssetMark from "@/components/dashboard/AssetMark";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { ArrowRightIcon, BankIcon, CaretDownIcon, FaceIdIcon } from "@/components/dashboard/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { NGN_PER_USD, formatNgn } from "@/lib/format";
import { cn } from "@/lib/utils";

const banks = ["Access Bank", "GTBank", "UBA", "Zenith Bank", "First Bank", "PalmPay", "Opay"];

const wallets = [
  { symbol: "USDT", name: "Tether", balance: 5420, usdPrice: 1 },
  { symbol: "USDC", name: "US Dollar Coin", balance: 2100, usdPrice: 1 },
  { symbol: "BTC", name: "Bitcoin", balance: 0.0234, usdPrice: 67378.3 },
  { symbol: "ETH", name: "Ethereum", balance: 0.15, usdPrice: 3250.5 },
];

type Recipient = { id: string; account: string; name: string; bank: string; kind: "recent" | "beneficiary" };

const savedRecipients: Recipient[] = [
  { id: "r1", account: "0894893438", name: "Emeka", bank: "UBA", kind: "recent" },
  { id: "r2", account: "0894893434", name: "Adedamola", bank: "Access Bank", kind: "recent" },
  { id: "r3", account: "0894893437", name: "Damilola", bank: "GTBank", kind: "recent" },
  { id: "r4", account: "0894893435", name: "Bola", bank: "Zenith Bank", kind: "recent" },
  { id: "b1", account: "8103674006", name: "Precious Isioma", bank: "PalmPay", kind: "beneficiary" },
  { id: "b2", account: "9012345678", name: "Chioma Daniels", bank: "Opay", kind: "beneficiary" },
];

/** Daily payout cap and what's already gone out today. */
const DAILY_LIMIT = 50_000;
const SENT_TODAY = 26_110;
const DEEX_FEE = 50;

/**
 * Stand-in for the bank's name-enquiry call — resolves a saved beneficiary, or
 * synthesises a plausible name so the flow can be exercised end to end.
 */
const resolveAccountName = (account: string, bank: string) => {
  if (account.length < 10) return "";
  const known = savedRecipients.find((r) => r.account === account && r.bank === bank);
  return known ? known.name : "Adedamola Moses";
};

type Step = "recipient" | "amount" | "success";

const SendMoney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("recipient");

  const [account, setAccount] = useState("");
  const [bank, setBank] = useState(banks[0]);
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<"recent" | "beneficiary">("recent");

  const [wallet, setWallet] = useState(wallets[0]);
  const [raw, setRaw] = useState("");

  const [reviewOpen, setReviewOpen] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const resolvedName = resolveAccountName(account, bank);
  const amount = parseAmount(raw);
  const ngn = amount * wallet.usdPrice * NGN_PER_USD;
  const remaining = Math.max(0, DAILY_LIMIT - SENT_TODAY);
  const overDailyLimit = ngn > remaining;
  const overBalance = amount > wallet.balance;

  const visible = useMemo(() => savedRecipients.filter((r) => r.kind === tab), [tab]);

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const digits = text.replace(/\D/g, "").slice(0, 10);
      if (digits) setAccount(digits);
    } catch {
      // Clipboard read can be blocked; the field stays editable.
    }
  };

  const pickRecipient = (r: Recipient) => {
    setAccount(r.account);
    setBank(r.bank);
    setStep("amount");
  };

  /** Runs the biometric beat, then lands on the confirmation screen. */
  const confirm = () => {
    setReviewOpen(false);
    setAuthenticating(true);
    setTimeout(() => {
      setAuthenticating(false);
      setStep("success");
    }, 1400);
  };

  /* ---------------- Success ---------------- */
  if (step === "success") {
    return (
      <SuccessScreen
        title="Transfer completed!"
        message={`You have successfully sent ${formatNgn(ngn)} to ${resolvedName || "your recipient"} — ${account} · ${bank}.`}
        onPrimary={() => navigate("/dashboard")}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "sell",
              data: {
                type: "Send Money",
                amount: formatNgn(ngn),
                destination: `${account} - ${bank}`,
                status: "Completed",
              },
            },
          })
        }
      />
    );
  }

  /* ---------------- Recipient (Figma 285:11466 / 285:11761) ---------------- */
  if (step === "recipient") {
    return (
      <AppShell className="bg-white" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title="Send to" onBack={() => navigate(-1)} />

          <div className="flex flex-col gap-2 px-4">
            {/* Account + bank */}
            <div className="flex flex-col items-center gap-1 rounded-lg border border-brand-grey100 bg-white px-3 pb-2">
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                placeholder="Enter Account Number"
                aria-label="Account number"
                className="w-full bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
              />
              <div className="flex w-full items-center justify-between">
                <Popover>
                  <PopoverTrigger
                    aria-label="Choose bank"
                    className="flex shrink-0 items-center gap-1 rounded border border-[#F0F0F0] bg-[#F8F8F8] px-2 py-1.5"
                  >
                    <CaretDownIcon className="size-3 text-[#191919]" />
                    <AssetMark symbol={bank} className="size-4 text-[9px]" />
                    <span className="text-xs font-semibold leading-[1.4] text-[#191919]">{bank}</span>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-56 border-brand-grey100 bg-white p-1">
                    {banks.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBank(b)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50",
                          bank === b && "bg-brand-tint",
                        )}
                      >
                        <AssetMark symbol={b} className="size-5 text-[9px]" />
                        <span className="text-xs font-semibold text-brand-grey900">{b}</span>
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>

                <button
                  type="button"
                  onClick={paste}
                  className="p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
                >
                  Paste
                </button>
              </div>
            </div>

            {/* Narration */}
            <label className="flex flex-col gap-1 border-b border-brand-grey100 p-3">
              <span className="text-xs leading-[1.3] text-brand-bodyText">Whats this for?</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional"
                className="bg-transparent text-[15px] leading-[1.4] text-brand-grey900 outline-none placeholder:text-[#C9C9C9]"
              />
            </label>

            {resolvedName ? (
              <>
                <p className="py-2 text-[17px] font-semibold leading-[1.4] text-brand-grey900">{resolvedName}</p>
                <div className="mt-auto pt-4">
                  <PrimaryButton onClick={() => setStep("amount")}>Continue</PrimaryButton>
                </div>
              </>
            ) : (
              <>
                {/* Recent / Beneficiary */}
                <div role="tablist" aria-label="Recipient type" className="flex items-center gap-3 rounded bg-brand-barBg p-0.5">
                  {(["recent", "beneficiary"] as const).map((t) => (
                    <button
                      key={t}
                      role="tab"
                      type="button"
                      aria-selected={tab === t}
                      onClick={() => setTab(t)}
                      className={cn(
                        "shrink-0 rounded px-2 py-1.5 text-xs font-semibold capitalize leading-[1.4] transition-colors",
                        tab === t ? "bg-white text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col">
                  {visible.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => pickRecipient(r)}
                      className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
                    >
                      <AssetMark symbol={r.bank} />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                          {r.account}
                        </span>
                        <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                          {r.name} • {r.bank}
                        </span>
                      </span>
                      <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Amount (Figma 285:9989) ---------------- */
  const reviewRows: [string, string, string?][] = [
    ["Amount", `${raw || "0"} ${wallet.symbol}`],
    ["Wallet", "Crypto"],
    ["Rate", `${formatNgn(wallet.usdPrice * NGN_PER_USD)}/${wallet.symbol}`],
    ["Expected Payout", formatNgn(ngn)],
    ["Bank details", `${account} - ${bank}`, resolvedName],
    ["DeeX Fee", formatNgn(DEEX_FEE)],
  ];

  return (
    <>
      <AmountEntry
        title="Send Money"
        onBack={() => setStep("recipient")}
        value={raw}
        onValueChange={setRaw}
        fromSymbol={wallet.symbol}
        fromOptions={wallets.map((w) => ({ symbol: w.symbol, hint: `${w.balance.toLocaleString("en-US")} available` }))}
        onFromChange={(symbol) => setWallet(wallets.find((w) => w.symbol === symbol) ?? wallets[0])}
        toSymbol="NGN"
        convertedText={ngn ? Math.round(ngn).toLocaleString("en-US") : "0"}
        error={overBalance ? `You only have ${wallet.balance.toLocaleString("en-US")} ${wallet.symbol}` : undefined}
        footer={
          <div className="border-b border-brand-grey100 py-3">
            <div className="flex items-center gap-4">
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-blue500 text-white">
                <BankIcon className="size-3" />
              </span>
              <button
                type="button"
                onClick={() => setStep("recipient")}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{bank}</span>
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{account}</span>
                </span>
                <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
              </button>
            </div>
            <p
              className={cn(
                "mt-0.5 inline-block rounded px-2 py-0.5 font-manrope text-[11px] font-semibold leading-[1.6]",
                overDailyLimit ? "bg-[#FFEAEA] text-brand-danger" : "bg-[#FBF7F2] text-brand-amberBrown",
              )}
            >
              You can only send {(DAILY_LIMIT / 1000).toFixed(0)}k Daily ({remaining.toLocaleString("en-US")} left)
            </p>
          </div>
        }
        submitDisabled={amount <= 0 || overBalance || overDailyLimit}
        onSubmit={() => setReviewOpen(true)}
      />

      {/* Review (Figma 285:10690) */}
      <Drawer open={reviewOpen} onOpenChange={setReviewOpen}>
        <DrawerContent className="border-brand-grey100 bg-white font-roboto">
          <DrawerTitle className="sr-only">Review transfer</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Review</p>

            <div className="flex flex-col">
              {reviewRows.map(([label, value, extra]) => (
                <div key={label} className="flex flex-col border-b border-brand-grey100 py-1.5">
                  <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
                  <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">{value}</span>
                  {extra && <span className="text-xs leading-[1.3] text-brand-amberBrown">{extra}</span>}
                </div>
              ))}
            </div>

            <div className="pt-6">
              <PrimaryButton className="font-bold" onClick={confirm}>
                Confirm
                <FaceIdIcon className="size-6" />
              </PrimaryButton>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Biometric beat (Figma 285:10476) */}
      {authenticating && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/25 pt-24 backdrop-blur-[2px]">
          <div className="flex size-[100px] items-center justify-center rounded-[28px] bg-[#13181B] shadow-xl">
            <FaceIdIcon className="size-14 animate-pulse text-[#27F32A]" />
          </div>
          <span className="sr-only" role="status">
            Confirming with Face ID
          </span>
        </div>
      )}
    </>
  );
};

export default SendMoney;
