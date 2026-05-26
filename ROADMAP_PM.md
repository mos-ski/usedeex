# DeeX — Product Roadmap & Feature Recommendations

> **Context:** DeeX is a live Nigerian fintech app (crypto trading, gift cards, bill payments, P2P transfers, virtual cards, merchant payments). This prototype mirrors the live app for investor demos, engineering reference, and user testing. The recommendations below are for the **product itself** — what to build next, what to improve, and why.
>
> **Team:** 3-5 people | **Horizon:** 1-3 months | **Approach:** Balanced — close gaps, add growth levers, build competitive moats

---

## How to Read This

Each item covers:
- **The opportunity:** What user problem or business gap this addresses
- **What to build:** The feature or improvement, described as a product spec
- **Potential wins:** Measurable outcomes you can expect
- **Effort:** S (days), M (1-2 weeks), L (2-4 weeks), XL (1-2 months)
- **Priority:** Now / Next / Later

---

## Phase 1: Fix What's Broken in the User Journey (Weeks 1-4)

These are features and flows that exist in the app but have gaps that cause user drop-off, confusion, or support tickets. Fix these before adding anything new.

---

### 1.1 — Onboarding That Actually Converts

**The opportunity:** Right now, onboarding is 3 generic slides (Trade Crypto, Pay Bills, Earn Rewards) then a signup form. There's no personalization, no "aha moment," and no reason for a user to complete signup. Most fintech apps lose 40-60% of users between download and first action. DeeX's onboarding does nothing to prevent this.

**What to build:**
- Replace generic slides with a **"What brings you to DeeX?"** selection screen — options like "Sell crypto," "Sell gift cards," "Pay bills," "Send money abroad." Based on their choice, personalize the dashboard to surface that feature first.
- Add a **progressive onboarding checklist** on the dashboard: "Complete your profile," "Verify your identity," "Make your first trade" — with small reward incentives (50 DeeXPoints per step).
- After signup, show a **"Your first trade in 60 seconds"** guided walkthrough that takes users through a small test transaction so they experience the core value immediately.
- Add social proof on the signup screen: "Join 2,800+ Nigerians already trading on DeeX" with recent transaction ticker (anonymized).

**Potential wins:**
- 20-30% improvement in signup-to-first-trade conversion
- Users reach the "aha moment" faster, reducing Day 1 churn
- The checklist creates a sense of progress and completion, driving engagement
- Personalized dashboard means users see relevant features, not a cluttered home screen

**Effort:** M | **Priority:** Now

---

### 1.2 — Transaction Status Transparency

**The opportunity:** When a user sells crypto, pays a bill, or submits a gift card trade, they see a success screen and... nothing. There's no real-time status tracking, no estimated completion time, no way to know if something went wrong until they check their bank account hours later. This is the #1 driver of support tickets in Nigerian fintech apps ("Where is my money?").

**What to build:**
- Add a **"Track Transaction"** feature accessible from the Activity page and push notifications. Show a timeline: Submitted → Processing → Completed/Settled, with timestamps at each step.
- For crypto sells: show blockchain confirmation progress (1/3 confirmations, 2/3, 3/3 → Settled).
- For bill payments: show provider acknowledgment → Fulfilled, with the provider's reference number.
- For gift card trades: show Submitted → Under Review → Approved/Paid or Rejected (with reason).
- Add **proactive push notifications** at each status change. Don't wait for the user to check.
- If a transaction is taking longer than expected, show "This is taking longer than usual. We're on it." instead of silence.

**Potential wins:**
- 30-50% reduction in "where is my money?" support tickets
- Users trust the platform more when they can see what's happening
- Reduces anxiety during high-value transactions (selling ₦500K of BTC)
- Creates a paper trail that satisfies users who need records for disputes

**Effort:** M | **Priority:** Now

---

### 1.3 — Beneficiaries and Repeat Transactions

**The opportunity:** Every time a user pays a bill or sends money, they re-enter the same phone number, meter number, or bank account. This is tedious and error-prone. Nigerian users pay the same electricity bill monthly, top up the same phone numbers weekly, and send money to the same people regularly. The app has a "beneficiaries" concept in the UI but it's not functional.

**What to build:**
- Auto-save every unique recipient (phone number, meter number, bank account, wallet address) after a successful transaction.
- Show **"Recent Beneficiaries"** at the top of every payment form — tap to auto-fill.
- Let users **label beneficiaries** ("My NEPA meter," "Mum's MTN," "Landlord's account").
- Add a **"Repeat Last"** button on the dashboard — one tap to repeat the most recent bill payment or transfer with the same details.
- For bill payments: add **payment reminders** — "Your IKEDC electricity bill is usually paid around the 15th. Want us to remind you?"

**Potential wins:**
- Reduces transaction time from 2 minutes to 15 seconds for repeat payments
- Fewer errors from mistyping account numbers or meter IDs
- Payment reminders bring users back to the app (retention driver)
- "Repeat Last" makes DeeX the default app for recurring financial tasks

**Effort:** S | **Priority:** Now

---

### 1.4 — Rate Alerts and Price Notifications

**The opportunity:** Crypto prices move fast. Users want to sell BTC when it hits ₦100M, or buy USDT when it dips below ₦1,500. Right now, they have to keep opening the app and checking. Most will miss their target price. Rate alerts turn passive users into active traders.

