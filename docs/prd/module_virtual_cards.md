# Module: Virtual Cards

## 1. Overview
The Virtual Cards module allows users to create, manage, and use USD-denominated Visa virtual cards for online payments. Users can create up to 3 cards (with a $2 creation fee), fund them from crypto wallets, freeze/unfreeze them, set spending limits, view card details (number, CVV, expiry), and track transaction history. KYC Level 2 is required to create cards. All card data and operations are currently mocked.

## 2. Goals & Objectives
- Provide users with virtual Visa cards for international online payments
- Enforce KYC Level 2 requirement for card creation
- Limit users to a maximum of 3 virtual cards
- Charge a $2 creation fee deducted from a selected crypto wallet
- Enable card funding from crypto wallets (USDT, BTC, ETH)
- Provide card freeze/unfreeze functionality for security
- Allow customizable daily and monthly spending limits
- Display full card details (number, CVV, expiry) with toggle visibility

## 3. User Personas
- **Online Shopper**: User who needs a card for international e-commerce purchases
- **Subscription Manager**: User who uses virtual cards for recurring subscriptions
- **Privacy-Conscious User**: User who prefers virtual cards over sharing real card details
- **High-Volume User**: User who needs multiple cards for different spending categories

## 4. User Stories
- As a user, I want to create a virtual Visa card so that I can make online payments.
- As a user, I want to be prompted to complete KYC Level 2 if I haven't so that I know the requirement.
- As a user, I want to label my cards (e.g., "Shopping", "Subscriptions") so that I can organize them.
- As a user, I want to fund my card from my crypto wallet so that I can spend the balance.
- As a user, I want to freeze my card temporarily so that I can prevent unauthorized charges.
- As a user, I want to set daily and monthly spending limits so that I can control my spending.
- As a user, I want to view my card number, CVV, and expiry so that I can use it for online payments.
- As a user, I want to see my card transaction history so that I can track my spending.
- As a user, I want to delete a card I no longer need so that I can free up my card limit.

## 5. User Flows
### Flow 1: Card List View
1. User navigates to `/virtual-cards`
2. If KYC Level < 2, shows warning banner with link to complete KYC
3. System shows card count (e.g., "2/3 cards created • $2 per card")
4. Existing cards displayed as gradient cards with label, balance, last 4 digits, and VISA branding
5. Frozen cards show a "Frozen" badge
6. User taps a card → detail view
7. If under card limit and KYC Level ≥ 2, "Create New Card ($2)" button is shown

### Flow 2: Create Card
1. User taps "Create New Card ($2)"
2. System shows Visa Virtual Card info with creation fee
3. User enters card label (e.g., "Shopping", "Subscriptions")
4. User selects wallet to deduct $2 fee from (USDT, BTC, ETH)
5. Warning banner confirms $2 deduction
6. User taps "Create Card" → card created with random last 4 digits
7. Toast notification confirms creation
8. User returns to card list

### Flow 3: Card Detail
1. User taps a card from the list
2. System shows card visual with gradient background
3. Balance displayed prominently
4. Card number hidden by default (•••• •••• •••• XXXX)
5. User taps eye icon to reveal full number, CVV, and expiry
6. Copy button appears when number is visible
7. Action grid: Fund, Freeze/Unfreeze, Limits, Delete
8. Spending limits section with daily and monthly display
9. Transaction history list below

### Flow 4: Fund Card
1. User taps "Fund" from card detail
2. User enters amount in USD
3. User selects source wallet (USDT, BTC, ETH)
4. User taps "Fund Card" → toast confirms funding
5. User returns to card detail

### Flow 5: Freeze/Unfreeze Card
1. User taps "Freeze" or "Unfreeze" from card detail
2. Card status toggles between active and frozen
3. Toast notification confirms the action
4. Frozen cards show an overlay with "Card Frozen" message

### Flow 6: Edit Spending Limits
1. User taps "Limits" from card detail
2. User edits daily limit (USD)
3. User edits monthly limit (USD)
4. User taps "Save Limits" → toast confirms update
5. User returns to card detail

### Flow 7: Delete Card
1. User taps "Delete" from card detail
2. Card is removed from the list immediately
3. Toast notification confirms deletion
4. User returns to card list

## 6. Functional Requirements
- **FR-001**: Cards must be Visa virtual cards denominated in USD
- **FR-002**: KYC Level 2 must be required for card creation
- **FR-003**: Maximum 3 cards per user
- **FR-004**: Creation fee is $2, deducted from selected crypto wallet
- **FR-005**: Card labels must be user-defined (e.g., "Shopping", "Subscriptions")
- **FR-006**: Card numbers must be partially hidden by default (last 4 visible)
- **FR-007**: Full card number, CVV, and expiry must be revealable via toggle
- **FR-008**: Card number must be copyable to clipboard when visible
- **FR-009**: Cards must support freeze/unfreeze toggle
- **FR-010**: Cards must support customizable daily and monthly spending limits
- **FR-011**: Cards must be fundable from USDT, BTC, or ETH wallets
- **FR-012**: Cards must be deletable
- **FR-013**: Transaction history must be displayed per card
- **FR-014**: Frozen cards must show a visual overlay on the card display

