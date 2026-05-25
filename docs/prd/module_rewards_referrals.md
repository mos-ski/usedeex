# Module: Rewards & Referrals

## 1. Overview
The Rewards & Referrals module gamifies user engagement through DeeXPoints, referral bonuses, trade streaks, and cashback rewards. Users earn points for completing tasks, referring friends, maintaining daily trade streaks, and achieving high trading volumes. Points can be redeemed for cash (1pt = ₦10, minimum 500pts = ₦5,000) to a linked bank account. The module includes a referral dashboard with leaderboard, a trade streak tracker with milestones, and an earnings log with redemption history.

## 2. Goals & Objectives
- Drive user acquisition through a referral program (100pts per qualifying referral)
- Increase daily active users via trade streak rewards
- Encourage higher trading volumes through cashback incentives
- Provide transparent point earning and redemption tracking
- Create social competition through a referral leaderboard
- Enable point-to-cash redemption with admin approval workflow

## 3. User Personas
- **Reward Seeker**: User motivated by earning points and redeeming them for cash
- **Referral Champion**: User who actively refers friends to earn bonuses
- **Streak Trader**: User who trades daily to maintain their streak and earn multipliers
- **High-Volume Trader**: User who trades large volumes to unlock cashback rewards
- **New User**: User completing sign-up bonus tasks to earn initial points

## 4. User Stories
- As a new user, I want to complete sign-up tasks so that I can earn my first 500 points.
- As a user, I want to share my referral link so that I can earn 100pts when my referral trades over $100.
- As a user, I want to track my daily trade streak so that I can earn streak bonuses.
- As a user, I want to see my DeeXPoints balance and cash equivalent so that I know my reward value.
- As a user, I want to redeem my points for cash to my bank account so that I can use my rewards.
- As a user, I want to see my earnings log so that I can track how I earned points.
- As a user, I want to see the referral leaderboard so that I can compete with others.
- As a user, I want to track my weekly cashback progress so that I know how close I am to ₦50,000.

## 5. User Flows
### Flow 1: Rewards Dashboard (Main Tab)
1. User navigates to `/rewards`
2. User sees 3 tabs: Rewards, Earnings Log, Redemptions
3. Rewards tab shows:
   - Sign-up bonus card with 3 tasks (KYC-1, first trade ≥$50, refer a friend)
   - Cashback card with progress bar (₦650,000 / ₦2,000,000 weekly volume)
   - DeeXPoints balance card (2,450 pts ≈ ₦24,500) with redeem button
   - Referral card with shareable link and copy button
   - Explore section: Trade Streak and Refer & Win cards
   - Daily streak calendar (7-day view with checkmarks)
   - "How You Earn" breakdown summary

### Flow 2: Point Redemption
1. User taps "Redeem" on DeeXPoints card (if balance ≥ 500pts)
2. System shows available points and cash equivalent
3. User enters points to redeem (minimum 500)
4. Quick-select buttons: 500, 1000, 2000, All
5. System validates: minimum 500pts, not exceeding balance
6. User taps "Continue" → confirmation screen
7. Confirmation shows: points, rate (1pt = ₦10), cash amount, destination bank, remaining balance
8. User taps "Redeem Now" → submitted screen
9. Submitted screen shows pending status with admin approval notice
10. User can view receipt or return to rewards

### Flow 3: Referral Dashboard
1. User navigates to `/referrals`
2. System shows stats: total referrals (5), earned (₦2,000), pending (₦1,000)
3. Referral link displayed with copy button
4. Referral list shows name, status (Signed up / Traded), earned amount, date
5. Leaderboard shows top referrers with rank, name, referral count, earned amount
6. Current user is highlighted in the leaderboard

### Flow 4: Trade Streak
1. User navigates to `/trade-streak`
2. Streak hero shows: current streak (3), best streak (12), multiplier (1.5x), total bonus earned (4,500)
3. Weekly calendar shows 7-day view with fire emojis for completed days
4. Tabs: Overview, Milestones, History
5. Overview tab: next milestone card with progress bar, how it works, multiplier tiers
6. Milestones tab: 6 milestones from 3-day (50pts) to 100-day (15,000pts + 10x bonus)
7. History tab: bonus history with date, type, points, and multiplier

