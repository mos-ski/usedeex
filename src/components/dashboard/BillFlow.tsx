import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton } from "./AppShell";
import { AmountEntry, AmountShortcuts, parseAmount } from "./AmountEntry";
import AssetMark from "./AssetMark";
import SuccessScreen from "./SuccessScreen";
import { ArrowRightIcon, CaretDownIcon, FaceIdIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { nairaWalletBalance } from "@/data/nairaWalletData";
import { formatNgn } from "@/lib/format";
import { cn } from "@/lib/utils";

export type Beneficiary = { id: string; identifier: string; name: string; provider: string; kind: "recent" | "beneficiary" };

export type BillConfig = {
  /** Screen title, e.g. "Airtime". */
  title: string;
  /** Placeholder for the account field, e.g. "Enter Phone Number". */
  identifierPlaceholder: string;
  /** Review-sheet label for that field, e.g. "Phone number". */
  identifierLabel: string;
  /** Digits only (phone/meter) vs free text (betting user IDs). */
  numericIdentifier?: boolean;
  providers: string[];
  /** Chips beside the balance — fixed top-ups, or data bundles. */
  shortcuts: { label: string; value: number }[];
  beneficiaries: Beneficiary[];
};

const DEEX_FEE = 0;

type Step = "recipient" | "amount" | "success";

/**
 * One flow for every bill type (Figma 289:13876 / 289:14099 / 289:14317).
 * Airtime, data, electricity and betting differ only by config — the screens,
 * review sheet and biometric step are shared.
 */
export const BillFlow = ({ config }: { config: BillConfig }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("recipient");

  const [identifier, setIdentifier] = useState("");
  const [provider, setProvider] = useState(config.providers[0]);
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<"recent" | "beneficiary">("recent");

  const [raw, setRaw] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const amount = parseAmount(raw);
  const total = amount + DEEX_FEE;
  const overBalance = total > nairaWalletBalance;
  const identifierReady = config.numericIdentifier === false ? identifier.length >= 4 : identifier.length >= 10;

  const visible = useMemo(() => config.beneficiaries.filter((b) => b.kind === tab), [config.beneficiaries, tab]);

  const pickBeneficiary = (b: Beneficiary) => {
    setIdentifier(b.identifier);
    setProvider(b.provider);
    setStep("amount");
  };

  /** The device contact picker, where the browser exposes one. */
  const pickContact = async () => {
    const picker = (navigator as Navigator & { contacts?: { select: (p: string[], o?: unknown) => Promise<unknown[]> } })
      .contacts;
    if (!picker) {
      try {
        const text = await navigator.clipboard.readText();
        const digits = text.replace(/\D/g, "").slice(0, 11);
        if (digits) setIdentifier(digits);
      } catch {
        // Nothing to fall back to; the field stays editable.
      }
      return;
    }
    try {
      const [picked] = (await picker.select(["tel"], { multiple: false })) as { tel?: string[] }[];
      const tel = picked?.tel?.[0]?.replace(/\D/g, "");
      if (tel) setIdentifier(tel.slice(-11));
    } catch {
      // Picker dismissed.
    }
  };

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
        title={`${config.title} successful!`}
        message={`You have successfully paid ${formatNgn(amount)} to ${identifier} on ${provider}.`}
        onPrimary={() => navigate("/dashboard")}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "airtime",
              data: {
                type: `${provider} - ${config.title}`,
                provider,
                phone: identifier,
                amount: String(amount),
                status: "Completed",
              },
            },
          })
        }
      />
    );
  }

  /* ---------------- Recipient (Figma 289:13876) ---------------- */
  if (step === "recipient") {
    return (
      <AppShell className="bg-white" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title={config.title} onBack={() => navigate(-1)} />

          <div className="flex flex-col gap-2 px-4">
            <div className="flex flex-col items-center gap-1 rounded-lg border border-brand-grey100 bg-white px-3 pb-2">
              <input
                value={identifier}
                onChange={(e) =>
                  setIdentifier(
                    config.numericIdentifier === false ? e.target.value : e.target.value.replace(/\D/g, "").slice(0, 11),
                  )
                }
                inputMode={config.numericIdentifier === false ? "text" : "numeric"}
                placeholder={config.identifierPlaceholder}
                aria-label={config.identifierLabel}
                className="w-full bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
              />
              <div className="flex w-full items-center justify-between">
                <Popover>
                  <PopoverTrigger
                    aria-label="Choose provider"
                    className="flex shrink-0 items-center gap-1 rounded border border-[#F0F0F0] bg-[#F8F8F8] px-2 py-1.5"
                  >
                    <CaretDownIcon className="size-3 text-[#191919]" />
                    <AssetMark symbol={provider} className="size-4 text-[9px]" />
                    <span className="text-xs font-semibold leading-[1.4] text-[#191919]">{provider}</span>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-56 border-brand-grey100 bg-white p-1">
                    {config.providers.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setProvider(p)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50",
                          provider === p && "bg-brand-tint",
                        )}
                      >
                        <AssetMark symbol={p} className="size-5 text-[9px]" />
                        <span className="text-xs font-semibold text-brand-grey900">{p}</span>
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>

                <button
                  type="button"
                  onClick={pickContact}
                  className="p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
                >
                  Contacts
                </button>
              </div>
            </div>

            <label className="flex flex-col gap-1 border-b border-brand-grey100 p-3">
              <span className="text-xs leading-[1.3] text-brand-bodyText">Whats this for?</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional"
                className="bg-transparent text-[15px] leading-[1.4] text-brand-grey900 outline-none placeholder:text-[#C9C9C9]"
              />
            </label>

            {identifierReady ? (
              <div className="pt-4">
                <PrimaryButton onClick={() => setStep("amount")}>Continue</PrimaryButton>
              </div>
            ) : (
              <>
                <div role="tablist" aria-label="Beneficiary type" className="flex items-center gap-3 rounded bg-brand-barBg p-0.5">
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
                  {visible.length === 0 ? (
                    <p className="py-10 text-center text-sm text-brand-bodyText">Nothing saved here yet.</p>
                  ) : (
                    visible.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => pickBeneficiary(b)}
                        className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
                      >
                        <AssetMark symbol={b.provider} />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                            {b.identifier}
                          </span>
                          <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                            {b.name} • {b.provider}
                          </span>
                        </span>
                        <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Amount (Figma 289:14099) ---------------- */
  const reviewRows: [string, string][] = [
    ["Amount", formatNgn(amount)],
    ["Wallet", "Naira Wallet"],
    ["Provider", provider],
    [config.identifierLabel, identifier],
    ["DeeX Fee", formatNgn(DEEX_FEE)],
  ];

  return (
    <>
      <AmountEntry
        title={config.title}
        onBack={() => setStep("recipient")}
        value={raw}
        onValueChange={setRaw}
        fromSymbol="NGN"
        fromOptions={[{ symbol: "NGN", hint: "Naira Wallet" }]}
        onFromChange={() => undefined}
        toSymbol="NGN"
        showConverted={false}
        error={overBalance ? `Your Naira Wallet holds ${formatNgn(nairaWalletBalance)}` : undefined}
        footer={
          <>
            <div className="flex items-center gap-4 border-b border-brand-grey100 py-3">
              <AssetMark symbol={provider} className="size-[30px]" />
              <button
                type="button"
                onClick={() => setStep("recipient")}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{provider}</span>
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                    {identifier}
                  </span>
                </span>
                <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
              </button>
            </div>
            <AmountShortcuts
              balanceLabel={`Bal: ${formatNgn(nairaWalletBalance)}`}
              options={config.shortcuts}
              onPick={(value) => setRaw(value.toLocaleString("en-US"))}
            />
          </>
        }
        submitDisabled={amount <= 0 || overBalance}
        onSubmit={() => setReviewOpen(true)}
      />

      {/* Review (Figma 289:14317) */}
      <Drawer open={reviewOpen} onOpenChange={setReviewOpen}>
        <DrawerContent className="border-brand-grey100 bg-white font-roboto">
          <DrawerTitle className="sr-only">Review payment</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Review</p>
            <div className="flex flex-col">
              {reviewRows.map(([label, value]) => (
                <div key={label} className="flex flex-col border-b border-brand-grey100 py-1.5">
                  <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
                  <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">{value}</span>
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

export default BillFlow;
