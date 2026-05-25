# DeeX — QA Test Cases

## Smoke Test Suite (Top 20 Critical Tests)

| # | Test Case | Module | Priority | Status |
|---|-----------|--------|----------|--------|
| 1 | TC-AUTH-001: Onboarding completes and navigates to login | Auth | High | ⬜ Pending |
| 2 | TC-AUTH-003: Login navigates to PIN lock | Auth | High | ⬜ Pending |
| 3 | TC-AUTH-005: Correct PIN unlocks to dashboard | Auth | High | ⬜ Pending |
| 4 | TC-AUTH-005: Incorrect PIN shows error | Auth | High | ⬜ Pending |
| 5 | TC-TRADE-001: Dashboard shows crypto rates ticker | Trading | High | ⬜ Pending |
| 6 | TC-TRADE-002: Deposit shows QR and address | Trading | High | ⬜ Pending |
| 7 | TC-TRADE-003: Sell from wallet flow completes | Trading | High | ⬜ Pending |
| 8 | TC-TRADE-005: Swap calculates output correctly | Trading | High | ⬜ Pending |
| 9 | TC-GC-001: Gift card brands display with rates | Gift Cards | High | ⬜ Pending |
| 10 | TC-GC-004: Gift card trade submits successfully | Gift Cards | High | ⬜ Pending |
| 11 | TC-BILL-001: Airtime purchase flow completes | Bill Pay | High | ⬜ Pending |
| 12 | TC-PAY-001: Pay merchant flow navigates correctly | DeeX Pay | High | ⬜ Pending |
| 13 | TC-VC-001: Virtual card creation works | Virtual Cards | High | ⬜ Pending |
| 14 | TC-REW-001: Rewards page shows points balance | Rewards | High | ⬜ Pending |
| 15 | TC-KYC-001: KYC overview displays all levels | KYC | High | ⬜ Pending |
| 16 | TC-ADM-001: Admin dashboard loads with metrics | Admin | High | ⬜ Pending |
| 17 | TC-ADM-003: KYC approve/reject works | Admin | High | ⬜ Pending |
| 18 | TC-ADM-006: Gift card order approval works | Admin | High | ⬜ Pending |
| 19 | TC-SEC-001: PIN brute force does not allow access | Security | High | ⬜ Pending |
| 20 | TC-NAV-001: Bottom navigation switches pages | Navigation | High | ⬜ Pending |

---

## Authentication Test Cases

