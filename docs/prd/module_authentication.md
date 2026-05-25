# Module: Authentication

## 1. Overview
The Authentication module handles user onboarding, account creation, login, and session security via a 4-digit PIN lock. It is the entry point to the DeeX platform and currently operates entirely client-side with no real backend integration. The flow consists of: onboarding slides → sign up / login → PIN lock → dashboard.

## 2. Goals & Objectives
- Provide a frictionless first-time user experience with guided onboarding
- Enable account creation and login with email/password and social providers
- Secure app access with a 4-digit PIN lock (and future biometric support)
- Track onboarding completion to avoid showing it repeatedly
- Lay the foundation for real backend authentication integration

## 3. User Personas
- **New User**: First-time visitor who needs guided onboarding and account creation
- **Returning User**: Existing user who logs in with credentials and PIN
- **Social User**: User who prefers Google/Apple sign-in (currently non-functional)
- **Switching User**: User who wants to switch accounts from the PIN lock screen

## 4. User Stories
- As a new user, I want to see what DeeX offers before signing up so that I understand the value proposition.
- As a new user, I want to create an account with my name, email, username, and password so that I can start using DeeX.
- As a returning user, I want to log in with my email and password so that I can access my account.
- As a returning user, I want to enter a 4-digit PIN so that my account is protected from unauthorized access.
- As a user, I want to skip onboarding if I've already seen it so that I don't waste time.
- As a user, I want to switch accounts from the PIN screen so that I can log in as a different user.
- As a user, I want to use Google or Apple to sign in so that I don't have to remember another password.
- As a user who forgot my password, I want to reset it so that I can regain access to my account.

## 5. User Flows
### Flow 1: First-Time Onboarding
1. User opens the app → redirected to `/onboarding`
2. User sees 3 slides: Trade Crypto, Pay Bills, Earn Rewards
3. User taps "Next" to advance through slides, or "Skip" to bypass
4. After last slide or skip, `localStorage.setItem("deex_onboarded", "1")` is set
5. User is navigated to `/login`

### Flow 2: Sign Up
1. User taps "Sign Up" from login screen → navigates to `/signup`
2. User fills in: Full Name, Email, Username, Password
3. User taps "Create Account" → navigates directly to `/dashboard`
4. No validation, no API call, no PIN setup in current implementation

### Flow 3: Login
1. User enters email and password on `/login`
2. User taps "Log In" → navigates to `/pin`
3. No credential validation occurs in current implementation

### Flow 4: PIN Lock
1. User arrives at `/pin` after login
2. Greeting shows "Welcome back, John" with hardcoded avatar "JD"
3. User enters 4-digit PIN using numeric keypad
4. Correct PIN ("1234") → navigates to `/dashboard` after 200ms delay
5. Incorrect PIN → red error dots, "Incorrect PIN. Try again." message, auto-clear after 300ms
6. User can tap fingerprint icon (non-functional) or "Switch Account" to return to `/login`

### Flow 5: Forgot Password
1. User taps "Forgot Password?" link on login screen
2. No page or action exists — link is currently non-functional

## 6. Functional Requirements
- **FR-001**: Onboarding must display 3 slides with icons, titles, and descriptions
- **FR-002**: Onboarding completion must be persisted via localStorage key `deex_onboarded`
- **FR-003**: Login form must accept email and password inputs with show/hide toggle
- **FR-004**: Sign up form must accept full name, email, username, and password inputs
- **FR-005**: PIN lock must validate against a hardcoded 4-digit PIN ("1234")
- **FR-006**: PIN lock must display visual feedback (dots) for each entered digit
- **FR-007**: PIN lock must show error state with red styling for incorrect entries
- **FR-008**: PIN lock must provide delete/backspace functionality
- **FR-009**: PIN lock must provide a "Switch Account" option to return to login
- **FR-010**: Google and Apple social login buttons must be displayed (currently non-functional)
- **FR-011**: "Forgot Password?" link must be displayed on the login screen (currently non-functional)

