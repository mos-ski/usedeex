# Flat Wide Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every email 720px wide on desktop and present the preview without rounded corners or shadow.

**Architecture:** Change the single shared shell width and the preview's matching source-width constant. Preserve responsive width behavior and all template APIs.

**Tech Stack:** TypeScript, React, Vitest, Vite

## Global Constraints

- Desktop email width is exactly 720px.
- The preview is flat: no border radius or drop shadow.
- Mobile rendering remains responsive.

---

### Task 1: Widen and flatten the shared email preview

**Files:**
- Modify: `src/emails/layout.ts`
- Modify: `src/emails/layout.test.ts`
- Modify: `src/pages/EmailPreview.tsx`
- Modify: `src/pages/EmailPreview.test.tsx`

**Interfaces:**
- Consumes: existing email shell and catalogue renderer.
- Produces: unchanged public APIs with 720px desktop output.

- [ ] Add failing assertions for a 720px shell and a flat preview.
- [ ] Run the focused tests and verify they fail for the old 640px rounded/shadowed layout.
- [ ] Update the shared shell, hero centering, and preview source width; remove preview radius and shadow.
- [ ] Run focused tests, all email tests, and the production build.
- [ ] Visually verify and deploy the committed result.