### TC-AUTH-001: Onboarding Flow Completes
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | `deex_onboarded` not set in localStorage |
| **Test Steps** | 1. Open app at root URL<br>2. Verify redirected to /onboarding<br>3. Verify 3 slides display<br>4. Tap "Next" twice<br>5. Tap "Get Started" |
| **Expected Result** | `deex_onboarded` = "1" in localStorage, navigated to /login |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-002: Skip Onboarding
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On first slide of onboarding |
| **Test Steps** | 1. Tap "Skip" button<br>2. Verify navigation |
| **Expected Result** | `deex_onboarded` = "1" in localStorage, navigated to /login |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-003: Login Navigation
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Onboarding completed |
| **Test Steps** | 1. Navigate to /login<br>2. Enter any email<br>3. Enter any password<br>4. Tap "Log In" |
| **Expected Result** | Navigated to /pin (PIN lock screen) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-004: Signup Navigation
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /login page |
| **Test Steps** | 1. Tap "Sign Up"<br>2. Verify /signup loads<br>3. Tap "Create Account" |
| **Expected Result** | Navigated to /dashboard |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-005: Correct PIN Entry
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /pin screen |
| **Test Steps** | 1. Enter "1234" on PIN keypad<br>2. Wait 300ms |
| **Expected Result** | Navigated to /dashboard |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-006: Incorrect PIN Entry
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /pin screen |
| **Test Steps** | 1. Enter "0000" on PIN keypad<br>2. Wait 300ms |
| **Expected Result** | Error message "Incorrect PIN. Try again." displayed, PIN dots reset |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-007: PIN Delete Button
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On /pin screen, entered 2 digits |
| **Test Steps** | 1. Tap delete button |
| **Expected Result** | Last digit removed, 1 dot filled |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-008: Switch Account from PIN
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Low |
| **Type** | Functional |
| **Preconditions** | On /pin screen |
| **Test Steps** | 1. Tap "Switch Account" |
| **Expected Result** | Navigated to /login |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-009: Social Login Buttons Render
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /login or /signup |
| **Test Steps** | 1. Verify Google button renders<br>2. Verify Apple button renders<br>3. Tap Google button |
| **Expected Result** | Buttons render correctly; tap does nothing (no backend integration yet) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-010: Logout Flow
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Logged in, on any page |
| **Test Steps** | 1. Navigate to /profile<br>2. Tap "Log Out" |
| **Expected Result** | Navigated to /login |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-011: Forgot Password Link
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On /login |
| **Test Steps** | 1. Tap "Forgot Password?" |
| **Expected Result** | Navigation triggered (page may not exist yet — expected gap) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-012: Biometric Button Renders
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Low |
| **Type** | UI |
| **Preconditions** | On /pin screen |
| **Test Steps** | 1. Verify fingerprint icon renders in keypad |
| **Expected Result** | Fingerprint icon visible in bottom-left of keypad grid |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-013: Onboarding Already Completed
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | `deex_onboarded` = "1" in localStorage |
| **Test Steps** | 1. Open app at root URL |
| **Expected Result** | Redirected to /login (not /onboarding) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-014: PIN Keypad Overflow Protection
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Medium |
| **Type** | Edge |
| **Preconditions** | On /pin screen, already entered 4 digits |
| **Test Steps** | 1. Tap additional digit |
| **Expected Result** | No additional digits accepted (pin.length >= 4 guard) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-AUTH-015: Default PIN Hint Display
| Field | Value |
|-------|-------|
| **Module** | Authentication |
| **Priority** | Low |
| **Type** | UI |
| **Preconditions** | On /pin screen, no error |
| **Test Steps** | 1. Verify "Default PIN: 1234" text is visible |
| **Expected Result** | Hint text visible below PIN dots |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Crypto Trading Test Cases

