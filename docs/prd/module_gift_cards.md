# Module: Gift Cards

## 1. Overview
The Gift Cards module allows users to sell gift cards from popular brands (Apple, Google Play, Amazon, Steam, iTunes, Walmart, Nike, Sephora) for Naira. Users select a brand, specify country and card type, enter the card value, upload an image or enter the code, review the trade, and submit. Orders are stored in localStorage and have a pending/approved/rejected status. The module features tiered rates that vary by brand, country, and card value.

## 2. Goals & Objectives
- Enable users to sell gift cards from 8 supported brands across 4 countries
- Provide transparent tiered pricing so users know their payout before submitting
- Support both physical card image upload and e-code entry
- Store order data in localStorage for persistence across sessions
- Allow admin review and status management of gift card orders
- Categorize brands by Shopping, Entertainment, Gaming, and Prepaid

## 3. User Personas
- **Gift Card Seller**: User who has unused gift cards and wants to convert them to Naira
- **Gamer**: User selling Steam or gaming-related gift cards
- **Shopper**: User selling retail gift cards (Amazon, Walmart, Nike, Sephora)
- **Entertainment User**: User selling Apple, Google Play, or iTunes cards
- **Admin**: Staff member who reviews, approves, or rejects gift card trades

## 4. User Stories
- As a user, I want to browse available gift card brands so that I can select the one I have.
- As a user, I want to see the rate per dollar for each brand so that I can compare value.
- As a user, I want to select the country my card is from so that I get the correct rate.
- As a user, I want to choose between Physical Card and E-Code so that I can submit the right format.
- As a user, I want to see tiered rates based on card value so that I understand the pricing.
- As a user, I want to upload a card image or enter the code so that I can submit my trade.
- As a user, I want to review the trade details before submitting so that I confirm the payout.
- As a user, I want to be notified when my trade is reviewed so that I know the status.
- As a user, I want to view a receipt of my submitted trade so that I have a record.

## 5. User Flows
### Flow 1: Sell Gift Card
1. User navigates to `/giftcards`
2. User sees a 2-column grid of enabled gift card brands with rates
3. User taps a brand → navigates to type selection step
4. User selects country (USA, UK, Canada, EU) via pill buttons
5. User selects card type (Physical Card or E-Code) via pill buttons
6. User views rate tiers for selected country in an info card
7. User taps "Continue" → value entry step
8. User sees quick denomination buttons (e.g., $25, $50, $100, $200, $500)
9. User enters custom value or taps a denomination button
10. System shows rate and calculated NGN payout in real-time
11. User taps "Continue" → upload step
12. User taps to upload card image OR enters card code manually
13. User taps "Continue" → review step
14. User reviews all details: brand, country, type, value, rate, payout
15. User taps "Submit Trade" → order saved to localStorage
16. Status screen shows "Trade Submitted!" with pending status and "Notified Admin" badge
17. User can view receipt or return to dashboard

## 6. Functional Requirements
- **FR-001**: Display 8 gift card brands: Apple, Google Play, Amazon, Steam, iTunes, Walmart, Nike, Sephora
- **FR-002**: Each brand must show its best rate (first tier of first country) on the listing
- **FR-003**: Brands must be filterable by category: Shopping, Entertainment, Gaming, Prepaid
- **FR-004**: Country selection must be limited to countries supported by each brand
- **FR-005**: Card type selection must respect brand constraints (e.g., Nike only supports Physical Card)
- **FR-006**: Rate tiers must display min-max ranges with corresponding ₦/$ rates
- **FR-007**: Payout calculation: `payout = amount × rate` where rate is determined by tier
- **FR-008**: Quick denomination buttons must match the brand's configured denominations
- **FR-009**: Card image upload must be simulated (no actual file upload in current implementation)
- **FR-010**: Card code entry must be available as an alternative to image upload
- **FR-011**: Orders must be stored in localStorage with keys `deex_gc_orders`
- **FR-012**: Order status must support: pending, approved, rejected
- **FR-013**: Each order must include: id, userId, brandId, country, cardType, amount, rate, ngnPayout, status, createdAt
- **FR-014**: Navigation must support back-stepping through the flow

