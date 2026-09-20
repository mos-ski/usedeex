# Menu Virtual Card Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one design-system virtual-card preview to Menu that opens the existing Virtual Cards page, without Cashback or Find ATMs blocks.

**Architecture:** Keep the feature inside `QuickAction.tsx`, using existing `SectionCard`, `SectionHeader`, `ActionTile`, and dashboard icon primitives. Add a focused preview card below the existing menu groups and route clicks to `/virtual-cards`.

**Tech Stack:** React, TypeScript, React Router, Tailwind CSS, Vite.

## Global Constraints

- Reuse existing DeeX design-system components and colors.
- Render exactly one virtual card preview.
- Do not add Cashback or Find ATMs UI.
- Preserve all existing Menu groups and routes.

### Task 1: Add the Menu virtual-card module

**Files:**
- Modify: `src/pages/QuickAction.tsx`

**Interfaces:**
- Consumes: existing `navigate`, `SectionCard`, `SectionHeader`, and dashboard icon components.
- Produces: a clickable single-card preview that navigates to `/virtual-cards`.

- [ ] **Step 1: Add the preview section after the existing menu groups**

Use a `SectionCard` with `SectionHeader title="Virtual Card"`, then a button containing a dark card preview with `Virtual`, `Virtual Card *4291`, and `View details`. The button must call `navigate("/virtual-cards")` and use accessible text.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: Vite completes successfully with no TypeScript errors.

- [ ] **Step 3: Commit the implementation**

```bash
git add src/pages/QuickAction.tsx docs/superpowers/plans/2026-09-20-menu-virtual-card.md
git commit -m "Add virtual card module to menu"
```
