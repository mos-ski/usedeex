import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import AssetMark from "@/components/dashboard/AssetMark";
import OptionSheet from "@/components/dashboard/OptionSheet";
import ReviewSheet from "@/components/dashboard/ReviewSheet";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import {
  CaretDownIcon,
  CategoryIcon,
  FlagIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/dashboard/icons";
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

const ALL_CATEGORIES = "all";
const DEEX_FEE = 50;

/** The country and category pills above the grid. */
const FilterPill = ({
  Icon,
  label,
  onClick,
}: {
  Icon: (props: { className?: string }) => JSX.Element;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-brand-grey100 bg-brand-surface px-3 py-2.5 text-left transition-colors hover:bg-brand-grey50"
  >
    <Icon className="size-4 shrink-0 text-brand-grey600" />
    <span className="min-w-0 flex-1 truncate text-sm leading-[1.6] text-brand-grey900">{label}</span>
    <CaretDownIcon className="size-3 shrink-0 text-brand-grey600" />
  </button>
);

/**
 * Buy Giftcard: pick the country the card is issued in, browse what is on
 * sale there, then choose a face value and quantity. Selling is a different
 * screen entirely — that one takes cards off you (see GiftCards).
 */
const BuyGiftCard = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
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
        (category === ALL_CATEGORIES || p.category === category) &&
        (!q || p.brand.toLowerCase().includes(q)),
    );
  }, [country, category, search]);

  const openProduct = (next: GiftCardProduct) => {
    setProduct(next);
    setPrice(next.denominations[0]);
    setQuantity(1);
  };

  /* ---------------- Bought ---------------- */
  if (bought && product && country) {
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
  if (product && country) {
    const total = price * quantity;
    const naira = total * (NGN_PER_CARD_CURRENCY[country.currency] ?? 1);

    return (
      <>
        <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
          <PageTransition>
            <PageHeader title="Gift Card Details" onBack={() => setProduct(null)} />

            <div className="flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3">
                <AssetMark symbol={product.brand} className="size-14 rounded-lg" />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-xl font-bold leading-[1.4] text-brand-grey900">
                    {product.brand} {country.code}
                  </span>
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{product.brand}</span>
                </span>
              </div>

              <div className="flex flex-col">
                {(
                  [
                    ["Category", product.category],
                    ["Country", `${country.flag} ${country.code}`],
                    ["Currency", country.currency],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-1.5">
                    <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
                    <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <p className="text-xs font-semibold leading-[1.4] text-brand-grey900">Available prices</p>
                <div className="flex flex-wrap gap-2">
                  {product.denominations.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={value === price}
                      onClick={() => setPrice(value)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-[15px] font-semibold leading-[1.4] transition-colors",
                        value === price
                          ? "bg-brand-tint text-brand-blue500 ring-1 ring-inset ring-brand-blue500"
                          : "bg-brand-grey50 text-brand-grey900 hover:bg-brand-grey100",
                      )}
                    >
                      {formatCardPrice(value, country.currency)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <p className="text-xs font-semibold leading-[1.4] text-brand-grey900">Quantity</p>
                <div className="flex items-center gap-2">
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

              <div className="flex items-center justify-between gap-4 border-y border-brand-grey100 py-3">
                <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">Total</span>
                <span className="flex flex-col items-end">
                  <span className="text-xl font-bold leading-[1.4] text-brand-grey900">
                    {formatCardPrice(total, country.currency)}
                  </span>
                  <span className="text-xs leading-[1.3] text-brand-bodyText">{formatNgn(naira)}</span>
                </span>
              </div>

              <div className="flex flex-col gap-1 pt-2">
                <p className="text-xs font-semibold leading-[1.4] text-brand-grey900">Redeem instruction</p>
                <p className="text-[13px] leading-[1.6] text-brand-bodyText">{product.redeemInstruction}</p>
              </div>

              <PrimaryButton className="mt-4" onClick={() => setReviewOpen(true)}>
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
            ["Face value", `${formatCardPrice(price, country.currency)} × ${quantity}`],
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
    <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Buy Giftcard" onBack={() => navigate(-1)} />

        <div className="flex flex-col gap-3 px-4">
          <p className="text-xs leading-[1.3] text-brand-bodyText">Browse gift cards by country and category.</p>

          {country ? (
            <>
              <div className="flex items-center gap-2">
                <FilterPill Icon={FlagIcon} label={country.name} onClick={() => setCountryOpen(true)} />
                <FilterPill
                  Icon={CategoryIcon}
                  label={category === ALL_CATEGORIES ? "All categories" : category}
                  onClick={() => setCategoryOpen(true)}
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-brand-grey100 bg-brand-surface px-3">
                <SearchIcon className="size-4 shrink-0 text-brand-grey400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search gift cards..."
                  aria-label="Search gift cards"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
                />
              </div>

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
                      className="flex h-[104px] flex-col items-center justify-center gap-2 bg-brand-surface p-3 transition-colors hover:bg-brand-grey50"
                    >
                      <AssetMark symbol={p.brand} className="size-10 rounded-lg" />
                      <span className="line-clamp-2 text-center text-[10px] leading-[1.4] text-brand-grey900">
                        {p.brand}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <SectionCard className="mt-6 flex flex-col items-center gap-1 px-6 py-12 text-center">
              <FlagIcon className="mb-3 size-10 text-brand-grey300" />
              <p className="text-[17px] font-bold leading-[1.4] text-brand-grey900">Select a country</p>
              <p className="pb-6 text-[13px] leading-[1.6] text-brand-bodyText">
                Choose a country to see available gift cards.
              </p>
              <PrimaryButton onClick={() => setCountryOpen(true)}>Select country</PrimaryButton>
            </SectionCard>
          )}
        </div>
      </PageTransition>

      <OptionSheet
        open={countryOpen}
        onOpenChange={setCountryOpen}
        title="Select a country"
        searchPlaceholder="Search"
        value={countryCode}
        options={giftCardCountries.map((c) => ({
          value: c.code,
          label: `${c.name} (${c.code})`,
          detail: `${c.currency} • ${c.currencyName}`,
          mark: <span className="flex size-8 shrink-0 items-center justify-center text-xl leading-none">{c.flag}</span>,
        }))}
        onSelect={(code) => {
          setCountryCode(code);
          setSearch("");
        }}
      />

      <OptionSheet
        open={categoryOpen}
        onOpenChange={setCategoryOpen}
        title="Select a category"
        value={category}
        options={[
          { value: ALL_CATEGORIES, label: "All categories", mark: null },
          ...giftCardCategories.map((c) => ({ value: c, label: c, mark: null })),
        ]}
        onSelect={setCategory}
      />
    </AppShell>
  );
};

export default BuyGiftCard;
