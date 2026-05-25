# DeeX — User Stories

## Module: Authentication & Onboarding

### US-AUTH-001: View Onboarding Slides
**As a** new user opening the app for the first time,
**I want** to see a 3-slide walkthrough of DeeX features,
**so that** I understand what the app does before signing up.

**Priority:** High

**Acceptance Criteria:**
Given I have not completed onboarding
When I open the app
Then I see 3 slides: Trade Crypto, Pay Bills & Send Money, Earn Rewards
And I can navigate with Next/Skip buttons
And a "Get Started" button appears on the last slide

---

### US-AUTH-002: Complete Onboarding
**As a** new user,
**I want** to mark onboarding as complete and proceed to login,
**so that** I don't see onboarding again.

**Priority:** High

**Acceptance Criteria:**
Given I am on the last onboarding slide
When I tap "Get Started"
Then `deex_onboarded` is set in localStorage
And I am navigated to /login

---

### US-AUTH-003: Login with Email and Password
**As a** registered user,
**I want** to log in with my email and password,
**so that** I can access my account.

**Priority:** High

**Acceptance Criteria:**
Given I am on the login screen
When I enter my email and password and tap "Log In"
Then I am navigated to the PIN lock screen

---

### US-AUTH-004: Sign Up for New Account
**As a** new user,
**I want** to create an account with my name, email, username, and password,
**so that** I can start using DeeX.

**Priority:** High

**Acceptance Criteria:**
Given I am on the signup screen
When I fill in all fields and tap "Create Account"
Then I am navigated to the dashboard

---

### US-AUTH-005: Enter PIN to Unlock
**As a** logged-in user,
**I want** to enter my 4-digit PIN to access the app,
**so that** my account is protected from unauthorized access.

**Priority:** High

**Acceptance Criteria:**
Given I am on the PIN lock screen
When I enter the correct 4-digit PIN
Then I am navigated to the dashboard after a brief delay
And if I enter an incorrect PIN, I see an error message and the PIN resets

---

### US-AUTH-006: Social Login Options
**As a** user who prefers social login,
**I want** to sign in with Google or Apple,
**so that** I don't need to remember a password.

**Priority:** Medium

**Acceptance Criteria:**
Given I am on the login or signup screen
When I tap the Google or Apple button
Then the respective OAuth flow is initiated (backend integration required)

---

### US-AUTH-007: Biometric Authentication
**As a** user with a device that supports biometrics,
**I want** to use fingerprint/Face ID to unlock the app,
**so that** I can access it faster without typing a PIN.

**Priority:** Medium

**Acceptance Criteria:**
Given I am on the PIN lock screen
When I tap the fingerprint icon
Then the device's biometric prompt is shown
And on success, I am navigated to the dashboard

---

### US-AUTH-008: Switch Account from PIN Lock
**As a** user who wants to log into a different account,
**I want** to switch accounts from the PIN lock screen,
**so that** I don't need to navigate back manually.

**Priority:** Low

**Acceptance Criteria:**
Given I am on the PIN lock screen
When I tap "Switch Account"
Then I am navigated back to the login screen

---

### US-AUTH-009: Forgot Password
**As a** user who forgot their password,
**I want** to initiate a password reset,
**so that** I can regain access to my account.

**Priority:** High

**Acceptance Criteria:**
Given I am on the login screen
When I tap "Forgot Password?"
Then I am taken to a password reset flow (email OTP or link)

---

### US-AUTH-010: Logout
**As a** user,
**I want** to log out of my account,
**so that** my session is securely terminated.

**Priority:** High

**Acceptance Criteria:**
Given I am logged in
When I navigate to Profile and tap "Log Out"
Then I am navigated to the login screen
And my session data is cleared

---

## Module: Crypto Trading

### US-TRADE-001: View Live Crypto Rates
**As a** trader,
**I want** to see a scrolling ticker of live crypto-to-NGN rates,
**so that** I can make informed trading decisions.

**Priority:** High

