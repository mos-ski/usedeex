# Expanded Activity History Design

## Goal

Make every Activity tab long enough for continuous scrolling by providing 30 deterministic mock transactions per category: Crypto, Giftcards, Bills, and Payouts.

## Data design

- Generate 120 stable records outside the React component so renders never change the history.
- Spread records across six recent months with realistic titles, providers, amounts, actions, statuses, hash IDs, destinations, and receipt types.
- Retain the existing transaction type and receipt shapes so row navigation continues to work.
- Keep all current category, status, date, and search filters functional.

## Interaction

- Render every monthly group in full instead of truncating it behind `See all`.
- Preserve month grouping and the current transaction row design.
- Each tab should contain enough rows to create a long mobile scroll.

## Verification

- Confirm exactly 30 transactions exist in each of the four categories.
- Run tests and the production build.
- Verify switching among all tabs displays scrollable histories.
