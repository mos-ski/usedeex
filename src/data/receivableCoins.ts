import type { PickableCoin } from "@/components/dashboard/CoinPicker";

/**
 * Coins the wallet can receive, shared by the Dashboard's deposit sheet and
 * the Receive screen. Balances mirror the Wallet list so the two agree.
 */
export type ReceivableCoin = PickableCoin & { address: string };

export const receivableCoins: ReceivableCoin[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    usd: 2280.12,
    address: "0x4867a91f8b622c9d1a5e0f3b87fa3c3a0f40f8",
    networks: ["BEP20", "Bitcoin Mainnet", "Lightning"],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    usd: 487.5,
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68",
    networks: ["ERC20", "BEP20", "Arbitrum"],
  },
  {
    symbol: "USDT",
    name: "Tether",
    usd: 5420,
    address: "0xD31f1Ec12bd7AaBA453Ff6d1a2b90c7D46d6cc11",
    networks: ["BEP20", "ERC20", "TRC20", "Solana"],
  },
  {
    symbol: "USDC",
    name: "US Dollar Coin",
    usd: 2100,
    address: "0x892d35Cc6634C0532925a3b844Bc9e7595f2bD12",
    networks: ["ERC20", "BEP20", "Solana"],
  },
  {
    symbol: "TRX",
    name: "Tron",
    usd: 168,
    address: "TJmVQ7xk2vGZ4pW8sN1cRb3dLh9fUyE6aQ",
    networks: ["TRC20"],
  },
];
