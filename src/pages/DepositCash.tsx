import { useNavigate } from "react-router-dom";
import ShareDetail from "@/components/dashboard/ShareDetail";

/**
 * The user's dedicated naira collection account — cash paid in here lands in
 * their DeeX Naira Wallet (Figma 299:23397).
 */
const cashAccount = {
  bank: "Wema Bank",
  name: "DeeX/Ossai Precious",
  number: "2209987655",
};

export const transferNotes = [
  "Please send your cash into your special account number below",
  "Do not use any crypto related description on your bank app while making this transfer.",
];

const DepositCash = () => {
  const navigate = useNavigate();

  return (
    <ShareDetail
      title="Deposit Cash"
      eyebrow={cashAccount.bank}
      heading={cashAccount.name}
      value={cashAccount.number}
      copyLabel="Account number"
      notes={transferNotes}
      onBack={() => navigate(-1)}
      onDone={() => navigate("/naira-wallet")}
    />
  );
};

export default DepositCash;
