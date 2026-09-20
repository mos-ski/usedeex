import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { Field } from "@/components/dashboard/FormFields";
import { EyeIcon, EyeOffIcon } from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

/** Password field with its own reveal toggle, on the shared underlined rule. */
const PasswordField = ({
  label,
  value,
  onChange,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <Field label={label} helper={helper}>
      <span className="flex w-full items-center gap-4 border-b border-brand-grey100 py-2 focus-within:border-brand-blue500">
        <input
          type={revealed ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={label === "Current password" ? "current-password" : "new-password"}
          placeholder="••••••••"
          className="min-w-0 flex-1 bg-transparent text-[15px] leading-[1.4] text-brand-grey900 outline-none placeholder:text-brand-grey300"
        />
        <button
          type="button"
          onClick={() => setRevealed((shown) => !shown)}
          aria-label={revealed ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="shrink-0 text-brand-grey400 transition-colors hover:text-brand-grey900"
        >
          {revealed ? <EyeIcon className="size-5" /> : <EyeOffIcon className="size-5" />}
        </button>
      </span>
    </Field>
  );
};

/** Rules the new password must satisfy, mirrored from sign up. */
const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At least 1 number", test: (v: string) => /\d/.test(v) },
  { label: "At least 1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least 1 special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

/**
 * Change password — its own flow from Security Center, distinct from the
 * signed-out reset, which emails a code instead.
 */
const ChangePassword = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const strong = rules.every((r) => r.test(next));
  const mismatch = confirm.length > 0 && confirm !== next;
  const reused = next.length > 0 && next === current;
  const ready = current.length > 0 && strong && !mismatch && !reused && confirm.length > 0;

  const save = () => {
    toast.success("Password updated");
    navigate(-1);
  };

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Change password" onBack={() => navigate(-1)} />

        <SectionCard className="flex flex-col gap-5 px-4 py-5">
          <PasswordField label="Current password" value={current} onChange={setCurrent} />

          <PasswordField label="New password" value={next} onChange={setNext} />
          <ul className="-mt-2 flex flex-col gap-1">
            {rules.map((rule) => {
              const met = rule.test(next);
              return (
                <li
                  key={rule.label}
                  className={cn("text-xs leading-[1.6]", met ? "text-brand-successText" : "text-brand-grey400")}
                >
                  {met ? "✓" : "•"} {rule.label}
                </li>
              );
            })}
          </ul>
          {reused && <p className="-mt-1 text-xs text-brand-danger">Choose a password you have not used before.</p>}

          <PasswordField label="Confirm new password" value={confirm} onChange={setConfirm} />
          {mismatch && <p className="-mt-3 text-xs text-brand-danger">Both passwords must match.</p>}

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="self-start text-xs font-semibold leading-[1.3] text-brand-blue500"
          >
            Forgot your current password?
          </button>

          <PrimaryButton className="mt-2" disabled={!ready} onClick={save}>
            Update password
          </PrimaryButton>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default ChangePassword;
