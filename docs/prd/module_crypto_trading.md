# Module: Crypto Trading

## 1. Overview
The Crypto Trading module enables users to deposit, sell, swap, and withdraw cryptocurrencies, as well as send money to Nigerian bank accounts. It covers five core sub-flows: Deposit (receive crypto), Sell (convert crypto to Naira), Swap (crypto-to-crypto exchange), Withdraw (send crypto to external wallet), and Send Money (crypto-to-bank transfer). All rates, balances, and transaction states are currently hardcoded or mocked in the frontend.

## 2. Goals & Objectives
- Allow users to receive crypto deposits with QR codes and wallet addresses
- Enable selling crypto for Naira with bank account destination
- Provide instant crypto-to-crypto swaps with transparent fee display
- Support crypto withdrawals to external wallets with network selection
- Enable sending money to Nigerian bank accounts from crypto wallets
- Display real-time (mocked) rates and conversion calculations

## 3. User Personas
- **Crypto Holder**: User with existing crypto who wants to sell for Naira
- **Crypto Trader**: User who swaps between different cryptocurrencies
- **Remittance User**: User who sends money to bank accounts using crypto
- **Depositor**: User who wants to fund their DeeX wallet with external crypto
- **Withdrawer**: User who wants to move crypto out of DeeX to external wallets

## 4. User Stories
- As a user, I want to deposit crypto by scanning a QR code or copying an address so that I can fund my DeeX wallet.
- As a user, I want to sell crypto from my DeeX wallet and receive Naira in my bank account so that I can cash out.
- As a user, I want to sell crypto from an external wallet and have DeeX credit my account so that I don't need to pre-fund.
- As a user, I want to swap one crypto for another at a competitive rate so that I can diversify my holdings.
- As a user, I want to withdraw crypto to an external wallet address so that I can move funds off the platform.
- As a user, I want to send money to any Nigerian bank account using my crypto balance so that I can pay others easily.
- As a user, I want to see the current exchange rate and network fee before confirming so that I know exactly what I'll pay/receive.

## 5. User Flows
### Flow 1: Deposit Crypto
1. User navigates to `/deposit`
2. User selects a cryptocurrency (BTC, ETH, USDT, USDC, SOL)
3. System shows QR code, wallet address, and network selector
4. User can copy address to clipboard
5. User selects network from dropdown (varies by crypto)
6. Warning banner advises sending only the selected crypto on the selected network
7. User taps "Done" to return

### Flow 2: Sell Crypto (from DeeX Wallet)
1. User navigates to `/sell-crypto`
2. User selects "DeeX Wallet" as source
3. User selects asset (BTC, ETH, USDT, USDC), bank destination, and network
4. User enters crypto amount
5. System shows NGN equivalent using hardcoded rate (e.g., USDT × ₦1,535)
6. User reviews trade details on confirmation screen
7. System shows deposit address with QR code
8. User taps "I've Sent the Crypto" → pending state with "Awaiting Deposit" message
9. User returns to dashboard

### Flow 3: Sell Crypto (from External Wallet)
1. User navigates to `/sell-crypto`
2. User selects "External Wallet" as source
3. User selects asset, bank destination, and network
4. System shows rate, min/max deposit limits
5. System displays deposit address with QR code
6. User sends crypto externally, then taps "I've Sent the Crypto"
7. Pending state shows "We'll credit your account based on the amount received"

### Flow 4: Swap Crypto
1. User navigates to `/swap-crypto`
2. User selects "From" asset and "To" asset via bottom sheet pickers
3. User enters amount
4. System calculates: `toAmount = amount × fromRate / toRate`
5. System displays 0.5% fee
6. User taps "Preview Swap" → confirmation screen with rate, fee, and receive amount
7. User taps "Swap Now" → success screen
8. User returns to wallet

### Flow 5: Withdraw Crypto
1. User navigates to `/withdraw`
2. User selects asset (BTC, ETH, USDT, SOL)
3. User enters recipient wallet address
4. User selects network from dropdown
5. User enters amount (with available balance shown)
6. System displays network fee for selected asset
7. User previews withdrawal → confirmation screen
8. User enters 4-digit PIN to confirm (hardcoded "1234")
9. Success screen shows "Withdrawal Submitted"

### Flow 6: Send Money to Bank
1. User navigates to `/send-money`
2. System shows daily limit banner (₦50,000) with progress bar
3. User enters 10-digit account number
4. User selects bank from dropdown
5. User enters account name
6. User selects wallet source (USDT, USDC, BTC)
7. User enters NGN amount
8. User reviews transfer details
9. User confirms → success screen

## 6. Functional Requirements
- **FR-001**: Deposit must support 5 cryptocurrencies: BTC, ETH, USDT, USDC, SOL
- **FR-002**: Each crypto must display a unique deposit address and supported networks
- **FR-003**: Deposit addresses must be copyable to clipboard with visual feedback
- **FR-004**: Network selector must be a dropdown showing all supported networks per crypto
- **FR-005**: Sell flow must support two sources: DeeX Wallet and External Wallet
- **FR-006**: Sell must calculate NGN equivalent using hardcoded rates
- **FR-007**: Swap must calculate cross-rate: `toAmount = amount × fromRate / toRate`
- **FR-008**: Swap fee must be 0.5% of the from-amount
- **FR-009**: Withdraw must require PIN confirmation before submission
- **FR-010**: Withdraw must display network fee per asset
- **FR-011**: Send Money must enforce ₦50,000 daily limit
- **FR-012**: All flows must include review/confirmation steps before execution
- **FR-013**: Warning banners must display network-specific cautions for deposits and withdrawals

