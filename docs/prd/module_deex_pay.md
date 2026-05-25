# Module: DeeX Pay

## 1. Overview
The DeeX Pay module provides three payment capabilities: paying merchants via ID/QR/link, sending cash to Nigerian bank accounts from crypto wallets, and generating shareable payment links to receive crypto. It serves as a bridge between crypto holdings and real-world payments, with daily limits on bank transfers. All flows are currently mocked with no real payment processing.

## 2. Goals & Objectives
- Enable merchant payments using crypto via merchant ID, QR code, or payment link
- Allow users to convert crypto to Naira and send to any Nigerian bank account
- Provide a payment link generator for receiving crypto payments from others
- Enforce daily transfer limits for bank cash-outs
- Support multiple crypto wallets as funding sources
- Create a unified payment hub accessible from the main navigation

## 3. User Personas
- **Merchant Payer**: User who needs to pay a DeeX merchant for goods or services
- **Cash Sender**: User who wants to convert crypto to Naira and send to a bank account
- **Freelancer**: User who generates payment links to receive payments from clients
- **Business Owner**: User who accepts crypto payments via generated links

## 4. User Stories
- As a user, I want to pay a merchant by entering their ID so that I can complete a purchase.
- As a user, I want to scan a merchant QR code so that I can pay quickly.
- As a user, I want to paste a payment link so that I can pay a merchant directly.
- As a user, I want to select which crypto wallet to pay from so that I can choose the best option.
- As a user, I want to send cash to any Nigerian bank account from my crypto so that I can pay bills or people.
- As a user, I want to see my remaining daily transfer limit so that I know how much I can send.
- As a user, I want to generate a payment link with a specific amount so that I can request payments.
- As a user, I want to copy and share my payment link so that others can pay me.

## 5. User Flows
### Flow 1: Pay Merchant
1. User navigates to `/deex-pay`
2. User sees 3 options: Pay Merchant, Send Cash to Bank, Generate Payment Link
3. User taps "Pay Merchant"
4. User enters merchant ID or payment link in text input
5. User can tap "Scan QR Code" button (non-functional)
6. User taps "Continue" → crypto selection step
7. User selects crypto to pay with (BTC, ETH, USDT, USDC) showing balance
8. User enters amount in selected crypto
9. User taps "Continue" → review step
10. User reviews: merchant ID, crypto, amount
11. User taps "Pay Now" → success screen with "Payment Sent!"

### Flow 2: Send Cash to Bank
1. User taps "Send Cash to Bank" from DeeX Pay home
2. System shows daily limit banner: ₦100,000 limit with usage progress bar
3. User selects source wallet via horizontal pill buttons (USDT, BTC, ETH)
4. User selects destination bank from dropdown
5. User enters 10-digit account number
6. User enters amount in Naira
7. System validates against remaining daily limit (shows error if exceeded)
8. User taps "Continue" → review step
9. User reviews: source wallet, bank, account, amount
10. User taps "Send Now" → success screen

### Flow 3: Generate Payment Link
1. User taps "Generate Payment Link" from DeeX Pay home
2. User enters amount in USD
3. User optionally enters a description
4. User taps "Generate Link"
5. System generates a link: `https://deex.app/pay/lnk_${timestamp}`
6. Link is displayed with a copy button
7. Description is shown below the link if provided
8. User taps "Done" to return home

## 6. Functional Requirements
- **FR-001**: DeeX Pay home must display 3 payment options with icons and descriptions
- **FR-002**: Merchant payment must accept merchant ID or payment link as input
- **FR-003**: QR code scanning button must be displayed (currently non-functional)
- **FR-004**: Merchant payment must support 4 crypto wallets: BTC, ETH, USDT, USDC
- **FR-005**: Send Cash must display daily limit (₦100,000) with usage progress
- **FR-006**: Send Cash must validate amount against remaining daily limit
- **FR-007**: Send Cash must support bank selection from dropdown
- **FR-008**: Send Cash must accept 10-digit account number input
- **FR-009**: Payment link must be generated with unique identifier using timestamp
- **FR-010**: Payment link must be copyable to clipboard with visual feedback
- **FR-011**: All flows must include review/confirmation steps
- **FR-012**: Back navigation must correctly step through each flow

