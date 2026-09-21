import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import {
  AppShell,
  PageHeader,
  PrimaryButton,
  SectionCard,
  SectionHeader,
} from "@/components/dashboard/AppShell";
import AssetMark from "@/components/dashboard/AssetMark";
import {
  CategoryPill,
  CategorySheet,
} from "@/components/dashboard/CategoryPills";
import GiftCardModeTabs from "@/components/dashboard/GiftCardModeTabs";
import SelectCountryStep, {
  CountryPill,
  CountrySheet,
  useGiftCardCountry,
} from "@/components/dashboard/SelectCountryStep";
import ReviewSheet from "@/components/dashboard/ReviewSheet";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/dashboard/icons";
import {
  NGN_PER_CARD_CURRENCY,
  formatCardPrice,
  giftCardCategories,
  giftCardCountries,
  giftCardProducts,
  type GiftCardProduct,
} from "@/data/giftCardCatalog";
import { formatNgn } from "@/lib/format";
import { cn } from "@/lib/utils";

const DEEX_FEE = 50;

/** Label above value on a hairline, the review-row shape used app-wide. */
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col border-b border-brand-grey100 py-1.5">
    <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
    <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
      {value}
    </span>
  </div>
);

/**
 * Buy Giftcard: pick the country the card is issued in, browse what is on
 * sale there, then choose a face value and quantity. Selling is a different
 * screen entirely — that one takes cards off you (see GiftCards).
 */
