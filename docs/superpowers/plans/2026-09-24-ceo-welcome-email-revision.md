# CEO Welcome Email Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the slogan-heavy welcome email with the approved personal CEO note and a uniform grey body treatment.

**Architecture:** Keep the shared email shell and primitives unchanged. Update only the welcome template composition and its focused tests, then verify and publish the committed result.

**Tech Stack:** TypeScript, Vitest, React/Vite preview, Vercel

## Global Constraints

- Preserve the centered layout and existing DeeX hero/footer.
- Use brand blue only for the headline and brand grey for all body/signature text.
- CTA label is `Explore DeeX`.
- Do not change other operational templates.

---

### Task 1: Revise the CEO welcome note

**Files:**
- Modify: `src/emails/templates/welcome.ts`
- Test: `src/emails/templates/welcome.test.ts`

**Interfaces:**
- Consumes: `WelcomePayload` and existing shared primitives.
- Produces: the same `welcomeDefinition` public interface with revised HTML copy.

- [ ] **Step 1: Write the failing assertions**

Assert the rendered email contains `I’m Omojuwa Divine, CEO of UseDeeX`, `Thank you for choosing DeeX`, `Welcome aboard`, and `Explore DeeX`; assert the retired slogan is absent, no `text-align:left` exists, and body copy does not use `#000000`.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- src/emails/templates/welcome.test.ts`

Expected: FAIL because the approved CEO copy and CTA are not rendered yet.

- [ ] **Step 3: Implement the approved note**

Compose centered `paragraph()` rows using their default brand-grey color, retain the blue `heading()`, render `personalSignOff()` with the signature color aligned to body grey, and change the CTA label to `Explore DeeX`.

- [ ] **Step 4: Verify behavior and build**

Run: `npm test -- src/emails/templates/welcome.test.ts src/emails/index.test.ts src/pages/EmailPreview.test.tsx && npm run build`

Expected: all focused tests pass and the Vite production build succeeds.

- [ ] **Step 5: Visually inspect and publish**

Open `/emails/preview`, verify the revised welcome note is centered and uniformly grey, commit the changed template/test, and deploy the clean commit to the linked Vercel production project.
