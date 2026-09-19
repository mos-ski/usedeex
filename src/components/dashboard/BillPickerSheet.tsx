import { useNavigate } from "react-router-dom";
import { ActionTile } from "./AppShell";
import { PhoneCallIcon, PhoneDeviceIcon, SignalIcon, WebcamIcon } from "./icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

const billTypes = [
  { label: "Airtime", type: "airtime", Icon: PhoneCallIcon },
  { label: "Data", type: "data", Icon: PhoneDeviceIcon },
  { label: "Electricity", type: "electricity", Icon: SignalIcon },
  { label: "Betting", type: "betting", Icon: WebcamIcon },
];

/**
 * Bill category chooser (Figma 291:14618) — opens over the Dashboard when
 * "Bills" is tapped, then routes into the shared bill flow.
 */
export const BillPickerSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const navigate = useNavigate();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="border-brand-grey100 bg-white font-roboto">
        <DrawerTitle className="sr-only">Select a bill to pay</DrawerTitle>
        <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
          <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Select Bills</p>
          <div className="grid grid-cols-4 gap-1 lg:gap-2">
            {billTypes.map(({ label, type, Icon }) => (
              <ActionTile
                key={type}
                label={label}
                Icon={Icon}
                onClick={() => {
                  onOpenChange(false);
                  navigate(`/bills/${type}`);
                }}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BillPickerSheet;
