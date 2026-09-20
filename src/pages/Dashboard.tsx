import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import InviteCodeInput from "@/components/InviteCodeInput";
import { useInviteCode } from "@/contexts/InviteCodeContext";
import { ActionTile, AppShell, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import CoinPicker from "@/components/dashboard/CoinPicker";
import BalanceToggle from "@/components/dashboard/BalanceToggle";
import { maskAmount, useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { receivableCoins } from "@/data/receivableCoins";
import { depositExtras, depositRouteFor } from "@/components/dashboard/depositDestinations";
import FloatingNav from "@/components/dashboard/FloatingNav";
import RatesSheet from "@/components/dashboard/RatesSheet";
import { resetGiftCardCountry } from "@/components/dashboard/SelectCountryStep";
import {
  AvatarIcon,
  BellIcon,
  ChevronRightIcon,
  GiftCardIcon,
  PhoneCallIcon,
  PlusIcon,
  SendIcon,
  SwapIcon,
} from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

import inviteCardArt from "@/assets/dashboard/invite-card.png";
import AssetMark from "@/components/dashboard/AssetMark";
import logoMtn from "@/assets/dashboard/bill-mtn.png";
import logoIkedc from "@/assets/dashboard/bill-ikedc.png";
import logoSpottybet from "@/assets/dashboard/bill-spottybet.png";
import logoAmazon from "@/assets/dashboard/bill-amazon.png";
import logoApple from "@/assets/dashboard/bill-apple.png";
import logoGooglePlay from "@/assets/dashboard/bill-googleplay.png";

const quickActions = [
  { label: "Bills", path: "bills", Icon: PhoneCallIcon },
  { label: "Send", path: "/send-money", Icon: SendIcon },
  { label: "Deposit", path: "deposit", Icon: PlusIcon },
  { label: "Sell", path: "/sell-crypto", Icon: SwapIcon },
];

const billsForYou = [
  { label: "MTN", logo: logoMtn, path: "/bills/airtime" },
  { label: "IKEDC", logo: logoIkedc, path: "/bills/electricity" },
  { label: "SpottyBet", logo: logoSpottybet, path: "/bills/betting" },
  { label: "Amazon", logo: logoAmazon, path: "/giftcards" },
  { label: "Apple", logo: logoApple, path: "/giftcards" },
  { label: "Google Play", logo: logoGooglePlay, path: "/giftcards" },
];

type Txn = {
  id: number;
  type: string;
  symbol: string;
  date: string;
  status: "Pending" | "Success";
  amount: string;
};

const cryptoTxns: Txn[] = [
  { id: 1, type: "Sell BTC", symbol: "BTC", date: "Today", status: "Pending", amount: "0.00006 BTC" },
  { id: 2, type: "Sell BTC", symbol: "BTC", date: "Jan 02, 2023", status: "Success", amount: "0.00006 BTC" },
  { id: 3, type: "Sell BTC", symbol: "BTC", date: "Jan 02, 2023", status: "Success", amount: "0.00006 BTC" },
];

const giftCardTxns: Txn[] = [
  { id: 1, type: "Apple", symbol: "Apple", date: "Jul 12th, 2024", status: "Pending", amount: "$4,020.00" },
  { id: 2, type: "Google Play", symbol: "Google Play", date: "Sep 5th, 2023", status: "Success", amount: "$100.00" },
  { id: 3, type: "Google Play", symbol: "Google Play", date: "Sep 5th, 2023", status: "Success", amount: "$100.00" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"crypto" | "giftcards">("crypto");
  const [showInviteCodeModal, setShowInviteCodeModal] = useState(false);
  const [showCoinPicker, setShowCoinPicker] = useState(false);
  const { hidden } = useBalanceVisibility();
  const [showRates, setShowRates] = useState(false);
  const { appliedCode, hasSeenDashboardModal, applyCode, markDashboardModalSeen } = useInviteCode();

  useEffect(() => {
    // Prompt new users to enter an invite code the first time they land on the dashboard
    if (!appliedCode && !hasSeenDashboardModal) {
      const timer = setTimeout(() => setShowInviteCodeModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [appliedCode, hasSeenDashboardModal]);

  const isGiftCards = activeTab === "giftcards";
  const transactions = isGiftCards ? giftCardTxns : cryptoTxns;

  return (
    <AppShell>
      <PageTransition>
        {/* Header */}
        <header className="flex items-center justify-between gap-4 px-6 py-4 lg:px-2 lg:py-6">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            aria-label="Profile"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary100 text-brand-blue500 transition-opacity hover:opacity-80 lg:size-10"
          >
            <AvatarIcon className="size-[26px] lg:size-8" />
          </button>

          <div
            role="tablist"
            aria-label="Asset type"
            className="flex h-8 shrink-0 items-center gap-[3px] rounded-md bg-brand-surface p-[3px] lg:h-10"
          >
            {(["crypto", "giftcards"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                type="button"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex h-full min-w-[68px] items-center justify-center rounded px-3 text-[11px] leading-[1.6] transition-colors lg:min-w-[92px] lg:text-sm",
                  activeTab === tab
                    ? "bg-brand-blue500 font-extrabold text-white shadow-sm"
                    : "font-bold text-brand-grey500 hover:text-brand-grey600",
                )}
              >
                {tab === "crypto" ? "Crypto" : "Gift Card"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
            className="relative flex size-[33px] shrink-0 items-center justify-center rounded-full bg-black/[0.03] text-brand-nearBlack transition-colors hover:bg-black/[0.06] lg:size-10"
          >
            <BellIcon className="size-[18px] lg:size-5" />
            <span className="absolute right-1.5 top-[3.75px] size-[5.25px] rounded-full bg-[#FF3B30]" />
          </button>
        </header>

        {/* Body — one column on phones, two from lg up */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
          <div className="flex flex-col gap-3 lg:gap-5">
            {/* Total payout */}
            <SectionCard className="flex flex-col items-center gap-1 py-[18px] lg:py-8">
              <p className="flex items-center justify-center gap-0.5 text-[10px] uppercase leading-[1.6] text-brand-grey600 lg:text-xs">
                Total Payout
                <BalanceToggle />
              </p>
              <p className="font-gasoek leading-[1.4] text-brand-grey900">
                {hidden ? (
                  <span className="text-[33px] lg:text-[46px]">{maskAmount("$1,458.98")}</span>
                ) : (
                  <>
                    <span className="text-[33px] lg:text-[46px]">$1,458.</span>
                    <span className="text-[17px] lg:text-[24px]">98</span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-2 text-[10px] uppercase text-brand-amberBrown lg:text-xs">
                <p className="leading-[1.6]">
                  <span className="font-semibold">{hidden ? maskAmount("$22.43") : "$22.43"} </span>
                  <span className="font-medium">today</span>
                </p>
                <span className="font-semibold leading-[1.6]">•</span>
                <button
                  type="button"
                  onClick={() => setShowRates(true)}
                  className="font-semibold leading-[1.6] underline-offset-2 hover:underline"
                >
                  See rates
                </button>
              </div>

              {isGiftCards && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    aria-label="Trade Giftcard"
                    onClick={() => {
                      resetGiftCardCountry();
                      navigate("/giftcards");
                    }}
                    className="flex size-14 items-center justify-center rounded-full bg-brand-blue500 text-white shadow-sm transition-opacity hover:opacity-90"
                  >
                    <GiftCardIcon className="size-7" />
                  </button>
                </div>
              )}
            </SectionCard>

            {/* Quick actions */}
            {!isGiftCards && (
            <SectionCard>
              <SectionHeader title="Quick Actions" />
              <div className="grid grid-cols-4 gap-1 lg:gap-2">
                {quickActions.map(({ label, path, Icon }) => (
                  <ActionTile
                    key={label}
                    label={label}
                    Icon={Icon}
                    onClick={() => {
                      if (path === "bills") return navigate("/bills/airtime");
                      if (path === "deposit") return setShowCoinPicker(true);
                      navigate(path);
                    }}
                  />
                ))}
              </div>
            </SectionCard>
            )}

            {/* Invite code prompt */}
            {!appliedCode && !isGiftCards && (
              <SectionCard>
                <button
                  type="button"
                  onClick={() => setShowInviteCodeModal(true)}
                  className="flex w-full items-center gap-6 text-left"
                >
                  <img
                    src={inviteCardArt}
                    alt=""
                    className="size-[37px] shrink-0 rotate-[21.28deg] object-contain lg:size-[46px]"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span
                      className="bg-clip-text text-xs font-semibold leading-[1.4] text-transparent lg:text-sm"
                      style={{
                        backgroundImage:
                          "linear-gradient(-68.29deg, var(--brand-gradient-navy) 46.744%, #FF3838 103.77%)",
                      }}
                    >
                      Have an invite code?
                    </span>
                    <span className="text-xs leading-[1.3] text-brand-bodyText lg:text-[13px]">
                      Get rewards when you make your first deposit and start trading
                    </span>
                  </span>
                  <ChevronRightIcon className="size-[18px] shrink-0 text-brand-grey900" />
                </button>
              </SectionCard>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:gap-5">
            {/* Bills for you */}
            {!isGiftCards && (
            <SectionCard>
              <SectionHeader title="Bills for you" onAction={() => setShowBillPicker(true)} />
              <div className="grid grid-cols-3 gap-px overflow-hidden border border-brand-hairline bg-brand-hairline">
                {billsForYou.map(({ label, logo, path }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => navigate(path)}
                    className="flex h-[72px] flex-col items-center justify-center gap-1 bg-brand-surface p-3 transition-colors hover:bg-brand-tint lg:h-[92px] lg:gap-2"
                  >
                    <img src={logo} alt="" className="size-[26px] object-contain lg:size-8" />
                    <span className="text-[10px] leading-[1.6] text-brand-grey900 lg:text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </SectionCard>
            )}

            {/* Transactions */}
            <SectionCard>
              <SectionHeader title="Transactions" onAction={() => navigate("/activity")} />
              <div className="flex flex-col">
                {transactions.map((tx, i) => (
                  <button
                    key={tx.id}
                    type="button"
                    onClick={() =>
                      navigate("/receipt", {
                        state: {
                          type: activeTab === "crypto" ? "sell" : "giftcard",
                          data: {
                            type: tx.type,
                            symbol: tx.symbol,
                            brand: tx.symbol,
                            amount: tx.amount,
                            amountCrypto: tx.amount,
                            date: tx.date,
                            status: tx.status,
                          },
                        },
                      })
                    }
                    className={cn(
                      "flex items-center gap-3 py-3 text-left transition-colors hover:bg-brand-grey50",
                      i < transactions.length - 1 && "border-b border-brand-hairline",
                    )}
                  >
                    <AssetMark symbol={tx.symbol} className="size-6 lg:size-8" />
                    <span className="flex min-w-0 flex-1 items-start justify-between gap-3">
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-xs font-semibold leading-[1.6] text-brand-grey900 lg:text-sm">
                          {tx.type}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-[11px] leading-[1.6] text-brand-grey500 lg:text-xs">{tx.date}</span>
                          <span className="size-[3px] shrink-0 rounded-full bg-brand-grey300" />
                          <span
                            className={cn(
                              "text-[11px] font-medium leading-[1.6] lg:text-xs",
                              tx.status === "Pending" ? "text-brand-warning400" : "text-brand-success300",
                            )}
                          >
                            {tx.status}
                          </span>
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-xs font-semibold leading-[1.6] text-brand-grey900 lg:text-sm">
                        {tx.amount}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </PageTransition>

      <FloatingNav />


      {/* Deposit opens the coin sheet (Figma 299:25076) before the QR screen. */}
      <CoinPicker
        open={showCoinPicker}
        onOpenChange={setShowCoinPicker}
        coins={receivableCoins}
        extras={depositExtras}
        onSelect={(symbol, network) => {
          const route = depositRouteFor(symbol, network);
          navigate(route.path, route.state ? { state: route.state } : undefined);
        }}
      />

      <RatesSheet open={showRates} onOpenChange={setShowRates} />

      {showInviteCodeModal && (
        <InviteCodeInput
          onApply={(code) => {
            applyCode(code);
            setShowInviteCodeModal(false);
          }}
          onClose={() => {
            setShowInviteCodeModal(false);
            markDashboardModalSeen();
          }}
        />
      )}
    </AppShell>
  );
};

export default Dashboard;
