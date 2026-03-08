const CRYPTO_LOGOS: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  USDC: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  BNB: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  TRX: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
  DOGE: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  XRP: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  LTC: "https://assets.coingecko.com/coins/images/2/small/litecoin.png",
};

const CRYPTO_COLORS: Record<string, string> = {
  BTC: "bg-[#F7931A]",
  ETH: "bg-[#627EEA]",
  USDT: "bg-[#26A17B]",
  USDC: "bg-[#2775CA]",
  SOL: "bg-[#9945FF]",
  BNB: "bg-[#F3BA2F]",
  TRX: "bg-[#EF0027]",
  DOGE: "bg-[#C2A633]",
};

interface CryptoIconProps {
  symbol: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-16 h-16" };
const textMap = { sm: "text-[8px]", md: "text-xs", lg: "text-lg" };

const CryptoIcon = ({ symbol, size = "md", className = "" }: CryptoIconProps) => {
  const key = symbol.toUpperCase();
  const logo = CRYPTO_LOGOS[key];
  const bg = CRYPTO_COLORS[key] || "bg-muted";

  if (logo) {
    return (
      <div className={`${sizeMap[size]} rounded-full ${bg} flex items-center justify-center overflow-hidden ${className}`}>
        <img src={logo} alt={key} className="w-[70%] h-[70%] object-contain" onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="${textMap[size]} font-bold text-white">${key.charAt(0)}</span>`;
        }} />
      </div>
    );
  }

  return (
    <div className={`${sizeMap[size]} rounded-full ${bg} flex items-center justify-center ${className}`}>
      <span className={`${textMap[size]} font-bold text-white`}>{key.charAt(0)}</span>
    </div>
  );
};

export default CryptoIcon;
