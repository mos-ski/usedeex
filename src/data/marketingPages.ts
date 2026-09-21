import type { MarketingContent } from "@/components/marketing/MarketingPage";

import screenSell from "@/assets/landing-v2/screens/sell.png";
import screenSwap from "@/assets/landing-v2/screens/swap.png";
import screenBills from "@/assets/landing-v2/screens/bills.png";
import screenGiftcards from "@/assets/landing-v2/screens/giftcards.png";
import screenRewards from "@/assets/landing-v2/screens/rewards.png";
import screenDashboard from "@/assets/landing-v2/screens/dashboard.png";
import screenActivity from "@/assets/landing-v2/screens/activity.png";
import screenWallet from "@/assets/landing-v2/screens/wallet.png";

/**
 * A page per footer link. Every one lives on the website — the footer used to
 * send visitors straight into app screens, which only works if you already
 * have an account.
 *
 * Screenshots come from `scripts/capture-app-screens.mjs`; re-run it after a
 * redesign so these stop showing an app that no longer exists.
 */
export const marketingPages: Record<string, MarketingContent> = {
  "buy-sell": {
    eyebrow: "Buy and sell",
    headline: "Trade crypto at a rate you can see",
    body: "Buy and sell Bitcoin, Ethereum, USDT and more against the naira. The rate is quoted before you commit, and payouts land in the bank account you nominate.",
    screen: screenSell,
    screenAlt: "Selling crypto on DeeX",
    features: [
      { title: "Rates up front", body: "The rate you are shown is the rate you trade at. No spread revealed after the fact." },
      { title: "Paid to your bank", body: "Proceeds settle to your Nigerian bank account, or stay in your naira wallet for the next trade." },
      { title: "Limits that grow", body: "Verify once and your daily limits open up as you move through the KYC levels." },
    ],
  },

  swap: {
    eyebrow: "Swap",
    headline: "Move between coins in a tap",
    body: "Swap one asset straight into another without cashing out to naira first. Pick what you are paying with, pick what you want, confirm.",
    screen: screenSwap,
    screenAlt: "Swapping BTC for USDT on DeeX",
    features: [
      { title: "No round trip", body: "Go from BTC to USDT directly, instead of selling to naira and buying back in." },
      { title: "See the rate first", body: "The conversion and the rate are shown before you confirm, with the fee stated plainly." },
      { title: "Settles to your wallet", body: "The asset you swapped into lands in your DeeX wallet straight away." },
    ],
  },

  bills: {
    eyebrow: "Utility and bills",
    headline: "Pay the bills from the same balance",
    body: "Airtime, data, electricity and betting top-ups, paid from your naira wallet or straight out of a crypto balance.",
    screen: screenBills,
    screenAlt: "Paying a bill on DeeX",
    features: [
      { title: "Every major provider", body: "MTN, Glo, Airtel and 9mobile, the electricity discos, and the main betting platforms." },
      { title: "One balance", body: "Pay from naira or from crypto — no moving money between apps to settle a bill." },
      { title: "Receipts that stay put", body: "Every payment keeps a receipt in your activity, ready to share or download." },
    ],
  },

  giftcards: {
    eyebrow: "Gift cards",
    headline: "Sell the cards you hold, buy the ones you need",
    body: "Trade gift cards from the countries that matter, at rates set per brand and denomination. Selling pays out in naira; buying delivers the code instantly.",
    screen: screenGiftcards,
    screenAlt: "Browsing gift cards on DeeX",
    features: [
      { title: "Priced per brand", body: "Rates differ by brand, country and denomination, and all three are shown before you trade." },
      { title: "Physical or e-code", body: "Upload the cards you are selling, or buy a code delivered to your email the moment it clears." },
      { title: "Sixteen countries", body: "US, UK, Canada, Australia and more, each with the currency the card is issued in." },
    ],
  },

  merchant: {
    eyebrow: "Merchant",
    headline: "Take crypto for what you sell",
    body: "Generate a payment link, share it with a customer, and get settled in naira. No integration work and no terminal.",
    screen: screenDashboard,
    screenAlt: "The DeeX merchant dashboard",
    features: [
      { title: "A link is enough", body: "Create a payment link for any amount and send it however you already talk to customers." },
      { title: "Settled in naira", body: "You quote in dollars, your customer pays in crypto, and you are paid out in naira." },
      { title: "Everything on record", body: "Each payment lands in your activity with a receipt, so reconciliation is not guesswork." },
    ],
    cta: {
      headline: "Sell to anyone, anywhere",
      body: "Set up a merchant account and start taking payment links today.",
      label: "Become a merchant",
      href: "/signup",
    },
  },

  about: {
    eyebrow: "About DeeX",
    headline: "Built for how Nigerians actually trade",
    body: "DeeX is one app for crypto, gift cards, bills and payouts — built so the rate is visible, the payout is quick, and nothing needs a second app to finish.",
    screen: screenWallet,
    screenAlt: "The DeeX wallet",
    features: [
      { title: "One balance, many uses", body: "Crypto, naira and gift cards sit in the same wallet, and any of them can settle a bill." },
      { title: "Priced in the open", body: "Rates are shown before a trade, not after, and fees are stated as a line you can read." },
      { title: "Verified and licensed", body: "KYC is tiered so you can start small, and limits open up as you verify." },
    ],
  },

  blog: {
    eyebrow: "Blog",
    headline: "Notes from the DeeX team",
    body: "Rate explainers, product changes and the occasional look at what is moving the Nigerian crypto market. The first posts are on the way.",
    features: [
      { title: "Product updates", body: "What shipped, what changed, and what it means for the way you trade." },
      { title: "Rate explainers", body: "Why a rate moved, and how our pricing is put together." },
      { title: "Market notes", body: "The local context behind the numbers, written for people who trade here." },
    ],
    cta: {
      headline: "Get it in your inbox",
      body: "Create an account and we will let you know when the first posts land.",
      label: "Create an account",
      href: "/signup",
    },
  },

  contact: {
    eyebrow: "Contact us",
    headline: "Talk to a person",
    body: "Support runs from inside the app, so whoever picks up can already see the trade you are asking about. Email works too.",
    features: [
      { title: "In-app chat", body: "Sign in and open Menu, then About DeeX, then Contact support." },
      { title: "support@deexoptions.com", body: "Email us and we will come back to you, usually the same working day." },
      { title: "0700 000 3339", body: "Call the support line during working hours for anything urgent." },
    ],
    cta: {
      headline: "Already have an account?",
      body: "Sign in and start a chat — support can see your trades, so there is less to explain.",
      label: "Sign in",
      href: "/login",
    },
  },

  "football-fantasy": {
    eyebrow: "Football fantasy",
    headline: "Play the season, earn as you go",
    body: "Pick a side each matchweek, climb the table against other DeeX traders, and turn your position into DeeXpoints.",
    screen: screenRewards,
    screenAlt: "Rewards on DeeX",
    features: [
      { title: "Weekly rounds", body: "A new round every matchweek, so a bad week is never the end of your run." },
      { title: "Points that spend", body: "League positions pay out in DeeXpoints, redeemable against your naira wallet." },
      { title: "Free to enter", body: "Any verified DeeX account can play. No entry fee and no stake." },
    ],
  },

  refer: {
    eyebrow: "Refer and earn",
    headline: "Bring a friend, earn on every trade",
    body: "Share your invite code. When someone signs up with it and trades, you both earn — them on their first deposit, you for as long as they keep trading.",
    screen: screenRewards,
    screenAlt: "Referrals on DeeX",
    features: [
      { title: "Both sides earn", body: "Your friend earns DeeXpoints on their first deposit and first trade. You earn on what they trade." },
      { title: "Paid in points", body: "Referral earnings arrive as DeeXpoints, which redeem straight into your naira wallet." },
      { title: "No cap", body: "Refer as many people as you like. The earnings do not stop at a threshold." },
    ],
  },

  tasks: {
    eyebrow: "DeeX tasks",
    headline: "Small jobs, real points",
    body: "Complete your profile, make a first trade, keep a sign-in streak. Each task pays DeeXpoints, and points redeem into naira.",
    screen: screenRewards,
    screenAlt: "DeeX tasks and points",
    features: [
      { title: "Earn as you set up", body: "Verification, a first deposit and a first trade each carry points." },
      { title: "Streaks count", body: "Signing in seven days running earns a point, and trading regularly earns more." },
      { title: "Redeem to naira", body: "Cash the whole balance out to your naira wallet whenever you want it." },
    ],
  },

  influencer: {
    eyebrow: "Become our influencer",
    headline: "Trade in the open, get paid for it",
    body: "If you already talk about crypto, gift cards or money in Nigeria, we will back you with a custom code, a better rate for your audience, and a share of what they trade.",
    features: [
      { title: "Your own code", body: "A vanity invite code your audience can remember, with earnings tracked against it." },
      { title: "Better for them", body: "Your audience gets a boosted sign-up bonus, not just a link with nothing behind it." },
      { title: "Paid monthly", body: "Earnings settle monthly to your naira wallet, with the trades behind them itemised." },
    ],
    cta: {
      headline: "Tell us about your audience",
      body: "Email partnerships@deexoptions.com with where you post and we will come back to you.",
      label: "Create an account first",
      href: "/signup",
    },
  },

  faq: {
    eyebrow: "FAQ",
    headline: "The questions we get asked most",
    body: "How rates are set, how long payouts take, what verification needs, and what to do when a trade does not look right.",
    screen: screenActivity,
    screenAlt: "Transaction history on DeeX",
    features: [
      { title: "How are rates set?", body: "Rates track the market and are refreshed constantly. Whatever is quoted when you confirm is the rate you get." },
      { title: "How long do payouts take?", body: "Naira payouts usually settle within minutes. Crypto withdrawals depend on the network you picked." },
      { title: "What does verification need?", body: "A valid ID and a selfie for the first level. Higher limits ask for proof of address." },
      { title: "A trade looks wrong", body: "Open the receipt in your activity and send it to support from there — they will see the same record you do." },
      { title: "Which coins are supported?", body: "BTC, ETH, USDT, USDC, SOL, TRX and DOGE today, with more added as demand shows up." },
      { title: "Is there a fee?", body: "Fees are shown as their own line on the review screen before you confirm anything." },
    ],
  },
};

/** Footer legal links render the same policies the app shows. */
export const marketingLegalSlugs = ["terms", "privacy", "compliance", "aml"] as const;