### Flow 5: Earnings Log
1. User switches to "Earnings Log" tab on rewards page
2. System shows chronological list of point earnings
3. Each entry shows: source description, category, points, date
4. Entries are grouped by period (today, week, all)

### Flow 6: Redemption History
1. User switches to "Redemptions" tab on rewards page
2. System shows list of past redemption requests
3. Each entry shows: points, cash amount, status (Approved/Rejected/Processing), date, bank account

## 6. Functional Requirements
- **FR-001**: DeeXPoints must use conversion rate: 1pt = ₦10
- **FR-002**: Minimum redemption must be 500pts (₦5,000)
- **FR-003**: Sign-up bonus must award 500pts across 3 tasks
- **FR-004**: Referral bonus must award 100pts when referral trades >$100
- **FR-005**: Trade streak must award 100pts for completing 7-day streak
- **FR-006**: Weekly cashback must award ₦50,000 for ₦2,000,000 weekly volume
- **FR-007**: Daily streak calendar must show 7-day view with completion indicators
- **FR-008**: Referral link must be copyable with format `https://deex.app/ref/{username}`
- **FR-009**: Leaderboard must rank users by referral count
- **FR-010**: Trade streak must track current streak, longest streak, and multiplier
- **FR-011**: Milestones must range from 3-day to 100-day streaks with increasing rewards
- **FR-012**: Redemptions must require admin approval before disbursement
- **FR-013**: Earnings log must categorize entries: referral, streak, trade, signup, cashback
- **FR-014**: Redemption history must show status: Approved, Rejected, Processing

## 7. Non-Functional Requirements
- **NFR-001**: Points balance must be displayed as a hardcoded constant (2,450pts)
- **NFR-002**: Referral data must use hardcoded arrays for referrals and leaderboard
- **NFR-003**: Streak data must use hardcoded `streakData` object
- **NFR-004**: Earnings log entries must be typed as `EarningEntry[]`
- **NFR-005**: Redemption history must be typed as `Redemption[]`
- **NFR-006**: All reward components must use the shared `MobileLayout` with `BottomNav`
- **NFR-007**: Tab switching must use pill-style tab bar with `bg-secondary` background
- **NFR-008**: DeeXPoints tooltip must be toggleable via Info icon button

## 8. Edge Cases / Unhappy Paths
- User has fewer than 500pts — redeem button shows "Need X more" and is non-functional
- User enters redemption amount below 500 — error message shown
- User enters redemption amount exceeding balance — error message shown
- Redemption is rejected by admin — status shows "Rejected" in history
- Streak breaks (missed day) — current streak resets to 0 (no reset logic in current implementation)
- Referral signs up but never trades — points remain "Pending"
- Leaderboard has fewer than 4 users — no graceful degradation needed (hardcoded)
- Cashback progress exceeds target — no overflow handling
- No real-time point updates — all data is static
- No push notifications for earned points or redemption status changes

## 9. Acceptance Criteria
Given I have 2,450 DeeXPoints
When I view the rewards dashboard
Then I see my balance as 2,450 pts ≈ ₦24,500

Given I have ≥500 points
When I tap "Redeem"
Then I can enter a redemption amount and proceed to confirmation

Given I enter 300 points for redemption
When I try to continue
Then I see an error that minimum is 500 points

Given I view the referral dashboard
When I look at my referrals
Then I see 5 referrals with 3 "Traded" and 2 "Signed up" statuses

Given I view the trade streak page
When I look at my streak
Then I see a 3-day current streak with 1.5x multiplier