const BuyGiftCard = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useGiftCardCountry();
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<GiftCardProduct | null>(null);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [countryOpen, setCountryOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bought, setBought] = useState(false);

  const country = giftCardCountries.find((c) => c.code === countryCode);

  const visible = useMemo(() => {
    if (!country) return [];
    const q = search.trim().toLowerCase();
    return giftCardProducts.filter(
      (p) =>
        p.countries.includes(country.code) &&
        (categories.length === 0 || categories.includes(p.category)) &&
        (!q || p.brand.toLowerCase().includes(q)),
    );
  }, [country, categories, search]);

  const openProduct = (next: GiftCardProduct) => {
    setProduct(next);
    setPrice(next.denominations[0]);
    setQuantity(1);
  };

  /* ---------------- Country (first step of both flows) ---------------- */
  if (!country) {
    return (
      <SelectCountryStep
        title="Gift Cards"
        description="Choose a country to see available gift cards."
        open={countryOpen}
        onOpenChange={setCountryOpen}
        value={countryCode}
        onSelect={(code) => {
          setCountryCode(code);
          setSearch("");
        }}
        onBack={() => navigate(-1)}
      />
    );
  }

  /* ---------------- Bought ---------------- */
  if (bought && product) {
    return (
      <SuccessScreen
        title="Card purchased"
        message={`Your ${product.brand} ${country.code} code has been sent to your email and saved under Activity.`}
        primaryLabel="Go Home"
        onPrimary={() => navigate("/dashboard")}
        secondaryLabel="View Activity"
        onSecondary={() => navigate("/activity")}
      />
    );
  }

  /* ---------------- Card details ---------------- */
  if (product) {
    const total = price * quantity;
    const naira = total * (NGN_PER_CARD_CURRENCY[country.currency] ?? 1);

    return (
      <>
        <AppShell
          className="bg-brand-surface"
          innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4"
        >
          <PageTransition>
            <PageHeader
              title="Gift Card Details"
              onBack={() => setProduct(null)}
            />

            <div className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-4 py-1.5">
                <AssetMark symbol={product.brand} className="size-12" />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                    {product.brand} {country.code}
                  </span>
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                    {product.brand}
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <DetailRow label="Category" value={product.category} />
                <DetailRow
                  label="Country"
                  value={`${country.flag} ${country.name}`}
                />
                <DetailRow
                  label="Currency"
                  value={`${country.currency} • ${country.currencyName}`}
                />
              </div>

              <fieldset className="border-b border-brand-grey100 py-1.5">
                <legend className="text-xs leading-[1.3] text-brand-bodyText">
                  Available prices
                </legend>
                <div className="mt-1 flex flex-wrap gap-1">
                  {product.denominations.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={value === price}
                      onClick={() => setPrice(value)}
                      className={cn(
                        "flex items-center gap-1 rounded px-1.5 text-[15px] font-semibold leading-[1.4] transition-colors",
                        value === price
                          ? "bg-brand-blue500 text-white"
                          : "bg-[#daebf7] text-brand-blue500 hover:bg-brand-primary100",
                      )}
                    >
                      {value === price && (
                        <CheckIcon className="size-3.5 shrink-0" />
                      )}
                      {formatCardPrice(value, country.currency)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col border-b border-brand-grey100 py-1.5">
                <span className="text-xs leading-[1.3] text-brand-bodyText">
                  Quantity
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Reduce quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex size-11 items-center justify-center rounded-lg bg-brand-grey100 text-brand-grey900 transition-opacity hover:opacity-80"
                  >
                    <MinusIcon className="size-6" />
                  </button>
                  <span className="flex size-11 items-center justify-center text-base font-semibold leading-[1.4] text-brand-grey900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Add one"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="flex size-11 items-center justify-center rounded-lg bg-brand-grey100 text-brand-grey900 transition-opacity hover:opacity-80"
                  >
                    <PlusIcon className="size-6" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col border-b border-brand-grey100 py-1.5">
                <span className="text-xs leading-[1.3] text-brand-bodyText">
                  Total
                </span>
                <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                  {formatCardPrice(total, country.currency)}
                </span>
                <span className="text-xs leading-[1.3] text-brand-amberBrown">
                  {formatNgn(naira)}
                </span>
              </div>

              <div className="flex flex-col pt-2">
                <SectionHeader title="Redeem instruction" />
                <p className="text-[13px] leading-[1.6] text-brand-bodyText">
                  {product.redeemInstruction}
                </p>
              </div>

              <PrimaryButton
                className="mt-4"
                onClick={() => setReviewOpen(true)}
              >
                Buy Gift Card
              </PrimaryButton>
            </div>
          </PageTransition>
        </AppShell>

        <ReviewSheet
          open={reviewOpen}
          onOpenChange={setReviewOpen}
          rows={[
            ["Card", `${product.brand} ${country.code}`],
            [
              "Face value",
              `${formatCardPrice(price, country.currency)} × ${quantity}`,
            ],
            ["Pay from", "Naira Wallet"],
            ["DeeX Fee", formatNgn(DEEX_FEE)],
            ["Total to pay", formatNgn(naira + DEEX_FEE)],
          ]}
          actionLabel="Confirm"
          onAction={() => {
            setReviewOpen(false);
            setBought(true);
          }}
        />
      </>
    );
  }

  /* ---------------- Browse ---------------- */
  return (
    <AppShell
      className="bg-brand-surface"
      innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4"
    >
      <PageTransition>
        <PageHeader title="Gift Cards" onBack={() => navigate(-1)} />

        <div className="flex flex-col gap-3 px-4">
          <GiftCardModeTabs mode="buy" />

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

          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-brand-bodyText">
              No gift cards match that in {country.name}.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-px border border-brand-grey100 bg-brand-grey100">
              {visible.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openProduct(p)}
                  className="flex h-20 flex-col items-center justify-center gap-1 bg-brand-surface p-3 transition-colors hover:bg-brand-grey50"
                >
                  <AssetMark symbol={p.brand} className="size-8" />
                  <span className="text-center text-[10px] leading-[1.6] text-brand-grey900">
                    {p.brand}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </PageTransition>

      <CategorySheet
        open={categoryOpen}
        onOpenChange={setCategoryOpen}
        options={giftCardCategories}
        selected={categories}
        onChange={setCategories}
      />

      <CountrySheet
        open={countryOpen}
        onOpenChange={setCountryOpen}
        value={countryCode}
        onSelect={setCountryCode}
      />
    </AppShell>
  );
};

export default BuyGiftCard;