### TC-TRADE-001: Dashboard Crypto Rates Ticker
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On /dashboard |
| **Test Steps** | 1. Scroll to "Today's Rates" section<br>2. Verify ticker auto-scrolls |
| **Expected Result** | Ticker shows BTC, ETH, USDT, USDC, SOL, BNB, TRX with rates and change % |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-002: Deposit Crypto Selection
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /dashboard, tap "Deposit" |
| **Test Steps** | 1. Verify /deposit loads<br>2. Verify BTC, ETH, USDT, USDC, SOL listed<br>3. Tap USDT |
| **Expected Result** | Navigated to address view for USDT |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-003: Deposit Address Display
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On deposit address view for selected crypto |
| **Test Steps** | 1. Verify QR code placeholder displays<br>2. Verify wallet address displays<br>3. Verify network selector shows |
| **Expected Result** | QR code, address, and network selector all visible |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-004: Deposit Copy Address
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On deposit address view |
| **Test Steps** | 1. Tap copy button<br>2. Wait 2 seconds |
| **Expected Result** | Address copied to clipboard, checkmark icon shown temporarily |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-005: Deposit Network Switch
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On deposit address view for USDT |
| **Test Steps** | 1. Tap network dropdown<br>2. Select TRC-20 |
| **Expected Result** | Network selector updates to TRC-20, dropdown closes |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-006: Deposit Warning Display
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On deposit address view |
| **Test Steps** | 1. Scroll to warning section |
| **Expected Result** | Warning about sending only correct crypto on correct network is visible |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-007: Sell from Wallet Flow
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /dashboard, tap "Sell" |
| **Test Steps** | 1. Select "DeeX Wallet"<br>2. Select asset (USDT)<br>3. Select bank (PalmPay)<br>4. Select network (BEP-20)<br>5. Enter amount "100"<br>6. Tap "Proceed" |
| **Expected Result** | NGN calculation shows ₦153,500, navigated to review page |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-008: Sell from External Wallet
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /sell-crypto |
| **Test Steps** | 1. Select "External Wallet"<br>2. Select asset, bank, network<br>3. Verify deposit address shown |
| **Expected Result** | Deposit address, QR code, and "I've Sent the Crypto" button shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-009: Sell Amount Calculation
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On sell form, USDT selected |
| **Test Steps** | 1. Enter "50" in amount field |
| **Expected Result** | NGN equivalent shows ₦76,750 (50 × 1,535) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-010: Sell Review Page
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On sell form, entered amount |
| **Test Steps** | 1. Tap "Proceed" |
| **Expected Result** | Review page shows asset, network, amount, destination, rate, and NGN amount |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-011: Sell Pending State
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On sell review, tap "Proceed to Deposit" then "I've Sent the Crypto" |
| **Test Steps** | 1. Verify pending state page |
| **Expected Result** | "Awaiting Deposit" page with Clock icon and "Back to Home" button |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-012: Swap Asset Selection
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /swap-crypto |
| **Test Steps** | 1. Tap "From" asset selector<br>2. Select ETH<br>3. Tap "To" asset selector<br>4. Select USDT |
| **Expected Result** | From shows ETH, To shows USDT, swap button visible between them |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-013: Swap Amount Calculation
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /swap-crypto, From=BTC (rate 97450), To=USDT (rate 1) |
| **Test Steps** | 1. Enter "0.01" in From amount |
| **Expected Result** | To amount shows 974.50 USDT, fee shows 0.000050 BTC (0.5%) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-014: Swap Confirmation
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /swap-crypto, entered amount > 0 |
| **Test Steps** | 1. Tap "Preview Swap"<br>2. Verify confirmation page |
| **Expected Result** | Shows From, To, Rate, Fee (0.5%), You Receive, and "Swap Now" button |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-015: Swap Success
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On swap confirmation page |
| **Test Steps** | 1. Tap "Swap Now" |
| **Expected Result** | Success page with "Swap Successful!" and "Back to Wallet" button |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-016: Withdraw Address Input
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /withdraw, selected BTC |
| **Test Steps** | 1. Enter wallet address<br>2. Select network<br>3. Enter amount |
| **Expected Result** | All fields populated, "Preview Withdrawal" button enabled |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-017: Withdraw PIN Confirmation
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On withdraw confirmation, tap "Confirm Withdrawal" |
| **Test Steps** | 1. Enter correct PIN "1234" |
| **Expected Result** | Withdrawal submitted, success page shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-018: Send Money Daily Limit
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /send-money |
| **Test Steps** | 1. Verify daily limit banner shows ₦50,000<br>2. Enter amount > 50000 |
| **Expected Result** | Daily limit tracker visible; no explicit validation on amount input (gap) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-019: Asset Detail Navigation
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On /wallet |
| **Test Steps** | 1. Tap on BTC asset |
| **Expected Result** | Navigated to /asset/btc |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-TRADE-020: Balance Privacy Toggle
| Field | Value |
|-------|-------|
| **Module** | Crypto Trading |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /wallet or /dashboard |
| **Test Steps** | 1. Tap eye icon<br>2. Verify balance masked<br>3. Tap again |
| **Expected Result** | Balance toggles between visible and "••••••" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Gift Cards Test Cases

### TC-GC-001: Brand Grid Display
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On /giftcards |
| **Test Steps** | 1. Verify brand grid displays |
| **Expected Result** | Apple, Google Play, Amazon, Steam, iTunes, Walmart, Nike, Sephora shown with rates |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-002: Country Selection
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Selected Apple brand |
| **Test Steps** | 1. Tap USA, UK, Canada, EU country pills |
| **Expected Result** | Selected country highlighted, rate tiers update |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-003: Card Type Selection
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On card type step |
| **Test Steps** | 1. Toggle between "Physical Card" and "E-Code" |
| **Expected Result** | Selected type highlighted |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-004: Value Input with Quick Denominations
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On value step |
| **Test Steps** | 1. Tap "$100" quick button<br>2. Verify rate and payout calculated |
| **Expected Result** | Value set to 100, rate and NGN payout displayed correctly |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-005: Card Image Upload
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On upload step |
| **Test Steps** | 1. Tap upload area |
| **Expected Result** | "Image uploaded" confirmation shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-006: Card Code Input
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On upload step |
| **Test Steps** | 1. Enter card code in text field |
| **Expected Result** | Code stored, can proceed to review |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-007: Review Accuracy
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On review step |
| **Test Steps** | 1. Verify all details match input |
| **Expected Result** | Brand, country, type, value, rate, and payout all correct |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-008: Trade Submission to localStorage
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | Integration |
| **Preconditions** | On review step, tap "Submit Trade" |
| **Test Steps** | 1. Tap "Submit Trade"<br>2. Check localStorage for deex_gc_orders |
| **Expected Result** | Order saved to localStorage, status page shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-009: Status Page Display
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | After submitting trade |
| **Test Steps** | 1. Verify status page |
| **Expected Result** | "Trade Submitted!" with Clock icon, trade summary, "Notified Admin" badge |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-010: Receipt Navigation
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On status page |
| **Test Steps** | 1. Tap "View Receipt" |
| **Expected Result** | Navigated to /receipt with giftcard data |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-011: Back Navigation Between Steps
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On any step after brand selection |
| **Test Steps** | 1. Tap back button |
| **Expected Result** | Returns to previous step in flow |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-GC-012: Rate Tier Display
| Field | Value |
|-------|-------|
| **Module** | Gift Cards |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On card type step |
| **Test Steps** | 1. Scroll to rate tiers section |
| **Expected Result** | Rate tiers for selected country displayed (min-max → rate) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Bill Payments Test Cases