Given I view the cashback card
When I check my progress
Then I see ₦650,000 out of ₦2,000,000 weekly volume with 4d 12h remaining

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /rewards/points` — Get user's DeeXPoints balance (needs to be built)
- `GET /rewards/tasks` — Get sign-up bonus tasks and completion status (needs to be built)
- `GET /rewards/cashback` — Get cashback progress and reward (needs to be built)
- `GET /rewards/streak` — Get current streak, longest streak, multiplier (needs to be built)
- `GET /rewards/earnings` — Get earnings log (needs to be built)
- `POST /rewards/redeem` — Submit point redemption request (needs to be built)
- `GET /rewards/redemptions` — Get redemption history (needs to be built)
- `GET /referrals/link` — Get user's referral link (needs to be built)
- `GET /referrals/list` — Get user's referrals with status (needs to be built)
- `GET /referrals/leaderboard` — Get global referral leaderboard (needs to be built)
- `GET /rewards/milestones` — Get trade streak milestones (needs to be built)
- `GET /rewards/bonus-history` — Get trade streak bonus history (needs to be built)

### Mocked APIs (frontend only)
- Points balance: hardcoded `POINTS_BALANCE = 2450` in `Rewards.tsx:13`
- Point value: hardcoded `POINT_VALUE = 10` in `Rewards.tsx:14`
- Min redeem: hardcoded `MIN_REDEEM = 500` in `Rewards.tsx:15`
- Sign-up tasks: hardcoded array in `Rewards.tsx:17-21`
- Earnings log: 11 hardcoded entries in `Rewards.tsx:23-37`
- Redemption history: 4 hardcoded entries in `Rewards.tsx:39-44`
- Referral link: hardcoded `https://deex.app/ref/johndoe` in `Rewards.tsx:56`
- Referrals: 5 hardcoded entries in `ReferralDashboard.tsx:8-14`
- Leaderboard: 4 hardcoded entries in `ReferralDashboard.tsx:16-21`
- Streak data: hardcoded object in `TradeStreak.tsx:11-16`
- Milestones: 6 hardcoded entries in `TradeStreak.tsx:20-26`
- Bonus history: 7 hardcoded entries in `TradeStreak.tsx:28-36`
- Cashback: hardcoded `currentVolume=650000`, `targetVolume=2000000`, `cashbackReward=50000` in `Rewards.tsx:193-197`

### Missing APIs
- Real-time point balance updates
- Task completion tracking and verification
- Referral attribution and tracking
- Streak calculation engine (daily trade detection)
- Cashback volume calculation
- Admin redemption approval/rejection workflow
- Point expiration policy
- Bonus multiplier calculation engine
- Notification system for earned rewards

## 11. UI/UX Notes
- Rewards page uses 3 tabs in a pill-style bar: Rewards, Earnings Log, Redemptions
- DeeXPoints card uses gradient background `from-primary/20 to-accent/10`
- Referral card uses gradient `from-primary/30 to-accent/20` with Gift icon
- Daily streak calendar shows 7 circles with checkmarks or day numbers
- "How You Earn" section uses a compact card with action → reward rows
- Referral dashboard uses 3-column stats grid with icons
- Leaderboard highlights current user with `bg-primary/10 border-primary/20`
- Trade streak hero uses `from-deex-orange/20 to-primary/10` gradient with Flame icon
- Streak calendar uses fire emoji (🔥) for completed days
- Milestones use icon circles with unlock status highlighting
- Redemption flow uses the same confirmation pattern as other modules
- Earnings Log and RedemptionHistory are separate components imported from `@/components/rewards/`

## 12. Metrics / Success Criteria
- Total DeeXPoints distributed across all users
- Point redemption rate (points redeemed / points earned)
- Referral conversion rate (sign-ups from referral links)
- Referral qualification rate (referrals who trade >$100)
- Average trade streak length
- Streak completion rate (7-day streaks achieved)
- Cashback qualification rate (users hitting ₦2M weekly volume)
- Leaderboard engagement (users checking their rank)
- Redemption approval rate (approved / total requests)
- Average time from redemption request to approval
- User retention correlated with reward participation
