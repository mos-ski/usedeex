# Module: Bill Payments

## 1. Overview
The Bill Payments module enables users to purchase airtime, mobile data, pay electricity bills, and fund betting accounts for Nigerian providers. It supports 4 bill types with multiple providers each, beneficiary management for quick repeat payments, and data plan selection for mobile top-ups. All transactions are currently mocked with no real payment processing.

## 2. Goals & Objectives
- Enable users to buy airtime for all major Nigerian telcos (MTN, Glo, Airtel, 9mobile)
- Support mobile data plan purchases with predefined plan options
- Allow electricity bill payments for 5 major distribution companies (IKEDC, EKEDC, AEDC, PHED, BEDC)
- Enable betting account funding for 5 popular platforms (Bet9ja, SportyBet, 1xBet, BetKing, MSport)
- Provide beneficiary shortcuts for frequently used numbers/meters/IDs
- Deliver a consistent 4-step flow across all bill types

## 3. User Personas
- **Airtime Buyer**: User who regularly buys airtime for self or others
- **Data Subscriber**: User who purchases mobile data plans
- **Bill Payer**: User who pays electricity bills for home or office
- **Bettor**: User who funds betting accounts
- **Repeat Payer**: User who frequently pays the same beneficiaries

## 4. User Stories
- As a user, I want to buy airtime for any Nigerian network so that I can top up my phone or others'.
- As a user, I want to select from predefined data plans so that I don't have to guess plan details.
- As a user, I want to pay my electricity bill by entering my meter number so that I can get power tokens.
- As a user, I want to fund my betting account so that I can place bets.
- As a user, I want to save beneficiaries so that I can pay them quickly next time.
- As a user, I want to review payment details before confirming so that I avoid mistakes.
- As a user, I want to see a receipt after payment so that I have proof of transaction.

## 5. User Flows
### Flow 1: Buy Airtime
1. User navigates to `/bills/airtime`
2. User sees provider grid: MTN, Glo, Airtel, 9mobile
3. User selects a provider → form step
4. Beneficiary section shows recent numbers (horizontal scroll)
5. User enters phone number (or taps beneficiary)
6. User enters amount in Naira
7. User taps "Continue" → review step
8. User reviews: service, provider, phone, amount
9. User taps "Pay Now" → success screen
10. User can view receipt or return to dashboard

### Flow 2: Buy Data
1. User navigates to `/bills/data`
2. User selects provider (MTN, Glo, Airtel, 9mobile)
3. Beneficiary section shows recent numbers
4. User enters phone number (or taps beneficiary)
5. User selects from predefined data plans (1GB-₦500, 2GB-₦1,000, 5GB-₦2,000, 10GB-₦3,500)
6. User taps "Continue" → review → success

### Flow 3: Pay Electricity
1. User navigates to `/bills/electricity`
2. User selects Disco: IKEDC, EKEDC, AEDC, PHED, BEDC
3. Beneficiary section shows recent meters
4. User enters meter number (or taps beneficiary)
5. User enters amount in Naira
6. User taps "Continue" → review → success

### Flow 4: Fund Betting
1. User navigates to `/bills/betting`
2. User selects platform: Bet9ja, SportyBet, 1xBet, BetKing, MSport
3. Beneficiary section shows recent betting IDs
4. User enters user ID (or taps beneficiary)
5. User enters amount in Naira
6. User taps "Continue" → review → success

## 6. Functional Requirements
- **FR-001**: Support 4 bill types: airtime, data, electricity, betting
- **FR-002**: Airtime must support 4 providers: MTN, Glo, Airtel, 9mobile
- **FR-003**: Data must support 4 providers with plan selection
- **FR-004**: Electricity must support 5 Discos: IKEDC, EKEDC, AEDC, PHED, BEDC
- **FR-005**: Betting must support 5 platforms: Bet9ja, SportyBet, 1xBet, BetKing, MSport
- **FR-006**: Each bill type must have configurable form fields defined in `billConfigs`
- **FR-007**: Data bills must have a `hasPlans` flag with predefined plan options
- **FR-008**: Each bill type must display beneficiaries from `beneficiaryData`
- **FR-009**: Tapping a beneficiary must auto-fill the primary form field
- **FR-010**: Review screen must display all entered data before confirmation
- **FR-011**: Success screen must pass receipt data to `/receipt` route
- **FR-012**: Back navigation must step through the flow correctly

