import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppleMarkIcon, EyeIcon, EyeOffIcon, GoogleMarkIcon } from "@/components/dashboard/icons";

const SocialButton = ({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-1 items-center justify-center gap-1 rounded bg-[#0D1D2F] py-2 text-[15px] leading-[1.4] text-[#C9C9C9] transition-opacity hover:opacity-80"
  >
    {icon}
    {label}
  </button>
);

const Field = ({
  label,
  trailing,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; trailing?: React.ReactNode }) => (
  <div className="flex w-full items-end gap-4 border-b border-[#1F2326] p-3">
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-xs leading-[1.3] text-[#656367]">{label}</span>
      <input
        {...input}
        className="w-full bg-transparent text-[15px] leading-[1.4] text-[#C9C9C9] outline-none placeholder:text-[#C9C9C9]"
      />
    </label>
    {trailing}
  </div>
);

/** Sign Up — Figma 302:32829. */
const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [revealed, setRevealed] = useState(false);

  const completeSignUp = (event?: FormEvent) => {
    event?.preventDefault();
    navigate("/dashboard");
  };

  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return (
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-white antialiased">
      <PageTransition>
        <form
          onSubmit={completeSignUp}
          className="mx-auto flex min-h-[100dvh] w-full max-w-[420px] flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[max(env(safe-area-inset-top),44px)]"
        >
          <header className="flex flex-col items-center gap-1 px-6 py-[18px]">
            <p className="text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600">Glad to have you!</p>
            <h1 className="font-gasoek text-[33px] leading-[1.4]">SIGN UP</h1>
          </header>

          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <SocialButton label="Google" icon={<GoogleMarkIcon className="size-[18px]" />} onClick={completeSignUp} />
              <SocialButton label="Apple" icon={<AppleMarkIcon className="size-[18px] text-white" />} onClick={completeSignUp} />
            </div>

            <Field label="First Name (As written on your ID)" autoComplete="given-name" placeholder="John" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            <Field label="Last Name (As written on your ID)" autoComplete="family-name" placeholder="Doe" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            <Field label="Email" type="email" inputMode="email" autoComplete="email" placeholder="youremail@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Field
              label="Create Password"
              type={revealed ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••••••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              trailing={
                <button
                  type="button"
                  onClick={() => setRevealed((shown) => !shown)}
                  aria-label={revealed ? "Hide password" : "Show password"}
                  className="shrink-0 pb-0.5 text-brand-bodyText transition-colors hover:text-[#C9C9C9]"
                >
                  {revealed ? <EyeIcon className="size-5" /> : <EyeOffIcon className="size-5" />}
                </button>
              }
            />

            <p className="text-xs leading-[1.3] text-[#656367]">
              <span className={hasLength ? "text-white" : undefined}>At least 8 characters,</span>{" "}
              <span className={hasNumber ? "text-white" : undefined}>At least 1 number,</span>{" "}
              <span className={hasUppercase ? "text-white" : undefined}>At least 1 uppercase letter,</span>{" "}
              <span className={hasSpecial ? "text-white" : undefined}>At least 1 special character</span>
            </p>

            <Field label="Invite Code?" autoComplete="off" placeholder="Optional" value={inviteCode} onChange={(event) => setInviteCode(event.target.value)} />
          </div>

          <div className="flex flex-col items-center gap-2.5 pt-[58px]">
            <button type="submit" className="w-full rounded-lg bg-[#095B97] p-3 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-primary50 transition-opacity hover:opacity-90">
              Sign up
            </button>
            <p className="w-full text-xs leading-[1.3] text-[#656367]">
              By clicking sign up, you have read our{" "}
              <button type="button" className="text-white underline">Privacy policy</button>{" "}
              and accepted our <button type="button" className="text-white underline">Term of Service</button>
            </p>
            <button type="button" onClick={() => navigate("/dashboard")} className="text-xs leading-[1.3] text-brand-blue500 transition-opacity hover:opacity-80">
              I have an account
            </button>
          </div>
        </form>
      </PageTransition>
    </div>
  );
};

export default SignUp;
