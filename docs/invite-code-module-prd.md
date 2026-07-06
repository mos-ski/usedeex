# Invite Code Module

**Product Requirements Document**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Status | Draft |
| Date | July 2026 |
| Product | DeeXOptions |

---

## 1. Problem Statement

DeeXOptions needs a mechanism to incentivize new user acquisition and drive meaningful engagement (deposits and trades). Current growth is limited by lack of structured referral incentives. We need a system where existing users or marketing campaigns can bring in new users through invite codes that reward both acquisition and activation.

---

## 2. Solution Overview

An invite code system where:

- Admins create single-use invite codes with configurable conditions
- New users enter a code to claim DeeXpoint rewards
- Rewards are unlocked progressively as users complete conditions (deposit, trade)
- The system tracks referral relationships for future features
- Invite codes are accessible throughout the app, not just at signup

---

## 3. Definitions

| Term | Definition |
|------|------------|
| **Invite Code** | A single-use alphanumeric code entered by new users to claim conditional rewards |
| **DeeXpoints** | Platform reward points that can be redeemed for trading credits or other benefits |
| **Inviter** | An existing user or campaign that shares an invite code |
| **Invitee** | A new user who enters and redeems an invite code |
| **Conditions** | Requirements that must be met before rewards are credited (e.g., deposit, trade) |

---

## 4. User Roles

| Role | Description |
|------|-------------|
| Admin | Creates and manages invite codes, views analytics |
| Inviter | Existing user who shares invite codes with potential new users |
| Invitee | New user who enters an invite code and works toward unlocking rewards |

---

## 5. User Stories

### 5.1 Admin Stories

| ID | Story | Priority |
|----|-------|----------|
| A1 | As an admin, I want to create invite codes with custom conditions so that I can control reward distribution | Must Have |
| A2 | As an admin, I want to set minimum deposit and trade amounts for each code so that only qualifying users receive rewards | Must Have |
| A3 | As an admin, I want to set optional expiry dates on codes so that time-limited campaigns can be managed | Should Have |
| A4 | As an admin, I want to restrict codes to specific trading pairs so that I can promote certain assets | Could Have |
| A5 | As an admin, I want to view redemption and completion rates so that I can measure campaign effectiveness | Must Have |
| A6 | As an admin, I want to deactivate active codes so that campaigns can be stopped if needed | Must Have |
| A7 | As an admin, I want to bulk generate codes with the same conditions so that large campaigns can be launched quickly | Should Have |
| A8 | As an admin, I want to assign codes to specific inviters so that I can track individual referral performance | Should Have |

### 5.2 Inviter Stories

| ID | Story | Priority |
|----|-------|----------|
| I1 | As an inviter, I want to view my unique invite code so that I can share it with others | Must Have |
| I2 | As an inviter, I want to see who used my code and what rewards they claimed so that I can track my referrals | Should Have |
| I3 | As an inviter, I want to share my code via link or QR code so that the process is seamless | Should Have |

### 5.3 Invitee Stories

| ID | Story | Priority |
|----|-------|----------|
| E1 | As an invitee, I want to enter an invite code at signup so that I can claim rewards | Must Have |
| E2 | As an invitee, I want to enter an invite code after signup (dashboard, deposit, trade pages) so that I am not locked out if I skip it initially | Must Have |
| E3 | As an invitee, I want to see a clear breakdown of conditions and rewards so that I know what actions unlock what | Must Have |
| E4 | As an invitee, I want to see my progress toward completing conditions so that I am motivated to continue | Must Have |
| E5 | As an invitee, I want to receive notifications when I earn rewards so that I am aware of my progress | Should Have |
| E6 | As an invitee, I want to see how many DeeXpoints I have earned from the invite code so that I understand my benefits | Must Have |

---

## 6. Acceptance Criteria

### 6.1 Admin Creates Invite Code