**What to build:**
- Let users set **price alerts** on any crypto asset: "Notify me when BTC goes above ₦100M" or "Notify me when USDT drops below ₦1,500."
- Send a **push notification** when the alert triggers, with a deep link directly to the sell/buy screen.
- Add a **"Trending Now"** section on the dashboard showing the biggest movers in the last 24h.
- Show **rate history charts** on the Asset Detail page — a simple 7-day or 30-day line chart so users can see trends before trading.

**Potential wins:**
- Increases trading frequency — users act on alerts instead of forgetting
- Push notifications bring users back to the app (re-engagement)
- Rate history charts build user confidence in trading decisions
- Positions DeeX as a tool for serious traders, not just casual users

**Effort:** M | **Priority:** Now

---

### 1.5 — Trust Signals Throughout the App

**The opportunity:** DeeX is a relatively new platform handling people's money. The app currently has no visible trust signals — no security badges, no regulatory info, no transaction guarantees, no user testimonials. In a market where users have been burned by scams (Ponzi schemes, rug pulls), trust is the #1 barrier to adoption.

**What to build:**
- Add a **"Your funds are protected"** banner on the dashboard with a brief explanation of how DeeX secures funds (cold storage, insurance, etc. — whatever the live app actually does).
- Show **real-time platform stats** on the About page: total transactions processed, total volume traded, days since last incident, uptime percentage.
- Add **user testimonials** or a "What our users say" section in onboarding and the About page.
- Display **regulatory badges** (CBN registration, SEC license, NDIC insurance — whatever applies) in the footer and About page.
- Add a **"Verified by DeeX"** badge next to completed transactions in the Activity feed.
- On the gift card flow, show "Average processing time: X minutes" based on real data.

**Potential wins:**
- Reduces signup hesitation for new users who are skeptical of new fintech apps
- Existing users feel more confident making larger transactions
- Regulatory badges are table stakes for any serious Nigerian fintech
- Platform stats create social proof ("2,800 users can't be wrong")

**Effort:** S | **Priority:** Now

---

## Phase 2: Growth Levers (Weeks 5-8)

Once the core experience is solid, add features that drive acquisition, retention, and revenue.

---

### 2.1 — Savings Vaults (Locked Savings with Yield)

**The opportunity:** Nigerians save informally (ajo, esusu) but lack access to yield-bearing savings products. Crypto sitting idle in a wallet earns nothing. A savings feature where users lock crypto or NGN for a fixed period and earn interest would give users a reason to keep funds on DeeX instead of withdrawing immediately.

**What to build:**
- Add a **"Savings"** tab in the wallet section. Users create a "Vault" — choose an asset (USDT, NGN), lock amount, and duration (7, 30, 60, 90 days).
- Show **projected earnings** before creation: "Lock ₦100,000 for 30 days → Earn ₦1,200 (1.2%)."
- Offer **flexible vaults** (withdraw anytime, lower rate) and **fixed vaults** (locked, higher rate, penalty for early withdrawal).
- Add **auto-save rules**: "Save ₦5,000 every Friday" or "Round up every transaction and save the change."
- Show a **savings goal tracker**: "Saving for rent — ₦180,000 / ₦300,000 (60%)."
- Send weekly savings summary notifications.

**Potential wins:**
- Increases total value locked (TVL) on the platform — funds stay instead of being withdrawn
- Creates a new revenue stream (DeeX earns the spread between what it pays users and what it earns on deposits)
- Savings goals create emotional attachment and long-term engagement
- Auto-save creates habitual usage without requiring active decisions
- Differentiator — most Nigerian crypto apps are trading-only, not savings platforms

**Effort:** L | **Priority:** Next

---

### 2.2 — Recurring Bill Payments (Autopay)

**The opportunity:** Nigerians pay the same bills every month — electricity, DSTV/GoTV, internet, rent. Remembering to pay on time is a pain. Late payments mean disconnection. Autopay solves this and makes DeeX indispensable for monthly financial management.

**What to build:**
- After any bill payment, offer **"Set up autopay?"** — same amount, same recipient, every month on a chosen date.
- Add an **"Autopay"** section in Settings where users can view, edit, pause, or cancel recurring payments.
- Send a **notification 3 days before** each autopay: "Your IKEDC payment of ₦15,000 will be processed on Friday."
- Allow **amount flexibility**: "Pay the exact bill amount" (variable) vs. "Pay ₦15,000 every time" (fixed).
- Add **autopay from specific wallet**: let users choose which crypto or NGN wallet to fund autopay from.

**Potential wins:**
- Guarantees monthly transaction volume (recurring revenue)
- Users who set up autopay have extremely high retention (switching cost)
- Reduces late payment disconnections for users
- Positions DeeX as a financial management tool, not just a transaction app
- Each autopay = one less reason to open a competitor's app

**Effort:** M | **Priority:** Next

---

### 2.3 — P2P Crypto Marketplace

**The opportunity:** The current sell flow routes everything through DeeX as the counterparty. This means DeeX takes on inventory risk and users get a single rate. A P2P marketplace where users trade directly with each other (with DeeX as escrow) would offer better rates, more payment methods, and higher volume — while DeeX earns fees without taking positions.