### TC-BILL-001: Airtime Purchase Flow
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Navigate to /bills/airtime |
| **Test Steps** | 1. Select MTN provider<br>2. Enter phone number<br>3. Enter amount<br>4. Tap "Continue"<br>5. Review and "Pay Now" |
| **Expected Result** | Success page with CheckCircle icon |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-002: Data Plan Selection
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Navigate to /bills/data |
| **Test Steps** | 1. Select provider<br>2. Select data plan (e.g., "2GB - ₦1,000")<br>3. Enter phone number |
| **Expected Result** | Plan selected and highlighted, form complete |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-003: Electricity Meter Input
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Navigate to /bills/electricity |
| **Test Steps** | 1. Select IKEDC<br>2. Enter meter number<br>3. Enter amount |
| **Expected Result** | Form fields populated, can proceed to review |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-004: Betting Account Funding
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | Navigate to /bills/betting |
| **Test Steps** | 1. Select Bet9ja<br>2. Enter user ID<br>3. Enter amount |
| **Expected Result** | Form complete, can proceed |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-005: Beneficiary Quick Select
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On airtime form |
| **Test Steps** | 1. Tap a beneficiary chip |
| **Expected Result** | Phone number auto-filled |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-006: Provider Grid Display
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On any bill type page, provider step |
| **Test Steps** | 1. Verify provider grid |
| **Expected Result** | 2-column grid of providers with icons |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-007: Form Validation
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On bill form with empty fields |
| **Test Steps** | 1. Tap "Continue" without filling required fields |
| **Expected Result** | No explicit validation (gap — should validate) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-008: Review Page Accuracy
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On review step |
| **Test Steps** | 1. Verify all fields match input |
| **Expected Result** | Service, provider, plan, and form data all correct |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-009: Success Page
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | After confirming payment |
| **Test Steps** | 1. Verify success page |
| **Expected Result** | CheckCircle icon, "Payment Successful!", service name, amount, "View Receipt" and "Back to Home" buttons |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-BILL-010: Receipt Navigation
| Field | Value |
|-------|-------|
| **Module** | Bill Payments |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On success page |
| **Test Steps** | 1. Tap "View Receipt" |
| **Expected Result** | Navigated to /receipt with bill payment data |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## DeeX Pay Test Cases

