import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Deposit from "./pages/Deposit";
import SellCrypto from "./pages/SellCrypto";
import SendMoney from "./pages/SendMoney";
import AssetDetail from "./pages/AssetDetail";
import Receipt from "./pages/Receipt";
import DeexPay from "./pages/DeexPay";
import GiftCards from "./pages/GiftCards";
import BillPayment from "./pages/BillPayment";
import Activity from "./pages/Activity";
import Rewards from "./pages/Rewards";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import QuickAction from "./pages/QuickAction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/sell-crypto" element={<SellCrypto />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/asset/:symbol" element={<AssetDetail />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/deex-pay" element={<DeexPay />} />
          <Route path="/giftcards" element={<GiftCards />} />
          <Route path="/bills/:type" element={<BillPayment />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quick-action" element={<QuickAction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