**What to build:**
- Add a **"P2P Market"** tab where users can browse buy/sell offers from other users.
- Sellers create offers: "Selling 100 USDT at ₦1,540/USDT, accepts bank transfer."
- Buyers browse offers, select one, and initiate trade. DeeX locks the seller's crypto in escrow.
- Buyer sends NGN directly to seller's bank account. Seller confirms receipt. DeeX releases crypto.
- Add **dispute resolution**: if buyer and seller disagree, DeeX admin mediates.
- Show **seller ratings and trade history** so buyers can choose trusted counterparties.
- Add **payment method filters**: bank transfer, Opay, PalmPay, cash.

**Potential wins:**
- Higher trading volume without DeeX needing to provide liquidity
- Better rates for users (market-driven pricing vs. DeeX-set rates)
- New revenue stream: 0.5-1% fee per P2P trade
- Attracts power traders who currently use Binance P2P or Paxful
- Reduces DeeX's inventory risk and capital requirements
- Network effect: more sellers → better rates → more buyers → more sellers

**Effort:** XL | **Priority:** Later

---

### 2.4 — Multi-Currency Wallet (USD, GBP, EUR)

**The opportunity:** Nigerians frequently need foreign currency — to pay for international subscriptions, send money abroad, or hedge against Naira devaluation. Right now, DeeX only shows NGN balances and crypto. A USD/GBP/EUR wallet would let users hold, receive, and send foreign currency without converting to crypto.

**What to build:**
- Add **USD, GBP, EUR wallet balances** alongside crypto and NGN in the Wallet page.
- Allow users to **convert crypto to USD** (not just NGN) and hold it in their foreign currency wallet.
- Enable **receiving foreign currency** via virtual account numbers (US account via a partner like Grey or Geegpay).
- Allow **sending foreign currency** to international bank accounts or PayPal.
- Show **exchange rate between NGN and foreign currencies** on the dashboard.

**Potential wins:**
- Massive demand — Nigerians spend billions annually on international payments
- Directly competes with Grey, Geegpay, Chipper Cash on their core offering
- Users who hold USD on DeeX are extremely sticky (high switching cost)
- Revenue from FX spread on conversions
- Positions DeeX as a true cross-border finance app, not just a local crypto exchange

**Effort:** XL | **Priority:** Later

---

### 2.5 — In-App Chat and Community

**The opportunity:** Crypto users are social — they discuss rates, share tips, warn about scams, and celebrate wins. Right now, these conversations happen on WhatsApp groups and Twitter/X spaces that DeeX doesn't control. An in-app community keeps users engaged within the DeeX ecosystem and creates a moat.

**What to build:**
- Add a **"Community"** tab with channels: #market-talk, #gift-cards, #help, #announcements.
- Let users post, reply, and react to messages.
- Pin **rate alerts and market updates** from the DeeX team.
- Add **"Verified Trader"** badges for users with high trade volume and good ratings.
- Host **weekly AMA (Ask Me Anything)** sessions with the DeeX team.
- Moderate with AI + human moderators to prevent scam links and spam.

**Potential wins:**
- Increases daily active users (users open the app even when not trading)
- Creates a community moat — users stay for the people, not just the product
- Reduces support load (users help each other)
- Provides direct feedback channel from users to product team
- Verified traders become organic ambassadors

**Effort:** L | **Priority:** Later

---

### 2.6 — Referral Program 2.0 — Gamified and Viral

**The opportunity:** The current referral program is basic: share a link, earn 100 points when your referral trades $100. There's no urgency, no competition, no social sharing built in. The most successful Nigerian fintechs (Opay, PalmPay) grew explosively through gamified referral programs with leaderboards, milestones, and social sharing.

**What to build:**
- **Tiered referral rewards**: Refer 1 person = ₦500. Refer 5 = ₦3,000 bonus. Refer 10 = ₦7,500 + "Super Referrer" badge. Refer 50 = ₦50,000 + exclusive merch.
- **Referral milestones with countdown**: "You're 2 referrals away from your ₦3,000 bonus!" — creates urgency.
- **Weekly referral leaderboard** with prizes for top 10 referrers (cash, bonus points, exclusive features).
- **Social sharing with pre-made content**: one-tap share to WhatsApp, Twitter/X, Instagram Stories with a pre-designed graphic and personalized link.
- **Referral tracking dashboard**: see who signed up, who traded, who's still pending — with estimated earnings.
- **Double-sided rewards**: referrer gets ₦500, referee gets ₦200 on first trade. Both win.

**Potential wins:**
- 3-5x increase in referral-driven signups
- Leaderboards create competition and sustained engagement
- Double-sided rewards remove the "I'm just using my friends" guilt
- Pre-made share content removes friction from word-of-mouth
- Tiered milestones turn casual referrers into active recruiters
- Cheapest acquisition channel — cost per referral signup is far below paid ads

**Effort:** M | **Priority:** Next

---

### 2.7 — Portfolio Analytics and Insights

**The opportunity:** Users who trade crypto on DeeX have no way to see their overall performance. Did they make money this month? What's their best-performing asset? What's their average buy price? Without these insights, users trade blindly and can't assess whether DeeX is helping them grow their wealth.

