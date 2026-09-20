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
  GearIcon,
  GiftBoxIcon,
  GiftCardIcon,
  HeartsIcon,
  ChevronRightIcon,
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
import menuCardImage from "@/assets/cards/deex-card-menu.png";

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
      { label: "Buy Gift Card", path: "/giftcards/buy", Icon: GiftCardIcon },
      { label: "Generate", path: "/generate-statement", Icon: BookOpenIcon },
    ],
  },
  {
    title: "Get Reward",
    tiles: [
      { label: "Rewards", path: "/rewards", Icon: HeartsIcon },
      { label: "Earnings", path: "/rewards?view=history", Icon: PercentIcon },
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

  const renderCardRow = () => (
    <SectionCard className="px-4 py-3">
      <SectionHeader title="Virtual Card" />
      <button
        type="button"
        onClick={() => navigate("/virtual-cards")}
        className="flex w-full items-center justify-center gap-3 text-left"
        aria-label="Open DeeX Card"
      >
        <img
          src={menuCardImage}
          alt="DeeX card ending in 1234"
          className="h-[53px] w-[84px] shrink-0 rounded-md object-cover"
        />
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-xs font-semibold leading-[1.4] text-brand-blue500">VISA Card ***4567</span>
          <span className="text-xs leading-[1.3] text-brand-bodyText">Active</span>
        </span>
        <ChevronRightIcon className="size-[18px] shrink-0 text-brand-grey600" />
      </button>
    </SectionCard>
  );

  return (
    <AppShell>
      <PageTransition>
        <div className="mb-3 bg-brand-surface lg:mb-0 lg:bg-transparent">
          <PageHeader
            title="Menu"
            onBack={() => navigate(-1)}
            action={
              <button
                type="button"
                onClick={() => navigate("/profile")}
                aria-label="Account settings"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-brand-grey900 transition-colors hover:bg-brand-grey900/[0.04]"
              >
                <GearIcon className="size-6" />
              </button>
            }
          />
        </div>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
          <div className="flex flex-col gap-3 lg:gap-5">
            {renderGroup(groups[0])}
            {renderCardRow()}
            {renderGroup(groups[1])}
          </div>
          <div className="flex flex-col gap-3 lg:gap-5">{groups.slice(2).map(renderGroup)}</div>
        </div>
      </PageTransition>

      <FloatingNav />
    </AppShell>
  );
};

export default MenuPage;
