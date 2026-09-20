import { Navigate, useNavigate, useParams } from "react-router-dom";
import BillFlow, { BillConfig } from "@/components/dashboard/BillFlow";
import { bettingRecipients, electricityRecipients, phoneRecipients } from "@/data/recipientData";

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

export const billConfigs: Record<string, BillConfig> = {
  airtime: {
    title: "Airtime",
    identifierPlaceholder: "Enter Phone Number",
    identifierLabel: "Phone number",
    providers: ["MTN", "Glo", "Airtel", "9mobile"],
    shortcuts: cashShortcuts,
    beneficiaries: phoneRecipients,
  },
  data: {
    title: "Data",
    identifierPlaceholder: "Enter Phone Number",
    identifierLabel: "Phone number",
    providers: ["MTN", "Glo", "Airtel", "9mobile"],
    shortcuts: dataBundles,
    beneficiaries: phoneRecipients,
  },
  electricity: {
    title: "Electricity",
    identifierPlaceholder: "Enter Meter Number",
    identifierLabel: "Meter number",
    providers: ["IKEDC", "EKEDC", "AEDC", "PHED", "BEDC"],
    shortcuts: cashShortcuts,
    beneficiaries: electricityRecipients,
  },
  betting: {
    title: "Betting",
    identifierPlaceholder: "Enter User ID",
    identifierLabel: "User ID",
    numericIdentifier: false,
    providers: ["Bet9ja", "SportyBet", "1xBet", "BetKing", "MSport"],
    shortcuts: cashShortcuts,
    beneficiaries: bettingRecipients,
  },
};

/** Tab order across the top of the bill screen. */
const billTypes = Object.entries(billConfigs).map(([type, c]) => ({ type, label: c.title }));

const BillPayment = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const config = type ? billConfigs[type] : undefined;

  if (!config) return <Navigate to="/dashboard" replace />;

  // Remount on type change so a half-filled form doesn't carry across bills.
  return (
    <BillFlow
      key={type}
      config={config}
      billTypes={billTypes}
      activeType={type}
      onTypeChange={(next) => navigate(`/bills/${next}`, { replace: true })}
    />
  );
};

export default BillPayment;
