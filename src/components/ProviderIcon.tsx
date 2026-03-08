const PROVIDER_LOGOS: Record<string, { color: string; text: string; logo?: string }> = {
  // Telcos
  MTN: { color: "bg-[#FFCC00]", text: "text-[#003366]", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.svg/120px-New-mtn-logo.svg.png" },
  Glo: { color: "bg-[#00A651]", text: "text-white" },
  Airtel: { color: "bg-[#ED1C24]", text: "text-white" },
  "9mobile": { color: "bg-[#006B53]", text: "text-white" },
  // Electricity
  IKEDC: { color: "bg-[#E87722]", text: "text-white" },
  EKEDC: { color: "bg-[#1B3C73]", text: "text-white" },
  AEDC: { color: "bg-[#2E7D32]", text: "text-white" },
  PHED: { color: "bg-[#0D47A1]", text: "text-white" },
  BEDC: { color: "bg-[#F57C00]", text: "text-white" },
  // Betting
  Bet9ja: { color: "bg-[#0B4619]", text: "text-[#FECB00]" },
  SportyBet: { color: "bg-[#E53935]", text: "text-white" },
  "1xBet": { color: "bg-[#1A5276]", text: "text-white" },
  BetKing: { color: "bg-[#1B1464]", text: "text-[#FFD700]" },
  MSport: { color: "bg-[#FF6600]", text: "text-white" },
  // Gift cards
  Apple: { color: "bg-[#333333]", text: "text-white" },
  "Google Play": { color: "bg-[#01875F]", text: "text-white" },
  Amazon: { color: "bg-[#FF9900]", text: "text-[#232F3E]" },
  Steam: { color: "bg-[#1B2838]", text: "text-white" },
  iTunes: { color: "bg-[#EA4CC0]", text: "text-white" },
  Walmart: { color: "bg-[#0071DC]", text: "text-white" },
  Nike: { color: "bg-[#111111]", text: "text-white" },
  Sephora: { color: "bg-[#000000]", text: "text-white" },
};

interface ProviderIconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
const textSizeMap = { sm: "text-[9px]", md: "text-[10px]", lg: "text-sm" };

const ProviderIcon = ({ name, size = "md", className = "" }: ProviderIconProps) => {
  const config = PROVIDER_LOGOS[name];
  const bg = config?.color || "bg-muted";
  const textColor = config?.text || "text-foreground";
  const abbr = name.length <= 3 ? name : name.substring(0, 2).toUpperCase();

  return (
    <div className={`${sizeMap[size]} rounded-full ${bg} flex items-center justify-center shrink-0 ${className}`}>
      <span className={`${textSizeMap[size]} font-bold ${textColor} leading-none`}>{abbr}</span>
    </div>
  );
};

export default ProviderIcon;