## 7. Non-Functional Requirements
- **NFR-001**: Bill configurations must be defined declaratively in `billConfigs` object
- **NFR-002**: Provider icons must render via `ProviderIcon` component
- **NFR-003**: Beneficiary cards must be horizontally scrollable with `overflow-x-auto`
- **NFR-004**: Selected beneficiary must show a primary-colored border highlight
- **NFR-005**: All bill payment pages must use `PageTransition` for smooth navigation
- **NFR-006**: Form inputs must use consistent `bg-secondary rounded-xl` styling
- **NFR-007**: Plan selection buttons must highlight with primary color when selected

## 8. Edge Cases / Unhappy Paths
- User enters invalid phone number format — no validation currently exists
- User enters invalid meter number — no validation
- User enters amount of ₦0 — no minimum amount enforcement
- Beneficiary data is hardcoded — no dynamic loading from backend
- Data plans are hardcoded — no API-driven plan fetching
- No account/name resolution for phone numbers or meter numbers
- No payment failure handling — all payments succeed in current implementation
- No duplicate payment detection
- No transaction history for bill payments
- No discount or commission display for bill payments

## 9. Acceptance Criteria
Given I am on the airtime screen
When I select MTN
Then I see a form with phone number and amount fields, plus recent MTN numbers as beneficiaries

Given I am on the data screen
When I select a provider
Then I see 4 predefined data plans I can choose from

Given I am on the electricity screen
When I select IKEDC
Then I see a form with meter number and amount fields, plus recent meters as beneficiaries

Given I am on the betting screen
When I select Bet9ja
Then I see a form with user ID and amount fields, plus recent betting IDs as beneficiaries

Given I am on the review screen
When I tap "Pay Now"
Then I see a success screen and can view a receipt

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /bills/providers` — List providers by bill type (needs to be built)
- `GET /bills/plans/:providerId` — Get data plans for a provider (needs to be built)
- `POST /bills/airtime` — Purchase airtime (needs to be built)
- `POST /bills/data` — Purchase data bundle (needs to be built)
- `POST /bills/electricity` — Pay electricity bill (needs to be built)
- `POST /bills/betting` — Fund betting account (needs to be built)
- `GET /bills/beneficiaries` — List user's saved beneficiaries (needs to be built)
- `POST /bills/beneficiaries` — Save a new beneficiary (needs to be built)
- `POST /bills/resolve` — Resolve phone number to name (needs to be built)
- `POST /bills/validate-meter` — Validate meter number and get customer info (needs to be built)

### Mocked APIs (frontend only)
- Bill configurations: `billConfigs` object in `BillPayment.tsx:8-44`
- Beneficiary data: `beneficiaryData` object in `BillPayment.tsx:46-65`
- Data plans: hardcoded array `["1GB - ₦500", "2GB - ₦1,000", "5GB - ₦2,000", "10GB - ₦3,500"]`
- All payments succeed immediately — no API calls or error states
- Receipt data passed via React Router state to `/receipt` page

### Missing APIs
- Integration with telco APIs (MTN, Glo, Airtel, 9mobile) for airtime/data
- Integration with Disco APIs for electricity token generation
- Integration with betting platform APIs
- Real-time balance checking before payment
- Transaction history for bill payments
- Payment receipt generation with unique transaction IDs
- Commission/cashback calculation for bill payments
- Bulk bill payment support

## 11. UI/UX Notes
- Provider selection uses a `grid-cols-2` layout with ProviderIcon and name
- Beneficiary cards are compact with `overflow-x-auto` for horizontal scrolling
- Beneficiary cards show label (phone/meter/ID) and sub-label (provider + name)
- Selected beneficiary gets a `border-primary` highlight
- Data plan buttons use primary color fill when selected, secondary when not
- Form fields use `bg-secondary rounded-xl` with `h-12` height
- Review screen uses a summary card with `bg-secondary` background
- Success screen uses CheckCircle icon in success color with large centered layout
- Each bill type route is parameterized: `/bills/:type`
- Back navigation correctly steps through the 4-step flow

## 12. Metrics / Success Criteria
- Number of bill payments per day by type
- Most popular providers per bill type
- Beneficiary usage rate (percentage of payments using saved beneficiaries)
- Average transaction value per bill type
- Payment success rate
- User retention for repeat bill payments
- Revenue from bill payment commissions
- Most popular data plans by volume
