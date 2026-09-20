import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { SettingsRow, StatusPill, Toggle } from "@/components/dashboard/SettingsList";
import { FaceIdIcon, LockIcon, PhoneDeviceIcon, ClockIcon, VerifyIcon } from "@/components/dashboard/icons";
import { toast } from "sonner";

const sessions = [
  { device: "iPhone 15 Pro", location: "Lagos, NG", time: "Active now", current: true },
  { device: "Chrome on MacBook", location: "Lagos, NG", time: "2 hours ago", current: false },
  { device: "Samsung Galaxy S24", location: "Abuja, NG", time: "3 days ago", current: false },
];

const loginHistory = [
  { date: "Mar 8, 2026", time: "2:30 PM", device: "iPhone 15 Pro", status: "Success" },
  { date: "Mar 7, 2026", time: "9:15 AM", device: "Chrome on MacBook", status: "Success" },
  { date: "Mar 5, 2026", time: "11:45 PM", device: "Unknown Device", status: "Failed" },
  { date: "Mar 4, 2026", time: "8:00 AM", device: "iPhone 15 Pro", status: "Success" },
];

/** Security Center — the first row on the Account screen. */
const SecuritySettings = () => {
  const navigate = useNavigate();
  const [biometric, setBiometric] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [signedOut, setSignedOut] = useState<string[]>([]);

  const signOut = (device: string) => {
    setSignedOut((list) => [...list, device]);
    toast.success(`Signed out of ${device}`);
  };

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Security Center" onBack={() => navigate(-1)} />

        <SectionCard className="px-4 py-0">
          <SettingsRow title="Change PIN" detail="Update your 4-digit transaction PIN" Icon={LockIcon} onClick={() => navigate("/change-pin")} />
          <SettingsRow title="Change password" detail="Update your sign-in password" Icon={VerifyIcon} onClick={() => navigate("/forgot-password")} />
          <SettingsRow
            title="Biometric Login"
            detail="Use Face ID to sign in and confirm"
            Icon={FaceIdIcon}
            trailing={<Toggle label="Biometric login" on={biometric} onToggle={() => setBiometric((v) => !v)} />}
          />
          <SettingsRow
            title="Two-Factor Auth (2FA)"
            detail="Require a code on every new sign-in"
            Icon={PhoneDeviceIcon}
            className="border-b-0"
            trailing={<Toggle label="Two-factor authentication" on={twoFA} onToggle={() => setTwoFA((v) => !v)} />}
          />
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Active Sessions" />
          <div className="flex flex-col">
            {sessions.map((s) => (
              <SettingsRow
                key={s.device}
                title={s.device}
                detail={`${s.location} • ${signedOut.includes(s.device) ? "Signed out" : s.time}`}
                Icon={PhoneDeviceIcon}
                trailing={
                  s.current ? (
                    <StatusPill tone="good">Current</StatusPill>
                  ) : signedOut.includes(s.device) ? (
                    <StatusPill tone="neutral">Ended</StatusPill>
                  ) : (
                    <button type="button" onClick={() => signOut(s.device)} className="shrink-0 text-xs font-semibold text-brand-danger">
                      Sign out
                    </button>
                  )
                }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Login History" />
          <div className="flex flex-col">
            {loginHistory.map((l, index) => (
              <SettingsRow
                key={`${l.device}-${index}`}
                title={l.device}
                detail={`${l.date} • ${l.time}`}
                Icon={ClockIcon}
                trailing={<StatusPill tone={l.status === "Success" ? "good" : "bad"}>{l.status}</StatusPill>}
              />
            ))}
          </div>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default SecuritySettings;
