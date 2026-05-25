# DeeX — Technical Debt Analysis

## 1. Structural Issues

### TD-001: No API Service Layer
**Severity:** High
**Location:** Entire codebase
**Description:** All data is hardcoded inline or in mock files. There is no abstraction layer for API calls. When the backend is ready, every page will need to be rewritten.
**Fix:** Create `src/services/` directory with typed API client functions. Use TanStack Query for data fetching.

### TD-002: No Global State Management
**Severity:** High
**Location:** App.tsx, all pages
**Description:** User state, auth state, and wallet balances are not managed globally. Each page uses independent `useState`. When backend is connected, data will need to be refetched on every navigation.
**Fix:** Implement React Context for auth/user state, or use TanStack Query's cache for shared data.

### TD-003: Monolithic App.tsx
**Severity:** Medium
**Location:** `src/App.tsx`
**Description:** All 37 routes are defined in a single file. No lazy loading, no route grouping.
**Fix:** Split routes into logical groups (auth, user, admin). Use `React.lazy()` for code splitting.

### TD-004: Duplicate Route Definition
**Severity:** Low
**Location:** `src/App.tsx:85-86`
**Description:** `<Route path="/admin" element={<AdminPanel />} />` is defined twice.
**Fix:** Remove the duplicate line.

---

## 2. Repeated Logic

### TD-005: Dropdown Pattern Repeated 20+ Times
**Severity:** Medium
**Location:** SellCrypto, SwapCrypto, Deposit, DeexPay, SendMoney, VirtualCards
**Description:** Every dropdown (asset selector, bank selector, network selector) is implemented as inline state + conditional rendering. No reusable Dropdown component.
**Fix:** Create a reusable `DropdownSelect` component that accepts options and returns selected value.

### TD-006: Success Page Pattern Repeated
**Severity:** Medium
**Location:** SellCrypto, SwapCrypto, GiftCards, BillPayment, DeexPay, SendMoney
**Description:** Every flow has its own inline success page with similar structure (icon, title, description, buttons).
**Fix:** Create a reusable `SuccessPage` component with configurable icon, title, description, and actions.

### TD-007: Review Page Pattern Repeated
**Severity:** Medium
**Location:** SellCrypto, SwapCrypto, GiftCards, BillPayment, DeexPay, SendMoney
**Description:** Review/confirmation pages all use the same card-with-rows pattern.
**Fix:** Create a reusable `ReviewCard` component that accepts key-value pairs.

### TD-008: Copy-to-Clipboard Pattern Repeated
**Severity:** Low
**Location:** Deposit, SellCrypto, DeexPay, Rewards, VirtualCards
**Description:** Each page implements its own copy state, timeout, and icon toggle.
**Fix:** Already partially addressed by `CopyButton` in AdminUtils. Extract for user-facing pages too.

---

## 3. Hardcoded Values

### TD-009: Hardcoded Crypto Rates
**Severity:** High
**Location:** `src/pages/Dashboard.tsx:12-18`, `src/pages/SellCrypto.tsx:9-14`
**Description:** BTC ₦97,450,000, ETH ₦5,830,000, USDT ₦1,535, etc. are hardcoded.
**Fix:** Fetch from backend API or external price service.

### TD-010: Hardcoded PIN
**Severity:** Critical
**Location:** `src/pages/PinLock.tsx:11`, `src/pages/WithdrawCrypto.tsx:47`
**Description:** `correctPin = "1234"` is hardcoded in two places.
**Fix:** Remove immediately. Verify PIN via backend API.

### TD-011: Hardcoded User Data
**Severity:** High
**Location:** `src/pages/Dashboard.tsx:94` ("John"), `src/pages/Profile.tsx:29` ("John Doe")
**Description:** User name is hardcoded as "John Doe" everywhere.
**Fix:** Fetch from auth context or backend user profile endpoint.

### TD-012: Hardcoded Balances
**Severity:** High
**Location:** `src/pages/Dashboard.tsx:100` ($12,450.80), `src/pages/Wallet.tsx:10-17`
**Description:** All wallet balances are hardcoded.
**Fix:** Fetch from wallet balance API.

### TD-013: Hardcoded KYC Level
**Severity:** Medium
**Location:** `src/pages/VirtualCards.tsx:58`
**Description:** `const kycLevel = 2` is hardcoded.
**Fix:** Fetch from user profile API.

### TD-014: Hardcoded Daily Limits
**Severity:** Medium
**Location:** `src/pages/SendMoney.tsx` (₦50,000), `src/pages/DeexPay.tsx` (₦100,000)
**Description:** Daily limits differ between Send Money and DeeX Pay with no explanation.
**Fix:** Fetch limits from backend based on user's KYC level.

