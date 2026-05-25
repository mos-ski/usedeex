# Module: KYC Verification

## 1. Overview
The KYC (Know Your Customer) Verification module implements a 3-tier identity verification system compliant with Nigerian financial regulations. Each level unlocks higher trading and withdrawal limits. Level 1 requires BVN and liveness check, Level 2 requires government ID and proof of address, and Level 3 requires employment documentation, source of income declaration, risk questionnaire, and mandatory 2FA. All submissions are currently mocked with no real document processing or identity verification.

## 2. Goals & Objectives
- Implement a progressive 3-tier KYC system that scales with user needs
- Comply with Nigerian AML/CFT regulations through identity verification
- Unlock higher trading and withdrawal limits at each KYC level
- Collect BVN for Level 1 identity verification
- Perform liveness detection to prevent spoofing
- Collect government-issued ID and proof of address for Level 2
- Gather employment and source of income data for Level 3
- Enforce mandatory 2FA for Level 3 activation
- Provide clear visibility into current limits and upgrade paths

## 3. User Personas
- **Basic User**: User who only needs Level 1 for small trades and withdrawals
- **Active Trader**: User who needs Level 2 for higher trading volumes
- **High-Volume User**: User who needs Level 3 for maximum limits and priority processing
- **Compliance Officer**: Admin who reviews and approves/rejects KYC submissions

## 4. User Stories
- As a user, I want to see my current KYC level and limits so that I know what I can do.
- As a user, I want to see what each KYC level unlocks so that I can decide which level to pursue.
- As a user, I want to submit my BVN for Level 1 so that I can start trading.
- As a user, I want to complete a liveness selfie check so that my identity can be verified.
- As a user, I want to upload my government ID for Level 2 so that I can increase my limits.
- As a user, I want to upload proof of address for Level 2 so that I can complete verification.
- As a user, I want to submit employment documents for Level 3 so that I can access the highest limits.
- As a user, I want to complete a risk questionnaire for Level 3 so that I can meet compliance requirements.
- As a user, I want to see my progress across all KYC levels so that I know what's left to complete.
- As a user, I want to be notified when my KYC is approved or rejected so that I know my status.

## 5. User Flows
### Flow 1: KYC Overview
1. User navigates to `/kyc`
2. System shows limits summary card with trading and withdrawal limits
3. Progress bar shows completed levels (e.g., 0/3, 1/3, etc.)
4. Three level cards displayed: Level 1, Level 2, Level 3
5. Each card shows: level title, limits, requirements, and status (completed or "Start →")
6. Completed levels show green "COMPLETED" badge with checkmark
7. Upgrade CTA at bottom encourages upgrading to next incomplete level
8. User taps an incomplete level → specific KYC form

### Flow 2: KYC Level 1 (BVN + Liveness)
1. User taps Level 1 → navigates to `view="kyc1"`
2. System shows unlocked limits card: "$1,000 trading • $100 withdrawal"
3. User enters 11-digit BVN number (maxLength=11)
4. Help text explains BVN is used for identity verification and never shared
5. User taps liveness check area to take a live selfie
6. Help text explains the selfie confirms the user is a real person
7. User taps "Submit" → simulated upload with 1.5s delay
8. Toast notification: "KYC Level 1 submitted for review"
9. User returns to overview

