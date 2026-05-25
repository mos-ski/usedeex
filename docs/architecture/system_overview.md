# DeeX — System Architecture Overview

## 1. System Classification

**Type:** Frontend Prototype (Single-Page Application)
**Backend Status:** Exists separately (not in this repository)
**Data Layer:** Fully mocked — localStorage + hardcoded arrays
**Deployment:** Lovable platform (Vercel-like hosting)

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4.19 |
| Language | TypeScript | 5.8.3 |
| Routing | React Router DOM | 6.30.1 |
| Styling | Tailwind CSS | 3.4.17 |
| UI Components | shadcn-ui + Radix UI | Various |
| State Management | TanStack Query (client) | 5.83.0 |
| Forms | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Charts | Recharts | 2.15.4 |
| Animations | Framer Motion | 12.35.1 |
| Notifications | Sonner + Toast | 1.7.4 |
| Testing | Vitest + Testing Library | 3.2.4 / 16.0.0 |
| Linting | ESLint (typescript-eslint) | 9.32.0 |

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   React SPA                           │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │   User App   │  │ Admin Panel  │  │ Shared UI   │ │  │
│  │  │  (36 pages)  │  │  (15 tabs)   │  │ Components  │ │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │  │
│  │         │                 │                  │        │  │
│  │  ┌──────┴─────────────────┴──────────────────┴──────┐ │  │
│  │  │              React Router v6                      │ │  │
│  │  └──────────────────────┬───────────────────────────┘ │  │
│  │                         │                             │  │
│  │  ┌──────────────────────┴───────────────────────────┐ │  │
│  │  │         TanStack Query (QueryClient)              │ │  │
│  │  │         (Currently unused — no API calls)         │ │  │
│  │  └──────────────────────┬───────────────────────────┘ │  │
│  │                         │                             │  │
│  │  ┌──────────────────────┴───────────────────────────┐ │  │
│  │  │           Mock Data Layer                         │ │  │
│  │  │  • localStorage (giftcardStore)                   │ │  │
│  │  │  • Hardcoded arrays (adminMockData)               │ │  │
│  │  │  • Inline component state                         │ │  │
│  │  └───────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

                         │ (Future Integration)
                         ▼

┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL BACKEND                         │
│              (Not in this repository)                       │
│                                                             │
│  Expected endpoints (inferred from UI):                     │
│  • POST /api/auth/login, /api/auth/register                 │
│  • POST /api/auth/verify-pin, /api/auth/2fa                 │
│  • GET  /api/crypto/rates, /api/crypto/assets               │
│  • POST /api/trade/sell, /api/trade/swap, /api/trade/withdraw│
│  • GET  /api/wallet/balance, /api/wallet/deposit-address     │
│  • POST /api/giftcard/submit, /api/giftcard/upload           │
│  • POST /api/bills/pay                                       │
│  • POST /api/deexpay/merchant, /api/deexpay/send, /api/deexpay/link│
│  • POST /api/virtual-cards/create, /fund, /freeze, /delete   │
│  • GET  /api/rewards/balance, /api/rewards/earnings          │
│  • POST /api/rewards/redeem                                  │
│  • GET  /api/referrals/list, /api/referrals/leaderboard      │
│  • POST /api/kyc/submit, GET /api/kyc/status                 │
│  • GET  /api/notifications, /api/transactions                │
│  • GET  /api/profile, PUT /api/profile                       │
│  • GET  /api/admin/* (all admin endpoints)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Folder Structure

```
src/
├── App.tsx                    # Root component with all routes
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── vite-env.d.ts              # Vite type declarations
│
├── pages/                     # 36 page components
│   ├── Onboarding.tsx         # 3-slide onboarding flow
│   ├── Login.tsx              # Email/password + social login
│   ├── SignUp.tsx             # Registration form
│   ├── PinLock.tsx            # 4-digit PIN entry
│   ├── Dashboard.tsx          # Main dashboard with rates, actions, transactions
│   ├── Wallet.tsx             # Asset list with swipeable balance card
│   ├── Deposit.tsx            # Crypto deposit (QR + address)
│   ├── SellCrypto.tsx         # Sell flow (wallet or external source)
│   ├── SwapCrypto.tsx         # Crypto-to-crypto swap
│   ├── WithdrawCrypto.tsx     # Withdraw to external wallet
│   ├── SendMoney.tsx          # Send NGN to bank account
│   ├── AssetDetail.tsx        # Individual asset page
│   ├── Receipt.tsx            # Transaction receipt
│   ├── TransactionDetail.tsx  # Transaction details
│   ├── DeexPay.tsx            # Pay merchant, send cash, generate link
│   ├── GiftCards.tsx          # Sell gift cards (multi-step flow)
│   ├── BillPayment.tsx        # Airtime, data, electricity, betting
│   ├── Activity.tsx           # Transaction history with filters
│   ├── Rewards.tsx            # Points, redemption, streak, referrals
│   ├── ReferralDashboard.tsx  # Referral stats and leaderboard
│   ├── Notifications.tsx      # Notification inbox
│   ├── Profile.tsx            # Profile overview and settings links
│   ├── EditProfile.tsx        # Edit profile form
│   ├── GenerateStatement.tsx  # Account statement generator
│   ├── AboutDeeX.tsx          # About, terms, privacy, AML
│   ├── SecuritySettings.tsx   # PIN, biometric, 2FA, sessions
│   ├── BankAccounts.tsx       # Manage linked bank accounts
│   ├── KycVerification.tsx    # 3-tier KYC submission
│   ├── Support.tsx            # Live chat, email, WhatsApp, FAQ
│   ├── QuickAction.tsx        # Quick action menu
│   ├── VirtualCards.tsx       # Visa virtual card management
│   ├── TradeStreak.tsx        # Trade streak tracking
│   ├── AdminPanel.tsx         # Admin dashboard shell
│   ├── AdminUserDetail.tsx    # Individual user detail view
│   └── NotFound.tsx           # 404 page
│
├── components/
│   ├── ui/                    # 48 shadcn-ui components
│   │   ├── button.tsx, input.tsx, dialog.tsx, etc.
│   │   └── table.tsx, chart.tsx, form.tsx, etc.
│   ├── layout/
│   │   ├── MobileLayout.tsx   # 430px max-width container
│   │   └── BottomNav.tsx      # 5-tab bottom navigation
│   ├── admin/                 # 15 admin sub-components
│   │   ├── AdminLayout.tsx    # Sidebar + header layout
│   │   ├── AdminDashboard.tsx # Metrics + charts
│   │   ├── AdminWallets.tsx   # Wallet management
│   │   ├── AdminOrders.tsx    # Order management
│   │   ├── AdminPayouts.tsx   # Payout tracking
│   │   ├── AdminUsers.tsx     # User management
│   │   ├── AdminKYC.tsx       # KYC approval workflow
│   │   ├── AdminCompliance.tsx# Fraud detection + rules
│   │   ├── AdminVirtualCards.tsx
│   │   ├── AdminGiftCards.tsx # Brand + order management
│   │   ├── AdminBillPayments.tsx
│   │   ├── AdminAuditLog.tsx
│   │   ├── AdminRewards.tsx   # Rewards config + influencers
│   │   ├── AdminReports.tsx   # Analytics reports
│   │   ├── AdminSettings.tsx  # Fees, payroll, security
│   │   ├── AdminUtils.tsx     # Shared badges, dialogs, pagination
│   │   └── ResponsiveTable.tsx
│   ├── rewards/
│   │   ├── SignUpBonus.tsx
│   │   ├── CashbackCard.tsx
│   │   ├── EarningsLog.tsx
│   │   └── RedemptionHistory.tsx
│   ├── CryptoIcon.tsx         # Crypto asset icons
│   ├── ProviderIcon.tsx       # Provider/telco icons
│   ├── NewBadge.tsx           # "NEW" badge component
│   ├── NavLink.tsx            # Navigation link
│   ├── PageTransition.tsx     # Framer Motion transitions
│   ├── EmptyState.tsx         # Empty state component
│   └── SkeletonLoader.tsx     # Loading skeleton
│
├── data/                      # Mock data layer
│   ├── adminMockData.ts       # All admin mock data (656 lines)
│   └── giftcardData.ts        # Gift card brands, rates, localStorage store
│
├── hooks/
│   ├── use-toast.ts           # Toast hook
│   └── use-mobile.tsx         # Mobile detection hook
│
├── lib/
│   └── utils.ts               # cn() utility (clsx + twMerge)
│
└── test/
    ├── setup.ts               # Vitest setup
    └── example.test.ts        # Example test
```

---

## 5. Routing Architecture

All routes are client-side via React Router v6. No server-side routing.

| Route | Component | Layout | Auth Required |
|-------|-----------|--------|---------------|
| `/` | Navigate to `/onboarding` | None | No |
| `/onboarding` | Onboarding | MobileLayout (hideNav) | No |
| `/login` | Login | MobileLayout (hideNav) | No |
| `/signup` | SignUp | MobileLayout (hideNav) | No |
| `/pin` | PinLock | MobileLayout (hideNav) | No |
| `/dashboard` | Dashboard | MobileLayout + BottomNav | Yes (mocked) |
| `/wallet` | Wallet | MobileLayout + BottomNav | Yes |
| `/deposit` | Deposit | MobileLayout (hideNav) | Yes |
| `/sell-crypto` | SellCrypto | MobileLayout (hideNav) | Yes |
| `/swap-crypto` | SwapCrypto | MobileLayout (hideNav) | Yes |
| `/withdraw` | WithdrawCrypto | MobileLayout (hideNav) | Yes |
| `/send-money` | SendMoney | MobileLayout (hideNav) | Yes |
| `/asset/:symbol` | AssetDetail | MobileLayout (hideNav) | Yes |
| `/receipt` | Receipt | MobileLayout (hideNav) | Yes |
| `/transaction-detail` | TransactionDetail | MobileLayout (hideNav) | Yes |
| `/deex-pay` | DeexPay | MobileLayout (hideNav) | Yes |
| `/giftcards` | GiftCards | MobileLayout (hideNav) | Yes |
| `/bills/:type` | BillPayment | MobileLayout (hideNav) | Yes |
| `/activity` | Activity | MobileLayout + BottomNav | Yes |
| `/rewards` | Rewards | MobileLayout + BottomNav | Yes |
| `/referrals` | ReferralDashboard | MobileLayout (hideNav) | Yes |
| `/notifications` | Notifications | MobileLayout (hideNav) | Yes |
| `/profile` | Profile | MobileLayout (hideNav) | Yes |
| `/edit-profile` | EditProfile | MobileLayout (hideNav) | Yes |
| `/generate-statement` | GenerateStatement | MobileLayout (hideNav) | Yes |
| `/about` | AboutDeeX | MobileLayout (hideNav) | Yes |
| `/security` | SecuritySettings | MobileLayout (hideNav) | Yes |
| `/bank-accounts` | BankAccounts | MobileLayout (hideNav) | Yes |
| `/kyc` | KycVerification | MobileLayout (hideNav) | Yes |
| `/support` | Support | MobileLayout (hideNav) | Yes |
| `/quick-action` | QuickAction | MobileLayout (hideNav) | Yes |
| `/virtual-cards` | VirtualCards | MobileLayout (hideNav) | Yes |
| `/trade-streak` | TradeStreak | MobileLayout (hideNav) | Yes |
| `/admin` | AdminPanel | AdminLayout | Yes (admin) |
| `/admin/users/:id` | AdminUserDetail | AdminLayout | Yes (admin) |
| `*` | NotFound | MobileLayout | No |

**Note:** No route guards exist. All routes are publicly accessible. Authentication is purely visual — no token checking, no protected routes.

---

## 6. State Management

| Pattern | Usage | Scope |
|---------|-------|-------|
| `useState` | All form inputs, UI toggles, step navigation | Component-level |
| `localStorage` | Gift card orders/brands, onboarding flag | Persistent |
| `TanStack Query` | QueryClient initialized but **not used** | N/A |
| No global state | No Context API, no Redux, no Zustand | — |

**Gap:** No global auth state, no user session management, no centralized data store. Each page manages its own state independently.

---

## 7. Data Flow

```
User Action → Component setState → UI Update
                                      ↓
                              (No API call)
                                      ↓
                              localStorage (gift cards only)
                                      ↓
                              Hardcoded mock data (everything else)
```

**No data persists across sessions** except:
- `deex_onboarded` flag
- `deex_gc_brands` (gift card brands)
- `deex_gc_orders` (gift card orders)

---

## 8. External Integrations (Expected)

| Integration | Purpose | Status |
|-------------|---------|--------|
| Crypto Exchange API (Obiex) | Crypto rates, deposits, swaps | ❌ Not integrated |
| Payment Gateway (Hizo) | Payout processing | ❌ Not integrated |
| Bank API (Palmpay, Glyde) | NGN wallet balances | ❌ Not integrated |
| BVN Verification | KYC Level 1 identity check | ❌ Not integrated |
| SMS/Email Service | OTP, notifications | ❌ Not integrated |
| Push Notifications | Real-time alerts | ❌ Not integrated |
| QR Scanner | Merchant payment, deposit | ❌ Not integrated |
| Camera/Media | KYC document upload, selfie | ❌ Not integrated |
| Biometric API | Fingerprint/Face ID | ❌ Not integrated |
| WhatsApp API | Support chat | ✅ Link only (wa.me) |

---

## 9. Security Architecture (Current)

| Feature | Implementation | Status |
|---------|---------------|--------|
| PIN Lock | Hardcoded "1234" in component | ⚠️ Insecure |
| Biometric | UI button only, no WebAuthn | ❌ Missing |
| 2FA | Toggle only, no TOTP setup | ❌ Missing |
| Session Management | None (no tokens) | ❌ Missing |
| Route Guards | None | ❌ Missing |
| Input Validation | Minimal (only BVN maxLength) | ⚠️ Weak |
| XSS Protection | React default escaping | ✅ Basic |
| CSRF Protection | N/A (no API calls) | N/A |
| HTTPS | Via Lovable hosting | ✅ |

---

## 10. Performance Considerations

| Aspect | Current State | Notes |
|--------|--------------|-------|
| Bundle Size | Moderate (~495 packages) | Could benefit from code splitting |
| Route-level splitting | None | All pages bundled together |
| Image optimization | Placeholder SVGs only | No real images |
| Lazy loading | None | All components eagerly loaded |
| Memoization | `useMemo` in GiftCards only | Minimal optimization |
| Virtual scrolling | None | Long lists render all items |

---

## 11. Testing Setup

| Tool | Configuration | Coverage |
|------|-------------|----------|
| Vitest | jsdom environment | 1 example test |
| Testing Library | @testing-library/react | Not used in any real tests |
| Coverage | Not configured | 0% |

---

## 12. Deployment Architecture

```
Lovable Platform
    │
    ├── Build: npm run build (Vite)
    ├── Output: dist/ (static files)
    ├── Hosting: Lovable CDN
    └── Custom Domain: Supported via Lovable settings
```

No CI/CD pipeline configured. Changes pushed via git are auto-deployed by Lovable.
