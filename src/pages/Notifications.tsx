import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard } from "@/components/dashboard/AppShell";
import { cn } from "@/lib/utils";

type Kind = "reward" | "login" | "session" | "promo";

const notifications: { id: number; title: string; message: string; time: string; type: Kind }[] = [
  { id: 0, title: "You earned 200 DeeXpoints! 🎁", message: "Your first deposit unlocked the deposit reward from your invite code DX-WELCOME500.", time: "Today 3:12 PM", type: "reward" },
  { id: 1, title: "Login Notification", message: "You just successfully logged into your account. Happy trading!", time: "Today 1:43 PM", type: "login" },
  { id: 2, title: "Session Terminated", message: "Your previous session on device Galaxy S10 was terminated due to a new login from another device.", time: "Today 1:43 PM", type: "session" },
  { id: 3, title: "Login Notification", message: "You just successfully logged into your account. Happy trading!", time: "Today 1:43 PM", type: "login" },
  { id: 4, title: "Session Terminated", message: "Your previous session on device Galaxy S10 was terminated due to a new login from another device.", time: "Today 1:43 PM", type: "session" },
  { id: 5, title: "CRYPTO TO NAIRA SIMPLIFIED. ⚡", message: "You're just a few taps away Login to trade your crypto the easy way. 🎆", time: "Today 1:31 PM", type: "promo" },
  { id: 6, title: "THE DAY ISN'T OVER YET 🌙", message: "Deex is always open for you. Flip your crypto and get paid instantly. ⚡", time: "Yesterday 7:36 PM", type: "promo" },
  { id: 7, title: "SHARP ON WEEKDAYS, EVEN SHARPER ON WEEKENDS 😂", message: "Weekend vibes + DeeX rates = easy money. Trade now!", time: "Yesterday 2:15 PM", type: "promo" },
];

const tabs = [
  { id: "all", label: "All" },
  { id: "reward", label: "Rewards" },
  { id: "promo", label: "Offers" },
] as const;

const titleTone: Record<Kind, string> = {
  reward: "text-brand-successText",
  promo: "text-brand-amberBrown",
  login: "text-brand-grey900",
  session: "text-brand-grey900",
};

const Notifications = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");

  const visible = useMemo(
    () => (tab === "all" ? notifications : notifications.filter((n) => n.type === tab)),
    [tab],
  );

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Notifications" onBack={() => navigate(-1)} />

        <SectionCard className="px-4 py-3">
          <div role="tablist" aria-label="Filter notifications" className="flex items-center gap-3 rounded bg-brand-barBg p-0.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "shrink-0 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                  tab === t.id ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-0">
          {visible.length === 0 ? (
            <p className="py-12 text-center text-sm text-brand-bodyText">Nothing here yet.</p>
          ) : (
            visible.map((n, index) => (
              <div
                key={n.id}
                className={cn("flex flex-col gap-1 py-4", index < visible.length - 1 && "border-b border-brand-grey100")}
              >
                <p className={cn("text-[15px] font-semibold leading-[1.4]", titleTone[n.type])}>{n.title}</p>
                <p className="text-sm leading-[1.6] text-brand-bodyText">{n.message}</p>
                <p className="text-xs leading-[1.3] text-brand-grey400">{n.time}</p>
              </div>
            ))
          )}
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default Notifications;