## 7. Non-Functional Requirements
- **NFR-001**: Card data must be stored in React state (mocked, no backend)
- **NFR-002**: Card last 4 digits must be randomly generated: `Math.floor(1000 + Math.random() * 9000)`
- **NFR-003**: Card visual must use gradient background: `from-primary/20 via-card to-accent/10`
- **NFR-004**: Frozen overlay must use `bg-background/60` with centered badge
- **NFR-005**: Toast notifications must use Sonner for all card actions
- **NFR-006**: Action buttons must use a 4-column grid layout
- **NFR-007**: Transaction list items must be separated by `h-px bg-border` dividers

## 8. Edge Cases / Unhappy Paths
- User tries to create a 4th card — button is hidden when `cards.length >= maxCards`
- User tries to create a card without KYC Level 2 — warning banner shown, create button hidden
- User enters empty card label — toast error "Please enter a card label"
- User enters invalid fund amount (≤0) — toast error "Enter a valid amount"
- Card number visibility toggle — CVV and expiry also toggle with the same control
- Clipboard copy fails — no error handling for `navigator.clipboard.writeText`
- Deleting a card has no confirmation dialog — immediate deletion
- No card recovery after deletion
- Mock card number is hardcoded prefix `4532 7891 2345` + last4
- CVV is hardcoded as "412"
- Expiry is hardcoded as "03/29"
- No real card network integration (Visa API)
- No actual funding from crypto wallets
- No real transaction processing

## 9. Acceptance Criteria
Given I have KYC Level 2
When I view the virtual cards page
Then I see my existing cards and a "Create New Card ($2)" button

Given I don't have KYC Level 2
When I view the virtual cards page
Then I see a warning banner telling me to complete KYC and no create button

Given I am creating a card
When I enter a label and select a funding wallet
Then a new card is created with a random last 4 digits and $2 is deducted

Given I am viewing a card
When I tap the eye icon
Then my full card number, CVV, and expiry are revealed

Given I am viewing a card
When I tap "Freeze"
Then the card status changes to frozen and a visual overlay appears

Given I am viewing a card
When I tap "Delete"
Then the card is removed and I see a confirmation toast

## 10. API / Data Requirements
### Real APIs (from backend)
- `POST /virtual-cards` — Create a new virtual card (needs to be built)
- `GET /virtual-cards` — List user's virtual cards (needs to be built)
- `GET /virtual-cards/:id` — Get card details (needs to be built)
- `POST /virtual-cards/:id/fund` — Fund a card from crypto wallet (needs to be built)
- `POST /virtual-cards/:id/freeze` — Freeze a card (needs to be built)
- `POST /virtual-cards/:id/unfreeze` — Unfreeze a card (needs to be built)
- `DELETE /virtual-cards/:id` — Delete a card (needs to be built)
- `PUT /virtual-cards/:id/limits` — Update spending limits (needs to be built)
- `GET /virtual-cards/:id/transactions` — Get card transaction history (needs to be built)
- `GET /virtual-cards/:id/details` — Get full card number, CVV, expiry (needs to be built)
- `POST /virtual-cards/kyc-check` — Verify KYC Level 2 eligibility (needs to be built)

### Mocked APIs (frontend only)
- Card data: `mockCards` array in `VirtualCards.tsx:12-44` with 2 pre-seeded cards
- Card creation: generates new card with `id: Date.now()` and random last4 in `VirtualCards.tsx:192-199`
- KYC check: hardcoded `kycLevel = 2` in `VirtualCards.tsx:58`
- Card limits: hardcoded per card (`dailyLimit: 500`, `monthlyLimit: 5000`)
- Transactions: hardcoded array per card in mock data
- Card number: hardcoded prefix `4532 7891 2345` + last4 in `VirtualCards.tsx:310`
- CVV: hardcoded as "412" in `VirtualCards.tsx:319`
- Expiry: hardcoded as "03/29" in `VirtualCards.tsx:318`
- All state managed in React `useState` — no persistence

### Missing APIs
- Visa/Mastercard virtual card issuance integration
- Real card number generation
- Real funding from crypto wallets
- Real transaction processing and history
- Card freeze/unfreeze via card network
- Spending limit enforcement at the network level
- Card replacement (lost/stolen)
- 3D Secure authentication
- International transaction support configuration

## 11. UI/UX Notes
- Card list uses gradient cards with `from-card to-secondary` background
- Card detail uses a prominent gradient visual: `from-primary/20 via-card to-accent/10`
- Frozen cards show a semi-transparent overlay with Snowflake icon and "Card Frozen" badge
- Card number uses monospace font with `tracking-widest`
- Action grid uses 4 columns with icon + label buttons
- Fund and Limits views use the same form pattern as other modules
- Toast notifications use Sonner for all actions (create, fund, freeze, delete, limits)
- NewBadge component is displayed on the page header
- Empty state shows CreditCard icon with "No virtual cards yet" message
- Card creation shows a warning banner about the $2 fee deduction

## 12. Metrics / Success Criteria
- Number of virtual cards created per user
- Card creation rate (users who create at least one card)
- Average card balance
- Card funding frequency and average funding amount
- Freeze/unfreeze usage rate
- Card deletion rate
- Average daily/monthly limit settings
- Transaction volume per card
- Most popular funding wallet (USDT vs BTC vs ETH)
- KYC conversion rate from virtual card prompt
