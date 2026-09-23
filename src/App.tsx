import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdOffer2000 from "./pages/AdOffer2000";
import Onboarding from "./pages/Onboarding";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Deposit from "./pages/Deposit";
import DepositCash from "./pages/DepositCash";
import ShareDeexTag from "./pages/ShareDeexTag";
import WhatsNew from "./pages/WhatsNew";
import SellCrypto from "./pages/SellCrypto";
import SwapCrypto from "./pages/SwapCrypto";
import WithdrawCrypto from "./pages/WithdrawCrypto";
import SendMoney from "./pages/SendMoney";
import AssetDetail from "./pages/AssetDetail";
import Receipt from "./pages/Receipt";
import DeexPay from "./pages/DeexPay";
import GiftCards from "./pages/GiftCards";
import BuyGiftCard from "./pages/BuyGiftCard";
import MarketingTopic from "./pages/MarketingTopic";
import MarketingPolicy from "./pages/MarketingPolicy";
import ScrollToTop from "./components/ScrollToTop";
import BillPayment from "./pages/BillPayment";
import NairaWallet from "./pages/NairaWallet";
import Activity from "./pages/Activity";
import Rewards from "./pages/Rewards";
import ReferralDashboard from "./pages/ReferralDashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
const EmailPreview = React.lazy(() => import("./pages/EmailPreview"));
import GenerateStatement from "./pages/GenerateStatement";
import AboutDeeX from "./pages/AboutDeeX";
import LegalDocument from "./pages/LegalDocument";
import ChangePin from "./pages/ChangePin";
import ChangePassword from "./pages/ChangePassword";
import SecuritySettings from "./pages/SecuritySettings";
import BankAccounts from "./pages/BankAccounts";
import KycVerification from "./pages/KycVerification";
import Support from "./pages/Support";
import QuickAction from "./pages/QuickAction";
import AdminPanel from "./pages/AdminPanel";
import VirtualCards from "./pages/VirtualCards";
import TradeStreak from "./pages/TradeStreak";
import AdminUserDetail from "./pages/AdminUserDetail";
import InviteEarn from "./pages/InviteEarn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Survey from "./pages/Survey";
import { InviteCodeProvider } from "./contexts/InviteCodeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BalanceVisibilityProvider } from "./contexts/BalanceVisibilityContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
      <BalanceVisibilityProvider>
      <InviteCodeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ad-2000-offer" element={<AdOffer2000 />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/deposit-cash" element={<DepositCash />} />
            <Route path="/deex-tag" element={<ShareDeexTag />} />
            <Route path="/whats-new" element={<WhatsNew />} />
            <Route path="/sell-crypto" element={<SellCrypto />} />
            <Route path="/swap-crypto" element={<SwapCrypto />} />
            <Route path="/withdraw" element={<WithdrawCrypto />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/asset/:symbol" element={<AssetDetail />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/transaction-detail" element={<Navigate to="/receipt" replace />} />
            <Route path="/deex-pay" element={<Navigate to="/sell-crypto" replace />} />
            <Route path="/payment-link" element={<DeexPay />} />
            <Route path="/giftcards" element={<GiftCards />} />
            <Route path="/giftcards/buy" element={<BuyGiftCard />} />
            <Route path="/bills/:type" element={<BillPayment />} />
            <Route path="/naira-wallet" element={<NairaWallet />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/referrals" element={<ReferralDashboard />} />
            <Route path="/invite-earn" element={<InviteEarn />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/generate-statement" element={<GenerateStatement />} />
            <Route path="/about" element={<AboutDeeX />} />
            <Route path="/legal/:slug" element={<LegalDocument />} />
            <Route path="/change-pin" element={<ChangePin />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="/bank-accounts" element={<BankAccounts />} />
            <Route path="/kyc" element={<KycVerification />} />
            <Route path="/support" element={<Support />} />
            <Route path="/quick-action" element={<QuickAction />} />
            <Route path="/virtual-cards" element={<VirtualCards />} />
            <Route path="/trade-streak" element={<TradeStreak />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* Website pages behind the footer — never the app's own screens. */}
            <Route path="/products/:slug" element={<MarketingTopic />} />
            <Route path="/company/:slug" element={<MarketingTopic />} />
            <Route path="/rewards-programme/:slug" element={<MarketingTopic />} />
            <Route path="/rewards-programme" element={<MarketingTopic slug="tasks" />} />
            <Route path="/merchant" element={<MarketingTopic slug="merchant" />} />
            <Route path="/faq" element={<MarketingTopic slug="faq" />} />
            <Route path="/policies/:slug" element={<MarketingPolicy />} />

            {import.meta.env.DEV && <Route path="/emails/preview" element={<Suspense fallback={null}><EmailPreview /></Suspense>} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </InviteCodeProvider>
      </BalanceVisibilityProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
