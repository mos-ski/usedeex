import { ReactNode } from "react";
import { PrimaryButton } from "./AppShell";
import { FaceIdIcon } from "./icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

/** A label/value pair; the third slot is an amber note under the value. */
export type ReviewRow = [label: string, value: string, note?: string];

/**
 * The confirm sheet shared by every send-money flow (Figma 285:10690,
 * 289:14317, 302:32336): a "Review" heading, hairline-separated label/value
 * rows and a Confirm button carrying the Face ID glyph.
 */
export const ReviewSheet = ({
  open,
  onOpenChange,
  rows,
  actionLabel = "Confirm",
  onAction,
  /** Hides the Face ID glyph for actions that are not biometric. */
  withFaceId = true,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows?: ReviewRow[];
  actionLabel?: string;
  onAction: () => void;
  withFaceId?: boolean;
  /** Renders in place of `rows` when a flow needs richer content. */
  children?: ReactNode;
}) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
      <DrawerTitle className="sr-only">Review</DrawerTitle>
      <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
        <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Review</p>

        {children ?? (
          <div className="flex flex-col">
            {rows?.map(([label, value, note]) => (
              <div key={label} className="flex flex-col border-b border-brand-grey100 py-1.5">
                <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
                <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">{value}</span>
                {note && <span className="text-xs leading-[1.3] text-brand-amberBrown">{note}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="pt-6">
          <PrimaryButton className="font-bold" onClick={onAction}>
            {actionLabel}
            {withFaceId && <FaceIdIcon className="size-6" />}
          </PrimaryButton>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
);

/** The biometric beat between Confirm and the success screen (Figma 302:32626). */
export const FaceIdOverlay = ({ active }: { active: boolean }) =>
  active ? (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/25 pt-24 backdrop-blur-[2px]">
      <div className="flex size-[100px] items-center justify-center rounded-[28px] bg-[#13181B] shadow-xl">
        <FaceIdIcon className="size-14 animate-pulse text-[#27F32A]" />
      </div>
      <span className="sr-only" role="status">
        Confirming with Face ID
      </span>
    </div>
  ) : null;

export default ReviewSheet;
