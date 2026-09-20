import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell } from "@/components/dashboard/AppShell";

/**
 * Bump when the release notes change — the screen shows once per version, then
 * stays out of the way until the next release.
 */
export const WHATS_NEW_VERSION = "2026-03";
const STORAGE_KEY = "deex_whats_new_seen";

/** True when this release's notes have not been acknowledged yet. */
export const hasUnseenWhatsNew = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== WHATS_NEW_VERSION;
  } catch {
    // Private browsing can throw on access; skip the screen rather than block.
    return false;
  }
};

export const markWhatsNewSeen = () => {
  try {
    localStorage.setItem(STORAGE_KEY, WHATS_NEW_VERSION);
  } catch {
    // Non-fatal — the screen simply shows again next launch.
  }
};

const releases = [
  {
    title: "Introducing Bank Transfer!",
    body: "Now, transfer up to ₦50,000 daily seamlessly from your crypto wallet to other bank accounts, all from the convenience of your wallet.",
  },
  {
    title: "Generate Bank Statement",
    body: "Access your financial history at a glance! Generate bank statements for your transactions, and get a clear picture of your account activity. Go to Settings > Generate Statement > Export to email.",
  },
  {
    title: "Verify your phone Number",
    body: "Verify your phone number via WhatsApp to ensure secure and seamless communication. Go to Settings > Edit Profile > Verify phone No.",
  },
  {
    title: "Earn Points from Trading Streak",
    body: "Build your trading streak and earn points! Consistently trade and unlock rewards.",
  },
];

const WhatsNew = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    markWhatsNewSeen();
    navigate("/dashboard", { replace: true });
  };

  return (
    <AppShell innerClassName="flex min-h-[100dvh] flex-col px-0 pb-0 sm:pb-8 lg:max-w-[560px]">
      <PageTransition className="flex flex-1 flex-col">
        <h1 className="sr-only">What&apos;s new in DeeX</h1>

        <div className="flex flex-col gap-3 pt-4">
          {releases.map((release) => (
            <section key={release.title} className="flex flex-col gap-3 bg-brand-surface p-3">
              <div className="flex items-center justify-center gap-2.5">
                <span className="shrink-0 rounded bg-[#4B4EFC] px-1 text-[9px] font-bold leading-[1.6] text-white">
                  NEW
                </span>
                <h2 className="min-w-0 flex-1 text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                  {release.title}
                </h2>
              </div>
              <p className="text-xs leading-[1.6] text-brand-bodyText">{release.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-center py-8">
          <button
            type="button"
            onClick={handleContinue}
            className="p-2 font-manrope text-base font-semibold leading-[1.6] text-brand-blue500 transition-opacity hover:opacity-70"
          >
            Continue
          </button>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default WhatsNew;
