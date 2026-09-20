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
  EyeIcon,
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
          <div className="flex flex-col gap-3 lg:gap-5">{groups.slice(0, 2).map(renderGroup)}</div>
          <div className="flex flex-col gap-3 lg:gap-5">{groups.slice(2).map(renderGroup)}</div>
        </div>

        <SectionCard className="mt-3 px-4 lg:mt-5">
          <SectionHeader title="Virtual Card" />
          <button
            type="button"
            onClick={() => navigate("/virtual-cards")}
            className="group relative w-full overflow-hidden rounded-2xl bg-[#1d1f21] px-4 py-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue500 focus-visible:ring-offset-2"
            aria-label="Open virtual card details"
          >
            <div className="pointer-events-none absolute -right-10 -top-12 size-48 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 right-16 h-56 w-px rotate-[38deg] bg-white/20" />
            <div className="pointer-events-none absolute -bottom-20 right-28 h-56 w-px rotate-[38deg] bg-white/15" />

            <div className="relative flex items-center justify-between">
              <span className="rounded-full border border-white/40 px-3 py-1 text-[11px] font-medium tracking-wide text-white/90">
                Virtual
              </span>
              <span className="text-xs font-medium text-white/70">DeeX</span>
            </div>

            <div className="relative mt-10 flex items-end justify-between gap-3">
              <span className="text-sm font-medium text-white/90">Virtual Card *4291</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/45 px-3 py-1.5 text-xs font-medium text-white/95 transition-colors group-hover:bg-white/10">
                <EyeIcon className="size-4" />
                View details
              </span>
            </div>
          </button>
        </SectionCard>
      </PageTransition>

      <FloatingNav />
    </AppShell>
  );
};

export default MenuPage;