### TC-PAY-001: Pay Merchant Flow
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /deex-pay |
| **Test Steps** | 1. Tap "Pay Merchant"<br>2. Enter merchant ID<br>3. Tap "Continue" |
| **Expected Result** | Crypto selection page shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-002: QR Scan Button
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On pay merchant step |
| **Test Steps** | 1. Verify "Scan QR Code" button visible |
| **Expected Result** | Button renders (non-functional without camera integration) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-003: Send Cash Form
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /deex-pay, tap "Send Cash to Bank" |
| **Test Steps** | 1. Select wallet source<br>2. Select bank<br>3. Enter account number<br>4. Enter amount |
| **Expected Result** | All fields populated, daily limit tracker visible |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-004: Daily Limit Display
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On send cash form |
| **Test Steps** | 1. Verify daily limit banner |
| **Expected Result** | Shows "Daily limit: ₦100,000" with progress bar and "₦35,000 used" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-005: Payment Link Generation
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On /deex-pay, tap "Generate Payment Link" |
| **Test Steps** | 1. Enter amount<br>2. Enter description (optional)<br>3. Tap "Generate Link" |
| **Expected Result** | Generated link displayed with copy button |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-006: Link Copy
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | Link generated |
| **Test Steps** | 1. Tap copy button |
| **Expected Result** | Link copied, checkmark shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-007: Exceeds Daily Limit Warning
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On send cash form, remaining limit ₦65,000 |
| **Test Steps** | 1. Enter amount > 65000 |
| **Expected Result** | Warning "Exceeds remaining daily limit" shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-008: Merchant Payment Success
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On merchant payment review |
| **Test Steps** | 1. Tap "Pay Now" |
| **Expected Result** | Success page with "Payment Sent!" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-009: Send Cash Success
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On send cash review |
| **Test Steps** | 1. Tap "Send Now" |
| **Expected Result** | Success page with "Transfer Sent!" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-PAY-010: Back Navigation in DeeX Pay
| Field | Value |
|-------|-------|
| **Module** | DeeX Pay |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On any DeeX Pay sub-page |
| **Test Steps** | 1. Tap back button |
| **Expected Result** | Returns to previous step or home |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Virtual Cards Test Cases

### TC-VC-001: Card List Display
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On /virtual-cards |
| **Test Steps** | 1. Verify card list |
| **Expected Result** | Shopping Card ($245.80) and Subscriptions ($52.10, Frozen) displayed |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-002: KYC Gate Check
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Mock kycLevel = 1 (below required Level 2) |
| **Test Steps** | 1. Verify KYC warning banner shown |
| **Expected Result** | Warning "KYC Level 2 Required" with link to complete KYC |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-003: Card Creation
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /virtual-cards, kycLevel >= 2 |
| **Test Steps** | 1. Tap "Create New Card ($2)"<br>2. Enter label<br>3. Select funding source<br>4. Tap "Create Card" |
| **Expected Result** | New card added to list with random last4, toast "Virtual card created!" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-004: Card Funding
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On card detail, tap "Fund" |
| **Test Steps** | 1. Enter amount<br>2. Select source wallet<br>3. Tap "Fund Card" |
| **Expected Result** | Toast "funded to card", returned to detail |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-005: Freeze/Unfreeze Toggle
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On card detail, card is active |
| **Test Steps** | 1. Tap "Freeze" |
| **Expected Result** | Card status changes to frozen, overlay appears on card visual, toast "Card frozen" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-006: Card Deletion
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On card detail |
| **Test Steps** | 1. Tap "Delete" |
| **Expected Result** | Card removed from list, toast "Card deleted", returned to list |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-007: Card Number Reveal
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On card detail |
| **Test Steps** | 1. Tap eye icon |
| **Expected Result** | Full card number, expiry (03/29), and CVV (412) revealed |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-008: Spending Limits Edit
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On card detail, tap "Limits" |
| **Test Steps** | 1. Edit daily and monthly limits<br>2. Tap "Save Limits" |
| **Expected Result** | Toast "Limits updated", returned to detail |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-009: Transaction List
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On card detail with transactions |
| **Test Steps** | 1. Scroll to transactions section |
| **Expected Result** | Transaction list with description, amount, date |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-VC-010: Empty State
| Field | Value |
|-------|-------|
| **Module** | Virtual Cards |
| **Priority** | Low |
| **Type** | UI |
| **Preconditions** | No cards exist |
| **Test Steps** | 1. Verify empty state |
| **Expected Result** | "No virtual cards yet" message with icon |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Rewards Test Cases

