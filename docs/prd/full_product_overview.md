# DeeX Product Overview

**Version:** 2.4.1 | **Build:** #1842  
**Organization:** DeeX Technologies Ltd (DEEX OPTIONS LTD)  
**Document Date:** April 2, 2026  
**Status:** Frontend Prototype — Investor & Engineering Reference

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Target Market](#3-target-market)
4. [User Personas](#4-user-personas)
5. [Core Value Propositions](#5-core-value-propositions)
6. [Feature Summary](#6-feature-summary)
7. [System Architecture & Classification](#7-system-architecture--classification)
8. [Technology Stack](#8-technology-stack)
9. [Key Business Metrics](#9-key-business-metrics)
10. [Assumptions & Limitations](#10-assumptions--limitations)
11. [Roadmap Considerations](#11-roadmap-considerations)

---

## 1. Executive Summary

DeeX is a Nigerian fintech platform that combines cryptocurrency trading, gift card exchange, bill payments, peer-to-peer transfers, and merchant payment processing into a single mobile-first application. Built to serve the Nigerian market with NGN-denominated transactions, DeeX bridges the gap between traditional finance and digital assets while providing a comprehensive suite of everyday financial services.

This repository contains the **frontend prototype** — a fully interactive, mobile-first React application that demonstrates the complete user experience. A separate backend system handles real transaction processing, wallet management, and compliance workflows.

---

## 2. Product Vision

To become Nigeria's most trusted all-in-one digital finance platform — where users can trade crypto, sell gift cards, pay bills, send money, and manage virtual cards through a single, intuitive interface.

### Guiding Principles

- **Accessibility:** Serve both crypto-native users and first-time digital finance users
- **Speed:** Near-instant transactions with minimal friction
- **Trust:** Multi-tier KYC, audit trails, and transparent fee structures
- **Rewards:** Gamified loyalty system that incentivizes engagement and referrals

---

## 3. Target Market

### Primary Market: Nigeria

| Parameter | Detail |
|---|---|
| Currency | Nigerian Naira (NGN) |
| Identity Verification | BVN (Bank Verification Number) |
| Banking | Nigerian commercial banks (access bank, GTBank, etc.) |
| Telecom | MTN, Glo, Airtel, 9mobile |
| Electricity | IKEDC, EKEDC, and other disco providers |
| Betting | Bet9ja, SportyBet |

### Market Opportunity

- Nigeria has one of the largest crypto adoption rates globally
- High demand for alternative remittance and payment rails
- Growing gift card resale market
- Underserved retail investor segment seeking easy crypto access

---

## 4. User Personas

### 4.1 Retail User (Primary)

- **Profile:** 18–45 years old, smartphone owner, banked or underbanked
- **Goals:** Buy/sell crypto at competitive rates, sell unused gift cards, pay bills quickly, send money to friends/family
- **Pain Points:** High exchange rates, slow bank transfers, fragmented apps for different services
- **Key Features Used:** Crypto trading, gift card trading, bill payments, DeeX Pay, rewards

### 4.2 Merchant

- **Profile:** Small to medium business accepting digital payments
- **Goals:** Receive payments from customers, manage payouts, track transaction history
- **Key Features Used:** DeeX Pay, payment links, payout management

### 4.3 Admin / Operations

- **Profile:** Internal DeeX staff (e.g., Adedamola A., Dawood K.)
- **Goals:** Monitor platform health, approve KYC/rejections, manage rates, handle compliance alerts, oversee payouts
- **Key Features Used:** Admin dashboard, KYC review, compliance engine, audit logs, report generation

### 4.4 Influencer (Referral Partner)

- **Profile:** Social media influencers, community leaders
- **Goals:** Earn through referral profit-share, grow their audience's adoption
- **Key Features Used:** Referral dashboard, influencer profit tracking, leaderboard

---

## 5. Core Value Propositions

| Proposition | Description |
|---|---|
| **All-in-One Finance** | Crypto, gift cards, bills, transfers, virtual cards — one app |
| **Competitive NGN Rates** | Real-time rates for crypto and gift cards denominated in Naira |
| **Rewards That Matter** | DeeXPoints (1pt = ₦10), cashback, trade streaks, referral bonuses |
| **Trust & Compliance** | 3-tier KYC, BVN verification, 2FA, audit logging, compliance monitoring |
| **Speed & Simplicity** | Mobile-first design, PIN-confirmed transactions, instant receipts |
| **Merchant Enablement** | Payment links, merchant onboarding, seamless payout processing |

---

## 6. Feature Summary

### 6.1 User-Facing Features

| Feature | Description | Status |
|---|---|---|
| **Crypto Trading** | Buy/sell BTC, ETH, USDT, USDC, SOL, TRX, DOGE with live NGN rates | Prototype |
| **Crypto Swap** | Swap between crypto assets (0.5% fee) | Prototype |
| **Crypto Withdrawal** | Send crypto to external wallets with PIN confirmation | Prototype |
| **Crypto Deposit** | Generate deposit addresses for supported assets | Prototype |
| **Gift Card Trading** | Sell gift cards (Apple, Google Play, Amazon, Steam, iTunes, Walmart, Nike, Sephora) with tiered NGN rates | Prototype |
| **Bill Payments** | Airtime, Data, Electricity, Betting across Nigerian providers | Prototype |
| **DeeX Pay** | Pay merchants, send cash to bank accounts, generate payment links | Prototype |
| **Virtual Cards** | Visa virtual cards (USD), create/fund/freeze/delete (KYC Level 2 required) | Prototype |
| **Rewards System** | DeeXPoints (1pt = ₦10), referral bonuses, trade streaks, cashback, redemption | Prototype |
| **Referral Program** | Earn 100pts when referral trades >$100, leaderboard, influencer profit-share | Prototype |
| **KYC Verification** | 3-tier system: Level 1 (BVN + liveness), Level 2 (ID + address), Level 3 (employment + source of income + risk questionnaire + 2FA) | Prototype |
| **Security** | PIN lock, biometric login, 2FA, session management, login history | Prototype |
| **Notifications** | Login alerts, session terminations, promotional messages | Prototype |
| **Support** | Live chat, email (support@deex.app), WhatsApp (+234 810 367 4006), FAQ | Prototype |
| **Activity & Receipts** | Transaction history, detailed receipts, asset-level breakdowns | Prototype |
| **Profile Management** | Edit profile, linked bank accounts, statement generation | Prototype |

### 6.2 Admin Dashboard Features

| Feature | Description | Status |
|---|---|---|
| **Dashboard Overview** | Metrics (total payout, active users, customers, merchants), performance charts | Prototype |
| **Wallet Management** | DeeX wallet + customer wallet management, auto-swap, auto-withdrawal, crypto assets, trade volume, asset distribution | Prototype |
| **Order Management** | Order tracking with auto-pay toggle, retry failed payouts | Prototype |
| **Payout Tracking** | Payout monitoring with status filters | Prototype |
| **Virtual Card Admin** | Card issuance monitoring, settings | Prototype |
| **Gift Card Admin** | Order approval/rejection, brand management, rate configuration, analytics | Prototype |
| **Bill Payment Monitoring** | Transaction monitoring by type and status | Prototype |
| **User Management** | Customer list with search, status filters, KYC levels | Prototype |
| **KYC Review** | Approval/rejection workflow, document review, limit management | Prototype |
| **Compliance Engine** | Alert management (high-frequency trading, multi-device, large withdrawal, failed KYC, wash trading), configurable rule thresholds | Prototype |
| **Audit Log** | All admin actions recorded with timestamps | Prototype |
| **Rewards Admin** | Points configuration, payout approval, earner rankings, influencer management | Prototype |
| **Reports** | Revenue, Growth, Retention, Website, Happiness, Survey reports | Prototype |
| **Settings** | Security, fees, payroll management, rewards configuration | Prototype |

### 6.3 Route Map (Frontend Pages)

The application exposes 36 distinct routes:

| Route | Page | Purpose |
|---|---|---|
| `/onboarding` | Onboarding | First-time user introduction |
| `/login` | Login | User authentication |
| `/pin` | PinLock | PIN verification |
| `/signup` | SignUp | New user registration |
| `/dashboard` | Dashboard | User home screen |
| `/wallet` | Wallet | Asset balances overview |
| `/deposit` | Deposit | Crypto deposit addresses |
| `/sell-crypto` | SellCrypto | Sell crypto for NGN |
| `/swap-crypto` | SwapCrypto | Crypto-to-crypto swap |
| `/withdraw` | WithdrawCrypto | Withdraw to external wallet |
| `/send-money` | SendMoney | P2P and bank transfers |
| `/asset/:symbol` | AssetDetail | Individual asset view |
| `/receipt` | Receipt | Transaction receipt |
| `/transaction-detail` | TransactionDetail | Transaction details |
| `/deex-pay` | DeexPay | Merchant payments & links |
| `/giftcards` | GiftCards | Gift card trading |
| `/bills/:type` | BillPayment | Bill payments by category |
| `/activity` | Activity | Transaction history |
| `/rewards` | Rewards | Points & rewards management |
| `/referrals` | ReferralDashboard | Referral tracking |
| `/notifications` | Notifications | Push/system notifications |
| `/profile` | Profile | User profile |
| `/edit-profile` | EditProfile | Profile editing |
| `/generate-statement` | GenerateStatement | Account statement export |
| `/about` | AboutDeeX | About DeeX information |
| `/security` | SecuritySettings | Security configuration |
| `/bank-accounts` | BankAccounts | Linked bank accounts |
| `/kyc` | KycVerification | KYC verification flow |
| `/support` | Support | Help & support |
| `/quick-action` | QuickAction | Quick action shortcuts |
| `/virtual-cards` | VirtualCards | Virtual card management |
| `/trade-streak` | TradeStreak | Trade streak gamification |
| `/admin` | AdminPanel | Admin dashboard |
| `/admin/users/:id` | AdminUserDetail | Individual user detail view |

---

## 7. System Architecture & Classification

### 7.1 Repository Scope

This repository is a **frontend prototype** built with React + Vite + TypeScript. It demonstrates the complete user interface and interaction flows of the DeeX platform. All data is mocked using:

- `localStorage` for session state and user preferences
- Hardcoded arrays and objects in `src/data/` for business data
- Simulated API responses via TanStack Query mock patterns

### 7.2 Backend Separation

A separate backend system (not in this repository) is responsible for:

- Real transaction processing and settlement
- Wallet management and blockchain interactions
- KYC document storage and verification
- Payment gateway integrations (banks, telcos, billers)
- Compliance monitoring and reporting
- User authentication and authorization
- Rate feeds and pricing engines

### 7.3 Design Philosophy

- **Mobile-first:** User-facing screens are constrained to a 430px max-width container, simulating a native mobile app experience
- **Admin desktop:** The admin dashboard uses a responsive desktop layout with sidebar navigation
- **Component-driven:** Built with shadcn-ui primitives for consistency and accessibility
- **Animation-rich:** Framer Motion provides smooth transitions and micro-interactions

---

## 8. Technology Stack

### 8.1 Core Framework

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 5.4.19 | Build tool and dev server |
| TypeScript | 5.8.3 | Type-safe JavaScript |
| React Router | 6.30.1 | Client-side routing |

### 8.2 UI & Styling

| Technology | Purpose |
|---|---|
| Tailwind CSS | Utility-first CSS framework |
| shadcn-ui | Accessible component primitives (Radix UI based) |
| Lucide React | Icon library |
| Framer Motion | Animations and page transitions |
| class-variance-authority | Component variant management |
| next-themes | Dark/light theme support |

### 8.3 Data & Forms

| Technology | Purpose |
|---|---|
| TanStack Query (React Query) | Server state management and caching |
| React Hook Form | Form handling |
| Zod | Schema validation |
| Recharts | Data visualization and charts |

### 8.4 Testing & Quality

| Technology | Purpose |
|---|---|
| Vitest | Unit and component testing |
| Testing Library | React component testing utilities |
| ESLint | Code linting |
| TypeScript ESLint | TypeScript-specific linting rules |

### 8.5 Additional Libraries

| Technology | Purpose |
|---|---|
| date-fns | Date formatting and manipulation |
| Sonner | Toast notifications |
| vaul | Mobile drawer component |
| cmdk | Command palette / search |
| embla-carousel-react | Carousel/slider component |
| input-otp | OTP input component |

---

## 9. Key Business Metrics

The following metrics are represented in the prototype's mock data and reflect target operational scale:

| Metric | Value |
|---|---|
| Total Payout Volume | ₦2,396,106,090.97 |
| Active Users | 1,847 |
| Total Customers | 2,833 |
| Registered Merchants | 12 |
| Failed Payouts | 364 |
| Payout Success Rate | ~84.3% |

### Points & Rewards Economics

| Parameter | Value |
|---|---|
| DeeXPoint Value | 1 point = ₦10 |
| Referral Bonus | 100 points (awarded when referral trades >$100) |
| Swap Fee | 0.5% |

---

## 10. Assumptions & Limitations

### 10.1 Prototype Limitations

1. **No Real Transactions:** All trades, transfers, and payments are simulated. No blockchain interactions or bank API calls occur.
2. **Mocked Authentication:** Login/signup flows use localStorage — no real auth provider is connected.
3. **Static Data:** Rates, balances, and transaction histories are hardcoded and do not update in real time.
4. **No Persistence Across Sessions:** Data stored in localStorage is browser-specific and not shared.
5. **Single-User Simulation:** The app does not support multi-user scenarios or concurrent sessions.
6. **No File Uploads:** KYC document upload flows are UI-only — no actual file processing occurs.
7. **Admin Access Unrestricted:** The admin panel is accessible via route without role-based access control in the prototype.

### 10.2 Backend Assumptions

The following capabilities are assumed to exist in the separate backend system:

1. Real-time crypto rate feeds from liquidity providers
2. Blockchain node integration for deposits and withdrawals
3. Bank API integration for NGN settlements (NIP, NIBSS)
4. BVN verification via licensed identity provider
5. Gift card validation and redemption pipeline
6. Bill payment provider integrations (telcos, discos, betting platforms)
7. Virtual card issuance via card program manager
8. Push notification service (FCM/APNs)
9. Email and SMS delivery infrastructure
10. Document storage and KYC processing pipeline
11. Fraud detection and AML monitoring
12. Audit trail and regulatory reporting

### 10.3 Regulatory Assumptions

1. DeeX Technologies Ltd holds or is pursuing necessary CBN and SEC licenses for crypto asset services in Nigeria
2. BVN verification complies with NIBSS requirements
3. KYC tiers align with CBN tiered KYC guidelines
4. Virtual card program complies with Visa network rules
5. AML/CFT policies are implemented in the backend compliance engine

---

## 11. Roadmap Considerations

### 11.1 Frontend-to-Backend Integration

Priority tasks for connecting this prototype to the production backend:

1. Replace mock data with API calls (TanStack Query is already configured for this pattern)
2. Implement real authentication flow (JWT/session tokens)
3. Add role-based route guards for admin panel
4. Connect WebSocket or SSE for real-time rate updates
5. Implement proper error boundaries and loading states

### 11.2 Feature Enhancements

1. **Portfolio Analytics:** Add portfolio performance charts, P&L tracking
2. **Recurring Payments:** Scheduled bill payments and auto-buy for crypto
3. **Multi-Currency Support:** Expand beyond NGN to include GHS, KES for regional expansion
4. **P2P Marketplace:** Direct user-to-user crypto trading with escrow
5. **Savings Vaults:** Locked savings products with yield
6. **API for Merchants:** Developer-facing API for DeeX Pay integration

### 11.3 Platform Expansion

1. React Native or Capacitor wrapper for native mobile app distribution
2. Progressive Web App (PWA) capabilities for offline access
3. Desktop admin app with Electron or continued web deployment

---

## Contact & Support

| Channel | Detail |
|---|---|
| Email | support@deex.app |
| WhatsApp | +234 810 367 4006 |
| Organization | DeeX Technologies Ltd (DEEX OPTIONS LTD) |

---

*This document reflects the state of the DeeX frontend prototype as of April 2, 2026. Metrics and features described herein are based on mock data and UI implementations. Production capabilities depend on the separate backend system.*