**Acceptance Criteria:**
Given I am on the dashboard
When I view the "Today's Rates" section
Then I see a horizontally scrolling ticker with BTC, ETH, USDT, USDC, SOL, BNB, TRX
And each rate shows the price in NGN and 24h change percentage

---

### US-TRADE-002: Deposit Crypto
**As a** user,
**I want** to get a deposit address for my crypto,
**so that** I can receive crypto into my DeeX wallet.

**Priority:** High

**Acceptance Criteria:**
Given I tap "Deposit" from the dashboard
When I select a cryptocurrency
Then I see a QR code, wallet address, and network selector
And I can copy the address to clipboard
And I see a warning about sending only the correct crypto on the correct network

---

### US-TRADE-003: Sell Crypto from DeeX Wallet
**As a** user with crypto in my DeeX wallet,
**I want** to sell it and receive NGN in my bank account,
**so that** I can cash out my crypto holdings.

**Priority:** High

**Acceptance Criteria:**
Given I tap "Sell" and select "DeeX Wallet"
When I select an asset, enter an amount, and choose a destination bank
Then I see a review page with the NGN equivalent
And after confirmation, I see an "Awaiting Deposit" status page

---

### US-TRADE-004: Sell Crypto from External Wallet
**As a** user without crypto in DeeX,
**I want** to send crypto from an external wallet and get paid in NGN,
**so that** I can trade without pre-funding my DeeX wallet.

**Priority:** High

**Acceptance Criteria:**
Given I tap "Sell" and select "External Wallet"
When I select an asset, network, and destination bank
Then I see a deposit address and QR code
And I am told to send any amount and will be paid based on what is received

---

### US-TRADE-005: Swap Crypto Assets
**As a** user,
**I want** to swap one crypto for another within my wallet,
**so that** I can rebalance my portfolio without cashing out.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to the Swap screen
When I select from/to assets and enter an amount
Then I see the estimated output amount, exchange rate, and 0.5% fee
And after confirmation, I see a success screen

---

### US-TRADE-006: Withdraw Crypto to External Wallet
**As a** user,
**I want** to withdraw crypto from my DeeX wallet to an external address,
**so that** I can move my crypto elsewhere.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to the Withdraw screen
When I select an asset, enter a wallet address, network, and amount
Then I see a confirmation page with network fee
And I must enter my PIN to confirm the withdrawal

---

### US-TRADE-007: Send Money to Bank Account
**As a** user,
**I want** to send NGN from my crypto wallet to any Nigerian bank account,
**so that** I can transfer funds easily.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to the Send Money screen
When I enter account number, select bank, choose wallet source, and enter amount
Then I see a daily limit tracker
And I cannot exceed the ₦50,000 daily limit

---

### US-TRADE-008: View Asset Details
**As a** user,
**I want** to tap on any asset in my wallet to see its details,
**so that** I can view balance and perform actions on it.

**Priority:** Medium

**Acceptance Criteria:**
Given I tap on an asset in the Wallet page
When I am on the Asset Detail page
Then I see my balance, current rate, and action buttons (Deposit, Sell, Swap, Withdraw)

---

### US-TRADE-009: View Wallet Balance with Privacy Toggle
**As a** user,
**I want** to toggle visibility of my wallet balance,
**so that** I can hide it from onlookers in public.

**Priority:** Medium

**Acceptance Criteria:**
Given I am on the Wallet or Dashboard page
When I tap the eye icon
Then my balance is masked with "••••••"
And tapping again reveals the balance

---

### US-TRADE-010: View Transaction Receipt
**As a** user,
**I want** to view a receipt for any completed transaction,
**so that** I have proof of the transaction.

**Priority:** Medium

**Acceptance Criteria:**
Given I tap on a transaction from Activity
When I am on the Receipt page
Then I see transaction details including type, amount, date, status, and hash ID

---

## Module: Gift Cards

### US-GC-001: Browse Gift Card Brands
**As a** user who wants to sell a gift card,
**I want** to browse available gift card brands with their rates,
**so that** I can choose which card to sell.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to the Gift Cards page
When I view the brand grid
Then I see all enabled brands (Apple, Google Play, Amazon, Steam, etc.) with their best rates

