import { useState, useRef } from "react";
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
import OptionSheet from "@/components/dashboard/OptionSheet";
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
  const [picker, setPicker] = useState<"asset" | "network" | null>(null);
  // Landing here without a coin means the sheet is the whole screen; backing
  // out of it should leave. Once something is chosen there is a page to stay on.
  const chosen = useRef(Boolean(initial));
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
            <button
              type="button"
              aria-label="Choose asset"
              onClick={() => setPicker("asset")}
              className="flex items-center gap-1 rounded-l border border-brand-pillBorder bg-brand-pill px-2 py-1"
            >
              <AssetMark symbol={crypto.symbol} className="size-4" />
              <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{crypto.symbol}</span>
            </button>

            <button
              type="button"
              aria-label="Choose network"
              onClick={() => setPicker("network")}
              className="flex items-center gap-1 rounded-r border border-l-0 border-brand-pillBorder bg-brand-pill px-2 py-1"
            >
              <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{network}</span>
              <CaretDownIcon className="size-3 text-brand-grey900" />
            </button>
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

      <OptionSheet
        open={picker !== null}
        onOpenChange={(next) => !next && setPicker(null)}
        title={picker === "network" ? "Select Network" : "Assets"}
        searchPlaceholder={picker === "asset" ? "Search coin to receive" : undefined}
        value={picker === "network" ? network : crypto.symbol}
        options={
          picker === "network"
            ? crypto.networks.map((n) => ({ value: n, label: n, mark: null }))
            : cryptos.map((c) => ({ value: c.symbol, label: c.symbol, detail: c.name }))
        }
        onSelect={(value) => (picker === "network" ? setNetwork(value) : pickCrypto(value))}
      />

      <CoinPicker
        open={pickerOpen}
        onOpenChange={(next) => {
          setPickerOpen(next);
          if (!next && !chosen.current) navigate(-1);
        }}
        coins={cryptos}
        onSelect={(symbol, selectedNetwork) => {
          pickCrypto(symbol);
          setNetwork(selectedNetwork);
          chosen.current = true;
        }}
      />
    </AppShell>
  );
};

export default Deposit;
