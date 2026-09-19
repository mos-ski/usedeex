# Auth Bypass and Mobile UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove prototype authentication and deliver the approved invite modal, initial Naira Wallet creation screen, and Activity filter sheet refresh.

**Architecture:** Preserve compatibility routes with React Router redirects, while deleting unused auth page modules. Keep each UI change within its existing component and extract the Activity drawer into a focused dashboard component with controlled draft/applied filter state.

**Tech Stack:** React 18, TypeScript, React Router, Tailwind CSS, Vaul drawer, Vitest, Testing Library.

## Global Constraints

- Use the existing DeeX brand tokens and Roboto where requested.
- Preserve current mock business behavior and all Naira Wallet screens after wallet creation.
- Keep `/login`, `/signup`, and `/pin` functional as redirects to `/dashboard`.
- Do not change unrelated user-owned files.

---

### Task 1: Remove Authentication UI and Bypass Routes

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/LandingPage.tsx`
- Modify: `src/pages/Onboarding.tsx`
- Modify: `src/pages/Profile.tsx`
- Modify: `src/components/admin/AdminLayout.tsx`
- Delete: `src/pages/Login.tsx`
- Delete: `src/pages/PinLock.tsx`
- Delete: `src/pages/SignUp.tsx`

**Interfaces:**
- Produces: `/login`, `/signup`, and `/pin` routes rendering `<Navigate to="/dashboard" replace />`.

- [ ] Replace auth component imports/routes with compatibility redirects.
- [ ] Change every former auth destination to `/dashboard`.
- [ ] Delete the three auth page modules.
- [ ] Run `rg -n 'pages/(Login|PinLock|SignUp)|navigate\("/(login|signup|pin)"\)|to="/(login|signup|pin)"' src` and expect no obsolete references except redirect route declarations.
- [ ] Run `npm run build` and expect success.

### Task 2: Refresh Invite-Code Modal

**Files:**
- Modify: `src/components/InviteCodeInput.tsx`

**Interfaces:**
- Consumes: existing `onApply`, `onClose`, `preFilledCode`, and `variant` props.
- Produces: unchanged callback behavior with a redesigned `modal` variant.

- [ ] Replace the modal surface with a Roboto, light DeeX bottom sheet/dialog using semantic brand tokens.
- [ ] Preserve empty, invalid, loading, and successful states and close behavior.
- [ ] Ensure inline and banner variants retain their behavior.
- [ ] Run `npm run build` and expect success.

### Task 3: Redesign Initial Naira Wallet Creation Screen

**Files:**
- Modify: `src/pages/NairaWallet.tsx`

**Interfaces:**
- Consumes: existing `requirements`, `updateRequirement`, `requiredFieldsComplete`, and `createWallet` state/actions.
- Produces: redesigned `requirements` branch only.

- [ ] Apply light app canvas, Roboto typography, brand cards, fields, header, and action styling to the requirements branch.
- [ ] Preserve required-field gating, navigation, toast, and transition to the wallet home.
- [ ] Confirm no styling or behavior changes occur after the requirements branch.
- [ ] Run `npm run build` and expect success.

### Task 4: Add the Activity Transaction Filter Drawer

**Files:**
- Create: `src/components/dashboard/TransactionFilterSheet.tsx`
- Modify: `src/pages/Activity.tsx`

**Interfaces:**
- Produces: `TransactionFilters`, `defaultTransactionFilters`, and controlled `TransactionFilterSheet({ open, onOpenChange, value, onApply })`.
- Consumes: applied filters in `Activity.tsx` to filter transaction action, status, and mock date metadata.

- [ ] Build the accessible Vaul drawer with Category, Status, Date range pills and Reset/Apply controls.
- [ ] Extend Activity transaction metadata with action/date values required for deterministic filtering.
- [ ] Replace the status popover with the filter trigger and controlled drawer.
- [ ] Map UI `Completed` to existing transaction status `Success`; leave Custom selectable without adding a calendar.
- [ ] Run `npm run build` and expect success.

### Task 5: Verify the Complete Change

**Files:**
- Verify all files listed above.

- [ ] Run `npm test` and record the result.
- [ ] Run `npm run lint` and distinguish pre-existing failures from regressions.
- [ ] Run `npm run build` and expect success.
- [ ] Start the Vite preview and inspect `/dashboard`, `/naira-wallet`, `/activity`, and `/login` at a mobile viewport.
- [ ] Run `git diff --check` and review the final diff for accidental edits.