## 7. Non-Functional Requirements
- **NFR-001**: Onboarding must be skippable and completion state must persist across sessions
- **NFR-002**: All auth screens must use the MobileLayout component for consistent framing
- **NFR-003**: Page transitions must use the PageTransition component for smooth animations
- **NFR-004**: PIN entry must be responsive with no more than 200ms delay on correct entry
- **NFR-005**: All text inputs must support the platform's dark/light theme via CSS variables
- **NFR-006**: The PIN keypad must be accessible with proper touch targets (minimum 44px)

## 8. Edge Cases / Unhappy Paths
- User enters PIN with more than 4 digits — keypad ignores additional input
- User enters wrong PIN — error shows briefly then auto-clears, no lockout mechanism
- User navigates directly to `/dashboard` without auth — no route guard exists
- User refreshes the page — no session persistence, user must re-authenticate
- Forgot password link has no destination page
- Social login buttons have no OAuth integration
- No email verification flow exists
- No password strength requirements or validation

## 9. Acceptance Criteria
Given I am a first-time user
When I open the app
Then I see the onboarding slides and can navigate through them or skip

Given I am on the login screen
When I enter any email and password and tap "Log In"
Then I am taken to the PIN lock screen

Given I am on the PIN lock screen
When I enter "1234"
Then I am navigated to the dashboard after a brief delay

Given I am on the PIN lock screen
When I enter an incorrect PIN
Then I see an error message and the input clears automatically

Given I am on the sign-up screen
When I tap "Create Account"
Then I am navigated directly to the dashboard without validation

## 10. API / Data Requirements
### Real APIs (from backend)
- `POST /auth/register` — User registration (needs to be built)
- `POST /auth/login` — Email/password authentication (needs to be built)
- `POST /auth/social/google` — Google OAuth (needs to be built)
- `POST /auth/social/apple` — Apple Sign-In (needs to be built)
- `POST /auth/forgot-password` — Password reset request (needs to be built)
- `POST /auth/verify-pin` — PIN verification (needs to be built)
- `POST /auth/change-pin` — PIN change (needs to be built)
- `GET /auth/session` — Session validation (needs to be built)

### Mocked APIs (frontend only)
- PIN validation: hardcoded string comparison against `"1234"` in `PinLock.tsx:11`
- Onboarding state: `localStorage.getItem/setItem("deex_onboarded")` in `Onboarding.tsx:18`
- Login: no validation, direct navigation in `Login.tsx:13`
- Sign up: no validation, direct navigation in `SignUp.tsx:45`
- User identity: hardcoded "John Doe", "JD", "johndoe@email.com" across components

### Missing APIs
- Route guards / auth middleware to protect `/dashboard` and other authenticated routes
- Session persistence (JWT tokens, refresh tokens)
- Email verification flow
- Password reset flow
- Social OAuth integration
- PIN setup during registration (PIN is assumed to exist)
- Biometric authentication (WebAuthn / device biometrics)
- Account switching with session management
- Rate limiting on PIN attempts (no lockout after failed attempts)

## 11. UI/UX Notes
- Onboarding uses large centered icons (Coins, CreditCard, Gift from lucide-react) with colored backgrounds
- Login and SignUp share identical styling: 3xl bold "DeeX" logo, muted subtitle, full-width inputs with `bg-secondary` and `rounded-xl`
- PIN lock uses a 3×4 grid keypad with `w-16 h-16 rounded-2xl` buttons and active scale animation
- The fingerprint button on PIN lock is purely decorative (no WebAuthn integration)
- Default PIN hint ("Default PIN: 1234") is shown to users — must be removed in production
- Social login buttons use inline SVGs for Google and Apple logos
- All auth screens use `MobileLayout` with `hideNav` prop
- The hardcoded user "John Doe" appears on the PIN lock screen — must be replaced with real user data

## 12. Metrics / Success Criteria
- Onboarding completion rate (users who reach login from onboarding)
- Onboarding skip rate (users who tap "Skip")
- Sign-up to dashboard conversion rate
- Login success rate (successful PIN entries / total attempts)
- Average time from app open to dashboard access
- Failed PIN attempt rate (indicator of forgotten PINs)
- Social login adoption rate (once implemented)
- Password reset usage rate (once implemented)
