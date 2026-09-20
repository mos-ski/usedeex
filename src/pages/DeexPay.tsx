import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AmountEntry, parseAmount } from "@/components/dashboard/AmountEntry";
import { TextField } from "@/components/dashboard/FormFields";
import ShareDetail from "@/components/dashboard/ShareDetail";
import { NGN_PER_USD, formatUsd } from "@/lib/format";

const PAYMENT_LINK = "https://deex.app/pay/lnk_q7m2x9";

/** Ask for an amount, hand back a link to share — both on the shared screens. */
const DeexPay = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [generated, setGenerated] = useState(false);

  const usd = parseAmount(amount);

  if (generated) {
    return (
      <ShareDetail
        title="Payment link"
        eyebrow={description || "DeeX Pay"}
        heading={`Collect ${formatUsd(usd)}`}
        value={PAYMENT_LINK.replace(/^https:\/\//, "")}
        copyValue={PAYMENT_LINK}
        copyLabel="Payment link"
        notes={[
          "Share this link with your customer. It stays open until they pay it.",
          "Payment lands in your wallet at the rate quoted when they pay, not now.",
        ]}
        onBack={() => setGenerated(false)}
        onDone={() => navigate("/dashboard")}
      />
    );
  }

  return (
    <AmountEntry
      title="Generate payment link"
      onBack={() => navigate(-1)}
      value={amount}
      onValueChange={setAmount}
      fromSymbol="USD"
      fromOptions={[{ symbol: "USD", hint: "Amount your customer pays" }]}
      onFromChange={() => undefined}
      toSymbol="NGN"
      convertedText={usd ? Math.round(usd * NGN_PER_USD).toLocaleString("en-US") : "0"}
      footer={
        <TextField
          label="Description (optional)"
          placeholder="What is this payment for?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      }
      submitLabel="Generate link"
      submitDisabled={usd <= 0}
      onSubmit={() => setGenerated(true)}
    />
  );
};

export default DeexPay;
