# Expanded Activity History Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 30 stable mock transactions to each Activity category and display every row for continuous scrolling.

**Architecture:** Move mock-data construction into a focused Activity data module, exporting typed transaction records and category counts. Keep filtering, grouping, row rendering, and navigation in `Activity.tsx`, removing per-month truncation.

**Tech Stack:** React 18, TypeScript, Vitest, Tailwind CSS.

## Global Constraints

- Exactly 30 transactions per category and 120 total.
- Deterministic values and dates; no runtime randomness.
- Preserve existing filter and receipt-navigation contracts.
- Preserve unrelated local changes.

---

### Task 1: Build deterministic Activity fixtures

**Files:**
- Create: `src/data/activityTransactions.ts`
- Create: `src/test/activityTransactions.test.ts`

- [ ] Define and export Activity transaction types and the deterministic generator inputs.
- [ ] Generate 30 records for each category with unique IDs and realistic metadata.
- [ ] Test total count, per-category counts, unique IDs, and required receipt metadata.
- [ ] Run `npm test` and expect all tests to pass.

### Task 2: Render the full history

**Files:**
- Modify: `src/pages/Activity.tsx`

- [ ] Import the shared transaction types and fixtures.
- [ ] Remove the ten-row inline fixture and monthly preview/expansion state.
- [ ] Render every record in each grouped month while preserving filters and row navigation.
- [ ] Run `npm run build` and expect success.

### Task 3: Verify and integrate

**Files:**
- Verify: `src/data/activityTransactions.ts`
- Verify: `src/pages/Activity.tsx`
- Verify: `src/test/activityTransactions.test.ts`

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Commit only task files and push `main`.
