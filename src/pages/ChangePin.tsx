import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PinEntry from "@/components/dashboard/PinEntry";

const PIN_LENGTH = 4;
/** Stand-in for the PIN on file. */
const CURRENT_PIN = "1234";

type Step = "current" | "next" | "confirm";

const copy: Record<Step, { title: string; caption: string }> = {
  current: { title: "Enter PIN", caption: "Enter your current PIN to continue" },
  next: { title: "New PIN", caption: `Choose a new ${PIN_LENGTH}-digit PIN` },
  confirm: { title: "Confirm PIN", caption: "Enter your new PIN again" },
};

/** Change PIN (Figma 305:34709) — reached from Security Center. */
const ChangePin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("current");
  const [value, setValue] = useState("");
  const [next, setNext] = useState("");
  const [error, setError] = useState("");

  // Each stage completes as soon as the last digit lands.
  useEffect(() => {
    if (value.length !== PIN_LENGTH) return;

    const advance = window.setTimeout(() => {
      if (step === "current") {
        if (value !== CURRENT_PIN) return fail("Incorrect PIN, try again");
        setStep("next");
        setValue("");
        return;
      }

      if (step === "next") {
        if (value === CURRENT_PIN) return fail("Choose a PIN you have not used before");
        setNext(value);
        setStep("confirm");
        setValue("");
        return;
      }

      if (value !== next) return fail("Both PINs must match");
      toast.success("PIN updated");
      navigate(-1);
    }, 150);

    return () => window.clearTimeout(advance);

    function fail(message: string) {
      setError(message);
      window.setTimeout(() => {
        setValue("");
        setError("");
      }, 900);
    }
  }, [value, step, next, navigate]);

  const back = () => {
    if (step === "current") return navigate(-1);
    setStep(step === "confirm" ? "next" : "current");
    setValue("");
    setError("");
  };

  return (
    <PinEntry
      title={copy[step].title}
      caption={copy[step].caption}
      value={value}
      onChange={setValue}
      length={PIN_LENGTH}
      error={error}
      onBack={back}
      // Face ID only stands in for the PIN you already have, never a new one.
      onBiometric={step === "current" ? () => setValue(CURRENT_PIN) : undefined}
    />
  );
};

export default ChangePin;
