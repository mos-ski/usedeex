

# Admin Panel Audit: Issues, Missing Features, and Improvement Plan

## Critical Architecture Problem

The entire admin panel is a **single 2,177-line file** (`AdminPanel.tsx`). Both Celler and Nazza split each admin section into its own file under `src/pages/admin/`. This is the root cause of most problems — it makes everything fragile, hard to maintain, and bloated.

---

## Section-by-Section Audit

### 1. WALLETS TAB — Grade: D

**What's wrong:**
- Raw `<table>` elements instead of proper Table components (both Nazza and Celler use `Table/TableRow/TableCell` from shadcn)
- No pagination on wallet activity — just 8 hardcoded rows
- No credit/debit filtering on wallet activity (Nazza has a filter dropdown for Credits vs Debits with running totals)
- No cash deposit account info or crypto deposit address section (Nazza shows both with copy buttons)
- No "Request Withdraw" or "Top Up" actions (Nazza has both)
- Individual wallet cards don't show each asset properly — just a flat list in a plain table
- No total Credits vs total Debits summary

**What to add (from Nazza):**
- Cash/Crypto deposit info card with copy-to-clipboard
- Request Withdraw + Top Up buttons
- Filter by Credit/Debit with totals
- Pagination
- Proper wallet cards grid (like Nazza's 4-column grid per coin)

---

### 2. ORDERS TAB — Grade: D

**What's wrong:**
- No sorting (Nazza has sortable columns with `ArrowUpDown` icons)
- No pagination (Nazza has full pagination with page numbers)
- No wallet address column, no confirmations count, no linked payout reference (Nazza has all three)
- The sub-tabs (Orders, Payouts, Rewards, OTC) exist but only "Orders" shows content — the other 3 are dead tabs
- Auto Pay toggle exists but doesn't use a proper `Switch` component — it's a janky custom div
- No status filtering (Completed, Pending, Failed)
- Only 5 rows of data

**What to add:**
- Sortable columns
- Pagination (10 per page)
- Status filter pills
- Wallet address + Tx confirmations columns
- Linked payout column
- Proper Switch component for Auto Pay
- Content for Payouts, Rewards, OTC sub-tabs
- More mock data (15-20 orders)

---

### 3. USERS TAB — Grade: C-

**What's wrong:**
- No S/N (serial number) column
- No copy button on emails/phones (Nazza has copy on every copyable field)
- No avatar initials circle next to names (Nazza has this)
- No "Create special wallet" or "Sort by" or "Export" actions (Nazza has all three)
- No pagination
- Only 4 users
- No search within the users table
- The customer detail page (`AdminUserDetail.tsx`) duplicates the sidebar nav code instead of sharing it

**What to add:**
- Copy buttons on email/phone
- User avatar initials
- Pagination
- Export button
- More user tabs with counts (All Customers (2,833), Active, Inactive, Flagged)
- More mock data

---

### 4. KYC LOGS — Grade: C

**What's wrong:**
- No expandable detail view when clicking a KYC row (Nazza's CustomerDetail has a full KYC tab with BVN data, document preview, Level 1/2/3 breakdown)
- No action buttons (Approve/Reject) directly in the table for pending requests
- No KYC document preview or BVN data display
- Filter tabs work but don't show counts

**What to add:**
- Inline approve/reject buttons for pending KYC
- Click-to-expand or detail drawer showing submitted documents
- Filter counts in badges
- KYC level breakdown (Level 1/2/3 requirements and limits shown)

---

### 5. USER DETAIL PAGE — Grade: C

**What's wrong:**
- Has its own duplicate sidebar instead of being embedded in the admin layout
- Missing key tabs that Nazza has: Tasks (with nudge capability), Referral Benchmarks, Business Accounts
- No "Nudge User" feature (Nazza has nudge templates with push/email/SMS channel selection)
- No Actions dropdown (Suspend, Activate, Reset Password, Credit/Debit Wallet, Override KYC, Flag Account) — Nazza has this as a dropdown menu
- No auto-payout toggle per user (Nazza has this)
- Activity log exists but no pagination
- KYC tab is minimal

**What to add:**
- Remove duplicate sidebar — use shared admin layout
- Add Nudge User with templates
- Add Actions dropdown (Suspend, Activate, Reset Password, Credit/Debit, Override KYC, Flag)
- Add Tasks tab with nudge-per-task capability
- Add Referral Benchmarks tab
- Pagination on transactions and activities

---

### 6. GIFT CARDS — Grade: B+
Already refactored into its own component. Relatively well-built. Minor issues:
- Could use pagination on orders
- No date range filter

---

### 7. GENERAL UX ISSUES

- **No toast feedback** on most actions (Nazza uses `toast.success/error` everywhere)
- **No proper Switch component** — custom toggle divs instead of Radix Switch
- **No copy-to-clipboard** on transaction IDs, emails, phone numbers
- **Confirmation modals** exist but use a custom implementation instead of `AlertDialog`
- **No responsive considerations** — the sidebar and tables break on smaller desktop screens

---

## Implementation Plan

### Phase 1: Decompose into separate files
Split `AdminPanel.tsx` into separate page components under `src/pages/admin/`:
- `AdminDashboard.tsx`
- `AdminWallets.tsx`
- `AdminOrders.tsx`
- `AdminUsers.tsx`
- `AdminKYC.tsx`
- `AdminCompliance.tsx`
- `AdminAuditLog.tsx`
- `AdminRewards.tsx`
- `AdminVirtualCards.tsx`
- `AdminReports.tsx`
- `AdminSettings.tsx`
- `AdminLayout.tsx` (shared sidebar + header)

Keep `AdminPanel.tsx` as the shell that renders `AdminLayout` + active tab component.

### Phase 2: Fix Wallets
- Add wallet cards grid, deposit info card, withdraw/top-up buttons
- Credit/Debit filter with totals
- Pagination
- Proper Table components

### Phase 3: Fix Orders
- Sortable columns, pagination, status filters
- Wallet address, confirmations, linked payout columns
- Proper Switch for Auto Pay
- Populate Payouts/Rewards/OTC sub-tabs
- More mock data

### Phase 4: Fix Users
- Copy buttons, avatar initials, S/N column
- Pagination with "Showing X-Y of Z"
- Tab counts
- Export button

### Phase 5: Fix KYC
- Inline approve/reject on pending rows
- Detail drawer with document preview
- Filter counts

### Phase 6: Fix User Detail
- Remove duplicate sidebar, embed in admin layout
- Add Nudge User (templates + channel selection)
- Add Actions dropdown
- Add Tasks tab
- Add pagination on tables

### Phase 7: Polish
- Replace all custom toggles with `Switch`
- Add `toast` feedback on all actions
- Add copy-to-clipboard on all IDs/emails/phones
- Use `AlertDialog` for confirmations
- Move mock data to `src/data/adminMockData.ts`

This is a large refactor (~15 files). I recommend tackling it in phases, starting with the architectural split (Phase 1), then fixing each section.

