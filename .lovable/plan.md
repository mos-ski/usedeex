

## Plan: Updated Referral System + Influencer Program

### Summary of Changes

**New referral rule (replaces old):** When a user refers someone and that referral makes a trade > $100, the referrer earns **100 pts once** (not per-trade). This replaces the old "10 pts per trade ≥ $10" rule everywhere.

**Influencer system:** Admin can appoint users as influencers. Influencers get a custom profit-share on referral trades instead of the standard 100 pts. Admin sets:
- Min trade value (default $100)
- Profit share % (applied to ₦5/$ profit, paid as points)

Influencers still earn the standard sign-up bonus loop (KYC + first trade + referral tasks), but their referral trade reward is replaced by the profit-share config.

---

### 1. User-Facing Rewards Page (`src/pages/Rewards.tsx`)

- **Referral card text**: Change "Earn 10 pts for every referral trade" → "Earn 100 pts when your referral trades > $100"
- **Sign-up task #3**: Update from "Refer a friend who trades ≥ $10" → "Refer a friend who trades > $100"
- **Earnings log**: Update referral entries to show one-time 100 pts rewards instead of repeated 10 pts
- **"How You Earn" table**: Replace "Referral trade (≥ $10) → 10 pts" with "Referral first trade (> $100) → 100 pts (one-time)"
- **Explore card**: Update "10 pts per referral trade" → "100 pts per referral"

### 2. Earnings Log Component (`src/components/rewards/EarningsLog.tsx`)

- No structural changes needed, data comes from parent

### 3. Admin Panel — Rewards Config (`src/pages/AdminPanel.tsx`)

**A. Update Reward Values table:**
- Replace "Referral Trade (per trade ≥ $10)" row with "Referral First Trade (> $100) → 100 pts (₦1,000), one-time"
- Update "Referral Min Trade" system setting from "$10" → "$100"

**B. Add new "Influencers" sub-tab** (alongside config, payouts, earners, activity):
- **Influencer list table**: Shows appointed influencers with columns: User, Status (Active/Paused), Referrals, Min Trade, Profit Share %, Total Earned, Actions (Edit/Remove)
- **"Appoint Influencer" button**: Opens inline form to select a user and set:
  - Min trade value (default $100)
  - Profit share % of ₦5/$ profit (e.g. 50% → on a $100 trade, profit is ₦500, influencer gets 250 pts = ₦2,500)
- **Edit config**: Each influencer row has an Edit button to adjust their share % and min trade
- **Remove**: Reverts user to standard referral rules (100 pts one-time)

**C. Mock data:**
- 3-4 sample influencers with varying configs (e.g. 30%, 50% profit share)
- Earnings column showing calculated totals

### 4. Admin User Detail (`src/pages/AdminUserDetail.tsx`)

- Add an "Influencer" badge/toggle on the user info tab so admin can quickly appoint from user detail page
- If user is an influencer, show their custom referral config inline

### Files to modify:
- `src/pages/Rewards.tsx` — update referral text and earnings data
- `src/pages/AdminPanel.tsx` — update reward config, add Influencers sub-tab
- `src/pages/AdminUserDetail.tsx` — add influencer badge/toggle on user detail