### TD-015: Hardcoded Referral Link
**Severity:** Low
**Location:** `src/pages/Rewards.tsx:57`, `src/pages/ReferralDashboard.tsx:25`
**Description:** Referral link is hardcoded as `https://deex.app/ref/johndoe`.
**Fix:** Generate from user's actual referral code.

---

## 4. State Management Problems

### TD-016: No Auth State
**Severity:** Critical
**Location:** Entire app
**Description:** No auth context, no token storage, no session management. The app has no concept of "logged in" vs "logged out".
**Fix:** Create AuthContext with login/logout/token management. Add route guards.

### TD-017: Form State Not Centralized
**Severity:** Medium
**Location:** All form pages
**Description:** Each page manages its own form state with individual `useState` calls instead of using React Hook Form consistently.
**Fix:** Use React Hook Form + Zod for all forms (already installed but underutilized).

### TD-018: Gift Card Store Uses localStorage Directly
**Severity:** Medium
**Location:** `src/data/giftcardData.ts`
**Description:** The giftcardStore reads/writes localStorage directly without any abstraction for future API migration.
**Fix:** Create a store interface that can swap between localStorage and API implementations.

---

## 5. Scalability Risks

### TD-019: No Code Splitting
**Severity:** Medium
**Location:** `src/App.tsx`
**Description:** All 36 pages are bundled into a single JS file. Initial load includes admin components that most users never need.
**Fix:** Use `React.lazy()` + `Suspense` for route-level code splitting, especially for admin pages.

### TD-020: No Virtual Scrolling for Long Lists
**Severity:** Medium
**Location:** AdminOrders (50 items), AdminPayouts (45 items), AdminUsers (12 items)
**Description:** All list items are rendered at once. With real data (thousands of orders), this will cause performance issues.
**Fix:** Implement virtual scrolling (react-window) or server-side pagination.

### TD-021: No Image Optimization
**Severity:** Low
**Location:** Gift cards, virtual cards, KYC documents
**Description:** When real images are added, there's no optimization strategy.
**Fix:** Use Vite's asset handling with lazy loading and compression.

---

## 6. Security Concerns

### TD-022: Hardcoded PIN (see TD-010)
**Severity:** Critical
**Fix:** Remove and implement backend verification.

### TD-023: No Input Sanitization
**Severity:** High
**Location:** All form inputs
**Description:** User inputs are rendered directly without sanitization. While React escapes by default, any `dangerouslySetInnerHTML` usage would be vulnerable.
**Fix:** Audit all rendering of user input. Add Zod validation schemas.

### TD-024: No Rate Limiting
**Severity:** High
**Location:** PinLock, all form submissions
**Description:** No protection against brute force attacks on PIN or form spam.
**Fix:** Implement client-side rate limiting and rely on backend rate limiting.

### TD-025: Clipboard API Without Fallback
**Severity:** Low
**Location:** Multiple pages using `navigator.clipboard.writeText`
**Description:** Clipboard API may not be available in all browsers or contexts.
**Fix:** Add fallback copy method using document.execCommand.

### TD-026: External Links Without noopener
**Severity:** Low
**Location:** `src/pages/Support.tsx:100` (WhatsApp link)
**Description:** WhatsApp link has `rel="noopener noreferrer"` but other external links may not.
**Fix:** Audit all external links for security attributes.

---

## 7. TypeScript Issues

### TD-027: Loose TypeScript Config
**Severity:** Medium
**Location:** `tsconfig.json`
**Description:** `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`, `noUnusedParameters: false`.
**Fix:** Enable strict mode incrementally. Fix type errors as they surface.

### TD-028: Missing Type Definitions
**Severity:** Medium
**Location:** Multiple pages
**Description:** Many components use `any` implicitly or lack proper prop types.
**Fix:** Add explicit type definitions for all component props and state.

---

## Tech Debt Summary

| Category | Count | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| Structural | 4 | 0 | 2 | 1 | 1 |
| Repeated Logic | 4 | 0 | 0 | 3 | 1 |
| Hardcoded Values | 7 | 1 | 3 | 2 | 1 |
| State Management | 3 | 1 | 0 | 2 | 0 |
| Scalability | 3 | 0 | 0 | 2 | 1 |
| Security | 5 | 1 | 2 | 0 | 2 |
| TypeScript | 2 | 0 | 0 | 2 | 0 |
| **Total** | **28** | **3** | **7** | **12** | **6** |
