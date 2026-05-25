# Module: Admin Dashboard

## 1. Overview
The Admin Dashboard module provides a comprehensive back-office management interface for DeeX staff. It includes 15+ sub-sections covering platform metrics, wallet management, order tracking, payout processing, virtual card oversight, gift card and bill payment management, user administration, KYC approval, compliance monitoring, audit logging, rewards management, reporting, and system settings. The entire admin panel is currently mocked with static data and no real backend integration.

## 2. Goals & Objectives
- Provide real-time visibility into platform performance and key metrics
- Enable admin management of all user-facing modules (trading, gift cards, bill payments, virtual cards)
- Implement KYC approval/rejection workflow for 3-tier verification
- Deploy a compliance rules engine with auto-suspension capabilities
- Maintain a complete audit trail of all admin actions
- Configure platform-wide settings (fees, rewards, security)
- Manage staff payroll and access
- Generate business intelligence reports

## 3. User Personas
- **Super Admin**: Full access to all admin sections, can manage staff and settings
- **Compliance Officer**: Focuses on KYC approvals, compliance alerts, and rule management
- **Support Agent**: Views user details, transaction history, and basic account info
- **Finance Admin**: Manages payouts, wallet balances, and fee configurations
- **Operations Manager**: Monitors orders, gift cards, bill payments, and virtual cards

## 4. User Stories
- As an admin, I want to see platform metrics at a glance so that I can monitor business health.
- As an admin, I want to view and manage user wallets so that I can track platform liquidity.
- As an admin, I want to review and process all trade orders so that I can ensure proper execution.
- As an admin, I want to manage payouts and resolve failed transactions so that users get paid.
- As an admin, I want to approve or reject KYC submissions so that I can verify user identities.
- As an admin, I want to configure compliance rules that auto-suspend suspicious accounts so that I can prevent fraud.
- As an admin, I want to review compliance alerts with full context so that I can investigate suspicious activity.
- As an admin, I want to view and manage virtual cards issued to users so that I can monitor card usage.
- As an admin, I want to manage gift card orders (approve/reject) so that I can process trades.
- As an admin, I want to monitor bill payment transactions so that I can ensure service delivery.
- As an admin, I want to view the audit log so that I can track all admin actions.
- As an admin, I want to configure platform fees and reward parameters so that I can adjust business rules.
- As an admin, I want to manage staff payroll so that I can track team compensation.
- As an admin, I want to view user details with full transaction history so that I can support users effectively.

## 5. User Flows
### Flow 1: Admin Dashboard Overview
1. Admin navigates to `/admin`
2. System shows 4 key metrics: Total payout, Active Users, Total customers, Total merchants
3. Balance can be toggled visible/hidden with eye icon
4. Performance chart shows crypto and giftcard trading volume (Jan-Mar)
5. Quick links panel shows external tools (Slack, Google Analytics, etc.)

### Flow 2: Wallet Management
1. Admin navigates to "Wallets" tab
2. System shows DeeX wallet balances (total crypto, Glyde, PalmPay)
3. Asset breakdown shows BTC, ETH, USDT, SOL, DOGE holdings
4. Deposit info displays bank account and crypto address
5. Customer wallets show aggregate holdings
6. Trade volume chart and asset distribution pie chart displayed
7. Wallet activity table shows recent credits/debits with tx IDs

### Flow 3: Order Management
1. Admin navigates to "Orders" tab
2. System shows total order value and BTC volume
3. Order distribution by asset type displayed
4. Payout summary with distribution breakdown
5. Failed payouts count shown
6. Orders table lists all deposits, swaps, and withdrawals with status

### Flow 4: Payout Management
1. Admin navigates to "Payouts" tab
2. Payouts table lists all bank transfers with amount, bank, status
3. Admin can filter by status (COMPLETED, PENDING, FAILED)
4. Failed payouts can be retried or investigated

### Flow 5: User Management
1. Admin navigates to "Users" tab
2. System shows user stats: total users, star customer, biggest client
3. User breakdown by type (Leads, Customers, Merchants, Clients)
4. Signup trend chart displayed
5. Users table lists all customers with KYC level, status, last login
6. Admin can click a user to view detailed profile at `/admin/users/:id`

### Flow 6: KYC Approval
1. Admin navigates to "Kyc logs" tab
2. KYC table lists all submissions with name, level, status, date
3. Admin can approve or reject submissions
4. Rejection requires a reason
5. KYC config shows level requirements and limits

### Flow 7: Compliance Monitoring
1. Admin navigates to "Compliance" tab
2. Two views: Alerts and Rules Engine
3. Alerts view shows stats (total, critical, pending, auto-suspended)
4. Filter by status: all, pending, reviewing, resolved, dismissed
5. Alert table shows severity, user, trigger, description, status
6. Clicking an alert opens detail view with user info, trigger details, timeline
7. Admin actions: Approve/Clear, Dismiss, Suspend User
8. Internal notes can be added per alert
9. Rules Engine shows configurable compliance rules with toggle switches
10. Each rule shows: name, trigger description, threshold, action, enabled status