---

### US-GC-002: Configure Gift Card Details
**As a** user selling a gift card,
**I want** to select the country, card type, and value,
**so that** the system can calculate my payout.

**Priority:** High

**Acceptance Criteria:**
Given I select a brand
When I choose country, card type, and enter a value
Then I see the applicable rate tier and calculated NGN payout

---

### US-GC-003: Upload Gift Card or Enter Code
**As a** user selling a gift card,
**I want** to either upload an image of the card or enter the card code,
**so that** the admin can verify and process my trade.

**Priority:** High

**Acceptance Criteria:**
Given I am on the upload step
When I tap the upload area or enter a card code
Then the system records my submission
And I can proceed to review

---

### US-GC-004: Submit Gift Card Trade
**As a** user,
**I want** to review and submit my gift card trade,
**so that** the admin can process it and credit my account.

**Priority:** High

**Acceptance Criteria:**
Given I am on the review page
When I confirm the trade details and tap "Submit Trade"
Then the order is saved to localStorage
And I see a "Trade Submitted" status page with estimated processing time

---

## Module: Bill Payments

### US-BILL-001: Buy Airtime
**As a** user,
**I want** to buy airtime for any Nigerian network,
**so that** I can top up my phone or someone else's.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Bills → Airtime
When I select a provider (MTN, Glo, Airtel, 9mobile), enter phone number and amount
Then I see a review page and can confirm the purchase

---

### US-BILL-002: Buy Data Plan
**As a** user,
**I want** to buy a mobile data plan,
**so that** I can get internet access.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Bills → Data
When I select a provider, choose a plan, and enter phone number
Then I see a review page and can confirm

---

### US-BILL-003: Pay Electricity Bill
**As a** user,
**I want** to pay my electricity bill,
**so that** I can keep my power supply active.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Bills → Electricity
When I select a Disco (IKEDC, EKEDC, AEDC, PHED, BEDC), enter meter number and amount
Then I see a review page and can confirm

---

### US-BILL-004: Fund Betting Account
**As a** user,
**I want** to fund my betting account,
**so that** I can place bets.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Bills → Betting
When I select a provider (Bet9ja, SportyBet, 1xBet, BetKing, MSport), enter user ID and amount
Then I see a review page and can confirm

---

### US-BILL-005: Use Beneficiaries for Quick Payment
**As a** frequent bill payer,
**I want** to select from my recent beneficiaries,
**so that** I don't have to re-enter details each time.

**Priority:** Medium

**Acceptance Criteria:**
Given I am on a bill payment form
When I view the beneficiaries section
Then I see recent phone numbers/meter IDs with labels
And tapping one auto-fills the form

---

## Module: DeeX Pay

### US-PAY-001: Pay Merchant
**As a** user,
**I want** to pay a merchant using their ID, QR code, or payment link,
**so that** I can make in-store or online payments.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to DeeX Pay → Pay Merchant
When I enter a merchant ID, scan a QR, or paste a link
Then I can select which crypto to pay with and enter the amount

---

### US-PAY-002: Send Cash to Bank
**As a** user,
**I want** to convert my crypto and send NGN to any bank account,
**so that** I can pay someone who doesn't use crypto.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to DeeX Pay → Send Cash
When I select a wallet source, bank, account number, and amount
Then I see my daily limit tracker (₦100k/day)
And I cannot exceed the remaining limit

---

### US-PAY-003: Generate Payment Link
**As a** user or merchant,
**I want** to generate a shareable payment link,
**so that** I can receive crypto payments from anyone.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to DeeX Pay → Generate Link
When I enter an amount in USD and optional description
Then a unique payment link is generated
And I can copy and share it

---

## Module: Virtual Cards

### US-VC-001: Create Virtual Card
**As a** user with KYC Level 2+,
**I want** to create a Visa virtual card,
**so that** I can make online payments internationally.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Virtual Cards
When I tap "Create New Card"
Then I enter a label and the $2 creation fee is deducted from my selected wallet
And a new card is created with a random 4-digit last number

---

