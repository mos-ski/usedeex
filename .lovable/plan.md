# DeeX - Crypto & Gift Card Trading App (UI Prototype)

A mobile-first web app clone of DeeX with all screens and flows using mock data.

## 1. Authentication

- **Login page**: Dark theme, DeeX branding, email/password fields, Google & Apple social login buttons, "Forgot password?" link, "Sign up" link
- **Sign up page**: Name, email, username, password fields + social login options

## 2. Dashboard (Home)

- Top bar: Profile avatar, Crypto/Gift Cards tab toggle, notification bell (with badge)
- **Crypto tab**: Balance card showing total USD + NGN equivalent, hide/show balance toggle, action buttons (Deposit, DeeX Pay, Sell Crypto), today's exchange rates ticker (BTC, ETH), Bill Payment shortcuts (Airtime, Data, Electricity, Betting), recent transactions list
- **Gift Cards tab**: Same balance card, "Sell Giftcards" button, recent gift card transactions

## 3. Wallet

- Holdings card with total balance and carousel dots
- **Assets list**: BTC, USDT, USDC, SOL, ETH, TRX, DOGE — each showing balance + USD value
- Tapping an asset opens quick actions bottom sheet: Sell Gift Cards, See Rates, Trade Crypto, Generate Statement, Open Reward

## 4. Deposit Flow

- Select crypto asset to deposit
- Show wallet address + QR code
- Copy address button

## 5. Sell Crypto Flow

- **Internal OTC**: Select asset → enter amount → confirm rate → review & confirm → success screen
- **External OTC**: Select asset → enter wallet address → enter amount → confirm → success screen

## 6. DeeX Pay (Pay with Crypto)

- Enter merchant ID or scan QR
- Select crypto to pay with → enter amount → review → confirm → success

## 7. Gift Card Flow (Sell)

- Select gift card brand (Apple, Google Play, Amazon, etc.)
- Select card type/country
- Enter card value
- Upload card image/code
- Review rate & payout → submit → pending/success status

## 8. Bill Payment Flows

- **Airtime**: Select network → enter phone → enter amount → confirm → success
- **Data**: Select network → select data plan → enter phone → confirm → success
- **Electricity**: Select provider → enter meter number → enter amount → confirm → success
- **Betting**: Select platform → enter user ID → enter amount → confirm → success

## 9. Activity

- Total payout card with hide toggle + NGN currency switch
- Filter tabs: All, Crypto, Gift Cards
- Grouped by month, each transaction showing icon, type, date, status (Completed/Pending), amount
- "Find with Hash ID" search bar at bottom

## 10. Rewards

- Referral banner with illustration
- Referral link + copy button
- Explore section: Trade Streak, Refer & Win cards
- Weekly Cashback progress bar with countdown
- DeeXpoints tracker
- Daily Streak calendar (Su-Sa)

## 11. Notifications

- List of notifications with title, message, timestamp
- Types: Login, Session, Promo messages

## 12. Account/Profile

- Avatar, name, email, username, "Edit profile" button
- Settings list: Security, Bank Accounts, Generate Statement, KYC Verification (with badge), Refer & Earn, About DeeX
- Log out button (red outline)

## 13. Bottom Navigation

- 5 tabs: Dashboard, Wallet, + (floating action), Rewards, Activity
- Active tab highlighted with blue indicator

## Design

- Dark navy/teal theme matching the screenshots
- Blue accent color for CTAs
- Mobile-first layout (max-width container centered on desktop)
- All data is mock/hardcoded
- Font is Sora