# Module: Notifications & Settings

## 1. Overview
The Notifications & Settings module encompasses user-facing notification management, security configuration, profile editing, beneficiary management, statement generation, KYC access, support, and about pages. It serves as the user's control center for account management, security preferences, and platform information. All data is currently hardcoded or mocked with no real backend integration.

## 2. Goals & Objectives
- Provide users with visibility into login alerts and session management
- Enable security configuration: PIN change, biometric toggle, 2FA toggle
- Display active sessions and login history for security awareness
- Allow profile editing with appropriate field restrictions
- Manage saved beneficiaries (banks, wallets, bill payees)
- Enable bank account statement generation
- Provide quick access to KYC verification, support, and platform information
- Display platform policies (Terms, Privacy, AML) for compliance

## 3. User Personas
- **Security-Conscious User**: User who actively monitors sessions and enables 2FA
- **Profile Manager**: User who wants to update their phone number or username
- **Frequent Payer**: User who manages multiple saved beneficiaries for quick payments
- **Compliance-Focused User**: User who needs to generate statements for record-keeping
- **Help Seeker**: User who needs access to support and platform documentation

## 4. User Stories
- As a user, I want to see my notifications so that I know about login activity and platform updates.
- As a user, I want to see session termination alerts so that I know if someone else accessed my account.
- As a user, I want to change my PIN so that I can maintain account security.
- As a user, I want to enable biometric login so that I can access the app faster.
- As a user, I want to enable two-factor authentication so that my account is more secure.
- As a user, I want to see my active sessions so that I can terminate unauthorized ones.
- As a user, I want to see my login history so that I can detect suspicious activity.
- As a user, I want to edit my username and phone number so that my profile stays current.
- As a user, I want to add and remove bank accounts so that I can manage my payout destinations.
- As a user, I want to save wallet addresses so that I can send crypto quickly.
- As a user, I want to generate a bank statement so that I have a record of my transactions.
- As a user, I want to access the terms of service, privacy policy, and AML policy so that I understand the platform rules.

## 5. User Flows
### Flow 1: Notifications
1. User navigates to `/notifications`
2. System shows a flat list of all notifications
3. Notifications are categorized: login, session, promo
4. Login notifications show: "You just successfully logged into your account. Happy trading!"
5. Session notifications show: "Your previous session on device Galaxy S10 was terminated..."
6. Promotional notifications show marketing messages with emojis
7. Each notification shows title, message, and timestamp
8. No filtering, marking as read, or deletion capabilities

### Flow 2: Security Settings
1. User navigates to `/security` from Profile
2. System shows 3 security options: Change PIN, Biometric Login, Two-Factor Auth
3. Change PIN navigates to PIN change screen (non-functional)
4. Biometric Login toggle defaults to ON — toggling has no real effect
5. Two-Factor Auth toggle defaults to OFF — toggling has no real effect
6. Active Sessions section shows 3 sessions with device, location, time
7. Current session marked with "Current" badge
8. Non-current sessions have a logout button to terminate
9. Login History section shows 4 entries with date, time, device, and status
10. Failed logins shown with red "Failed" badge

### Flow 3: Profile Management
1. User navigates to `/profile`
2. System shows user avatar (initials "JD"), name, email, username
3. "Edit Profile" button navigates to `/edit-profile`
4. Settings menu shows 6 items: Security, Manage Beneficiaries, Generate Statement, KYC Verification, Help & Support, About DeeX
5. KYC item shows "Verified" badge
6. All items navigate to their respective pages
7. "Log Out" button at bottom navigates to `/login`

### Flow 4: Edit Profile
1. User navigates to `/edit-profile`
2. System shows avatar with "Tap to change photo" (non-functional)
3. Non-editable fields (locked): First Name, Last Name, Email, Date of Birth
4. Editable fields: Username, Phone Number
5. "Save Changes" button shows toast notification and returns to profile
6. No actual data persistence

### Flow 5: Manage Beneficiaries
1. User navigates to `/bank-accounts`
2. System shows 3 tabs: Banks, Wallets, Bills
3. Banks tab: shows 3 bank accounts with default/verified status
   - Can set default, remove banks
   - "Add Bank Account" expands inline form
4. Wallets tab: shows 3 saved wallet addresses
   - Can remove wallets
   - "Add Wallet Address" expands inline form
5. Bills tab: shows 3 bill beneficiaries
   - Can remove beneficiaries
   - "Add Bill Beneficiary" expands inline form
6. All changes are local state only — no persistence

### Flow 6: Generate Statement
1. User navigates to `/generate-statement`
2. User can generate transaction statements (non-functional in current implementation)