### US-VC-002: Fund Virtual Card
**As a** cardholder,
**I want** to add funds to my virtual card from my crypto wallet,
**so that** I can use it for purchases.

**Priority:** High

**Acceptance Criteria:**
Given I select a card and tap "Fund"
When I enter an amount in USD and select a source wallet
Then the card balance is updated

---

### US-VC-003: Freeze/Unfreeze Card
**As a** cardholder,
**I want** to freeze my card temporarily,
**so that** no unauthorized transactions can occur.

**Priority:** High

**Acceptance Criteria:**
Given I view a card
When I tap "Freeze"
Then the card status changes to "Frozen" and an overlay appears on the card visual
And tapping "Unfreeze" restores it to active

---

### US-VC-004: View Card Details
**As a** cardholder,
**I want** to view my full card number, expiry, and CVV,
**so that** I can use the card for online payments.

**Priority:** High

**Acceptance Criteria:**
Given I view a card
When I tap the eye icon
Then the full card number, expiry date, and CVV are revealed
And I can copy the card number

---

### US-VC-005: Manage Spending Limits
**As a** cardholder,
**I want** to set daily and monthly spending limits on my card,
**so that** I can control my spending.

**Priority:** Medium

**Acceptance Criteria:**
Given I view a card and tap "Limits"
When I enter new daily and monthly limits
Then the limits are saved and displayed on the card detail page

---

## Module: Rewards & Referrals

### US-REW-001: View DeeXPoints Balance
**As a** user,
**I want** to see my DeeXPoints balance and its NGN value,
**so that** I know how much I've earned.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Rewards
When I view the DeeXPoints card
Then I see my points balance and the equivalent NGN value (1pt = ₦10)

---

### US-REW-002: Redeem Points for Cash
**As a** user with sufficient points,
**I want** to redeem my points for NGN cash,
**so that** I can withdraw my rewards.

**Priority:** High

**Acceptance Criteria:**
Given I have at least 500 points
When I navigate to Redeem and enter an amount
Then I see the cash value and confirm the redemption
And the redemption is submitted for admin approval

---

### US-REW-003: View Referral Dashboard
**As a** user,
**I want** to see my referral stats, link, and list of referred users,
**so that** I can track my referral earnings.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Referrals
When I view the dashboard
Then I see total referrals, earned amount, pending amount, my referral link, and a list of referred users

---

### US-REW-004: View Leaderboard
**As a** competitive user,
**I want** to see the referral leaderboard,
**so that** I can see how I rank against others.

**Priority:** Low

**Acceptance Criteria:**
Given I view the Referrals page
When I scroll to the Leaderboard section
Then I see the top referrers ranked by number of referrals

---

### US-REW-005: Track Trade Streak
**As a** daily trader,
**I want** to see my trade streak and milestone progress,
**so that** I can maximize my streak bonus points.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Trade Streak
When I view the overview
Then I see my current streak, longest streak, multiplier, and points earned
And I see a weekly calendar with fire icons for completed days

---

### US-REW-006: View Earnings Log
**As a** user,
**I want** to see a detailed log of how I earned each point,
**so that** I can track my reward sources.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Rewards → Earnings Log
When I view the list
Then I see each earning entry with source, category, points, and date

---

## Module: KYC Verification

### US-KYC-001: View KYC Overview
**As a** user,
**I want** to see my current KYC status and available levels,
**so that** I know what I need to do to increase my limits.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to KYC Verification
When I view the overview
Then I see my current trading/withdrawal limits, progress bar, and all 3 KYC levels with their requirements

---

### US-KYC-002: Submit KYC Level 1
**As a** new user,
**I want** to submit my BVN and complete a liveness check,
**so that** I can unlock basic trading ($1,000 limit).

**Priority:** High

**Acceptance Criteria:**
Given I tap on KYC Level 1
When I enter my 11-digit BVN and complete the selfie liveness check
Then my submission is sent for review

---

### US-KYC-003: Submit KYC Level 2
**As a** user with Level 1,
**I want** to upload my government ID and proof of address,
**so that** I can increase my limits to $10,000 trading.