**What to build:**
- Add a **"Portfolio"** section in the Wallet page showing total portfolio value, 24h change, 7-day change, and 30-day change — with a line chart.
- Show **asset allocation pie chart**: 45% BTC, 30% USDT, 15% ETH, 10% SOL.
- Show **profit/loss per asset**: "BTC: +₦45,000 (12% gain)" or "ETH: -₦12,000 (3% loss)."
- Add **monthly summary**: total traded, total fees paid, net profit/loss, most traded asset.
- Send a **weekly portfolio digest** notification: "Your portfolio grew 4.2% this week. BTC was your best performer."

**Potential wins:**
- Users who track performance trade more frequently (data-driven engagement)
- Weekly digests bring users back to the app regularly
- Portfolio view creates emotional investment in the platform ("My money is here")
- Positions DeeX as a wealth management tool, not just a transaction app
- Competitors like Busha and Quidax already offer this — table stakes for serious crypto platforms

**Effort:** M | **Priority:** Next

---

### 2.8 — Instant NGN Deposits (Bank Transfer to DeeX)

**The opportunity:** To trade crypto, users first need to fund their account. The current deposit flow only supports crypto deposits (send BTC/ETH to an address). There's no way to deposit NGN directly from a bank account. This means users who have Naira in their bank but no crypto can't use the platform without first buying crypto elsewhere.

