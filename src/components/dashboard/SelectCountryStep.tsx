import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard } from "./AppShell";
import OptionSheet from "./OptionSheet";
import { CaretDownIcon } from "./icons";
import { giftCardCountries } from "@/data/giftCardCatalog";

/**
 * First step of both gift card flows: nothing can be listed until we know
 * which country the cards are issued in, so ask for it on its own page
 * rather than defaulting to one and hoping the user notices.
 */
export const SelectCountryStep = ({
  title,
  description,
  open,
  onOpenChange,
  value,
  onSelect,
  onBack,
}: {
  title: string;
  description: string;
  /** The picker sheet, held by the parent so it can reopen it later. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (code: string) => void;
  onBack: () => void;
}) => (
  <AppShell
    className="bg-brand-surface"
    innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4"
  >
    <PageTransition>
      <PageHeader title={title} onBack={onBack} />

      <div className="px-4">
        <SectionCard className="mt-6 flex flex-col items-center gap-1 px-6 py-12 text-center">
          <p className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">Select a country</p>
          <p className="pb-6 text-xs leading-[1.3] text-brand-bodyText">{description}</p>
          <CountryPill code={value} onClick={() => onOpenChange(true)} />
        </SectionCard>
      </div>
    </PageTransition>

    <CountrySheet
      open={open}
      onOpenChange={onOpenChange}
      value={value}
      onSelect={onSelect}
    />
  </AppShell>
);

/** The country trigger: caret, flag, name — the pill used across both flows. */
export const CountryPill = ({ code, onClick }: { code: string; onClick: () => void }) => {
  const country = giftCardCountries.find((c) => c.code === code);

  return (
    <button
      type="button"
      aria-label="Choose country"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5"
    >
      <CaretDownIcon className="size-3 text-brand-grey900" />
      {country && <span className="text-base leading-none">{country.flag}</span>}
      <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">
        {country ? country.name : "Select Country"}
      </span>
    </button>
  );
};

/** The country picker on its own, for reopening from a pill later in a flow. */
export const CountrySheet = ({
  open,
  onOpenChange,
  value,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (code: string) => void;
}) => (
  <OptionSheet
    open={open}
    onOpenChange={onOpenChange}
    title="Select a country"
    searchPlaceholder="Search"
    value={value}
    options={giftCardCountries.map((c) => ({
      value: c.code,
      label: `${c.name} (${c.code})`,
      detail: `${c.currency} • ${c.currencyName}`,
      mark: (
        <span className="flex size-8 shrink-0 items-center justify-center text-xl leading-none">
          {c.flag}
        </span>
      ),
    }))}
    onSelect={onSelect}
  />
);

export default SelectCountryStep;