## 7. Non-Functional Requirements
- **NFR-001**: Rate calculations must be instant (client-side using `getRate` and `calcPayout` functions)
- **NFR-002**: Brand data must be loaded from `giftcardStore.getBrands()` with fallback to `DEFAULT_BRANDS`
- **NFR-003**: Orders must persist across page refreshes via localStorage
- **NFR-004**: The brand grid must use a 2-column layout for mobile optimization
- **NFR-005**: Provider icons must render via the `ProviderIcon` component
- **NFR-006**: Page transitions must use the `PageTransition` component
- **NFR-007**: Rate tier display must be compact and readable on mobile screens

## 8. Edge Cases / Unhappy Paths
- User enters a card value outside all defined tiers — falls back to the last tier's rate
- User enters a value of $0 — "Continue" button should be disabled (currently not enforced)
- User submits without uploading image or entering code — no validation prevents this
- Brand is disabled — it should not appear in the brand grid (handled via `.filter(b => b.enabled)`)
- Country has no rate tiers defined — returns rate of 0
- localStorage is full or unavailable — order saving fails silently
- User navigates away during submission — no draft saving
- Card image upload is simulated only — no actual file handling exists
- No duplicate order detection (same card code submitted twice)

## 9. Acceptance Criteria
Given I am on the gift cards screen
When I view the brand grid
Then I see 8 brands with their names and best rates displayed

Given I have selected Apple and USA
When I enter $100
Then I see a rate of ₦1,450/$ and a payout of ₦145,000

Given I have selected Apple and USA
When I enter $250
Then I see a rate of ₦1,350/$ (tier 3: $201-$500) and a payout of ₦337,500

Given I am on the upload step
When I tap the upload area
Then it shows "Image uploaded" with a success icon

Given I submit a gift card trade
When the submission completes
Then the order is saved to localStorage and I see a pending status screen

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /giftcards/brands` — List available gift card brands with rates (needs to be built)
- `GET /giftcards/rates/:brandId` — Get tiered rates for a brand by country (needs to be built)
- `POST /giftcards/orders` — Submit a gift card trade (needs to be built)
- `GET /giftcards/orders` — List user's gift card orders (needs to be built)
- `GET /giftcards/orders/:id` — Get order details (needs to be built)
- `POST /giftcards/upload` — Upload card image (needs to be built)
- `PUT /giftcards/orders/:id/status` — Admin update order status (needs to be built)

### Mocked APIs (frontend only)
- Brand data: `DEFAULT_BRANDS` array in `giftcardData.ts:40-151` with 8 brands
- Rate calculation: `getRate()` and `calcPayout()` functions in `giftcardData.ts:154-166`
- Order storage: `giftcardStore` using localStorage keys `deex_gc_brands` and `deex_gc_orders`
- Mock orders: 6 pre-seeded orders in `giftcardData.ts:182-219`
- Image upload: simulated with `setUploaded(true)` — no actual file handling
- Order ID generation: `gc_${Date.now()}` in `GiftCards.tsx:47`

### Missing APIs
- Real-time rate updates from admin
- Image upload to cloud storage (S3, Cloudinary, etc.)
- Card code validation / duplicate detection
- Order status notifications (push/SMS/email)
- Admin bulk order management
- Gift card purchase flow (buying, not just selling)
- Rate history / trend data
- Brand search and filtering by category in the UI

## 11. UI/UX Notes
- Brand grid uses `grid-cols-2` with `bg-secondary` cards showing ProviderIcon and rate
- Country and card type selectors use pill-style buttons with active state highlighting
- Rate tiers are shown in a compact card with `flex justify-between` rows
- Quick denomination buttons use the same pill style as country selectors
- Value input is large (`text-2xl`, centered) for easy entry
- Upload area is a large dashed-border box (`h-40`) with Upload icon
- Review screen uses a clean summary card with all trade details
- Status screen uses Clock icon with a notification bell badge
- "Notified Admin" badge is shown as a pill with primary color
- Navigation supports back-stepping through the 6-step flow
- ProviderIcon component renders brand-specific icons/logos

## 12. Metrics / Success Criteria
- Number of gift card trades submitted per day
- Average trade value (USD)
- Most popular brands by trade volume
- Country distribution of traded cards
- Physical Card vs. E-Code ratio
- Average processing time (pending → approved/rejected)
- Rejection rate and common rejection reasons
- User return rate for repeat gift card sales
- Revenue from rate spread (difference between buy and sell rates)
