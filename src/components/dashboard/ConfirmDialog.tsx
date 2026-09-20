import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Centred confirmation for an action worth a second thought — logging out,
 * deleting something. Bottom sheets are for choosing; this is for stopping.
 */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  message,
  icon,
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  /** Paints the confirm button red, for actions that lose something. */
  destructive = false,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  icon?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-[340px] gap-0 rounded-lg border-brand-grey100 bg-brand-surface p-6 font-roboto [&>button]:hidden">
      <div className="flex flex-col items-center gap-1 text-center">
        {icon && (
          <span
            className={cn(
              "mb-2 flex size-14 items-center justify-center rounded-full",
              destructive ? "bg-brand-noteDanger text-brand-danger" : "bg-brand-tint text-brand-blue500",
            )}
          >
            {icon}
          </span>
        )}
        <DialogTitle className="text-[17px] font-bold leading-[1.4] text-brand-grey900">{title}</DialogTitle>
        <p className="text-[13px] leading-[1.6] text-brand-bodyText">{message}</p>
      </div>

      <div className="flex flex-col gap-2 pt-6">
        <button
          type="button"
          onClick={() => {
            onOpenChange(false);
            onConfirm();
          }}
          className={cn(
            "h-12 rounded-lg px-4 font-manrope text-base font-bold leading-[1.6] text-white transition-opacity hover:opacity-90",
            destructive ? "bg-brand-danger" : "bg-brand-blue500",
          )}
        >
          {confirmLabel}
        </button>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="h-12 rounded-lg bg-brand-grey50 px-4 font-manrope text-base font-medium leading-[1.6] text-brand-grey900 transition-colors hover:bg-brand-grey100"
        >
          {cancelLabel}
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ConfirmDialog;