## 7. Non-Functional Requirements
- **NFR-001**: Daily limit tracking must use hardcoded values (limit: ₦100,000, used: ₦35,000)
- **NFR-002**: Generated links must use the format `https://deex.app/pay/lnk_${Date.now().toString(36)}`
- **NFR-003**: All DeeX Pay pages must use `PageTransition` component
- **NFR-004**: Wallet selection pills must use horizontal scrolling with `overflow-x-auto`
- **NFR-005**: Bank dropdown must be positioned absolutely with `z-10` stacking
- **NFR-006**: Copy feedback must show checkmark for 2 seconds then revert
- **NFR-007**: Amount inputs must support decimal values

## 8. Edge Cases / Unhappy Paths
- User enters non-existent merchant ID — no validation currently exists
- QR code scanner is non-functional — no WebRTC camera integration
- Send Cash amount exceeds remaining daily limit — error message shown but no hard block
- Account number resolution (name lookup) is not implemented
- Payment link has no backend — generated links don't actually work
- No payment timeout or expiration for generated links
- No merchant verification before payment
- No transaction history for DeeX Pay transactions
- Reset function clears all state but doesn't persist across navigation

## 9. Acceptance Criteria
Given I am on the DeeX Pay home screen
When I view the options
Then I see Pay Merchant, Send Cash to Bank, and Generate Payment Link

Given I am paying a merchant
When I enter a merchant ID and select USDT
Then I can enter an amount and proceed to review

Given I am sending cash to a bank
When I view the daily limit banner
Then I see ₦100,000 limit with ₦35,000 used and a progress bar

Given I am sending cash to a bank
When I enter an amount exceeding the remaining limit
Then I see an error message showing the remaining limit

Given I generate a payment link
When I enter $50 and a description
Then I get a shareable link with the amount and description displayed

## 10. API / Data Requirements
### Real APIs (from backend)
- `POST /payments/merchant` — Pay a merchant (needs to be built)
- `GET /merchants/:id` — Resolve merchant ID to details (needs to be built)
- `POST /payments/qr-scan` — Process QR code scan (needs to be built)
- `POST /transfers/bank` — Send cash to bank account (needs to be built)
- `GET /limits/daily-bank` — Get daily bank transfer limit and usage (needs to be built)
- `POST /payment-links` — Generate a payment link (needs to be built)
- `GET /payment-links/:id` — Resolve a payment link (needs to be built)
- `GET /banks` — List Nigerian banks (needs to be built)
- `POST /banks/resolve` — Resolve account number to name (needs to be built)

### Mocked APIs (frontend only)
- Crypto wallets: hardcoded array in `DeexPay.tsx:7-12` with balances
- Banks: hardcoded array in `DeexPay.tsx:14`
- Daily limit: hardcoded `dailyLimit = 100000`, `dailyUsed = 35000` in `DeexPay.tsx:38-39`
- Payment link generation: `https://deex.app/pay/lnk_${Date.now().toString(36)}` in `DeexPay.tsx:46`
- All payments succeed immediately — no API calls
- State management: local React state with `resetAll()` function

### Missing APIs
- Merchant directory and verification
- QR code scanning (camera integration)
- Payment link resolution and payment processing
- Real-time daily limit tracking
- Bank account name resolution
- Transaction receipts with unique IDs
- Payment notifications to merchants
- Payment link expiration and management
- Multi-currency support for payment links

## 11. UI/UX Notes
- Home screen uses 3 large cards with colored icon circles (primary, success, accent)
- Each card has a title, description, and icon (ScanLine, Send, Link2)
- Merchant payment flow has 4 steps: merchant → select crypto → amount → review
- Send Cash shows a limit banner with progress bar at the top
- Wallet selection uses horizontal pill buttons with primary highlight
- Bank dropdown uses absolute positioning with shadow
- Payment link generation shows a success icon and monospace link display
- Copy button shows checkmark feedback for 2 seconds
- All flows use the same review card pattern with `bg-card border border-border`
- Back button uses circular `bg-secondary` button with ArrowLeft icon

## 12. Metrics / Success Criteria
- Number of merchant payments per day
- Total merchant payment volume (USD equivalent)
- Send Cash daily limit utilization rate
- Number of payment links generated per day
- Payment link conversion rate (links created vs. payments received)
- Average payment amount per method
- Most popular crypto for merchant payments
- Bank transfer success rate
- User adoption of each DeeX Pay feature