**Given** an admin is on the invite code management page
**When** the admin clicks "Create New Code"
**Then** the admin can configure:
- Code string (auto-generated or custom)
- Reward type: DeeXpoints
- Total reward amount
- Deposit reward amount
- Trade reward amount
- Minimum deposit amount required
- Minimum trade amount required
- Required trading pairs (optional)
- Deposit deadline in days (optional)
- Trade deadline in days (optional)
- Expiry date (optional)
- Assigned inviter (optional)

**And** the code is created with status "active"
**And** the code is unique and does not conflict with existing codes

---

### 6.2 Invitee Enters Code at Signup

**Given** a new user is on the signup page with a valid invite code pre-filled
**When** the user completes registration
**Then** the invite code is associated with the user's account
**And** the user sees a confirmation: "Invite code applied! Complete conditions to earn rewards"
**And** the reward breakdown is displayed on the dashboard

---

### 6.3 Invitee Enters Code After Signup

**Given** a logged-in user without an applied invite code
**When** the user navigates to any of the following:
- Dashboard
- Deposit page
- Trade page
- Profile/Settings
- Wallet page
**Then** a prompt to enter an invite code is visible

**Given** a user without an invite code completes signup
**When** the user reaches the dashboard for the first time
**Then** a modal appears: "Have an invite code? Enter it here to claim rewards"
**And** the modal is dismissible
**And** the modal does not appear again once dismissed (unless user navigates to enter code manually)

---

### 6.4 Conditions Display and Progress Tracking

**Given** an invitee has a valid invite code applied
**When** the user views their dashboard or invite code status page
**Then** the following conditions are displayed:
- Registration: Completed (with checkmark)
- Deposit: Status (completed/pending) with amount requirement and reward
- Trade: Status (completed/pending) with amount requirement and reward

**And** partial rewards are credited as each condition is completed
**And** the progress is updated in real-time

---

### 6.5 Deposit Condition Met

**Given** an invitee has a valid invite code with a deposit condition
**When** the user makes a deposit equal to or greater than the minimum required amount
**Then** the deposit reward (DeeXpoints) is credited to the user's account
**And** the deposit condition is marked as completed
**And** the user receives a notification: "You earned X DeeXpoints for your first deposit!"

---

### 6.6 Trade Condition Met

**Given** an invitee has a valid invite code with a trade condition
**When** the user completes trades with total volume equal to or greater than the minimum required amount
**Then** the trade reward (DeeXpoints) is credited to the user's account
**And** the trade condition is marked as completed
**And** the user receives a notification: "You earned Y DeeXpoints for trading!"

**Given** the invite code has required trading pairs specified
**When** the trade condition is evaluated
**Then** only trades on the specified pairs count toward the minimum volume

---

### 6.7 Code Expiry

**Given** an invite code has an expiry date set
**When** the current date passes the expiry date
**Then** the code status changes to "expired"
**And** the code can no longer be redeemed
**And** if a user was mid-redemption, their pending rewards are forfeited

---

### 6.8 Code Already Used

**Given** an invite code has already been redeemed by a user
**When** another user attempts to enter the same code
**Then** the system displays: "This code has already been used"
**And** the code is not applied to the new user's account

---

### 6.9 Admin Deactivates Code

**Given** an admin is viewing an active invite code
**When** the admin clicks "Deactivate"
**Then** the code status changes to "deactivated"
**And** the code can no longer be redeemed
**And** users who mid-redemption retain any already-credited rewards

---

### 6.10 Admin Views Analytics

**Given** an admin is on the analytics dashboard
**When** the admin selects the invite code analytics view
**Then** the following metrics are displayed:
- Total codes created (by status)
- Redemption rate (codes used / total codes)
- Deposit completion rate
- Trade completion rate
- Total DeeXpoints distributed
- Top inviters by successful referrals

---

### 6.11 Inviter Shares Code

**Given** an inviter is on the "Invite & Earn" page
**When** the inviter views their code
**Then** the following sharing options are available:
- Copy code to clipboard
- Share via link (with embedded code)
- Generate QR code

**Given** an inviter shares a link
**When** a new user clicks the link
**Then** the user is directed to the landing page with the code pre-filled

---

### 6.12 Inviter Views Referral Status

