import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton } from "@/components/dashboard/AppShell";
import { AmountEntry, parseAmount } from "@/components/dashboard/AmountEntry";
import AssetMark, { TagAvatar } from "@/components/dashboard/AssetMark";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { ChevronRightIcon, BankIcon, CaretDownIcon } from "@/components/dashboard/icons";
import OptionSheet from "@/components/dashboard/OptionSheet";
import { FaceIdOverlay, ReviewSheet } from "@/components/dashboard/ReviewSheet";
import { NGN_PER_USD, formatNgn } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  bankRecipients,
  cryptoDestinations,
  tagRecipients,
  type BankRecipient,
  type CryptoDestination,
  type TagRecipient,
} from "@/data/recipientData";

const banks = ["Access Bank", "GTBank", "UBA", "Zenith Bank", "First Bank", "PalmPay", "Opay"];

const wallets = [
  { symbol: "USDT", name: "Tether", balance: 5420, usdPrice: 1 },
  { symbol: "USDC", name: "US Dollar Coin", balance: 2100, usdPrice: 1 },
  { symbol: "BTC", name: "Bitcoin", balance: 0.0234, usdPrice: 67378.3 },
  { symbol: "ETH", name: "Ethereum", balance: 0.15, usdPrice: 3250.5 },
];

const savedRecipients = bankRecipients;

/**
 * Recipient types the Send Money flow accepts. The Figma shows the bank
 * (285:11466), DeeX tag (299:27412) and wallet-address (299:28844) screens but
 * not how you switch between them, so this reuses the tab control already on
 * the recipient step.
 */
const modes = [
  { id: "address", label: "Address" },
  { id: "bank", label: "Bank" },
  { id: "tag", label: "DeeX Tag" },
] as const;
type Mode = (typeof modes)[number]["id"];

/** Chain each wallet pays out on, shown beside the address (Figma 299:28844). */
const defaultNetwork: Record<string, string> = {
  USDT: "ERC 20",
  USDC: "ERC 20",
  BTC: "Bitcoin",
  ETH: "ERC 20",
};

