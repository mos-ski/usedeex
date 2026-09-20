import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, SectionCard } from "@/components/dashboard/AppShell";
import FloatingNav from "@/components/dashboard/FloatingNav";
import {
  CaretRightIcon,
  CardEditIcon,
  EditPencilIcon,
  LockIcon,
  LogOutIcon,
  MessageQuestionIcon,
  NotificationIcon,
  PeopleIcon,
  ReceiptIcon,
  VerifyIcon,
} from "@/components/dashboard/icons";

const account = {
  name: "Precious Ossai",
  email: "preciystar01@gmail.com",
  initials: "AB",
};

type Row = { title: string; detail: string; path: string; Icon: (props: { className?: string }) => JSX.Element };

/** Security Center sits on its own above the rest (Figma 302:34209 / 302:34210). */
const primaryRow: Row = {
  title: "Security Center",
  detail: "Setup 2FA, Change PIN and password",
  path: "/security",
  Icon: LockIcon,
};

const rows: Row[] = [
  { title: "Notifications", detail: "Customize notification settings", path: "/notifications", Icon: NotificationIcon },
  { title: "Bank and Cards", detail: "Generate statement", path: "/bank-accounts", Icon: CardEditIcon },
  { title: "Generate statement", detail: "Get your statement of account", path: "/generate-statement", Icon: ReceiptIcon },
  { title: "KYC Verification", detail: "Verify account", path: "/kyc", Icon: VerifyIcon },
  { title: "Refer & Earn", detail: "Refer friends and earn commission", path: "/referrals", Icon: PeopleIcon },
  { title: "About DeeX", detail: "About, Contact and Privacy Policy", path: "/about", Icon: MessageQuestionIcon },
];

const AccountRow = ({ title, detail, Icon, onClick }: Row & { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
  >
    <Icon className="size-6 shrink-0 text-brand-blue500" />
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{title}</span>
      <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{detail}</span>
    </span>
    <CaretRightIcon className="size-5 shrink-0 text-brand-grey600" />
  </button>
);

/** The two tinted shortcuts under the header (Figma 302:33675). */
const ShortcutTile = ({
  label,
  Icon,
  tint,
  iconColor,
  onClick,
}: {
  label: string;
  Icon: (props: { className?: string }) => JSX.Element;
  tint: string;
  iconColor: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-[2px] px-3 py-2 transition-opacity hover:opacity-80 ${tint}`}
  >
    <Icon className={`size-6 shrink-0 ${iconColor}`} />
    <span className="text-[10px] leading-[1.6] text-black">{label}</span>
  </button>
);

/** Account (Figma 302:33609). */
const Profile = () => {
  const navigate = useNavigate();

  return (
    <AppShell topColor="bg-brand-deepNavy" innerClassName="lg:max-w-[760px] lg:px-4">
      <PageTransition>
        <div className="bg-brand-deepNavy">
          <header className="flex h-14 items-center px-4">
            <h1 className="text-[19px] font-bold leading-[1.4] text-white">Account</h1>
          </header>

          <div className="flex flex-col items-center gap-3 px-6 py-[18px]">
            <div className="flex flex-col items-center gap-1">
              <span className="flex size-[72px] items-center justify-center rounded-full bg-brand-primary100 text-[32px] font-semibold leading-[1.4] text-brand-blue500 ring-4 ring-white">
                {account.initials}
              </span>
              <p className="max-w-[181px] text-center font-gasoek text-[33px] uppercase leading-[1.4] text-white">
                {account.name}
              </p>
              <p className="text-center text-[10px] uppercase leading-[1.6] text-brand-grey600">{account.email}</p>
            </div>
          </div>
        </div>

        <SectionCard className="mt-3 px-4 py-3">
          <div className="flex items-center gap-1">
            <ShortcutTile
              label="Logout"
              Icon={LogOutIcon}
              tint="bg-[#FEF0EF]"
              iconColor="text-[#EB4335]"
              onClick={() => navigate("/login")}
            />
            <ShortcutTile
              label="Edit Profile"
              Icon={EditPencilIcon}
              tint="bg-brand-tint"
              iconColor="text-brand-navy"
              onClick={() => navigate("/edit-profile")}
            />
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-0">
          <AccountRow {...primaryRow} onClick={() => navigate(primaryRow.path)} />
          <div className="mt-3 flex flex-col gap-2.5">
            {rows.map((row) => (
              <AccountRow key={row.title} {...row} onClick={() => navigate(row.path)} />
            ))}
          </div>
        </SectionCard>
      </PageTransition>

      <FloatingNav />
    </AppShell>
  );
};

export default Profile;
