import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { ActionTile, AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import FloatingNav from "@/components/dashboard/FloatingNav";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  DeexTagIcon,
  BookOpenIcon,
  CursorClickIcon,
  DownloadIcon,
  GiftBoxIcon,
  GiftCardIcon,
  HeartsIcon,
  LinkIcon,
  PercentIcon,
  PhoneCallIcon,
  PhoneDeviceIcon,
  SendIcon,
  SignalIcon,
  SwapIcon,
  TagIcon,
  WebcamIcon,
} from "@/components/dashboard/icons";

type Tile = { label: string; path: string; Icon: (props: { className?: string }) => JSX.Element };

const groups: { title: string; tiles: Tile[] }[] = [
  {
    title: "Spend your Crypto",
    tiles: [
      { label: "Receive", path: "/deposit", Icon: DownloadIcon },
      { label: "Send", path: "/send-money", Icon: SendIcon },
      { label: "Buy", path: "/deposit", Icon: ArrowDownLeftIcon },
      { label: "Swap Coins", path: "/swap-crypto", Icon: SwapIcon },
      { label: "DeeX Pay", path: "/sell-crypto", Icon: TagIcon },
      { label: "Get Link", path: "/payment-link", Icon: LinkIcon },
      { label: "DeeX Tag", path: "/deex-tag", Icon: DeexTagIcon },
      { label: "Sell", path: "/sell-crypto", Icon: ArrowUpRightIcon },
    ],
  },
  {
    title: "Trade Giftcards",
    tiles: [
      { label: "Sell Giftcards", path: "/giftcards", Icon: GiftBoxIcon },
      { label: "Buy Gift Card", path: "/giftcards", Icon: GiftCardIcon },
      { label: "Generate", path: "/generate-statement", Icon: BookOpenIcon },
    ],
  },
  {
    title: "Get Reward",
    tiles: [
      { label: "Rewards", path: "/rewards", Icon: HeartsIcon },
      { label: "Earnings", path: "/rewards?tab=earnings", Icon: PercentIcon },
      { label: "Redeem", path: "/rewards?view=redeem", Icon: CursorClickIcon },
    ],
  },
  {
    title: "Your Bills",
    tiles: [
      { label: "Airtime", path: "/bills/airtime", Icon: PhoneCallIcon },
      { label: "Data", path: "/bills/data", Icon: PhoneDeviceIcon },
      { label: "Electricity", path: "/bills/electricity", Icon: SignalIcon },
      { label: "Betting", path: "/bills/betting", Icon: WebcamIcon },
    ],
  },
];

const MenuPage = () => {
  const navigate = useNavigate();

  const renderGroup = ({ title, tiles }: (typeof groups)[number]) => (
    <SectionCard key={title} className="px-4">
      <SectionHeader title={title} />
      <div className="grid grid-cols-4 gap-1 lg:gap-2">
        {tiles.map((tile) => (
          <ActionTile key={tile.label} label={tile.label} Icon={tile.Icon} onClick={() => navigate(tile.path)} />
        ))}
      </div>
    </SectionCard>
  );

  return (
    <AppShell>
      <PageTransition>
        <div className="mb-3 bg-white lg:mb-0 lg:bg-transparent">
          <PageHeader title="Menu" onBack={() => navigate(-1)} />
        </div>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
          <div className="flex flex-col gap-3 lg:gap-5">{groups.slice(0, 2).map(renderGroup)}</div>
          <div className="flex flex-col gap-3 lg:gap-5">{groups.slice(2).map(renderGroup)}</div>
        </div>
      </PageTransition>

      <FloatingNav />
    </AppShell>
  );
};

export default MenuPage;
