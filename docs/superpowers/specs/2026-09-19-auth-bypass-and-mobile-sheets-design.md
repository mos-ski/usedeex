# Auth Bypass and Mobile UI Refresh Design

## Scope

This change removes the prototype authentication experience, sends all website authentication calls to action directly to the dashboard, refreshes the invite-code prompt, redesigns only the initial Naira Wallet creation screen, and replaces the Activity status popover with a complete transaction-filter bottom sheet.

The existing Naira Wallet home and top-up screens remain unchanged.

## Authentication removal

- Delete the `Login`, `SignUp`, and `PinLock` page components.
- Remove their imports from the route configuration.
- Keep `/login`, `/signup`, and `/pin` as compatibility routes that redirect to `/dashboard`, so saved or external links do not produce a 404.
- Change every marketing-site Login, Sign Up, Create a Free Account, and Create Merchant Account action to `/dashboard`.
- Change remaining in-app links that previously returned to login, including onboarding completion and logout-style actions, to `/dashboard`.

## Invite-code modal

The modal variant of `InviteCodeInput` will use the app's current light DeeX design system and `font-roboto`. It will be presented as a mobile bottom sheet and centered dialog on larger screens, with:

- a white surface, rounded top corners, drag handle, and accessible title;
- concise supporting copy and a single invite-code field;
- DeeX blue primary action and brand token colors;
- inline validation, loading, and success states;
- the existing mock-code behavior and non-modal variants preserved.

## Initial Naira Wallet creation screen

Only the `requirements` state of `NairaWallet` will be redesigned. It will use the light app canvas, Roboto typography, DeeX brand tokens, compact header, white information card, consistent form fields, and a full-width DeeX blue action. Existing field collection, validation, toast, navigation, and post-creation wallet behavior remain intact.

## Activity filter sheet

Replace the small status popover with a drawer matching the supplied mobile reference and the existing bill picker behavior. The sheet will contain:

- Category: All, Sell, Deposit, Swap, Withdraw;
- Status: All, Completed, Pending, Failed;
- Date range: All time, Last week, Last month, Last 3 months, Custom;
- rounded selectable pills using DeeX blue for the active state and a pale blue inactive state;
- Reset and Apply buttons fixed at the bottom of the sheet content.

Selections are edited as draft state while the sheet is open. `Apply` commits them and closes the sheet; `Reset` restores all groups to their defaults. Filtering will operate against transaction metadata. The current top-level Crypto/Giftcards/Bills/Payouts tabs remain available and continue to define the displayed product family.

Because the mock data currently contains Success rather than Completed, the UI label `Completed` maps to the existing `Success` transaction state. Empty results use the existing empty-state component. Custom date range is represented as a selectable option in this prototype; no calendar picker is added.

## Responsive behavior and accessibility

- Mobile uses bottom sheets; larger screens retain a constrained centered sheet/dialog width.
- Interactive controls remain keyboard accessible with labels and selected-state semantics.
- Existing responsive dashboard layouts and unrelated flows are not changed.

## Verification

- Type-check/build the application.
- Run the existing automated test suite and lint, reporting any pre-existing failures separately.
- Verify no source references remain to deleted auth components.
- Verify all former auth URLs and website auth CTAs resolve to `/dashboard`.
- Visually inspect the dashboard invite modal, Naira Wallet creation screen, and Activity filter sheet at a mobile viewport.