### Flow 7: About DeeX
1. User navigates to `/about`
2. System shows DeeX logo, version (2.4.1), build (#1842)
3. Platform description displayed
4. 3 policy links: Terms of Service, Privacy Policy, AML Policy
5. All policy links have empty `onClick` handlers (non-functional)
6. Copyright notice: "© 2026 DeeX Technologies Ltd."

## 6. Functional Requirements
- **FR-001**: Notifications must display login, session, and promotional types
- **FR-002**: Login notifications must confirm successful login with timestamp
- **FR-003**: Session notifications must indicate terminated sessions with device info
- **FR-004**: Promotional notifications must support rich text with emojis
- **FR-005**: Security settings must include Change PIN, Biometric Login, and 2FA options
- **FR-006**: Biometric Login toggle must persist state within session
- **FR-007**: Two-Factor Auth toggle must persist state within session
- **FR-008**: Active Sessions must show device, location, and last activity time
- **FR-009**: Current session must be clearly marked and non-terminable
- **FR-010**: Non-current sessions must be terminable via logout button
- **FR-011**: Login History must show date, time, device, and success/failure status
- **FR-012**: Profile must display user avatar, name, email, and username
- **FR-013**: Edit Profile must lock First Name, Last Name, Email, and Date of Birth
- **FR-014**: Edit Profile must allow editing Username and Phone Number
- **FR-015**: Beneficiaries must support 3 types: Banks, Wallets, Bills
- **FR-016**: Bank accounts must support default designation and verification status
- **FR-017**: Wallet addresses must support labels and network specification
- **FR-018**: Bill beneficiaries must support type (Airtime, Data, Electricity, Betting)
- **FR-019**: Add beneficiary must expand inline form within each tab
- **FR-020**: About page must display version number and build number
- **FR-021**: Policy links (Terms, Privacy, AML) must be displayed (currently non-functional)

## 7. Non-Functional Requirements
- **NFR-001**: All settings pages must use `MobileLayout` with `hideNav`
- **NFR-002**: Toggle switches must use custom component with smooth animation
- **NFR-003**: Session and login history must use consistent card styling (`bg-secondary rounded-xl`)
- **NFR-004**: Beneficiary tabs must use 3-tab layout with `bg-secondary` container
- **NFR-005**: Locked fields must use `bg-muted` with Lock icon indicator
- **NFR-006**: All pages must use `PageTransition` for smooth navigation
- **NFR-007**: NewBadge component must be displayed on new features (Security, Beneficiaries, etc.)
- **NFR-008**: Toast notifications must use Sonner for all save/remove actions

## 8. Edge Cases / Unhappy Paths
- Notifications have no "mark as read" functionality — all notifications appear the same
- No notification count badge on the notification bell icon
- Biometric toggle state doesn't persist across sessions
- 2FA toggle doesn't actually enable any 2FA mechanism
- Session termination button doesn't actually terminate sessions
- Login history shows "Unknown Device" for failed logins — no IP address shown
- Profile photo change is non-functional (no camera/gallery integration)
- First Name, Last Name, Email, DOB are locked — no request flow to change them
- Beneficiary "Verify & Add" doesn't actually verify account numbers
- No duplicate beneficiary detection
- No pagination for beneficiaries (assumes small lists)
- Policy links have empty `onClick` handlers — no web view or navigation
- Generate Statement page exists but is non-functional
- No notification preferences (can't opt out of promotional notifications)
- No push notification configuration
- No notification deletion or clearing

## 9. Acceptance Criteria
Given I am on the notifications screen
When I view the notification list
Then I see 7 notifications including login alerts, session terminations, and promotional messages

Given I am on the security settings screen
When I view active sessions
Then I see 3 sessions with one marked as "Current"

Given I am on the security settings screen
When I toggle Biometric Login
Then the toggle visually changes state

Given I am on the edit profile screen
When I view the fields
Then First Name, Last Name, Email, and Date of Birth are locked with a lock icon

Given I am on the beneficiaries screen
When I switch between tabs
Then I see Banks, Wallets, and Bills with their respective saved entries

Given I am on the about page
When I view the policy links
Then I see Terms of Service, Privacy Policy, and AML Policy (non-functional)

## 10. API / Data Requirements
### Real APIs (from backend)
- `GET /notifications` — List user notifications (needs to be built)
- `PUT /notifications/:id/read` — Mark notification as read (needs to be built)
- `DELETE /notifications` — Clear all notifications (needs to be built)
- `POST /auth/change-pin` — Change user PIN (needs to be built)
- `POST /auth/biometric/enable` — Enable biometric authentication (needs to be built)
- `POST /auth/2fa/enable` — Enable two-factor authentication (needs to be built)
- `POST /auth/2fa/verify` — Verify 2FA setup (needs to be built)
- `GET /auth/sessions` — List active sessions (needs to be built)
- `DELETE /auth/sessions/:id` — Terminate a session (needs to be built)
- `GET /auth/login-history` — Get login history (needs to be built)
- `GET /users/profile` — Get user profile (needs to be built)
- `PUT /users/profile` — Update editable profile fields (needs to be built)
- `POST /users/avatar` — Upload profile photo (needs to be built)
- `GET /beneficiaries/banks` — List saved bank accounts (needs to be built)
- `POST /beneficiaries/banks` — Add bank account (needs to be built)
- `PUT /beneficiaries/banks/:id/default` — Set default bank (needs to be built)
- `DELETE /beneficiaries/banks/:id` — Remove bank account (needs to be built)
- `GET /beneficiaries/wallets` — List saved wallet addresses (needs to be built)
- `POST /beneficiaries/wallets` — Add wallet address (needs to be built)
- `DELETE /beneficiaries/wallets/:id` — Remove wallet address (needs to be built)
- `GET /beneficiaries/bills` — List saved bill beneficiaries (needs to be built)
- `POST /beneficiaries/bills` — Add bill beneficiary (needs to be built)
- `DELETE /beneficiaries/bills/:id` — Remove bill beneficiary (needs to be built)
- `POST /banks/verify` — Verify bank account number and resolve name (needs to be built)
- `GET /statements/generate` — Generate transaction statement (needs to be built)
- `GET /legal/terms` — Get terms of service (needs to be built)
- `GET /legal/privacy` — Get privacy policy (needs to be built)
- `GET /legal/aml` — Get AML policy (needs to be built)

### Mocked APIs (frontend only)
- Notifications: 7 hardcoded entries in `Notifications.tsx:5-13`
- Sessions: 3 hardcoded entries in `SecuritySettings.tsx:8-12`
- Login history: 4 hardcoded entries in `SecuritySettings.tsx:14-19`
- Biometric state: `useState(true)` in `SecuritySettings.tsx:22`
- 2FA state: `useState(false)` in `SecuritySettings.tsx:23`
- Profile data: hardcoded "John Doe", "johndoe@email.com", "@johndoe" in `Profile.tsx`
- Edit profile: hardcoded values in `EditProfile.tsx:11-16`
- Banks: 3 entries in `BankAccounts.tsx:12-16`
- Wallets: 3 entries in `BankAccounts.tsx:18-22`
- Bills: 3 entries in `BankAccounts.tsx:24-28`
- About page: version "2.4.1", build "#1842" in `AboutDeeX.tsx:28-29`
- Policy links: empty `onClick` handlers in `AboutDeeX.tsx:11-13`
- All state managed in React `useState` — no persistence for most settings

### Missing APIs
- Push notification service integration (FCM, APNs)
- Notification preferences management
- Real biometric authentication (WebAuthn)
- Real 2FA setup (TOTP, SMS, email)
- Session management with real token invalidation
- Profile photo upload to cloud storage
- Bank account verification via NIBSS
- Statement generation (PDF download)
- Legal document hosting and versioning
- Notification read/unread state tracking
- Notification categorization and filtering

## 11. UI/UX Notes
- Notifications use a single card with `bg-card rounded-2xl` containing all items
- Each notification is separated by `h-px bg-border` dividers
- Promotional notifications use `text-warning` for title color
- Security toggle uses custom component with `w-11 h-6` pill shape
- Active sessions use `bg-secondary` cards with device icon and location
- Current session shows green "Current" badge
- Failed logins show red "Failed" badge with `bg-destructive/20`
- Profile uses centered avatar with `w-20 h-20 rounded-full`
- Settings items use `bg-secondary` cards with icon, label, and chevron
- Edit profile locked fields use `bg-muted` with Lock icon in label
- Beneficiary tabs use 3-tab layout with `bg-secondary rounded-xl` container
- Bank cards show `border-primary` for default accounts
- Verification status shown with CheckCircle2 (verified) or warning badge (pending)
- About page uses centered layout with large "DX" avatar
- All policy links have ChevronRight icon but no action
- NewBadge appears on Security, Beneficiaries, Generate Statement, KYC, Support, About

## 12. Metrics / Success Criteria
- Number of notifications per user per day
- Notification open rate
- Biometric login adoption rate
- 2FA enablement rate
- Active session count per user
- Failed login attempt rate
- Profile update frequency
- Average number of saved beneficiaries per user
- Bank account verification success rate
- Statement generation usage rate
- Support ticket volume
- Policy page view rate
