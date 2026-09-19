import { Navigate, useParams } from "react-router-dom";
import BillFlow, { BillConfig } from "@/components/dashboard/BillFlow";
import { PhoneCallIcon, PhoneDeviceIcon, SignalIcon, WebcamIcon } from "@/components/dashboard/icons";

/** Naira top-ups shared by airtime, electricity and betting. */
const cashShortcuts = [
  { label: "₦200", value: 200 },
  { label: "₦500", value: 500 },
  { label: "₦1,000", value: 1000 },
  { label: "₦5,000", value: 5000 },
];

/** Data bundles double as the shortcut row — picking one sets its price. */
const dataBundles = [
  { label: "1GB", value: 500 },
  { label: "2GB", value: 1000 },
  { label: "5GB", value: 2000 },
  { label: "10GB", value: 3500 },
];

const phoneBeneficiaries: BillConfig["beneficiaries"] = [
  { id: "p1", identifier: "08103674006", name: "Self", provider: "MTN", kind: "recent" },
  { id: "p2", identifier: "09012345678", name: "Mum", provider: "Glo", kind: "recent" },
  { id: "p3", identifier: "07098765432", name: "Bro", provider: "Airtel", kind: "recent" },
  { id: "p4", identifier: "08055512345", name: "Ada", provider: "MTN", kind: "beneficiary" },
];

export const billConfigs: Record<string, BillConfig> = {
  airtime: {
    title: "Airtime",
    identifierPlaceholder: "Enter Phone Number",
    identifierLabel: "Phone number",
    providers: ["MTN", "Glo", "Airtel", "9mobile"],
    Icon: PhoneCallIcon,
    shortcuts: cashShortcuts,
    beneficiaries: phoneBeneficiaries,
  },
  data: {
    title: "Data",
    identifierPlaceholder: "Enter Phone Number",
    identifierLabel: "Phone number",
    providers: ["MTN", "Glo", "Airtel", "9mobile"],
    Icon: PhoneDeviceIcon,
    shortcuts: dataBundles,
    beneficiaries: phoneBeneficiaries,
  },
  electricity: {
    title: "Electricity",
    identifierPlaceholder: "Enter Meter Number",
    identifierLabel: "Meter number",
    providers: ["IKEDC", "EKEDC", "AEDC", "PHED", "BEDC"],
    Icon: SignalIcon,
    shortcuts: cashShortcuts,
    beneficiaries: [
      { id: "m1", identifier: "45123456789", name: "Home", provider: "IKEDC", kind: "recent" },
      { id: "m2", identifier: "62987654321", name: "Office", provider: "EKEDC", kind: "beneficiary" },
    ],
  },
  betting: {
    title: "Betting",
    identifierPlaceholder: "Enter User ID",
    identifierLabel: "User ID",
    numericIdentifier: false,
    providers: ["Bet9ja", "SportyBet", "1xBet", "BetKing", "MSport"],
    Icon: WebcamIcon,
    shortcuts: cashShortcuts,
    beneficiaries: [
      { id: "b1", identifier: "BET9JA_1234", name: "Main", provider: "Bet9ja", kind: "recent" },
      { id: "b2", identifier: "SPORTY_5678", name: "Weekend", provider: "SportyBet", kind: "beneficiary" },
    ],
  },
};

const BillPayment = () => {
  const { type } = useParams<{ type: string }>();
  const config = type ? billConfigs[type] : undefined;

  if (!config) return <Navigate to="/dashboard" replace />;

  // Remount on type change so a half-filled form doesn't carry across bills.
  return <BillFlow key={type} config={config} />;
};

export default BillPayment;
