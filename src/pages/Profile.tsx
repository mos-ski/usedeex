import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, SectionCard } from "@/components/dashboard/AppShell";
import FloatingNav from "@/components/dashboard/FloatingNav";
import { SettingsRow, Toggle } from "@/components/dashboard/SettingsList";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ArrowLeftIcon,
  CardEditIcon,
  CaretRightIcon,
  CopyLinearIcon,
  EditPencilIcon,
  LockIcon,
  LogOutIcon,
  MessageQuestionIcon,
  MoonIcon,
  NotificationIcon,
  PeopleIcon,
  ReceiptIcon,
  VerifyIcon,
} from "@/components/dashboard/icons";

const account = {
  name: "Precious Ossai",
  email: "preciystar01@gmail.com",
  initials: "AB",
  tag: "@Moski",
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
  { title: "Refer & Earn", detail: "Refer friends and earn commission", path: "/rewards", Icon: PeopleIcon },
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
    <span className="text-[10px] leading-[1.6] text-brand-grey900">{label}</span>
  </button>
);

/** Account (Figma 302:33609). */
const Profile = () => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const copyTag = () => {
    navigator.clipboard?.writeText(account.tag);
    toast.success("DeeX tag copied");
  };

  return (
    <AppShell topColor="bg-brand-deepNavy" innerClassName="lg:max-w-[760px] lg:px-4">
      <PageTransition>
        <div className="bg-brand-deepNavy">
          <header className="flex h-14 items-center gap-1 px-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeftIcon className="size-6" />
            </button>
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
              <p className="text-center text-[10px] leading-[1.6] text-brand-grey600">{account.email}</p>

              <button
                type="button"
                onClick={copyTag}
                aria-label="Copy your DeeX tag"
                className="flex items-center justify-center gap-0.5 transition-opacity hover:opacity-70"
              >
                <span className="text-[10px] leading-[1.6] text-brand-grey600">DeeX tag</span>
                <span className="text-[10px] uppercase leading-[1.6] text-white">{account.tag}</span>
                <CopyLinearIcon className="size-2.5 text-brand-blue500" />
              </button>
            </div>
          </div>
        </div>

        <SectionCard className="mt-3 px-4 py-3">
          <div className="flex items-center gap-1">
            <ShortcutTile
              label="Logout"
              Icon={LogOutIcon}
              tint="bg-brand-noteDanger"
              iconColor="text-[#EB4335]"
              onClick={() => setLogoutOpen(true)}
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
          <SettingsRow
            title="Dark mode"
            detail={theme === "dark" ? "On — matches your last choice" : "Off — using the light theme"}
            Icon={MoonIcon}
            className="border-b-0"
            trailing={<Toggle label="Dark mode" on={theme === "dark"} onToggle={toggle} />}
          />
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

      <ConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Log out?"
        message="You will need your password to sign back in."
        icon={<LogOutIcon className="size-6" />}
        confirmLabel="Yes, log me out"
        destructive
        onConfirm={() => navigate("/login")}
      />

      <FloatingNav />
    </AppShell>
  );
};

export default Profile;