### TC-REW-001: Points Balance Display
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On /rewards |
| **Test Steps** | 1. Verify DeeXPoints card |
| **Expected Result** | Shows 2,450 points ≈ ₦24,500 |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-002: Redeem Flow
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /rewards, have ≥ 500 points |
| **Test Steps** | 1. Tap DeeXPoints card<br>2. Enter 500 points<br>3. Tap "Continue" |
| **Expected Result** | Confirmation page with points, rate, cash value, destination bank |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-003: Minimum Redemption Validation
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On redeem page |
| **Test Steps** | 1. Enter 100 points |
| **Expected Result** | Error "Minimum 500 points (₦5,000)" shown, Continue button disabled |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-004: Exceeds Balance Validation
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On redeem page, balance = 2,450 |
| **Test Steps** | 1. Enter 3000 points |
| **Expected Result** | Error "Exceeds your balance" shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-005: Referral Link Copy
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /rewards |
| **Test Steps** | 1. Tap copy button on referral link |
| **Expected Result** | Link copied, checkmark shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-006: Referral List Display
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | Navigate to /referrals |
| **Test Steps** | 1. Verify referral list |
| **Expected Result** | 5 referrals shown with status (Traded/Signed up) and earnings |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-007: Leaderboard Display
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | Low |
| **Type** | UI |
| **Preconditions** | On /referrals |
| **Test Steps** | 1. Scroll to leaderboard |
| **Expected Result** | Top 4 referrers shown with rank, name, referrals, earnings |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-008: Streak Calendar
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /rewards |
| **Test Steps** | 1. Verify daily streak calendar |
| **Expected Result** | 7-day calendar with checkmarks for completed days |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-009: Earnings Log
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /rewards → Earnings Log tab |
| **Test Steps** | 1. Verify earnings entries |
| **Expected Result** | 11 entries shown with source, category, points, date |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-REW-010: Redemption History
| Field | Value |
|-------|-------|
| **Module** | Rewards |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /rewards → Redemptions tab |
| **Test Steps** | 1. Verify redemption entries |
| **Expected Result** | 4 entries with points, cash value, status (Approved/Rejected/Processing) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## KYC Test Cases

### TC-KYC-001: Overview Display
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On /kyc |
| **Test Steps** | 1. Verify limits summary<br>2. Verify 3 level cards<br>3. Verify progress bar |
| **Expected Result** | Trading/withdrawal limits shown, 3 levels with requirements, progress 0/3 |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-002: Level 1 Form
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /kyc, tap Level 1 |
| **Test Steps** | 1. Verify BVN input (max 11 chars)<br>2. Verify liveness check area |
| **Expected Result** | BVN field and selfie upload area visible |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-003: Level 2 Form
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /kyc, tap Level 2 |
| **Test Steps** | 1. Verify government ID upload<br>2. Verify proof of address upload |
| **Expected Result** | Two upload areas for ID and address proof |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-004: Level 3 Form
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /kyc, tap Level 3 |
| **Test Steps** | 1. Verify employment docs upload<br>2. Verify income source dropdown<br>3. Verify risk questionnaire<br>4. Verify 2FA requirement notice |
| **Expected Result** | All Level 3 fields visible with 2FA warning |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-005: BVN Validation
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Level 1 form |
| **Test Steps** | 1. Try entering more than 11 characters |
| **Expected Result** | Input capped at 11 characters (maxLength={11}) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-006: Submission Toast
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On any KYC level form |
| **Test Steps** | 1. Tap "Submit" |
| **Expected Result** | Toast "KYC Level X submitted for review", returned to overview after 1.5s |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-007: Limits Display
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /kyc overview |
| **Test Steps** | 1. Verify limits card |
| **Expected Result** | Trading and withdrawal limits shown based on highest completed level |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-KYC-008: Upgrade CTA
| Field | Value |
|-------|-------|
| **Module** | KYC |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /kyc overview, not all levels completed |
| **Test Steps** | 1. Verify upgrade CTA card |
| **Expected Result** | "Ready for the highest tier?" card with "Upgrade to Level X" button |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Admin Test Cases