**Given** an inviter is on the "Invite & Earn" page
**When** the inviter views their referral history
**Then** the following information is displayed for each invitee:
- Invitee username or ID
- Date code was redeemed
- Conditions completed (deposit, trade)
- Rewards credited

---

## 7. Rewards Configuration

| Reward Component | Description |
|------------------|-------------|
| Deposit Reward | DeeXpoints credited when invitee completes minimum deposit |
| Trade Reward | DeeXpoints credited when invitee completes minimum trade volume |
| Total Reward | Sum of deposit and trade rewards |

**Constraint:** Total reward = Deposit Reward + Trade Reward. Both must be set when creating a code.

---

## 8. Conditions Configuration

| Condition | Description | Required |
|-----------|-------------|----------|
| Minimum Deposit Amount | USD equivalent of minimum deposit required | Yes |
| Minimum Trade Amount | USD equivalent of minimum trade volume required | Yes |
| Required Trading Pairs | Restrict trade condition to specific pairs (empty = any pair) | No |
| Deposit Deadline | Days from signup to complete deposit | No |
| Trade Deadline | Days from signup to complete trade | No |
| Expiry Date | Date after which code can no longer be used | No |

---

## 9. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Code Uniqueness | All invite codes must be unique across the system |
| Rate Limiting | Invite code validation endpoint limited to 5 attempts per minute per IP |
| Audit Logging | All admin actions (create, deactivate) must be logged |
| Performance | Code validation response time < 200ms |
| Scalability | System must support up to 100,000 active codes |

---

## 10. Notifications

| Event | Recipient | Message |
|-------|-----------|---------|
| Code redeemed | Inviter | "Someone used your invite code!" |
| Deposit completed | Invitee | "You earned X DeeXpoints for your first deposit!" |
| Trade completed | Invitee | "You earned Y DeeXpoints for trading!" |
| Code expired | Admin | "X codes expired without use" |
| All conditions met | Invitee | "Congratulations! All invite rewards claimed!" |
| Reminder (24h) | Invitee | "Don't miss out! Enter your invite code for rewards" |

---

## 11. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Code Redemption Rate | > 40% | Codes used / Codes created |
| Deposit Completion Rate | > 60% | Users who deposited / Users who redeemed code |
| Trade Completion Rate | > 50% | Users who traded / Users who deposited |
| Inviter Engagement | > 30% | Existing users who share codes |
| Cost Per Acquisition | Within marketing budget | Total rewards distributed / New users acquired |

---

## 12. Future Enhancements (v2)

| Enhancement | Description |
|-------------|-------------|
| Recurring Rewards | Rewards for ongoing trading activity beyond first trade |
| Social Sharing | Deep links for WhatsApp, Twitter, Telegram |
| Leaderboards | Top inviters rankings |
| Campaign Codes | Holiday/special event themed codes |
| A/B Testing | Test different reward amounts and conditions |
| Referral Commissions | Ongoing % of referee's trading fees (separate from invite codes) |

---

## 13. Open Questions

1. Should there be a maximum cap on total DeeXpoints distributable per campaign?
2. Can an inviter have unlimited unique codes or should there be a limit?
3. Should the inviter receive any reward when their invitee completes conditions?
4. What happens to pending rewards if a code expires after redemption but before all conditions are met?
5. Should there be a manual override for admins to credit points in edge cases?
6. How should the invite code system interact with the future referral code system?

---

## 14. Implementation Timeline

| Phase | Duration | Scope |
|-------|----------|-------|
| Phase 1 | 2 weeks | Backend: Database schema, API endpoints, condition logic |
| Phase 2 | 1 week | Admin Panel: Code creation, management, bulk generate |
| Phase 3 | 1 week | User Flow: Code validation, redemption, progress tracking |
| Phase 4 | 1 week | Frontend: Landing pages, dashboard prompts, banners |
| Phase 5 | 1 week | Analytics: Dashboard, reporting, metrics |
| **Total** | **6 weeks** | |

---

*Document Version: 1.0*
*Last Updated: July 2026*