**Priority:** High

**Acceptance Criteria:**
Given I tap on KYC Level 2
When I upload a government ID and proof of address document
Then my submission is sent for review

---

### US-KYC-004: Submit KYC Level 3
**As a** user with Level 2,
**I want** to submit employment docs, source of income, and risk questionnaire,
**so that** I can unlock the highest limits ($25,000 trading).

**Priority:** High

**Acceptance Criteria:**
Given I tap on KYC Level 3
When I upload employment docs, select income source, complete the risk questionnaire, and have 2FA enabled
Then my submission is sent for review

---

## Module: Notifications

### US-NOTIF-001: View Notifications
**As a** user,
**I want** to see all my notifications in one place,
**so that** I stay informed about my account.

**Priority:** High

**Acceptance Criteria:**
Given I tap the notification bell
When I view the notifications page
Then I see login alerts, session terminations, and promotional messages with timestamps

---

### US-NOTIF-002: Receive Login Alerts
**As a** security-conscious user,
**I want** to be notified whenever I log in,
**so that** I can detect unauthorized access.

**Priority:** High

**Acceptance Criteria:**
Given I log into my account
When the login is successful
Then a login notification is created with device and time info

---

### US-NOTIF-003: Receive Session Termination Alerts
**As a** user,
**I want** to be notified when my previous session is terminated,
**so that** I know if someone else logged into my account.

**Priority:** High

**Acceptance Criteria:**
Given I log in from a new device
When my previous session is terminated
Then I receive a session termination notification

---

## Module: Settings & Security

### US-SET-001: Change PIN
**As a** user,
**I want** to change my 4-digit PIN,
**so that** I can maintain account security.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Security settings
When I tap "Change PIN"
Then I am prompted to enter my current PIN and a new PIN

---

### US-SET-002: Toggle Biometric Login
**As a** user,
**I want** to enable or disable biometric login,
**so that** I can choose how I authenticate.

**Priority:** Medium

**Acceptance Criteria:**
Given I am in Security settings
When I toggle "Biometric Login"
Then the setting is saved and reflected in the UI

---

### US-SET-003: Toggle Two-Factor Authentication
**As a** security-conscious user,
**I want** to enable 2FA on my account,
**so that** my account has an extra layer of protection.

**Priority:** High

**Acceptance Criteria:**
Given I am in Security settings
When I toggle "Two-Factor Auth"
Then I am guided through the 2FA setup process

---

### US-SET-004: View Active Sessions
**As a** user,
**I want** to see all my active sessions,
**so that** I can detect and terminate unauthorized access.

**Priority:** High

**Acceptance Criteria:**
Given I view the Active Sessions section
When I see my sessions listed
Then each shows device, location, and time
And I can terminate non-current sessions

---

### US-SET-005: View Login History
**As a** user,
**I want** to see my recent login attempts,
**so that** I can spot any suspicious activity.

**Priority:** Medium

**Acceptance Criteria:**
Given I view the Login History section
When I see the list
Then each entry shows device, date, time, and success/failure status

---

### US-SET-006: Manage Bank Accounts
**As a** user,
**I want** to manage my linked bank accounts,
**so that** I can receive payouts to the right account.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Manage Beneficiaries
When I view my linked accounts
Then I can add, edit, or remove bank accounts

---

### US-SET-007: Generate Account Statement
**As a** user,
**I want** to generate a statement of my transactions,
**so that** I can use it for record-keeping or tax purposes.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Generate Statement
When I select a date range
Then a statement is generated with all my transactions

---

### US-SET-008: Access Help & Support
**As a** user who needs help,
**I want** to contact support through multiple channels,
**so that** I can get my issues resolved.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Help & Support
When I view the contact options
Then I see Live Chat, Email (support@deex.app), and WhatsApp (+234 810 367 4006)
And I can also browse FAQs

---

## Module: Admin Dashboard

### US-ADM-001: View Admin Dashboard Overview
**As an** admin,
**I want** to see key platform metrics at a glance,
**so that** I can monitor platform health.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to the Admin Dashboard
When I view the overview
Then I see total payout, active users, total customers, merchants, and performance charts

