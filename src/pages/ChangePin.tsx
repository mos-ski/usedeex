import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { TextField } from "@/components/dashboard/FormFields";

const PIN_LENGTH = 4;

/** Change PIN — reached from Security Center. */
const ChangePin = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const digits = (value: string) => value.replace(/\D/g, "").slice(0, PIN_LENGTH);
  const complete = [current, next, confirm].every((v) => v.length === PIN_LENGTH);
  const mismatch = confirm.length === PIN_LENGTH && confirm !== next;
  const reused = next.length === PIN_LENGTH && next === current;

  const save = () => {
    toast.success("PIN updated");
    navigate(-1);
  };

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Change PIN" onBack={() => navigate(-1)} />

        <SectionCard className="flex flex-col gap-4 px-4 py-5">
          <TextField
            label="Current PIN"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            placeholder="••••"
            value={current}
            onChange={(e) => setCurrent(digits(e.target.value))}
          />
          <TextField
            label="New PIN"
            type="password"
            inputMode="numeric"
            autoComplete="new-password"
            placeholder="••••"
            value={next}
            onChange={(e) => setNext(digits(e.target.value))}
            helper={reused ? undefined : `${PIN_LENGTH} digits, different from your current PIN.`}
          />
          {reused && <p className="-mt-2 text-xs text-brand-danger">Choose a PIN you have not used before.</p>}

          <TextField
            label="Confirm New PIN"
            type="password"
            inputMode="numeric"
            autoComplete="new-password"
            placeholder="••••"
            value={confirm}
            onChange={(e) => setConfirm(digits(e.target.value))}
          />
          {mismatch && <p className="-mt-2 text-xs text-brand-danger">Both PINs must match.</p>}

          <PrimaryButton className="mt-2" disabled={!complete || mismatch || reused} onClick={save}>
            Save PIN
          </PrimaryButton>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default ChangePin;