const shortenAddress = (value: string) =>
  value.length > 24 ? `${value.slice(0, 12)}......${value.slice(-12)}` : value;

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

  const [mode, setMode] = useState<Mode>("address");
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState(banks[0]);
  const [tag, setTag] = useState("");
  const [tagName, setTagName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<"recent" | "beneficiary">("recent");

  const [wallet, setWallet] = useState(wallets[0]);
  const [raw, setRaw] = useState("");

  const [reviewOpen, setReviewOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const resolvedName = resolveAccountName(account, bank);
  const amount = parseAmount(raw);
  const ngn = amount * wallet.usdPrice * NGN_PER_USD;
  const remaining = Math.max(0, DAILY_LIMIT - SENT_TODAY);
  // The naira cap applies to payouts, not to crypto sent straight to an address.
  const overDailyLimit = mode !== "address" && ngn > remaining;
  const overBalance = amount > wallet.balance;

  const visible = useMemo(() => savedRecipients.filter((r) => r.kind === tab), [tab]);
  const visibleTags = useMemo(() => tagRecipients.filter((r) => r.kind === tab), [tab]);
  // Saved wallet addresses; the "beneficiary" half of the data set is usernames,
  // so both tabs draw from the address entries and split them in two.
  const visibleAddresses = useMemo(() => {
    const addresses = cryptoDestinations.filter((d) => d.value.startsWith("0x") || !d.value.startsWith("@"));
    const half = Math.ceil(addresses.length / 2);
    return tab === "recent" ? addresses.slice(0, half) : addresses.slice(half);
  }, [tab]);
  const network = defaultNetwork[wallet.symbol] ?? "ERC 20";

  /** Whether the chosen recipient is complete enough to move on. */
  const recipientReady =
    mode === "bank" ? Boolean(resolvedName) : mode === "tag" ? tag.trim().length > 1 : address.trim().length > 10;

  /** One-line description of the destination, for the review and receipt. */
  const destination =
    mode === "bank" ? `${account} - ${bank}` : mode === "tag" ? tag : shortenAddress(address);

  const paste = async () => {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (mode === "bank") {
        const digits = text.replace(/\D/g, "").slice(0, 10);
        if (digits) setAccount(digits);
      } else if (mode === "tag") {
        if (text) setTag(text.startsWith("@") ? text : `@${text}`);
      } else if (text) {
        setAddress(text);
      }
    } catch {
      // Clipboard read can be blocked; the field stays editable.
    }
  };

  const pickRecipient = (r: BankRecipient) => {
    setAccount(r.account);
    setBank(r.bank);
    setStep("amount");
  };

  const pickAddress = (d: CryptoDestination) => {
    setAddress(d.value);
    setStep("amount");
  };

  const pickTag = (r: TagRecipient) => {
    setTag(r.tag);
    setTagName(r.name);
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
        message={
          mode === "address"
            ? `You have successfully sent ${raw || "0"} ${wallet.symbol} to ${shortenAddress(address)} on ${network}.`
            : `You have successfully sent ${formatNgn(ngn)} to ${(mode === "bank" ? resolvedName : tagName) || "your recipient"} — ${destination}.`
        }
        onPrimary={() => navigate("/dashboard")}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "sell",
              data: {
                type: "Send Money",
                amount: formatNgn(ngn),
                destination,
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
      <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title="Send to" onBack={() => navigate(-1)} />

          <div className="flex flex-col gap-2 px-4">
            {/* Recipient type */}
            <div role="tablist" aria-label="Recipient type" className="flex items-center gap-3 rounded bg-brand-barBg p-0.5">
              {modes.map((m) => (
                <button
                  key={m.id}
                  role="tab"
                  type="button"
                  aria-selected={mode === m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "shrink-0 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                    mode === m.id ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* DeeX tag (Figma 299:27412) */}
            {mode === "tag" && (
              <div className="flex flex-col items-center gap-1 rounded-lg border border-brand-grey100 bg-brand-surface px-3 pb-2">
                <input
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                    setTagName("");
                  }}
                  placeholder="Enter DeeX Tag or Username"
                  aria-label="DeeX tag or username"
                  className="w-full bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
                />
                <button
                  type="button"
                  onClick={paste}
                  className="self-end p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
                >
                  Paste
                </button>
              </div>
            )}

            {/* Wallet address (Figma 299:28844) */}
            {mode === "address" && (
              <div className="flex flex-col items-center gap-1 rounded-lg border border-brand-grey100 bg-brand-surface px-3 pb-2">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value.trim())}
                  placeholder="Enter wallet address"
                  aria-label="Wallet address"
                  className="w-full break-all bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
                />
                <div className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">
                    <AssetMark symbol={wallet.symbol} className="size-4 text-[9px]" />
                    {wallet.symbol} • {network}
                  </span>
                  <button
                    type="button"
                    onClick={paste}
                    className="p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
                  >
                    Paste
                  </button>
                </div>
              </div>
            )}

            {/* Account + bank */}
            {mode === "bank" && (
            <div className="flex flex-col items-center gap-1 rounded-lg border border-brand-grey100 bg-brand-surface px-3 pb-2">
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                placeholder="Enter Account Number"
                aria-label="Account number"
                className="w-full bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
              />
              <div className="flex w-full items-center justify-between">
                <button
                  type="button"
                  aria-label="Choose bank"
                  onClick={() => setBankOpen(true)}
                  className="flex shrink-0 items-center gap-1 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5"
                >
                  <CaretDownIcon className="size-3 text-brand-grey900" />
                  <AssetMark symbol={bank} className="size-4 text-[9px]" />
                  <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{bank}</span>
                </button>

                <button
                  type="button"
                  onClick={paste}
                  className="p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
                >
                  Paste
                </button>
              </div>
            </div>
            )}

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

            {recipientReady ? (
              <>
                {mode === "bank" && (
                  <p className="py-2 text-[17px] font-semibold leading-[1.4] text-brand-grey900">{resolvedName}</p>
                )}
                {mode === "tag" && tagName && (
                  <p className="py-2 text-[17px] font-semibold leading-[1.4] text-brand-grey900">{tagName}</p>
                )}
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
                        tab === t ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col">
                  {mode === "address"
                    ? visibleAddresses.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => pickAddress(d)}
                          className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
                        >
                          <AssetMark symbol={d.symbol} />
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                              {d.display}
                            </span>
                            <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                              {d.label} • {d.network}
                            </span>
                          </span>
                          <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
                        </button>
                      ))
                    : mode === "tag"
                    ? visibleTags.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => pickTag(r)}
                          className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
                        >
                          <TagAvatar seed={r.tag} />
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                              {r.tag}
                            </span>
                            <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{r.name}</span>
                          </span>
                          <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
                        </button>
                      ))
                    : visible.map((r) => (
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
                      <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
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
  /**
   * Bank and tag sends pay out in naira, so they quote a rate and payout.
   * A wallet-to-wallet send moves the coin itself, so those rows would be
   * misleading — it names the chain instead.
   */
  const reviewRows: [string, string, string?][] =
    mode === "address"
      ? [
          ["Amount", `${raw || "0"} ${wallet.symbol}`],
          ["Wallet", "Crypto"],
          ["Network", network],
          ["Wallet address", shortenAddress(address)],
          ["DeeX Fee", formatNgn(DEEX_FEE)],
        ]
      : [
          ["Amount", `${raw || "0"} ${wallet.symbol}`],
          ["Wallet", "Crypto"],
          ["Rate", `${formatNgn(wallet.usdPrice * NGN_PER_USD)}/${wallet.symbol}`],
          ["Expected Payout", formatNgn(ngn)],
          mode === "bank"
            ? ["Bank details", `${account} - ${bank}`, resolvedName]
            : ["DeeX Tag", tag, tagName],
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
              {mode === "bank" ? (
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-blue500 text-white">
                  <BankIcon className="size-3" />
                </span>
              ) : mode === "tag" ? (
                <TagAvatar seed={tag} />
              ) : (
                <AssetMark symbol={wallet.symbol} />
              )}
              <button
                type="button"
                onClick={() => setStep("recipient")}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
              >
                {/* Bank shows bank over account; the others lead with the handle. */}
                <span className="flex min-w-0 flex-1 flex-col">
                  {mode === "bank" ? (
                    <>
                      <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{bank}</span>
                      <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                        {account}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                        {mode === "tag" ? tag : shortenAddress(address)}
                      </span>
                      <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                        {mode === "tag" ? tagName : `${wallet.symbol} • ${network}`}
                      </span>
                    </>
                  )}
                </span>
                <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
              </button>
            </div>
            {mode === "bank" && (
              <p
                className={cn(
                  "mt-0.5 inline-block rounded px-2 py-0.5 font-manrope text-[11px] font-semibold leading-[1.6]",
                  overDailyLimit ? "bg-brand-noteDanger text-brand-danger" : "bg-brand-noteAmber text-brand-amberBrown",
                )}
              >
                You can only send {(DAILY_LIMIT / 1000).toFixed(0)}k Daily ({remaining.toLocaleString("en-US")} left)
              </p>
            )}
          </div>
        }
        submitDisabled={amount <= 0 || overBalance || overDailyLimit}
        onSubmit={() => setReviewOpen(true)}
      />

      {/* Review (Figma 285:10690) */}
      {/* Review (Figma 285:10690) */}
      <ReviewSheet open={reviewOpen} onOpenChange={setReviewOpen} rows={reviewRows} onAction={confirm} />

      <OptionSheet
        open={bankOpen}
        onOpenChange={setBankOpen}
        title="Select bank"
        value={bank}
        options={banks.map((b) => ({ value: b, label: b }))}
        onSelect={setBank}
      />

      {/* Biometric beat (Figma 285:10476) */}
      <FaceIdOverlay active={authenticating} />
    </>
  );
};

export default SendMoney;