---

### US-ADM-002: Manage User Accounts
**As an** admin,
**I want** to view and search all users,
**so that** I can manage customer accounts.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Admin → Users
When I view the customer list
Then I can search by name/email, filter by status, and click into user details

---

### US-ADM-003: Approve/Reject KYC
**As an** admin,
**I want** to review and approve or reject KYC submissions,
**so that** I can verify user identities and set appropriate limits.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Admin → KYC
When I view pending submissions
Then I can approve (updating limits) or reject (with reason) each submission

---

### US-ADM-004: Monitor Compliance Alerts
**As an** admin,
**I want** to view and act on compliance alerts,
**so that** I can prevent fraud and maintain regulatory compliance.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Admin → Compliance
When I view alerts
Then I can filter by severity/status, view detailed timelines, approve/dismiss, or suspend users

---

### US-ADM-005: Configure Compliance Rules
**As an** admin,
**I want** to configure auto-suspension rules,
**so that** the system can automatically flag suspicious activity.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Compliance → Rules Engine
When I view the rules list
Then I can toggle rules on/off and see thresholds, last triggered date, and trigger counts

---

### US-ADM-006: Manage Gift Card Orders
**As an** admin,
**I want** to approve or reject gift card trade orders,
**so that** I can verify card validity before crediting users.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Admin → Gift Cards
When I view pending orders
Then I can view card images/codes, approve (crediting the user), or reject with notes

---

### US-ADM-007: Manage Gift Card Brands & Rates
**As an** admin,
**I want** to configure gift card brands and their rate tiers,
**so that** I can control which cards are accepted and at what rates.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Gift Cards → Brands & Rates
When I view the brand list
Then I can enable/disable brands, edit rate tiers per country, and add new brands

---

### US-ADM-008: Monitor Wallets
**As an** admin,
**I want** to view DeeX and customer wallet balances and activity,
**so that** I can monitor fund flows.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Admin → Wallets
When I toggle between DeeX and Customer wallets
Then I see total crypto, asset breakdowns, trade volume charts, and activity logs

---

### US-ADM-009: View Audit Log
**As an** admin,
**I want** to see a log of all admin actions,
**so that** I can maintain accountability and compliance.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Admin → Audit Log
When I view the log
Then I see each action with admin name, action type, target, details, and timestamp

---

### US-ADM-010: Manage Rewards Configuration
**As an** admin,
**I want** to configure reward rules and approve redemptions,
**so that** I can control the rewards program.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Admin → Rewards
When I view the config tab
Then I can see and edit reward triggers and amounts
And in the payouts tab, I can approve or reject redemption requests

---

### US-ADM-011: Manage Influencers
**As an** admin,
**I want** to appoint and manage influencers with custom profit-share,
**so that** I can run a special referral program.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Rewards → Influencers
When I view the influencer list
Then I can appoint new influencers, edit their profit-share %, and pause/remove them

---

### US-ADM-012: View Reports
**As an** admin,
**I want** to view platform reports,
**so that** I can analyze performance and make data-driven decisions.

**Priority:** Medium

**Acceptance Criteria:**
Given I navigate to Admin → Reports
When I select a report type
Then I see charts and metrics for Revenue, Growth, Retention, Website, Happiness, or Survey

---

### US-ADM-013: Configure Platform Fees
**As an** admin,
**I want** to configure platform fees,
**so that** I can control DeeX's revenue.

**Priority:** High

**Acceptance Criteria:**
Given I navigate to Settings → Fees
When I view the fee list
Then I can see and edit Crypto Trade Fee, Gift Card Fee, Withdrawal Fee, and DeeX Pay Fee

---

### US-ADM-014: Manage Payroll
**As an** admin,
**I want** to manage staff payroll,
**so that** I can track employee compensation.

**Priority:** Low

**Acceptance Criteria:**
Given I navigate to Settings → Payroll
When I view the staff list
Then I can see each staff member's name, email, role, salary, and date created
And I can add or remove staff

---