### Flow 8: Virtual Cards Management
1. Admin navigates to "Virtual Cards" tab
2. Table shows all virtual cards with user, label, balance, status, limits

### Flow 9: Gift Card Management
1. Admin navigates to "Gift Cards" tab
2. Table shows all gift card orders with brand, amount, status
3. Admin can approve or reject orders

### Flow 10: Bill Payments Management
1. Admin navigates to "Bill Payments" tab
2. Table shows all bill payment transactions

### Flow 11: Audit Log
1. Admin navigates to "Audit Log" tab
2. Table shows all admin actions with admin name, action, target, details, date

### Flow 12: Rewards Management
1. Admin navigates to "Rewards" tab
2. System shows reward configuration and user earnings

### Flow 13: Reports
1. Admin navigates to "Reports" tab
2. 6 report categories: Revenue, Growth, Retention, Website, Happiness, Survey

### Flow 14: Settings
1. Admin navigates to "Settings" tab
2. 4 sub-tabs: Security, Fees, Payroll, Rewards
3. Security: password reset, account deactivation
4. Fees: configure crypto trade fee (1.0%), gift card fee (2.5%), withdrawal fee (₦50), DeeX Pay fee (0.5%)
5. Payroll: staff table with name, email, role, salary, delete action
6. Rewards: configure points per trade, referral bonus, point-to-Naira rate, min redemption

## 6. Functional Requirements
- **FR-001**: Admin panel must have 15+ navigable sections via sidebar
- **FR-002**: Dashboard must show 4 key metrics with balance toggle
- **FR-003**: Performance chart must support 3 tabs: All, Crypto, Giftcard
- **FR-004**: Wallet section must show DeeX wallet and customer wallet balances
- **FR-005**: Orders must display deposits, swaps, and withdrawals with status
- **FR-006**: Payouts must show bank transfer details with status tracking
- **FR-007**: Users must be filterable by KYC level and account status
- **FR-008**: KYC logs must support approve/reject actions with reasons
- **FR-009**: Compliance must have alerts view with severity badges and status filters
- **FR-010**: Compliance rules engine must support enable/disable toggles
- **FR-011**: Auto-suspension rules must trigger based on configurable thresholds
- **FR-012**: Alert detail view must show user info, trigger details, event timeline
- **FR-013**: Admin actions must include: Approve, Dismiss, Suspend User
- **FR-014**: Internal notes must be savable per compliance alert
- **FR-015**: Audit log must record all admin actions with timestamps
- **FR-016**: Fee configuration must support percentage and fixed-amount fees
- **FR-017**: Payroll must support add/remove staff members
- **FR-018**: Rewards settings must allow configuration of point values and thresholds
- **FR-019**: User detail view must show full profile, transactions, and activity log
- **FR-020**: Sidebar must support expandable sections with child items
- **FR-021**: Mobile sidebar must use Sheet component for responsive navigation

## 7. Non-Functional Requirements
- **NFR-001**: Admin layout must use desktop sidebar (220px) on lg+ screens
- **NFR-002**: Mobile navigation must use Sheet component with hamburger menu
- **NFR-003**: All data tables must use shadcn Table components
- **NFR-004**: Charts must use Recharts (AreaChart) for performance data
- **NFR-005**: Confirmation dialogs must use ConfirmDialog component for destructive actions
- **NFR-006**: Toast notifications must use Sonner for all admin actions
- **NFR-007**: Severity badges must use color coding: critical=destructive, high=warning, medium=info, low=muted
- **NFR-008**: All admin mock data must be sourced from `adminMockData.ts`
- **NFR-009**: Active tab highlighting must work for both parent and child nav items
- **NFR-010**: Header must show current section title dynamically

## 8. Edge Cases / Unhappy Paths
- Admin navigates to `/admin` without authentication — no route guard exists
- Balance toggle only affects display — no real data hiding
- All compliance actions (approve, dismiss, suspend) show toast but don't persist
- KYC approval/rejection doesn't update the underlying data
- Fee configuration "Edit" buttons are non-functional
- Payroll "Add member" shows toast but no dialog
- Staff deletion doesn't actually remove from the list
- No pagination for large tables (orders has 50+ rows)
- No search/filter for user tables
- No export functionality for reports or tables
- Compliance rules can be toggled but changes don't persist beyond session
- No role-based access control (all admins see everything)
- No audit log for admin login/logout events
- User detail page (`/admin/users/:id`) exists but data is hardcoded

## 9. Acceptance Criteria
Given I am viewing the admin dashboard
When I toggle the balance visibility
Then all metric values switch between actual numbers and asterisks

Given I am viewing compliance alerts
When I filter by "pending" status
Then I only see alerts with pending status

Given I am viewing an alert detail
When I click "Suspend User"
Then I see a confirmation dialog and a toast notification

Given I am viewing the rules engine
When I toggle a rule off
Then the rule shows as disabled with reduced opacity

Given I am viewing the settings fees tab
When I see the fee list
Then I see Crypto Trade Fee (1.0%), Gift Card Fee (2.5%), Withdrawal Fee (₦50), DeeX Pay Fee (0.5%)