**What to build:**
- Add **"Deposit NGN"** option alongside crypto deposits.
- Generate a **virtual Naira account number** for each user (via a partner like Paystack, Monnify, or Wema Bank's ALAT API).
- User transfers NGN from their bank to this virtual account. Funds appear in their DeeX NGN wallet within seconds.
- From the NGN wallet, users can **buy crypto at the current rate** or **pay bills directly**.
- Show **deposit history** and **instant notifications** when funds arrive.

**Potential wins:**
- Removes the biggest barrier to entry for new users (how do I get money in?)
- Users who already have Naira in their bank can start trading in under 2 minutes
- Increases deposit volume — bank transfers are easier than crypto deposits for most Nigerians
- Creates a fiat on-ramp that feeds into all other features (crypto, bills, virtual cards)
- Competitors like Quidax and Busha already offer this — it's expected

**Effort:** L | **Priority:** Next

---

## Phase 3: Competitive Moats (Weeks 9-12)

Features that are hard to copy, create network effects, or open entirely new revenue streams.

---

### 3.1 — DeeX for Business (Merchant Dashboard)

**The opportunity:** DeeX Pay exists for merchants, but it's buried in the consumer app. Merchants need a separate, dedicated experience — invoicing, settlement tracking, staff management, analytics. Nigerian SMEs are underserved by existing payment platforms (Paystack and Flutterwave target developers, not small shop owners).

**What to build:**
- Create a **"DeeX for Business"** section or separate app experience for merchants.
- **Invoice generation**: create and share professional invoices with payment links.
- **Settlement dashboard**: see daily/weekly/monthly collections, pending settlements, fees.
- **Staff accounts**: add team members with limited permissions (cashier can accept payments but not withdraw).
- **Customer insights**: see repeat customers, average transaction value, peak hours.
- **Instant settlement**: option to settle to bank account immediately instead of T+1.
- **QR code standee**: printable QR code that customers scan to pay (for physical shops).

**Potential wins:**
- Opens an entirely new user segment (SMEs) with higher transaction volumes
- Merchants bring their customers onto DeeX (network effect)
- B2B revenue is stickier and higher-margin than B2C
- Instant settlement is a killer feature for small businesses that need cash flow
- Positions DeeX as a business tool, not just a consumer app

**Effort:** XL | **Priority:** Later

---

### 3.2 — Crypto Gift and Voucher System

**The opportunity:** Crypto is hard to gift. You can't wrap Bitcoin in a birthday card. A crypto gifting feature — where users send crypto as a gift with a custom message, claimable via a link or code — would tap into social gifting behavior and bring new users to the platform.

**What to build:**
- Add **"Send Crypto as Gift"** option in the Send Money flow.
- User selects crypto amount, adds a message ("Happy Birthday! Here's some BTC 🎂"), and generates a **claim link or code**.
- Share the link via WhatsApp, SMS, or email.
- Recipient clicks the link → if they have DeeX, it's claimed instantly. If not, they're prompted to sign up to claim.
- Add **gift card designs** — choose from birthday, congratulations, thank you, etc.
- Unclaimed gifts auto-refund after 30 days.

**Potential wins:**
- Viral acquisition mechanism — every gift brings a potential new user
- Lowers the barrier to crypto ownership (someone gives it to you, you don't have to buy it)
- Social sharing creates organic brand exposure
- Taps into gifting culture (birthdays, holidays, celebrations)
- Unique feature — no major Nigerian crypto app offers this

**Effort:** M | **Priority:** Next

---

### 3.3 — Price Alerts + Auto-Buy (Dollar Cost Averaging)

**The opportunity:** Most retail crypto investors lose money trying to time the market. Dollar Cost Averaging (DCA) — buying a fixed amount at regular intervals regardless of price — is the simplest, most effective strategy for long-term investors. No Nigerian crypto app offers automated DCA.

**What to build:**
- Add **"Auto-Buy"** option on each crypto asset page.
- User sets: "Buy ₦10,000 of BTC every Monday" or "Buy $50 of USDT on the 1st and 15th of every month."
- Funds are deducted from NGN wallet or linked bank account automatically.
- Show **DCA performance tracker**: "You've invested ₦120,000 over 6 months. Current value: ₦145,000 (+20.8%)."
- Send a notification after each auto-buy: "Bought ₦10,000 of BTC at ₦97,450,000. Your average buy price: ₦95,200,000."

**Potential wins:**
- Creates predictable, recurring transaction volume
- Users who set up DCA are the most retained cohort (set-and-forget)
- Attracts long-term investors, not just day traders
- Educates users on sound investment strategy (builds trust)
- Unique feature in the Nigerian market — strong differentiation

**Effort:** M | **Priority:** Next

---

### 3.4 — In-App Support Chat with AI + Human Handoff

**The opportunity:** The current support page lists channels (live chat, email, WhatsApp) but there's no actual in-app chat experience. Users leave the app to get help, and many issues are simple questions that could be resolved instantly. An AI-powered chatbot that handles common questions and escalates to humans would reduce support costs and improve satisfaction.

**What to build:**
- Add a **floating chat button** on all pages (or a "Get Help" option in the bottom nav).
- AI chatbot handles common questions: "How do I sell crypto?", "What are the fees?", "How do I verify my account?", "Where is my transaction?"
- For transaction-specific queries, the bot can **pull up the user's recent transactions** and provide status updates.
- If the bot can't resolve it, **seamlessly hand off to a human agent** with full conversation context.
- Add **FAQ quick-action buttons** at the top of the chat: "Track transaction," "Reset PIN," "Report an issue."
- Show **estimated wait time** when connecting to a human.

**Potential wins:**
- 50-70% of support queries resolved by AI without human intervention
- Users get instant answers without leaving the app
- Reduces support team workload and costs
- 24/7 availability (AI doesn't sleep)
- Conversation history creates a knowledge base for improving the bot over time

**Effort:** L | **Priority:** Later

---

### 3.5 — Dark Mode

**The opportunity:** The app is light-mode only. Dark mode is expected in any modern app, especially one used frequently at night (crypto traders check prices 24/7). It's a quick win that users notice and appreciate immediately.

**What to build:**
- Add a **theme toggle** in Settings: Light, Dark, or System default.
- Ensure all screens, charts, and components look great in both modes.
- Respect the user's system preference by default.

**Potential wins:**
- Immediate UX improvement that users notice on day one
- Reduces eye strain for nighttime usage (crypto never sleeps)
- Matches competitor apps (Chipper Cash, Yellow Card all have dark mode)
- Low effort, high perceived value

**Effort:** S | **Priority:** Now

---

### 3.6 — Transaction Statements and Tax Reports

**The opportunity:** Nigerian crypto users increasingly need transaction records for tax purposes (FIRS has started taxing crypto gains), loan applications, visa applications, and personal accounting. The current "Generate Statement" page exists but doesn't produce real documents.

**What to build:**
- Generate **PDF statements** with DeeX branding: transaction date, type, amount, fee, status, reference ID, running balance.
- Support **date range filters**: last 7 days, 30 days, 90 days, custom range, full year.
- Add **CSV export** for spreadsheet use.
- Add **tax summary report**: total gains, total losses, net taxable amount for the year.
- **Email delivery**: send statement directly to user's email or a third party (accountant, lawyer).
- Add **monthly auto-generated statements** sent to the user's email.

**Potential wins:**
- Reduces support tickets requesting transaction records
- Tax reports make DeeX the go-to app for compliant crypto users
- Professional statements build credibility with banks, embassies, and auditors
- Regulatory requirement — CBN and FIRS expect financial platforms to provide records
- Monthly statements keep users engaged with their financial data

**Effort:** M | **Priority:** Next

---

### 3.7 — Localized Experience (Pidgin, Yoruba, Hausa, Igbo)

**The opportunity:** DeeX targets all Nigerians, but the app is English-only. Many potential users — especially in the mass market — are more comfortable in Pidgin English or their native language. Opay and PalmPay grew rapidly partly because they felt "local." Language localization signals that DeeX is built for Nigerians, not imported from Silicon Valley.

**What to build:**
- Add **language selection** during onboarding and in Settings.
- Start with **Pidgin English** (most universal), then Yoruba, Hausa, and Igbo.
- Localize all user-facing text: buttons, labels, error messages, notifications, support FAQs.
- Localize **number and currency formatting** per language preference.
- Add **voice prompts** in local languages for key actions (optional, for accessibility).

**Potential wins:**
- Opens the product to millions of Nigerians who prefer non-English interfaces
- Creates cultural affinity and brand loyalty
- Differentiator — most crypto apps are English-only
- Signals local commitment to regulators and investors
- Mass market adoption (not just the English-speaking elite)

**Effort:** L | **Priority:** Later

---

## Quick Wins (Do Anytime)

Small product improvements that take minimal effort but improve the experience noticeably.

| # | Item | What to Do | Effort | Win |
|---|------|-----------|--------|-----|
| QW-1 | **Haptic feedback on transactions** | Add vibration on successful trades and payments | Hours | Makes transactions feel "real" and satisfying |
| QW-2 | **Confetti animation on first trade** | Celebrate the user's first completed trade | Hours | Creates a memorable moment, reduces first-trade anxiety |
| QW-3 | **"Last active" timestamps on referrals** | Show when referred users last used the app | Hours | Helps referrers follow up with inactive referrals |
| QW-4 | **Share transaction receipt** | Let users share a receipt image to WhatsApp/social | Hours | Social proof + organic brand exposure |
| QW-5 | **Pull-to-refresh on dashboard** | Add pull-to-refresh gesture to reload rates and balances | Hours | Users feel in control of data freshness |
| QW-6 | **App icon badge for notifications** | Show unread count on the app icon | Hours | Drives re-engagement from home screen |
| QW-7 | **"What's New" popup after updates** | Show a brief changelog after app updates | Hours | Users discover new features instead of missing them |
| QW-8 | **Estimated delivery time on bill payments** | Show "Airtime arrives in ~30 seconds" | Hours | Sets expectations, reduces anxiety |
| QW-9 | **Savings goal widget on dashboard** | Show a small card: "Rent fund: ₦180K / ₦300K" | Days | Keeps savings top-of-mind |
| QW-10 | **Quick action shortcuts on home screen** | Android/iOS widget with "Sell Crypto," "Pay Bills," "Send Money" | Days | Reduces taps to core actions |

---

## Prioritization Matrix

```
HIGH USER IMPACT
    |
    |  [1.2 Transaction Status]    [2.1 Savings Vaults]
    |  [1.1 Onboarding]            [2.8 NGN Deposits]
    |  [1.4 Rate Alerts]           [2.3 P2P Market]
    |
    |  [1.3 Beneficiaries]         [3.1 Merchant Dashboard]
    |  [1.5 Trust Signals]         [2.4 Multi-Currency]
    |  [3.5 Dark Mode]             [3.4 AI Support]
    |
    |  [QW-1 to QW-10]            [3.7 Localization]
    |  [2.6 Referral 2.0]          [2.5 Community]
    |
LOW USER IMPACT
    +----------------------------------------------
      LOW EFFORT                    HIGH EFFORT
```

**Do now (high impact, low effort):** Transaction Status, Beneficiaries, Trust Signals, Dark Mode, Quick Wins
**Do next (high impact, high effort):** Onboarding overhaul, Rate Alerts, Savings Vaults, NGN Deposits, Referral 2.0
**Plan carefully (lower immediate impact, high effort):** P2P Market, Multi-Currency, Merchant Dashboard, Localization

---

## Metrics to Track

| Metric | Why It Matters | Target |
|--------|---------------|--------|
| **Signup → First Trade conversion** | Measures onboarding effectiveness | > 40% |
| **Day 7 retention** | Are users coming back after a week? | > 35% |
| **Day 30 retention** | Are users sticking around? | > 20% |
| **Monthly Active Traders** | Core engagement metric | +25% QoQ |
| **Average transactions per user/month** | Depth of engagement | > 4 |
| **Referral-driven signups (% of total)** | Organic growth health | > 20% |
| **Support tickets per 1000 transactions** | Product quality signal | < 5 |
| **Bill payment success rate** | Provider reliability | > 95% |
| **Payout success rate** | Currently ~84% — needs improvement | > 95% |
| **Net Promoter Score (NPS)** | User satisfaction and loyalty | > 50 |
| **Total Value Locked (if savings launched)** | Savings feature adoption | ₦50M+ in 3 months |
| **Autopay adoption rate** | Recurring revenue predictability | > 15% of bill payers |

---

## Competitive Landscape — What Others Have That DeeX Doesn't

| Feature | Chipper Cash | Yellow Card | Busha | Quidax | DeeX |
|---------|-------------|-------------|-------|--------|------|
| Crypto buy/sell | Yes | Yes | Yes | Yes | Yes |
| Gift card trading | No | No | No | No | Yes |
| Bill payments | No | No | No | No | Yes |
| Virtual cards | Yes | No | Yes | No | Yes |
| P2P marketplace | No | No | No | Yes | No |
| Savings/yield | No | No | Yes (Busha Earn) | No | No |
| DCA / Auto-buy | No | No | Yes | No | No |
| Portfolio analytics | Basic | Basic | Yes | Yes | No |
| Multi-currency wallet | Yes (8 currencies) | No | No | No | No |
| In-app community | No | No | No | No | No |
| Merchant payments | No | No | No | No | Yes |
| Referral leaderboard | Basic | Basic | Basic | Basic | Basic |
| NGN bank deposit | Yes | Yes | Yes | Yes | No |

**DeeX's unique advantages:** Gift cards, bill payments, merchant payments — no competitor combines all three with crypto. Lean into this.

**DeeX's biggest gaps vs. competitors:** No NGN bank deposit, no savings/yield, no portfolio analytics, no P2P market. Close these first.

---

## API Partners — Who to Contact for What

Every feature gap above needs a partner behind it. Here's a breakdown by category, with who to reach out to, what they do, and how to prioritize.

---

### NGN Collection & Virtual Accounts (for Instant NGN Deposits — Feature 2.8)

This is the #1 priority. Without a way for users to deposit Naira from their bank, you're losing every potential user who doesn't already hold crypto.

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Monnify** (by TeamApt/Moniepoint) | monnify.com | Virtual NGN accounts, bank transfer collection, USSD, card payments | CBN-licensed, built for Nigerian fintechs. Fast API, good docs. Powers many Nigerian startups. Best for generating a unique virtual account number per user. |
| **Paystack** (by Stripe) | paystack.com | Card payments, bank transfers, virtual accounts, payouts | Most mature Nigerian payment API. Stripe-backed reliability. Good for checkout-style flows and one-time payments. Virtual account feature available. |
| **Flutterwave** | flutterwave.com | Pan-African payments: cards, bank transfer, mobile money, virtual accounts | Covers 30+ African countries. Good if you plan to expand beyond Nigeria. Slightly more complex API than Monnify. |
| **Kora** (formerly Korapay) | korapay.com | Virtual accounts, checkout, payouts, card issuing, KYC | Pan-African, rebranded recently. Covers Nigeria, Ghana, Kenya, South Africa, Egypt. All-in-one platform if you want fewer vendors. |

**Recommendation:** Start with **Monnify** for virtual account numbers (simplest integration, purpose-built for this use case). Add **Paystack** as a secondary option for card payments and one-time transfers.

---

### Virtual Card Issuing (for Virtual Cards — existing feature, needs real integration)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Flutterwave** | flutterwave.com | Instant USD virtual card creation via API | Africa-native. Already used by Nigerian fintechs for card programs. Supports Visa and Mastercard. |
| **Paystack** | paystack.com | Virtual card creation for Nigerian merchants | Simple API, Stripe-backed. Good if you're already using Paystack for payments. |
| **Bridgecard** | bridgecard.co | African virtual card issuer | Built specifically for African virtual card use cases. Smaller provider but Africa-focused. |
| **Nium** | nium.com | Global card issuing, FX, real-time payouts | Enterprise-grade. 190+ payout markets. Good for future international expansion. Higher minimums. |

**Recommendation:** **Flutterwave** is the most proven option for Nigerian virtual card programs. If you need more control or global reach later, evaluate **Nium**.

---

### Bill Payments (for Bill Payments — Feature 2.2 Autopay, existing feature)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Reloadly** | reloadly.com | Airtime top-up, data bundles, gift cards — 170+ countries | Used by TikTok, Crypto.com, UNICEF. Most reliable and well-documented. Best for airtime and data. |
| **Clubkonnect** | clubkonnect.com | Nigerian VTU: airtime, data, cable TV, electricity, WAEC/JAMB | Deep Nigerian coverage. Covers electricity (all discos), cable TV, exam PINs. Good for the full bills experience. |
| **VTU.ng** | vtu.ng | Nigerian VTU: cheap data, airtime, electricity, cable TV, betting | Competitive rates, robust reseller API. Good alternative or backup to Clubkonnect. |

**Recommendation:** Use **Reloadly** for airtime/data (best reliability and coverage). Add **Clubkonnect** for electricity, cable TV, and betting — they have the deepest Nigerian biller coverage.

---

### KYC & Identity Verification (for KYC — existing feature, needs real integration)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Smile ID** | smileidentity.com | BVN, NIN, biometric, AML, document verification — 54 African countries | Africa's leading KYC provider. 200M+ verifications. The standard for Nigerian fintechs. Covers all 3 DeeX KYC tiers. |
| **Dojah** | dojah.io | Identity verification, fraud detection, transaction monitoring, credit checks | Nigerian-born, SOC 2 and ISO certified. Good if you want KYC + fraud detection in one platform. |
| **Youverify** | youverify.co | AI-powered KYC/AML compliance, transaction monitoring | Strong in EMEA. Has an AI copilot ("Vyra") for compliance teams. Good for the admin compliance workflow. |
| **MetaMap** (by Incode) | metamap.com | Global identity verification, biometric, document — 50+ countries | Global provider with dedicated Africa solution. Good if you plan to expand internationally. |

**Recommendation:** **Smile ID** is the default choice for Nigerian KYC — every major fintech uses them. Add **Dojah** or **Youverify** if you need ongoing transaction monitoring and fraud detection on top of one-time KYC.

---

### Crypto Liquidity & Rate Feeds (for Crypto Trading — existing feature, Rate Alerts 1.4)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Yellow Card** | yellowcard.io | Stablecoin/fiat infrastructure — 35+ countries, $6B+ processed | Pivoted to B2B infrastructure. Excellent for stablecoin rails (USDT/USDC to NGN and back). Strong API. |
| **Binance** | binance.com | World's largest exchange. Full REST & WebSocket APIs | Deepest liquidity, best rates. Note: Binance has regulatory issues in Nigeria — use through a compliant entity or as a rate feed only. |
| **CoinGecko** | coingecko.com | Crypto price data API — 15,000+ coins | Free tier available. Best for rate feeds and price alerts (not for trading). Use for the dashboard ticker and rate alert notifications. |
| **Quidax** | quidax.com | Nigerian crypto exchange with API | Local liquidity. Good as a backup or for NGN-paired trading. Has had reliability issues — test before committing. |

**Recommendation:** Use **Yellow Card** for stablecoin settlement (USDT/USDC ↔ NGN). Use **CoinGecko** for rate feeds and price alerts. Evaluate **Binance** for deeper liquidity if regulatory situation allows.

---

### Multi-Currency & Cross-Border (for Multi-Currency Wallet — Feature 2.4)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Nium** | nium.com | Global real-time payments, FX, card issuing, global accounts | Enterprise-grade. 190+ payout markets. Best for multi-currency wallets and international transfers. |
| **Chipper Cash** | chippercash.com | Cross-border payments across 21+ African countries | Enterprise API for bulk payments and collections. Good for Africa-to-Africa transfers. |
| **Grey** | grey.co | Multi-currency accounts (USD, GBP, EUR), virtual cards, transfers | Consumer-first but has partnership potential. Good benchmark for what the feature should feel like. |
| **LemFi** | lemfi.com | Multi-currency accounts, international transfers | FCA/FinCEN regulated. Consumer-first, but potential partnership for rails. |

**Recommendation:** **Nium** is the infrastructure play — they provide the rails that power multi-currency wallets. Start conversations early; enterprise sales cycles are longer.

---

### SMS, Push Notifications & Communication (for Notifications — Feature 1.2, 1.4, 2.6)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Termii** | termii.com | SMS, WhatsApp, voice, email — Africa-focused | Nigerian company. Best pricing for Nigerian SMS. OTP delivery, transactional notifications, marketing. |
| **Africa's Talking** | africastalking.com | SMS, USSD, voice, airtime, mobile data — pan-African | 250K+ developers. 100% Africa coverage. Good if you also want USSD support (e.g., *123# for feature phone users). |
| **Infobip** | infobip.com | Global CPaaS: SMS, WhatsApp, voice, email, RCS, AI chatbots | Enterprise-grade. Strong African presence. Best if you want WhatsApp Business API + SMS + chatbot in one. |
| **Twilio** | twilio.com | Global leader: SMS, voice, WhatsApp, video, verify (OTP) | Most mature API ecosystem. Higher cost for African SMS. Best for OTP verification (Twilio Verify). |

**Recommendation:** **Termii** for Nigerian SMS and transactional notifications (cheapest, most reliable locally). Add **Infobip** if you want WhatsApp Business integration for support and marketing.

---

### Gift Card Verification (for Gift Cards — existing feature)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Cardtonic** | cardtonic.com | Buy/sell 14K+ gift cards, virtual cards, bill payments | Active African gift card platform with developer API. Can automate card validation instead of manual admin review. |
| **Reloadly** | reloadly.com | Gift card API alongside airtime/data | Same provider as bill payments — consolidates vendors. Supports gift card redemption in 170+ countries. |

**Recommendation:** **Cardtonic** for automated gift card verification and rate sourcing. This would reduce the manual admin review bottleneck significantly.

---

### Product Analytics (for data-driven decisions — cross-cutting)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **PostHog** | posthog.com | Open-source: analytics, session replay, feature flags, A/B testing, data warehouse | Free tier is generous. All-in-one: analytics + experimentation + feature flags. Self-hostable (data stays in your control). |
| **Mixpanel** | mixpanel.com | Product analytics: event tracking, funnels, retention, AI insights | Industry standard for product analytics. Great funnel analysis. Free tier up to 20M events/month. |
| **Amplitude** | amplitude.com | AI-powered product analytics, web analytics, experimentation | Strong AI features. Good for larger teams with dedicated data analysts. |

**Recommendation:** **PostHog** — it's open-source, free to start, and gives you analytics + session replay + feature flags + A/B testing in one tool. You'll need feature flags for gradual rollouts anyway.

---

### P2P Escrow (for P2P Marketplace — Feature 2.3)

| Partner | Website | What They Do | Why Them |
|---------|---------|-------------|----------|
| **Vesicash** | vesicash.com | Nigerian P2P escrow platform | Purpose-built for P2P escrow in Nigeria. Holds funds until both parties confirm. |
| **Paystack Split Payments** | paystack.com | Split payments and hold-in-escrow via API | Not a dedicated escrow product, but you can build escrow logic on top of Paystack's split/hold features. |
| **Custom build** | — | Build escrow logic on your existing wallet infrastructure | Most P2P platforms (Binance P2P, Paxful) build their own escrow. Hold crypto in a platform wallet, release on confirmation. |

**Recommendation:** Build custom escrow on your existing wallet system. P2P escrow is core to the product — you don't want to depend on a third party for it. Use **Vesicash** as a reference for how escrow flows should work.

---

### Partner Priority Matrix

If you can only sign up 3 partners this quarter, pick these:

| Priority | Partner | Why |
|----------|---------|-----|
| **1st** | **Monnify** | NGN deposits are the #1 growth blocker. Without this, you lose every user who doesn't already have crypto. |
| **2nd** | **Smile ID** | KYC is a regulatory requirement. Manual KYC doesn't scale. Automate it before you grow. |
| **3rd** | **Termii** | Notifications (transaction alerts, OTPs, rate alerts) are needed for almost every feature on this roadmap. |

Next quarter, add: **Reloadly** (bills), **Yellow Card** (crypto liquidity), **PostHog** (analytics).

---

## Suggested Sprint Plan

### Sprint 1-2 (Weeks 1-4): Fix the Basics
- Onboarding overhaul
- Transaction status transparency
- Beneficiaries and repeat transactions
- Trust signals
- Dark mode
- Quick wins (QW-1 through QW-5)

### Sprint 3-4 (Weeks 5-8): Growth Levers
- Rate alerts and price notifications
- Referral Program 2.0
- Portfolio analytics
- Instant NGN deposits
- Autopay for bills
- Quick wins (QW-6 through QW-10)

### Sprint 5-6 (Weeks 9-12): Moats
- Savings vaults
- Crypto gifting
- Auto-buy / DCA
- Transaction statements and tax reports
- Start: P2P marketplace or Multi-currency (pick one)

---

*Last updated: May 2026 | Status: Draft — adjust based on user feedback, data, and business priorities*
