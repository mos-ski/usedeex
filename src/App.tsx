import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import PinLock from "./pages/PinLock";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Deposit from "./pages/Deposit";
import SellCrypto from "./pages/SellCrypto";
import SwapCrypto from "./pages/SwapCrypto";
import WithdrawCrypto from "./pages/WithdrawCrypto";
import SendMoney from "./pages/SendMoney";
import AssetDetail from "./pages/AssetDetail";
import Receipt from "./pages/Receipt";
import TransactionDetail from "./pages/TransactionDetail";
import DeexPay from "./pages/DeexPay";
import GiftCards from "./pages/GiftCards";
import BillPayment from "./pages/BillPayment";
import Activity from "./pages/Activity";
import Rewards from "./pages/Rewards";
import ReferralDashboard from "./pages/ReferralDashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import GenerateStatement from "./pages/GenerateStatement";
import AboutDeeX from "./pages/AboutDeeX";
import SecuritySettings from "./pages/SecuritySettings";
import BankAccounts from "./pages/BankAccounts";
import KycVerification from "./pages/KycVerification";
import Support from "./pages/Support";
import QuickAction from "./pages/QuickAction";
import AdminPanel from "./pages/AdminPanel";
import VirtualCards from "./pages/VirtualCards";
import TradeStreak from "./pages/TradeStreak";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pin" element={<PinLock />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/sell-crypto" element={<SellCrypto />} />
          <Route path="/swap-crypto" element={<SwapCrypto />} />
          <Route path="/withdraw" element={<WithdrawCrypto />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/asset/:symbol" element={<AssetDetail />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/transaction-detail" element={<TransactionDetail />} />
          <Route path="/deex-pay" element={<DeexPay />} />
          <Route path="/giftcards" element={<GiftCards />} />
          <Route path="/bills/:type" element={<BillPayment />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/referrals" element={<ReferralDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/generate-statement" element={<GenerateStatement />} />
          <Route path="/about" element={<AboutDeeX />} />
          <Route path="/security" element={<SecuritySettings />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          <Route path="/kyc" element={<KycVerification />} />
          <Route path="/support" element={<Support />} />
          <Route path="/quick-action" element={<QuickAction />} />
          <Route path="/virtual-cards" element={<VirtualCards />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
