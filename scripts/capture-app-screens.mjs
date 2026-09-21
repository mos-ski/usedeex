/**
 * Captures app screens at iPhone size for the marketing pages.
 *
 *   npm run dev            # must be serving on BASE below
 *   node scripts/capture-app-screens.mjs
 *
 * Writes PNGs to src/assets/landing-v2/screens/. Re-run after a redesign so
 * the marketing site stops showing a version of the app that no longer exists.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL ?? "http://localhost:8081";
const OUT = path.resolve("src/assets/landing-v2/screens");

/** Taps the in-app keypad so an amount screen is not captured empty. */
const typeAmount = (digits) => {
  for (const digit of digits) {
    const key = [...document.querySelectorAll("button")].find(
      (b) => b.getAttribute("aria-label") === digit,
    );
    key?.click();
  }
};

/**
 * `seed` runs before the route loads, for screens needing prior state;
 * `amount` is typed on the in-app keypad after load, so amount screens are
 * not captured empty.
 */
const SCREENS = [
  { name: "dashboard", path: "/dashboard" },
  { name: "wallet", path: "/wallet" },
  { name: "swap", path: "/swap-crypto", amount: ["0", ".", "0", "1"] },
  { name: "sell", path: "/sell-crypto", amount: ["0", ".", "0", "1"] },
  { name: "bills", path: "/bills/airtime" },
  { name: "activity", path: "/activity" },
  { name: "rewards", path: "/rewards" },
  {
    name: "giftcards",
    path: "/giftcards/buy",
    seed: () => sessionStorage.setItem("deex.giftCardCountry", "US"),
  },
  { name: "send", path: "/send-money" },
  { name: "receive", path: "/deposit", state: { symbol: "BTC", network: "Bitcoin Mainnet" } },
];

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new" });

  for (const screen of SCREENS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });

    // The marketing site is light, and puppeteer defaults to dark.
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);

    // Suppress the prompts and tours that would otherwise cover the screen.
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem("deex.theme", "light");
      localStorage.setItem("deex.surveyPrompted", "asked");
      localStorage.setItem("deex.tour.swap", "seen");
      localStorage.setItem("deex_invite_code_state", JSON.stringify({ hasSeenDashboardModal: true }));
    });
    if (screen.seed) await page.evaluateOnNewDocument(screen.seed);

    await page.goto(`${BASE}${screen.path}`, { waitUntil: "networkidle0" });
    // Let the entry animation and any skeleton settle.
    await new Promise((resolve) => setTimeout(resolve, 2200));

    if (screen.amount) {
      await page.evaluate(typeAmount, screen.amount);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    const file = path.join(OUT, `${screen.name}.png`);
    await page.screenshot({ path: file });
    console.log(`captured ${screen.name}`);
    await page.close();
  }

  await browser.close();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
