Add wallet address visibility on the admin user detail page in two places:

## 1. Holding Balance tab — show the user's wallet address per asset

Update `src/data/adminMockData.ts → holdingBalance` so each entry includes the network and deposit address used to receive that asset, e.g.:
- BTC → `network: "Bitcoin"`, `address: "bc1q…"`
- ETH → `network: "ERC20"`, `address: "0x…"`
- USDT → multiple networks (ERC20 + TRC20) so the table can show both addresses for the same asset
- SOL → `network: "Solana"`
- DOGE → `network: "Dogecoin"`

In `src/pages/AdminUserDetail.tsx` Holding Balance table:
- Add two new columns: **Network** and **Wallet Address**
- Render the address truncated (first 8 / last 6) with the existing `CopyButton` next to it
- For USDT (multi-network), render one row per network so each address is independently visible/copyable

## 2. Transactions tab — show the wallet address used for OTC

Extend `userTransactions` entries that are OTC-related (`channel: "order"` with `type: "Sell"`, and `channel: "wallet"` deposits feeding sells) with:
- `network: string` (e.g. "TRC20", "ERC20", "Bitcoin")
- `walletAddress: string` — the deposit address the customer sent crypto into for that OTC sell

In the Transactions table:
- Add a **Wallet Address** column showing `network` as a small chip above a truncated address with `CopyButton`
- For non-crypto rows (e.g. Payout in NGN), render `—`

## Mobile / responsive

The Transactions and Holding Balance tables on this page use the plain `Table` component (not `ResponsiveTable`). Keep that as-is — only add the new columns. Wrap each table in the existing `overflow-x-auto` container so the extra column doesn't break mobile layout.

## Technical notes

- Files touched:
  - `src/data/adminMockData.ts` — extend `holdingBalance` shape, extend `userTransactions` shape
  - `src/pages/AdminUserDetail.tsx` — add columns + render logic in both Holding Balance and Transactions tables
- No backend / business-logic changes; mock data only.
- Reuse existing `CopyButton` from `AdminUtils` for address copy affordance.
- Truncation helper: inline `${addr.slice(0,8)}…${addr.slice(-6)}` rendered in `font-mono text-xs`.