### Flow 3: KYC Level 2 (Government ID + Proof of Address)
1. User taps Level 2 → navigates to `view="kyc2"`
2. System shows unlocked limits card: "$10,000 trading • $500 withdrawal"
3. User uploads government-issued ID (NIN, Passport, or Driver's License)
4. Help text explains ID confirms legal identity and age
5. User uploads proof of address (utility bill or bank statement, max 3 months old)
6. Help text explains address verification for regulatory compliance
7. User taps "Submit" → simulated upload
8. Toast notification: "KYC Level 2 submitted for review"
9. User returns to overview

### Flow 4: KYC Level 3 (Employment + Source of Income + Risk + 2FA)
1. User taps Level 3 → navigates to `view="kyc3"`
2. System shows unlocked limits card: "$25,000 trading • $1,000 withdrawal • Priority processing"
3. User uploads employment/business documentation (employment letter, CAC, or business registration)
4. User selects source of income from dropdown (Salary, Business, Investment, Freelancing, Other)
5. User completes risk questionnaire:
   - Expected monthly trading volume (4 ranges)
   - Primary use of DeeX (4 options)
6. System shows 2FA requirement notice (must be enabled before Level 3 activation)
7. User taps "Submit for Review" → simulated upload
8. Toast notification: "KYC Level 3 submitted for review"
9. User returns to overview

## 6. Functional Requirements
- **FR-001**: KYC must have 3 levels with progressive requirements
- **FR-002**: Level 1 limits: $1,000 trading, $100 withdrawal (one-time payout)
- **FR-003**: Level 2 limits: $10,000 trading, $500 withdrawal (daily withdrawal)
- **FR-004**: Level 3 limits: $25,000 trading, $1,000 withdrawal (daily, priority processing)
- **FR-005**: Level 1 must collect BVN (11 digits) and liveness selfie
- **FR-006**: Level 2 must collect government ID and proof of address
- **FR-007**: Level 3 must collect employment docs, source of income, risk questionnaire, and require 2FA
- **FR-008**: BVN input must have maxLength of 11 characters
- **FR-009**: Source of income must be a dropdown with 5 options
- **FR-010**: Risk questionnaire must have 2 questions with multiple-choice answers
- **FR-011**: Progress bar must show completed levels out of 3
- **FR-012**: Current limits must reflect the highest completed level
- **FR-013**: Completed levels must show a "COMPLETED" badge and be non-interactive
- **FR-014**: Submission must simulate upload with 1.5s loading state
- **FR-015**: Toast notification must confirm submission at each level

## 7. Non-Functional Requirements
- **NFR-001**: All KYC views must use `MobileLayout` with `hideNav`
- **NFR-002**: Upload areas must use dashed border styling (`border-2 border-dashed`)
- **NFR-003**: Help text must use `text-[11px]` with HelpCircle icon
- **NFR-004**: Limits summary card must use a two-column layout with border divider
- **NFR-005**: Progress bar must use the shadcn `Progress` component
- **NFR-006**: Level cards must use `rounded-2xl` with border styling
- **NFR-007**: Submit buttons must show "Submitting..." state during simulated upload
- **NFR-008**: All KYC pages must use `PageTransition` for smooth navigation

## 8. Edge Cases / Unhappy Paths
- User enters BVN with fewer than 11 digits — no validation currently exists
- Liveness selfie capture is simulated — no actual camera integration
- Document uploads are simulated — no actual file handling or validation
- No file size or format validation for uploads
- No document expiry checking (e.g., utility bill must be <3 months old)
- No sequential enforcement — user can attempt Level 2 without completing Level 1
- No real identity verification (BVN lookup, facial recognition)
- No rejection feedback — all submissions show success toast
- No KYC expiry or renewal requirements
- No document re-upload flow for rejected submissions
- 2FA requirement for Level 3 is displayed but not enforced
- No audit trail of KYC submissions

## 9. Acceptance Criteria
Given I am on the KYC overview screen
When I view the limits summary
Then I see my current trading and withdrawal limits based on my highest completed level

Given I am completing Level 1
When I enter my BVN and tap the selfie area
Then I can submit and see a "submitted for review" toast

Given I am completing Level 2
When I upload my government ID and proof of address
Then I can submit and see a "submitted for review" toast

Given I am completing Level 3
When I fill in all employment, income, and risk questionnaire fields
Then I can submit and see a "submitted for review" toast

Given I have completed Level 1
When I view the overview
Then Level 1 shows a "COMPLETED" badge and Level 2 shows "Start →"

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /kyc/status` — Get user's current KYC level and limits (needs to be built)
- `POST /kyc/level1` — Submit BVN and liveness data (needs to be built)
- `POST /kyc/level2` — Submit government ID and proof of address (needs to be built)
- `POST /kyc/level3` — Submit employment docs, income source, risk questionnaire (needs to be built)
- `POST /kyc/upload` — Upload document files (needs to be built)
- `POST /kyc/liveness` — Submit liveness selfie for facial recognition (needs to be built)
- `GET /kyc/verification-result` — Check KYC review status (needs to be built)
- `POST /kyc/bvn/verify` — Verify BVN against NIBSS database (needs to be built)
- `PUT /kyc/reupload/:level` — Re-upload rejected documents (needs to be built)

### Mocked APIs (frontend only)
- KYC levels: hardcoded `levels` array in `KycVerification.tsx:9-34`
- All levels start as `completed: false`
- Submission: `setTimeout` with 1.5s delay, then toast notification in `KycVerification.tsx:49-54`
- Progress calculation: `(completedCount / levels.length) * 100` in `KycVerification.tsx:43`
- Current limits: derived from `levels.filter(l => l.completed).pop()` in `KycVerification.tsx:47`
- No actual file uploads or BVN verification
- No real liveness detection

### Missing APIs
- BVN verification against NIBSS (Nigeria Inter-Bank Settlement System)
- Document upload to secure storage (S3, etc.)
- Facial recognition / liveness detection service integration
- Government ID verification (NIN, passport, driver's license)
- Address verification service
- KYC review workflow for compliance officers
- Rejection with reason codes
- Document re-upload flow
- KYC expiry and renewal notifications
- AML screening integration
- PEP (Politically Exposed Person) screening
- Sanctions list checking

## 11. UI/UX Notes
- Overview uses a prominent limits summary card with two-column layout (trading | withdrawal)
- Progress bar uses shadcn `Progress` component with `h-2.5` height
- Level cards use `rounded-2xl` with border and `active:bg-secondary` for interactive states
- Completed levels show green "COMPLETED" badge with CheckCircle2 icon
- Upload areas use large dashed-border boxes with icons (Camera, Upload, FileText, Briefcase)
- Help text uses small `text-[11px]` with HelpCircle icon for context
- Source of income uses a native `<select>` dropdown with `appearance-none`
- Risk questionnaire uses nested select inputs within a bordered card
- 2FA requirement shown as a card with ShieldCheck icon
- Submit buttons use `rounded-2xl` with "Submitting..." state
- Upgrade CTA at bottom uses `text-destructive` for urgency

## 12. Metrics / Success Criteria
- KYC completion rate per level (Level 1 → Level 2 → Level 3)
- Average time from submission to approval
- Rejection rate per level and common rejection reasons
- BVN submission success rate
- Liveness check pass rate
- Document upload success rate
- User drop-off rate at each KYC step
- Trading volume increase after KYC level upgrades
- Percentage of users at each KYC level
- Time to complete each KYC level (user-side)
