import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import {
  AppShell,
  PageHeader,
  PrimaryButton,
} from "@/components/dashboard/AppShell";
import {
  AmountEntry,
  AmountShortcuts,
  parseAmount,
} from "@/components/dashboard/AmountEntry";
import AssetMark from "@/components/dashboard/AssetMark";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import {
  ChevronRightIcon,
  CaretDownIcon,
  DocumentUploadIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/dashboard/icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import GiftCardModeTabs from "@/components/dashboard/GiftCardModeTabs";
import {
  CategoryPill,
  CategorySheet,
} from "@/components/dashboard/CategoryPills";
import SelectCountryStep, {
  CountryPill,
  CountrySheet,
  useGiftCardCountry,
} from "@/components/dashboard/SelectCountryStep";
import {
  giftCardCategories,
  giftCardCountries,
  giftCardProducts,
} from "@/data/giftCardCatalog";
import { formatNgn } from "@/lib/format";
import { cn } from "@/lib/utils";

const brands = [
  "Amazon",
  "Apple",
  "Google Play",
  "Steam",
  "Walmart",
  "Nike",
  "Sephora",
  "iTunes",
  "Nordstrom",
];

/** Denominations for the picked brand, with the rate DeeX pays per dollar. */
type Denomination = { id: string; label: string; rate: number; usd: number };

const denominations: Denomination[] = [
  { id: "d10", label: "$10", rate: 200, usd: 10 },
  { id: "d25", label: "$25", rate: 210, usd: 25 },
  { id: "d50", label: "$50 - $100", rate: 230, usd: 50 },
  { id: "d100", label: "$100", rate: 240, usd: 100 },
  { id: "d500", label: "$500", rate: 240, usd: 500 },
];

const cardShortcuts = [
  { label: "$10", value: 10 },
  { label: "$25", value: 25 },
  { label: "$50", value: 50 },
  { label: "$100", value: 100 },
];
const DEEX_FEE = 50;

type Step = "brand" | "amount" | "pending";
type CardType = "physical" | "ecode";

const GiftCards = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("brand");

  const [countryCode, setCountryCode] = useGiftCardCountry();
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [cardType, setCardType] = useState<CardType>("physical");
  const [brand, setBrand] = useState("");

  const [raw, setRaw] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);

  const [denomOpen, setDenomOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const visibleBrands = useMemo(() => {
    const q = search.trim().toLowerCase();
    return giftCardProducts
      .filter(
        (p) =>
          p.countries.includes(countryCode) &&
          (categories.length === 0 || categories.includes(p.category)) &&
          (!q || p.brand.toLowerCase().includes(q)),
      )
      .map((p) => p.brand);
  }, [countryCode, categories, search]);

  /** Card value and payout derived from the denomination counts. */
  const totalUsd = denominations.reduce(
    (sum, d) => sum + (counts[d.id] ?? 0) * d.usd,
    0,
  );
  const totalNgn = denominations.reduce(
    (sum, d) => sum + (counts[d.id] ?? 0) * d.usd * d.rate,
    0,
  );

  const amount = parseAmount(raw);
  const country = giftCardCountries.find((c) => c.code === countryCode);
  /** Rate DeeX pays for this brand, in naira per dollar. */
  const rate = denominations[0].rate;
  const payout = totalNgn || amount * rate;
  const typeLabel = cardType === "physical" ? "Physical" : "e-Code";
  const title = brand
    ? `${country.flag} ${brand} - ${typeLabel}`
    : "Sell Giftcard";

  const step2 = (id: string, delta: number) =>
    setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const next = [...files].map((file) => ({
      id: `${file.name}-${file.size}-${Math.random()}`,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...next]);
  };

  const removeImage = (id: string) =>
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((i) => i.id !== id);
    });

  /* ---------------- Country (first step of both flows) ---------------- */
  if (!country) {
    return (
      <SelectCountryStep
        title="Gift Cards"
        description="Choose where your cards were bought to see the brands we take."
        open={countryOpen}
        onOpenChange={setCountryOpen}
        value={countryCode}
        onSelect={setCountryCode}
        onBack={() => navigate(-1)}
      />
    );
  }

  /* ---------------- Pending (Figma 293:16742) ---------------- */
  if (step === "pending") {
    return (
      <SuccessScreen
        tone="pending"
        title="Pending..."
        message="The trader has successfully received your cards. Funds will be sent as soon as the transaction is confirmed."
        primaryLabel="Go Home"
        onPrimary={() => navigate("/dashboard")}
        secondaryLabel="Help Center"
        onSecondary={() => navigate("/support")}
      />
    );
  }

  /* ---------------- Brand picker (Figma 291:15235) ---------------- */
  if (step === "brand") {
    return (
      <AppShell
        className="bg-brand-surface"
        innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4"
      >
        <PageTransition>
          <PageHeader title="Gift Cards" onBack={() => navigate(-1)} />

          <div className="flex flex-col gap-3 px-4">
            <GiftCardModeTabs mode="sell" />

            <div className="flex items-center justify-center gap-2">
              <CountryPill
                code={countryCode}
                onClick={() => setCountryOpen(true)}
              />
              <CategoryPill
                selected={categories}
                onClick={() => setCategoryOpen(true)}
              />
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              aria-label="Search gift cards"
              className="w-full border-b border-brand-grey100 bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
            />

            <div
              role="tablist"
              aria-label="Card type"
              className="flex items-center gap-3 rounded bg-brand-barBg p-0.5"
            >
              {(
                [
                  { key: "physical", label: "Physical card" },
                  { key: "ecode", label: "e-Code" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={cardType === key}
                  onClick={() => setCardType(key)}
                  className={cn(
                    "shrink-0 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                    cardType === key
                      ? "bg-brand-surface text-brand-blue500"
                      : "text-brand-grey900 hover:text-brand-blue500",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {visibleBrands.length === 0 ? (
              <p className="py-16 text-center text-sm text-brand-bodyText">
                No gift cards match that in {country.name}.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-px border border-brand-grey100 bg-brand-grey100">
                {visibleBrands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setBrand(b);
                      setStep("amount");
                    }}
                    aria-pressed={brand === b}
                    className={cn(
                      "flex h-20 flex-col items-center justify-center gap-1 p-3 transition-colors",
                      brand === b
                        ? "bg-brand-tint"
                        : "bg-brand-surface hover:bg-brand-grey50",
                    )}
                  >
                    <AssetMark symbol={b} className="size-8" />
                    <span className="text-center text-[10px] leading-[1.6] text-brand-grey900">
                      {b}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <p className="px-4 pt-4 text-center text-xs leading-[1.6] text-brand-bodyText">
              Note: Total denomination should match the value amount you wish to
              sell.
            </p>
          </div>
        </PageTransition>

        <CountrySheet
          open={countryOpen}
          onOpenChange={setCountryOpen}
          value={countryCode}
          onSelect={setCountryCode}
        />
        <CategorySheet
          open={categoryOpen}
          onOpenChange={setCategoryOpen}
          options={giftCardCategories}
          selected={categories}
          onChange={setCategories}
        />
      </AppShell>
    );
  }

  /* ---------------- Amount (Figma 291:15459) ---------------- */
  const reviewRows: [string, string, string?][] = [
    ["Amount", `$${totalUsd ? totalUsd.toFixed(2) : (amount || 0).toFixed(2)}`],
    ["Wallet", "Naira Wallet"],
    ["Rate", `${formatNgn(rate)}/USD`],
    ["Expected Payout", formatNgn(payout)],
    ["Bank Details", "8103674006 - PalmPay", "Precious Isioma"],
    ["DeeX Fee", formatNgn(DEEX_FEE)],
  ];

  return (
    <>
      <AmountEntry
        title={title}
        onBack={() => setStep("brand")}
        value={raw}
        onValueChange={setRaw}
        fromSymbol="USD"
        fromOptions={[{ symbol: "USD", hint: "Card value" }]}
        onFromChange={() => undefined}
        toSymbol="NGN"
        convertedText={
          payout ? Math.round(payout).toLocaleString("en-US") : "0"
        }
        footer={
          <>
            <button
              type="button"
              onClick={() => setDenomOpen(true)}
              className="flex w-full items-center gap-2 py-2 text-left"
            >
              <span className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                Range ${denominations[0].usd} - $
                {denominations[denominations.length - 1].usd}
              </span>
              <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
            </button>
            <AmountShortcuts
              balanceLabel={
                totalUsd
                  ? `Card value: $${totalUsd.toFixed(2)}`
                  : `Rate: ${formatNgn(rate)}/USD`
              }
              options={cardShortcuts}
              onPick={(value) => setRaw(value.toLocaleString("en-US"))}
            />
          </>
        }
        submitDisabled={payout <= 0}
        onSubmit={() => setReviewOpen(true)}
      />

      {/* Denominations (Figma 291:16320) */}
      <Drawer open={denomOpen} onOpenChange={setDenomOpen}>
        <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
          <DrawerTitle className="sr-only">
            Choose card denominations
          </DrawerTitle>
          <div className="mx-auto flex w-full max-w-[560px] flex-col">
            <div className="bg-brand-grey50 px-4 py-6">
              <p className="text-[19px] font-bold leading-[1.4] text-brand-grey900">
                Total card value: ${totalUsd.toFixed(2)}
              </p>
              <p className="text-xs leading-[1.3] text-brand-bodyText">
                Naira equivalent: {Math.round(totalNgn).toLocaleString("en-US")}{" "}
                NGN
              </p>
            </div>

            <div className="flex max-h-[45vh] flex-col gap-6 overflow-y-auto px-4 py-6">
              {denominations.map((d) => (
                <div key={d.id} className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                      {d.label}
                    </p>
                    <p className="text-xs leading-[1.3] text-brand-bodyText">
                      {d.rate} NGN/USD
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => step2(d.id, -1)}
                      aria-label={`Remove one ${d.label}`}
                      className="flex size-11 items-center justify-center rounded-lg bg-brand-grey100 text-brand-grey900 transition-opacity hover:opacity-80"
                    >
                      <MinusIcon className="size-6" />
                    </button>
                    <span className="flex size-11 items-center justify-center text-base font-semibold leading-[1.4] text-brand-grey900">
                      {counts[d.id] ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => step2(d.id, 1)}
                      aria-label={`Add one ${d.label}`}
                      className="flex size-11 items-center justify-center rounded-lg bg-brand-grey100 text-brand-grey900 transition-opacity hover:opacity-80"
                    >
                      <PlusIcon className="size-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pb-8 pt-6">
              <PrimaryButton
                className="font-bold"
                onClick={() => setDenomOpen(false)}
              >
                Confirm
              </PrimaryButton>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Review (Figma 291:15628) */}
      <Drawer open={reviewOpen} onOpenChange={setReviewOpen}>
        <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
          <DrawerTitle className="sr-only">Review sale</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">
              Review
            </p>
            <div className="flex flex-col">
              {reviewRows.map(([label, value, extra]) => (
                <div
                  key={label}
                  className="flex flex-col border-b border-brand-grey100 py-1.5"
                >
                  <span className="text-xs leading-[1.3] text-brand-bodyText">
                    {label}
                  </span>
                  <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                    {value}
                  </span>
                  {extra && (
                    <span className="text-xs leading-[1.3] text-brand-amberBrown">
                      {extra}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-6">
              <PrimaryButton
                className="font-bold"
                onClick={() => {
                  setReviewOpen(false);
                  setUploadOpen(true);
                }}
              >
                Confirm
              </PrimaryButton>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Upload cards (Figma 291:15850 / 291:16090) */}
      <CountrySheet
        open={countryOpen}
        onOpenChange={setCountryOpen}
        value={countryCode}
        onSelect={setCountryCode}
      />

      <Drawer open={uploadOpen} onOpenChange={setUploadOpen}>
        <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
          <DrawerTitle className="sr-only">Upload gift cards</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">
              Review
            </p>

            <div className="flex flex-col items-center gap-6 pt-2">
              <p className="w-full text-xs leading-[1.3] text-brand-bodyText">
                Please upload the Gift card you want to sell. Make sure the
                photo is clear and all necessary details are displayed. You can
                upload multiple cards.
              </p>

              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => {
                  addImages(e.target.files);
                  e.target.value = "";
                }}
              />

              {images.length === 0 ? (
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex size-[163px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-brand-grey500"
                >
                  <DocumentUploadIcon className="size-16 text-brand-grey400" />
                  <span className="rounded-lg bg-brand-primary100 px-2.5 py-[5px] text-center font-manrope text-base font-medium leading-[1.6] text-brand-blue500">
                    Upload cards
                  </span>
                </button>
              ) : (
                <div className="flex w-full flex-col items-center gap-3">
                  <div className="relative">
                    <img
                      src={images[0].url}
                      alt="Uploaded gift card"
                      className="h-[170px] w-[140px] rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(images[0].id)}
                      aria-label="Remove card"
                      className="absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-full bg-brand-surface shadow-md"
                    >
                      <Trash2 className="size-5 text-brand-danger" />
                    </button>
                  </div>

                  <div className="flex w-full flex-wrap items-center gap-2">
                    {images.map((img, i) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt=""
                        className={cn(
                          "size-[72px] rounded-lg object-cover",
                          i === 0 && "ring-2 ring-brand-blue500",
                        )}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInput.current?.click()}
                      aria-label="Add another card"
                      className="flex size-[72px] items-center justify-center rounded-lg border border-dashed border-brand-blue500 text-brand-blue500"
                    >
                      <PlusIcon className="size-6" />
                    </button>
                  </div>
                </div>
              )}

              <label className="flex w-full flex-col gap-1 border-b border-brand-grey100 p-3">
                <span className="text-xs leading-[1.3] text-brand-bodyText">
                  Add Notes
                </span>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional"
                  className="bg-transparent text-[15px] leading-[1.4] text-brand-grey900 outline-none placeholder:text-[#C9C9C9]"
                />
              </label>

              <p className="w-full rounded bg-brand-noteAmber px-2 py-0.5 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-amberBrown">
                Card denomination wrongly uploaded will be sold at its specific
                rate value
              </p>
            </div>

            <div className="pt-6">
              <PrimaryButton
                className="font-bold"
                disabled={images.length === 0}
                onClick={() => {
                  setUploadOpen(false);
                  setStep("pending");
                }}
              >
                {images.length === 0 ? "Confirm" : "Submit"}
              </PrimaryButton>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GiftCards;