### TC-ADM-001: Admin Dashboard Loads
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Navigate to /admin |
| **Test Steps** | 1. Verify dashboard loads<br>2. Verify metrics cards<br>3. Verify performance chart |
| **Expected Result** | 4 metric cards (total payout, active users, customers, merchants), performance area chart, quick links |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-002: Balance Toggle in Admin
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On admin dashboard |
| **Test Steps** | 1. Tap "SHOW BALANCE" |
| **Expected Result** | Metrics values revealed from "********" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-003: KYC Approve/Reject
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → KYC, pending submission visible |
| **Test Steps** | 1. Click approve button on pending KYC |
| **Expected Result** | Toast "KYC approved — limits updated" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-004: KYC Detail Dialog
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → KYC |
| **Test Steps** | 1. Click eye icon on any KYC entry |
| **Expected Result** | Dialog opens with info grid, limits preview, requirements checklist, documents, actions |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-005: Compliance Alert List
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | UI |
| **Preconditions** | On Admin → Compliance |
| **Test Steps** | 1. Verify alert stats cards<br>2. Verify alert table |
| **Expected Result** | 4 stat cards (total, critical, pending, auto-suspended), alert table with severity, user, trigger, status |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-006: Compliance Alert Detail
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On compliance alerts, click an alert row |
| **Test Steps** | 1. Verify detail view |
| **Expected Result** | User info, trigger description, activity details grid, event timeline, admin actions panel, notes textarea |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-007: Compliance Rule Toggle
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Compliance → Rules Engine |
| **Test Steps** | 1. Toggle a rule switch |
| **Expected Result** | Rule enabled/disabled, toast confirmation, rule card opacity changes |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-008: Gift Card Order Approval
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Gift Cards, pending order visible |
| **Test Steps** | 1. Click approve on pending order |
| **Expected Result** | Toast "Approved! ₦X credited to User.", order status changes to approved |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-009: Gift Card Brand Management
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Gift Cards → Brands & Rates |
| **Test Steps** | 1. Click "Add Brand"<br>2. Fill form<br>3. Submit |
| **Expected Result** | New brand added to list, toast confirmation |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-010: User Search
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Users |
| **Test Steps** | 1. Enter "Divine" in search |
| **Expected Result** | Table filtered to show only Divine Omajuwa |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-011: User Status Filter
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Users |
| **Test Steps** | 1. Tap "Flagged" filter |
| **Expected Result** | Only flagged users shown (Victor Odigili) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-012: Order Status Filter
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Orders |
| **Test Steps** | 1. Tap "FAILED" filter |
| **Expected Result** | Only failed orders shown with retry buttons |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-013: Auto-Pay Toggle
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Orders |
| **Test Steps** | 1. Toggle AUTO PAY switch |
| **Expected Result** | Toast "Auto Pay enabled/disabled" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-014: Payout Retry
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Orders or Payouts, failed item visible |
| **Test Steps** | 1. Click "Retry" on failed payout |
| **Expected Result** | Toast "Retrying payout for User..." |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-015: Wallet Tab Switching
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On Admin → Wallets |
| **Test Steps** | 1. Toggle between "DeeX Wallet" and "Customers Wallet" |
| **Expected Result** | Balance cards, asset cards, and activity table update accordingly |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-016: Auto-Swap Toggle
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On Admin → Wallets |
| **Test Steps** | 1. Toggle AUTO SWAP switch |
| **Expected Result** | Toast "Auto Swap enabled/disabled" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-017: Audit Log Display
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On Admin → Audit Log |
| **Test Steps** | 1. Verify audit log table |
| **Expected Result** | 8 entries showing admin, action, target, details, date |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-018: Report Navigation
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On Admin → Reports |
| **Test Steps** | 1. Click "Revenue" report card |
| **Expected Result** | Bar chart and metrics (This Month, Last Month, Total) shown |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-019: Fee Configuration Display
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On Admin → Settings → Fees |
| **Test Steps** | 1. Verify fee list |
| **Expected Result** | Crypto Trade Fee (1.0%), Gift Card Fee (2.5%), Withdrawal Fee (₦50), DeeX Pay Fee (0.5%) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-ADM-020: Pagination Works
| Field | Value |
|-------|-------|
| **Module** | Admin |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On any admin table with > 10 items |
| **Test Steps** | 1. Click "Next" or page number |
| **Expected Result** | Table updates to show next page, "Showing X–Y of Z" updates |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Security Test Cases