## 7. Non-Functional Requirements
- **NFR-001**: Rate calculations must be instant (client-side, no API latency)
- **NFR-002**: All crypto addresses must use monospace font for readability
- **NFR-003**: QR codes must be displayed at minimum 200×200px for scannability
- **NFR-004**: Network dropdowns must close when another dropdown is opened
- **NFR-005**: Amount inputs must support decimal values with appropriate precision
- **NFR-006**: All trading pages must use PageTransition for consistent navigation
- **NFR-007**: The swap interface must allow quick asset swap via a central toggle button

## 8. Edge Cases / Unhappy Paths
- User enters amount exceeding available balance — no validation currently exists
- User enters invalid wallet address format — no address validation
- User selects wrong network for withdrawal — warning shown but no prevention
- Send Money exceeds ₦50,000 daily limit — no enforcement in current implementation
- Swap between same assets — not prevented in current implementation
- Network dropdown overlaps with other UI elements on small screens
- User navigates away during pending state — no persistence of transaction state
- Clipboard copy fails — no error handling for `navigator.clipboard.writeText`
- PIN entry for withdrawal uses same hardcoded "1234" as app lock

## 9. Acceptance Criteria
Given I am on the deposit screen
When I select BTC
Then I see a QR code, BTC address, and network selector with BEP-20, Bitcoin Mainnet, and Lightning options

Given I am selling crypto from my wallet
When I enter 100 USDT
Then I see an estimated NGN amount of ₦153,500 (at ₦1,535/USDT)

Given I am swapping crypto
When I enter 0.01 BTC to swap to USDT
Then I see the calculated USDT amount and a 0.5% fee deduction

Given I am withdrawing crypto
When I confirm the withdrawal
Then I must enter my PIN before the withdrawal is submitted

Given I am sending money to a bank
When I view the daily limit banner
Then I see my remaining limit out of ₦50,000

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /rates` — Real-time crypto-to-NGN rates (needs to be built)
- `POST /trades/sell` — Sell crypto for Naira (needs to be built)
- `POST /trades/swap` — Crypto-to-crypto swap (needs to be built)
- `POST /withdrawals/crypto` — Crypto withdrawal request (needs to be built)
- `POST /transfers/bank` — Send money to bank account (needs to be built)
- `GET /wallets/balances` — User's crypto wallet balances (needs to be built)
- `GET /deposit-addresses/:asset` — Generate deposit address (needs to be built)
- `GET /banks` — List of Nigerian banks (needs to be built)
- `POST /banks/resolve` — Resolve account number to name (needs to be built)
- `GET /networks/:asset` — Supported networks per asset (needs to be built)
- `GET /limits/daily` — User's daily send limit and usage (needs to be built)

### Mocked APIs (frontend only)
- Crypto rates hardcoded in `SellCrypto.tsx:9-14`: BTC ₦97,450,000, ETH ₦5,830,000, USDT ₦1,535, USDC ₦1,530
- Swap rates hardcoded in `SwapCrypto.tsx:9-15`: BTC 97450, ETH 5830, USDT 1, SOL 231, USDC 1
- Wallet balances hardcoded in `SwapCrypto.tsx` and `WithdrawCrypto.tsx`
- Bank list hardcoded in `SellCrypto.tsx:16-20` and `SendMoney.tsx:6`
- Network fees hardcoded in `WithdrawCrypto.tsx:9-14`: BTC 0.0001, ETH 0.002, USDT 1.00, SOL 0.01
- Daily limit hardcoded in `SendMoney.tsx`: ₦50,000
- Deposit addresses hardcoded per crypto in `Deposit.tsx:7-13` and `SellCrypto.tsx:9-14`
- Swap fee hardcoded at 0.5% in `SwapCrypto.tsx:30`
- PIN for withdrawal hardcoded as "1234" in `WithdrawCrypto.tsx:45`

### Missing APIs
- Real-time price feeds / rate updates
- Account number resolution (name lookup)
- Transaction history for trades
- Trade status tracking (pending → completed)
- Blockchain confirmation monitoring
- Network fee estimation (dynamic)
- Slippage tolerance configuration for swaps
- Order book or liquidity pool data
- Trade receipt / transaction ID generation

## 11. UI/UX Notes
- Deposit uses a two-step flow: select crypto → view address/QR
- Sell has a 5-step flow: source → form → review → deposit-address → pending
- Swap uses a clean "From/To" layout with a central swap toggle button (ArrowDownUp icon)
- Swap asset pickers use bottom sheet modals with balance display
- Withdraw has a 5-step flow: select → form → confirm → pin → success
- Send Money shows a daily limit progress bar at the top
- All crypto icons use the `CryptoIcon` component
- Warning banners use Shield icon with `bg-foreground/5` background
- Network selectors use dropdown overlays with `z-20` stacking
- Pending state uses Clock icon in warning color
- Success states use CheckCircle icon in success color
- The "External Wallet" sell option has a `NewBadge` component

## 12. Metrics / Success Criteria
- Number of deposits per day by asset type
- Sell-to-Naira conversion volume (total NGN)
- Swap volume (total USD equivalent)
- Withdrawal success rate (completed vs. failed)
- Average time from deposit to credited balance
- Send Money daily limit utilization rate
- Swap fee revenue (0.5% of swap volume)
- Most popular crypto pairs for swapping
- Network distribution for deposits and withdrawals
- User drop-off rate at each step of the sell flow
