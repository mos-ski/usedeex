import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Copy, Info } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import InviteCodeInput from "@/components/InviteCodeInput";
import { useInviteCode } from "@/contexts/InviteCodeContext";
import { AppShell, PageHeader } from "@/components/dashboard/AppShell";
import AssetMark from "@/components/dashboard/AssetMark";
import { CaretDownIcon } from "@/components/dashboard/icons";
import CoinPicker from "@/components/dashboard/CoinPicker";
import { receivableCoins as cryptos } from "@/data/receivableCoins";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import qrCode from "@/assets/landing-v2/qr-code.png";
import { cn } from "@/lib/utils";


/** Middle-truncates an address the way the Figma row shows it. */
const shorten = (address: string) => `${address.slice(0, 14)}......${address.slice(-14)}`;

const Deposit = () => {
  const navigate = useNavigate();
  // The coin is chosen in the Dashboard's picker sheet (Figma 299:25076) and
  // handed over as route state; landing here directly reopens that sheet.
  const { state } = useLocation() as { state?: { symbol?: string; network?: string } };
  const initial = cryptos.find((c) => c.symbol === state?.symbol);
  const [pickerOpen, setPickerOpen] = useState(!initial);
  const [crypto, setCrypto] = useState(initial ?? cryptos[0]);
  const [network, setNetwork] = useState(state?.network ?? (initial ?? cryptos[0]).networks[0]);
  const [copied, setCopied] = useState(false);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const { appliedCode, depositCompleted, applyCode, completeDeposit } = useInviteCode();

  const pickCrypto = (symbol: string) => {
    const next = cryptos.find((c) => c.symbol === symbol) ?? cryptos[0];
    setCrypto(next);
    setNetwork(next.networks[0]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(crypto.address);
    setCopied(true);
    toast.success("Address copied");
    setTimeout(() => setCopied(false), 2000);
    // First deposit completes the invite-code reward.
    if (appliedCode && !depositCompleted) completeDeposit();
  };

  const handleShare = async () => {
    const payload = { title: `My ${crypto.symbol} address`, text: crypto.address };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // Share sheet dismissed — fall through to copying.
      }
    }
    handleCopy();
  };

  return (
    <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Receive" onBack={() => navigate(-1)} />

        <div className="flex flex-col items-center px-4">
          {/* Asset + network selector */}
          <div className="flex items-stretch">
            <Popover>
              <PopoverTrigger
                aria-label="Choose asset"
                className="flex items-center gap-1 rounded-l border border-brand-pillBorder bg-brand-pill px-2 py-1"
              >
                <AssetMark symbol={crypto.symbol} className="size-4" />
                <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{crypto.symbol}</span>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-52 border-brand-grey100 bg-brand-surface p-1">
                {cryptos.map((c) => (
                  <button
                    key={c.symbol}
                    type="button"
                    onClick={() => pickCrypto(c.symbol)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50",
                      crypto.symbol === c.symbol && "bg-brand-tint",
                    )}
                  >
                    <AssetMark symbol={c.symbol} className="size-6" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-xs font-semibold text-brand-grey900">{c.symbol}</span>
                      <span className="truncate text-[10px] text-brand-bodyText">{c.name}</span>
                    </span>
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger
                aria-label="Choose network"
                className="flex items-center gap-1 rounded-r border-y border-r border-brand-pillBorder bg-brand-pill px-2 py-1"
              >
                <span className="whitespace-nowrap font-manrope text-[11px] leading-[1.6]">
                  <span className="font-medium text-brand-grey600">Network:</span>{" "}
                  <span className="font-bold text-brand-amberBrown">{network}</span>
                </span>
                <CaretDownIcon className="size-3 text-brand-grey900" />
              </PopoverTrigger>
              <PopoverContent align="center" className="w-48 border-brand-grey100 bg-brand-surface p-1">
                {crypto.networks.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNetwork(n)}
                    className={cn(
                      "w-full rounded px-2 py-2 text-left text-xs font-semibold transition-colors hover:bg-brand-grey50",
                      network === n ? "bg-brand-tint text-brand-blue500" : "text-brand-grey900",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* QR — branded DeeX code, 240x240 per the Figma */}
          <img
            src={qrCode}
            alt={`${crypto.symbol} deposit address QR code`}
            className="mt-3 size-60 max-w-full object-contain"
          />

          {/* Address */}
          <div className="mt-3 flex w-full items-center gap-2 rounded bg-brand-tint px-2 py-1.5">
            <p className="min-w-0 flex-1 truncate text-center text-[15px] font-semibold leading-[1.4] text-brand-blue500">
              {shorten(crypto.address)}
            </p>
            <button type="button" onClick={handleCopy} aria-label="Copy address" className="shrink-0">
              {copied ? (
                <Check className="size-6 text-brand-successText" />
              ) : (
                <Copy className="size-6 text-brand-blue500" />
              )}
            </button>
          </div>

          {/* Warnings */}
          <div className="mt-3 flex w-full flex-col gap-3 rounded-lg bg-brand-grey50 p-3">
            <p className="flex gap-2 text-xs leading-[1.5] text-brand-bodyText">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-blue500" />
              <span>
                Only send <span className="font-bold text-brand-grey900">{crypto.symbol}</span> to this address and on
                the <span className="font-bold text-brand-grey900">{network}</span> network.
              </span>
            </p>
            <p className="flex gap-2 text-xs leading-[1.5] text-brand-bodyText">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-blue500" />
              <span>
                Sending coins other than <span className="font-bold text-brand-grey900">{crypto.symbol}</span> or coins
                for a different network other than <span className="font-bold text-brand-grey900">{network}</span> may
                result in loss.
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex w-full items-start gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex min-w-0 flex-1 items-center justify-center rounded-lg bg-[#F2F2F2] px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] text-[#202020] transition-colors hover:bg-brand-grey100"
            >
              Share
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex min-w-0 flex-1 items-center justify-center gap-3 rounded-lg bg-brand-blue500 px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] text-brand-grey50 transition-opacity hover:opacity-90"
            >
              <Copy className="size-6" />
              Copy
            </button>
          </div>
        </div>
      </PageTransition>

      {showInviteCode && (
        <InviteCodeInput
          onApply={(code) => {
            applyCode(code);
            setShowInviteCode(false);
          }}
          onClose={() => setShowInviteCode(false)}
        />
      )}

      <CoinPicker
        open={pickerOpen}
        onOpenChange={(next) => {
          setPickerOpen(next);
          // Dismissing without a choice leaves nothing to receive into.
          if (!next && !initial) navigate(-1);
        }}
        coins={cryptos}
        onSelect={(symbol, selectedNetwork) => {
          pickCrypto(symbol);
          setNetwork(selectedNetwork);
        }}
      />
    </AppShell>
  );
};

export default Deposit;