### TC-SEC-001: PIN Brute Force Protection
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | High |
| **Type** | Security |
| **Preconditions** | On /pin screen |
| **Test Steps** | 1. Enter wrong PIN 10 times in a row |
| **Expected Result** | No lockout implemented (gap — should implement rate limiting) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-002: Session Termination Notification
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Logged in from new device |
| **Test Steps** | 1. Check notifications |
| **Expected Result** | "Session Terminated" notification visible |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-003: 2FA Toggle
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /security |
| **Test Steps** | 1. Toggle "Two-Factor Auth" |
| **Expected Result** | Toggle state changes (no actual 2FA setup flow — gap) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-004: Biometric Toggle
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | Medium |
| **Type** | Functional |
| **Preconditions** | On /security |
| **Test Steps** | 1. Toggle "Biometric Login" |
| **Expected Result** | Toggle state changes (no actual biometric integration — gap) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-005: Login History Display
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | On /security |
| **Test Steps** | 1. Scroll to Login History |
| **Expected Result** | 4 entries with device, date, time, success/failure status |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-006: Active Session Termination
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On /security, Active Sessions section |
| **Test Steps** | 1. Click terminate icon on non-current session |
| **Expected Result** | Session removed from list (no actual backend call — gap) |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-007: Sensitive Data Masking
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | High |
| **Type** | Security |
| **Preconditions** | On any page with balance display |
| **Test Steps** | 1. Toggle balance visibility off |
| **Expected Result** | All monetary values masked with "••••••" |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-SEC-008: Card Number Masking
| Field | Value |
|-------|-------|
| **Module** | Security |
| **Priority** | High |
| **Type** | Security |
| **Preconditions** | On virtual card detail |
| **Test Steps** | 1. Verify default card number display |
| **Expected Result** | Card number masked as "•••• •••• •••• XXXX" by default |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Navigation & Layout Test Cases

### TC-NAV-001: Bottom Navigation
| Field | Value |
|-------|-------|
| **Module** | Navigation |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | On any page with bottom nav |
| **Test Steps** | 1. Tap Home, Wallet, +, Rewards, Activity |
| **Expected Result** | Each tab navigates to correct page, active tab highlighted |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-NAV-002: Center Action Button
| Field | Value |
|-------|-------|
| **Module** | Navigation |
| **Priority** | High |
| **Type** | Functional |
| **Preconditions** | Bottom nav visible |
| **Test Steps** | 1. Tap center "+" button |
| **Expected Result** | Navigated to /quick-action |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-NAV-003: Mobile Layout Constraint
| Field | Value |
|-------|-------|
| **Module** | Navigation |
| **Priority** | Medium |
| **Type** | UI |
| **Preconditions** | View app on desktop browser |
| **Test Steps** | 1. Verify layout |
| **Expected Result** | Content constrained to max-width 430px, centered on screen |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

### TC-NAV-004: 404 Page
| Field | Value |
|-------|-------|
| **Module** | Navigation |
| **Priority** | Low |
| **Type** | Functional |
| **Preconditions** | Navigate to unknown route |
| **Test Steps** | 1. Navigate to /nonexistent |
| **Expected Result** | NotFound page displayed |
| **Actual Result** | _[Leave blank]_ |
| **Status** | ⬜ Pending |

---

## Regression Test Scenarios

| # | Scenario | Steps | Expected |
|---|----------|-------|----------|
| R-001 | Full user journey | Onboarding → Login → PIN → Dashboard → Sell Crypto → Receipt | All pages load and navigate correctly |
| R-002 | Gift card trade flow | Dashboard → Gift Cards → Select brand → Enter value → Upload → Submit → Status | Order saved to localStorage |
| R-003 | Admin KYC workflow | Admin → KYC → View pending → Approve → Verify toast | KYC approved, limits updated message |
| R-004 | Compliance alert handling | Admin → Compliance → View alert → Detail → Approve | Alert status updated |
| R-005 | Reward redemption | Rewards → Redeem → Enter 500 → Confirm → Success | Redemption submitted for approval |
| R-006 | Virtual card lifecycle | Create → Fund → Freeze → Unfreeze → Delete | All operations succeed with toasts |
| R-007 | Bill payment flow | Bills → Airtime → MTN → Enter details → Pay → Success | Payment successful page shown |
| R-008 | DeeX Pay merchant payment | DeeX Pay → Pay Merchant → Enter ID → Select crypto → Pay | Payment sent success page |
| R-009 | Admin gift card management | Admin → Gift Cards → Approve order → Toggle brand → Add brand | All operations succeed |
| R-010 | Cross-module navigation | Dashboard → Wallet → Swap → Activity → Profile → Security → Back | All back buttons work correctly |