Given I am viewing the payroll tab
When I see the staff table
Then I see 9 staff members with name, email, role, salary, and delete action

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /admin/dashboard/metrics` — Platform KPIs (needs to be built)
- `GET /admin/dashboard/performance` — Trading volume data (needs to be built)
- `GET /admin/wallets/deex` — DeeX platform wallet balances (needs to be built)
- `GET /admin/wallets/customers` — Aggregate customer wallet data (needs to be built)
- `GET /admin/wallets/activity` — Wallet transaction log (needs to be built)
- `GET /admin/orders` — All trade orders (needs to be built)
- `GET /admin/payouts` — All payout transactions (needs to be built)
- `POST /admin/payouts/:id/retry` — Retry failed payout (needs to be built)
- `GET /admin/users` — User list with filters (needs to be built)
- `GET /admin/users/:id` — User detail with transactions (needs to be built)
- `GET /admin/kyc/logs` — KYC submission log (needs to be built)
- `POST /admin/kyc/:id/approve` — Approve KYC (needs to be built)
- `POST /admin/kyc/:id/reject` — Reject KYC with reason (needs to be built)
- `GET /admin/compliance/alerts` — Compliance alerts (needs to be built)
- `GET /admin/compliance/rules` — Compliance rules (needs to be built)
- `PUT /admin/compliance/rules/:id` — Update rule configuration (needs to be built)
- `POST /admin/compliance/alerts/:id/action` — Take action on alert (needs to be built)
- `GET /admin/virtual-cards` — All virtual cards (needs to be built)
- `GET /admin/giftcards/orders` — All gift card orders (needs to be built)
- `PUT /admin/giftcards/orders/:id/status` — Update order status (needs to be built)
- `GET /admin/bill-payments` — All bill payment transactions (needs to be built)
- `GET /admin/audit-log` — Admin action log (needs to be built)
- `GET /admin/reports/:type` — Generate report (needs to be built)
- `GET /admin/settings/fees` — Get fee configuration (needs to be built)
- `PUT /admin/settings/fees` — Update fee configuration (needs to be built)
- `GET /admin/settings/rewards` — Get rewards configuration (needs to be built)
- `PUT /admin/settings/rewards` — Update rewards configuration (needs to be built)
- `GET /admin/payroll` — Staff payroll data (needs to be built)
- `POST /admin/payroll` — Add staff member (needs to be built)
- `DELETE /admin/payroll/:id` — Remove staff member (needs to be built)

### Mocked APIs (frontend only)
- All data sourced from `adminMockData.ts` (535+ lines of mock data)
- Dashboard metrics: 4 hardcoded values in `dashboardMetrics`
- Performance data: 3 months of crypto/giftcard data
- Wallet data: `deexWallet`, `customersWallet`, `walletActivity` arrays
- Orders: 50 order records in `ordersList`
- Payouts: 45 payout records in `payoutsList`
- Users: 12 customer records in `customersList`
- KYC: 12 KYC log records in `kycLogs`
- Compliance: 6 alerts in `complianceAlerts`, 7 rules in `defaultComplianceRules`
- Payroll: 9 staff records in `payrollData`
- Audit log: 8 records in `auditLogData`
- Virtual cards: 5 records in `virtualCardsData`
- User detail: `mockUser`, `userTransactions`, `userActivities`
- All state managed in React `useState` — no persistence for admin actions

### Missing APIs
- Real-time dashboard metrics (WebSocket or polling)
- Admin authentication and role-based access control
- Pagination and server-side filtering for all tables
- Search functionality across all data tables
- CSV/Excel export for reports and tables
- Real compliance rule engine (currently just UI toggles)
- Real auto-suspension system
- Admin action confirmation with audit trail persistence
- Notification system for admin alerts
- Influencer management with profit-share tracking
- Real payroll processing integration

## 11. UI/UX Notes
- Admin layout uses a 220px fixed sidebar on desktop with `sticky top-0 h-screen`
- Sidebar has 14 nav items with icons from lucide-react
- Two nav items (KYC, Compliance) have expandable child sections
- Mobile uses Sheet component with hamburger menu trigger
- Header shows dynamic title based on active tab
- Dashboard uses 4-column metric grid (2-col on mobile)
- Performance chart uses Recharts AreaChart with gradient fill
- Quick links panel shows 6 external tool links
- Tables use shadcn Table with consistent column styling
- Severity badges use color-coded pills (destructive, warning, info)
- Alert status badges use color-coded pills
- Rules engine cards show enabled/disabled with opacity change
- Switch component used for rule toggles
- ConfirmDialog used for destructive actions (suspend, delete)
- NewBadge component marks new features
- Settings uses 4 sub-tabs with border-bottom active indicator
- User detail page accessible at `/admin/users/:id`

## 12. Metrics / Success Criteria
- Admin response time to KYC submissions (average hours)
- Compliance alert resolution time
- Number of auto-suspended accounts per week
- Payout processing time (pending → completed)
- Failed payout resolution rate
- Admin action audit completeness
- Platform uptime as monitored from admin dashboard
- User complaint resolution time
- Fee change frequency and impact on revenue
- Staff productivity metrics (orders processed per admin per day)
