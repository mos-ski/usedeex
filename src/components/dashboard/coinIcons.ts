// Coin marks exported from the "New DeeX" Figma file. Shared across screens so
// every asset row, transaction row and picker draws from one set.
import btc from "@/assets/crypto/btc.svg";
import eth from "@/assets/crypto/eth.svg";
import usdt from "@/assets/crypto/usdt.svg";
import usdc from "@/assets/crypto/usdc.svg";
import trx from "@/assets/crypto/trx.svg";

export const coinIcons: Record<string, string> = { BTC: btc, ETH: eth, USDT: usdt, USDC: usdc, TRX: trx };

export { btc, eth, usdt, usdc, trx };
