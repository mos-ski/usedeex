import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import PageTransition from "@/components/PageTransition";
import { ActionTile, AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import AssetMark from "@/components/dashboard/AssetMark";
import { PlusIcon, SendIcon, SwapIcon } from "@/components/dashboard/icons";
import SendTo from "@/components/dashboard/SendTo";
import OptionSheet from "@/components/dashboard/OptionSheet";
import { receivableCoins } from "@/data/receivableCoins";
import { AmountEntry, parseAmount } from "@/components/dashboard/AmountEntry";
import { cryptoDestinations, type CryptoDestination } from "@/data/recipientData";
import { NGN_PER_USD } from "@/lib/format";
import { splitUsdForDisplay } from "@/lib/format";
import { cn } from "@/lib/utils";

type Asset = {
  name: string;
  price: number;
  /** 24h move in dollars; sign drives the colour. */
  changeUsd: number;
  changePct: number;
  /** Coin holdings, e.g. "0.02340000 BTC". */
  holdings: string;
  /** Dollar value of those holdings — matches the Wallet list. */
  usdBalance: number;
  todayUsd: number;
};

const assetData: Record<string, Asset> = {
  BTC: { name: "Bitcoin", price: 67378.3, changeUsd: -611.49, changePct: -0.9, holdings: "0.02340000 BTC", usdBalance: 2280.12, todayUsd: 22.43 },
  ETH: { name: "Ethereum", price: 3250.5, changeUsd: 38.5, changePct: 1.2, holdings: "0.15000000 ETH", usdBalance: 487.5, todayUsd: 5.78 },
  USDT: { name: "Tether", price: 1.0, changeUsd: 0.01, changePct: 0.01, holdings: "5,420.00 USDT", usdBalance: 5420, todayUsd: 0.54 },
  USDC: { name: "US Dollar Coin", price: 1.0, changeUsd: 0.0, changePct: 0.0, holdings: "2,100.00 USDC", usdBalance: 2100, todayUsd: 0.21 },
  SOL: { name: "Solana", price: 150.2, changeUsd: 5.08, changePct: 3.5, holdings: "12.50000000 SOL", usdBalance: 1875, todayUsd: 63.5 },
  TRX: { name: "Tron", price: 0.14, changeUsd: 0.002, changePct: 1.1, holdings: "1,200.00 TRX", usdBalance: 168, todayUsd: 1.83 },
  DOGE: { name: "Dogecoin", price: 0.24, changeUsd: 0.005, changePct: 2.3, holdings: "500.00 DOGE", usdBalance: 120.18, todayUsd: 2.7 },
};

const recentTxns = [
  { type: "BTC to USDT", date: "Apr 25th, 2024", status: "Success", amount: "0.00001535 BTC", value: "$0.95" },
  { type: "USDT to BTC", date: "Apr 20th, 2024", status: "Success", amount: "1.00 USDT", value: "$1.00" },
];

const timeframes = ["1D", "1W", "1M", "1Y", "All"] as const;
const pointsPerTimeframe: Record<(typeof timeframes)[number], number> = { "1D": 48, "1W": 56, "1M": 64, "1Y": 78, All: 96 };

const tourSteps = [
  { title: "Deposit", description: "Tap the Deposit button to receive crypto into your wallet. Select the network carefully." },
  { title: "Withdraw", description: "Send crypto to a DeeX user by username, or to an external wallet address. Past beneficiaries are saved." },
  { title: "Swap", description: "Instantly convert one crypto to another. Rates update in real time." },
];

/**
 * Deterministic random walk so a given symbol + timeframe always draws the same
 * line (no reshuffling on re-render) while each timeframe looks distinct.
 */
const buildSeries = (symbol: string, timeframe: string, price: number) => {
  const count = pointsPerTimeframe[timeframe as (typeof timeframes)[number]] ?? 48;
  let seed = [...`${symbol}${timeframe}`].reduce((acc, c) => acc + c.charCodeAt(0), 0) || 1;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const values: number[] = [];
  let level = price * 0.94;
  const drift = (price * 0.12) / count;
  for (let i = 0; i < count; i += 1) {
    level += drift + (rand() - 0.45) * price * 0.012;
    values.push(level);
  }
  return values;
};

/** Axis labels drop the cents on large numbers, matching the Figma. */
const formatAxis = (value: number) =>
  value >= 100
    ? `$${Math.round(value).toLocaleString("en-US")}`
    : `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;

const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: value >= 1 ? 2 : 4 })}`;

type WithdrawView = "none" | "sendTo" | "amount";

const AssetDetail = () => {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [withdrawView, setWithdrawView] = useState<WithdrawView>("none");
  const [destination, setDestination] = useState<CryptoDestination | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [networkOpen, setNetworkOpen] = useState(false);

  const key = symbol?.toUpperCase() || "BTC";
  const asset = assetData[key] || assetData.BTC;
  const isNegative = asset.changeUsd < 0;

  // Depositing needs a chain, so ask for it here rather than sending the
  // user to /deposit to pick the coin they are already looking at.
  const networks = receivableCoins.find((c) => c.symbol === key)?.networks ?? [];
  const openDeposit = (network: string) => navigate("/deposit", { state: { symbol: key, network } });
  const startDeposit = () => {
    if (networks.length > 1) {
      setNetworkOpen(true);
      return;
    }
    openDeposit(networks[0] ?? "");
  };

  const values = useMemo(() => buildSeries(key, timeframe, asset.price), [key, timeframe, asset.price]);
  const chartData = values.map((v, i) => ({ i, v }));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const minIdx = values.indexOf(min);
  const maxIdx = values.indexOf(max);

  /**
   * Places a min/max label just below its point, clamped inside the plot so it
   * never rides up into the price row or down over the timeframe tabs.
   */
  const labelStyle = (idx: number) => ({
    left: `${Math.min(86, Math.max(14, (idx / (values.length - 1)) * 100))}%`,
    top: `${Math.min(76, Math.max(10, (1 - (values[idx] - min) / (max - min || 1)) * 100))}%`,
  });

  const balance = splitUsdForDisplay(asset.usdBalance);

  /* ---- Withdraw: pick a destination, then an amount (Figma 269:5828 / 269:7302) ---- */
  if (withdrawView === "sendTo") {
    return (
      <SendTo
        onBack={() => setWithdrawView("none")}
        destinations={cryptoDestinations}
        onSelect={(d) => {
          setDestination(d);
          setWithdrawAmount("");
          setWithdrawView("amount");
        }}
      />
    );
  }

  if (withdrawView === "amount" && destination) {
    const sending = parseAmount(withdrawAmount);
    const ngnValue = sending * asset.price * NGN_PER_USD;

    return (
      <AmountEntry
        title={`Send ${key}`}
        onBack={() => setWithdrawView("sendTo")}
        value={withdrawAmount}
        onValueChange={setWithdrawAmount}
        fromSymbol={key}
        fromOptions={[{ symbol: key, hint: asset.holdings }]}
        onFromChange={() => undefined}
        toSymbol="NGN"
        convertedText={ngnValue ? Math.round(ngnValue).toLocaleString("en-US") : "0"}
        footer={
          <div className="border-b border-brand-grey100 py-3">
            <p className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
              {destination.display}
            </p>
            <p className="truncate text-xs leading-[1.3] text-brand-bodyText">
              {destination.label} • {destination.network}
            </p>
          </div>
        }
        submitDisabled={sending <= 0}
        onSubmit={() => {
          setWithdrawView("none");
          navigate("/receipt", {
            state: {
              type: "sell",
              data: {
                type: `Sent ${key}`,
                amount: `${withdrawAmount} ${key}`,
                destination: destination.display,
                status: "Processing",
              },
            },
          });
        }}
      />
    );
  }

  return (
    <AppShell innerClassName="pb-10 sm:pb-12">
      <PageTransition>
        <PageHeader title={key} onBack={() => navigate(-1)} />

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-5">
          <div className="flex flex-col gap-3 lg:gap-5">
            {/* Today's price + chart */}
            <SectionCard className="px-0 pb-0 pt-3">
              <div className="px-4">
                <p className="text-xs font-semibold leading-[1.4] text-brand-grey900 lg:text-sm">Today&apos;s Price</p>
                <div className="flex items-center gap-4 py-3">
                  <AssetMark symbol={key} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{key}</span>
                    <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{asset.name}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end">
                    <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                      {formatPrice(asset.price)}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap text-xs leading-[1.3]",
                        isNegative ? "text-brand-danger" : "text-brand-successText",
                      )}
                    >
                      {isNegative ? "" : "+"}
                      {asset.changeUsd} ({asset.changePct}%)
                    </span>
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-[120px] w-full lg:h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="assetArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9AD1F9" />
                        <stop offset="100%" stopColor="#E8F3FC" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Area
                      type="linear"
                      dataKey="v"
                      stroke="#0B75C2"
                      strokeWidth={1}
                      fill="url(#assetArea)"
                      dot={false}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>

                <span
                  className="pointer-events-none absolute -translate-x-1/2 translate-y-1.5 whitespace-nowrap font-manrope text-[11px] font-medium leading-[1.6] text-brand-grey500"
                  style={labelStyle(minIdx)}
                >
                  {formatAxis(min)}
                </span>
                <span
                  className="pointer-events-none absolute -translate-x-1/2 translate-y-1.5 whitespace-nowrap font-manrope text-[11px] font-medium leading-[1.6] text-brand-grey500"
                  style={labelStyle(maxIdx)}
                >
                  {formatAxis(max)}
                </span>
              </div>

              {/* Timeframes */}
              <div role="tablist" aria-label="Chart range" className="flex items-center gap-2.5 px-4 py-3">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    role="tab"
                    type="button"
                    aria-selected={timeframe === tf}
                    onClick={() => setTimeframe(tf)}
                    className={cn(
                      "relative min-w-0 flex-1 py-1 text-center font-manrope text-[13px] font-semibold leading-[1.6] transition-colors",
                      timeframe === tf ? "text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                    )}
                  >
                    {tf}
                    {timeframe === tf && (
                      <span className="absolute inset-x-0 -bottom-1.5 mx-auto h-0.5 w-14 rounded-lg bg-brand-blue500" />
                    )}
                  </button>
                ))}
              </div>
            </SectionCard>

            {/* Balance */}
            <SectionCard className="flex flex-col items-center gap-1 py-[18px] lg:py-8">
              <p className="text-[10px] uppercase leading-[1.6] text-brand-grey600 lg:text-xs">Your Balance</p>
              <p className="whitespace-nowrap font-gasoek leading-[1.4] text-brand-grey900">
                <span className="text-[33px] lg:text-[46px]">{balance.lead}</span>
                <span className="text-[17px] lg:text-[24px]">{balance.cents}</span>
              </p>
              <div className="flex items-center gap-2 text-[10px] uppercase text-brand-amberBrown lg:text-xs">
                <p className="leading-[1.6]">
                  <span className="font-semibold">${asset.todayUsd} </span>
                  <span className="font-medium">today</span>
                </p>
                <span className="font-semibold leading-[1.6]">•</span>
                <button
                  type="button"
                  onClick={() => setShowTour(true)}
                  className="font-semibold leading-[1.6] underline-offset-2 hover:underline"
                >
                  See rates
                </button>
              </div>
              <p className="pt-1 text-xs text-brand-bodyText">{asset.holdings}</p>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-3 lg:gap-5">
            {/* Quick actions */}
            <SectionCard className="px-4">
              <SectionHeader title="Quick Actions" />
              <div className="grid grid-cols-3 gap-1 lg:gap-2">
                <ActionTile label="Deposit" Icon={PlusIcon} onClick={startDeposit} />
                <ActionTile label="Withdraw" Icon={SendIcon} onClick={() => setWithdrawView("sendTo")} />
                <ActionTile label="Swap" Icon={SwapIcon} onClick={() => navigate("/swap-crypto")} />
              </div>
            </SectionCard>

            {/* Transactions */}
            <SectionCard className="px-4">
              <SectionHeader title="Transactions" onAction={() => navigate("/activity")} />
              <div className="flex flex-col">
                {recentTxns.map((tx, i) => (
                  <button
                    key={tx.type}
                    type="button"
                    onClick={() => navigate("/receipt", { state: { type: "swap", data: tx } })}
                    className={cn(
                      "flex items-center gap-4 py-3 text-left transition-colors hover:bg-brand-grey50",
                      i < recentTxns.length - 1 && "border-b border-brand-grey100",
                    )}
                  >
                    <AssetMark symbol={key} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                        {tx.type}
                      </span>
                      <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                        {tx.date} • <span className="text-brand-successText">{tx.status}</span>
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end">
                      <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                        {tx.amount}
                      </span>
                      <span className="whitespace-nowrap text-xs leading-[1.3] text-brand-bodyText">{tx.value}</span>
                    </span>
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </PageTransition>

      {/* Chain first, then the QR screen. */}
      <OptionSheet
        open={networkOpen}
        onOpenChange={setNetworkOpen}
        title="Select Network"
        options={networks.map((network) => ({ value: network, label: network, mark: null }))}
        onSelect={(network) => {
          setNetworkOpen(false);
          openDeposit(network);
        }}
      />

      {showTour && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-grey900/40 px-6 backdrop-blur-sm"
          onClick={() => setShowTour(false)}
        >
          <div
            className="w-full max-w-[380px] rounded-2xl bg-brand-surface p-6 font-roboto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs text-brand-grey500">
                Step {tourStep + 1} of {tourSteps.length}
              </span>
              <button type="button" onClick={() => setShowTour(false)} className="text-sm text-brand-grey500">
                Close
              </button>
            </div>
            <h3 className="mb-2 text-lg font-bold text-brand-grey900">{tourSteps[tourStep].title}</h3>
            <p className="mb-6 text-sm text-brand-bodyText">{tourSteps[tourStep].description}</p>
            <div className="flex gap-3">
              {tourStep > 0 && (
                <button
                  type="button"
                  onClick={() => setTourStep(tourStep - 1)}
                  className="h-10 flex-1 rounded-lg border border-brand-grey100 text-sm font-medium text-brand-grey900"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={() => (tourStep < tourSteps.length - 1 ? setTourStep(tourStep + 1) : setShowTour(false))}
                className="h-10 flex-1 rounded-lg bg-brand-blue500 text-sm font-semibold text-white"
              >
                {tourStep < tourSteps.length - 1 ? "Next" : "Got it!"}
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-1">
              {tourSteps.map((step, i) => (
                <span
                  key={step.title}
                  className={cn("size-2 rounded-full", i === tourStep ? "bg-brand-blue500" : "bg-brand-grey100")}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default AssetDetail;
