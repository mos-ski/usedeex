import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import {
  AppleMarkIcon,
  EyeIcon,
  EyeOffIcon,
  FaceIdIcon,
  GoogleMarkIcon,
} from "@/components/dashboard/icons";

/** Google / Apple SSO buttons above the form (Figma 300:29873). */
const SocialButton = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-1 items-center justify-center gap-1 rounded bg-[#0D1D2F] py-2 text-[15px] leading-[1.4] text-[#C9C9C9] transition-opacity hover:opacity-80"
  >
    {icon}
    {label}
  </button>
);

/** Underlined field — label above, input below, optional trailing control. */
const Field = ({
  label,
  trailing,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; trailing?: React.ReactNode }) => (
  <div className="flex w-full items-end gap-4 border-b border-[#1F2326] p-3">
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
      <input
        {...input}
        className="w-full bg-transparent text-[15px] leading-[1.4] text-[#C9C9C9] outline-none placeholder:text-[#3C4A57]"
      />
    </label>
    {trailing}
  </div>
);

/**
 * Login (Figma 300:29811) — the app's one dark screen: navy field, Gasoek
 * wordmark, SSO row, underlined inputs and a Face ID shortcut.
 */
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealed, setRevealed] = useState(false);

  const signIn = (event?: FormEvent) => {
    event?.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-white antialiased">
      <PageTransition>
        <form
          onSubmit={signIn}
          className="mx-auto flex min-h-[100dvh] w-full max-w-[420px] flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[max(env(safe-area-inset-top),44px)]"
        >
          <header className="flex flex-col items-center gap-1 px-6 py-[18px]">
            <p className="text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600">Welcome back</p>
            <h1 className="font-gasoek text-[33px] leading-[1.4]">LOGIN</h1>
          </header>

          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <SocialButton
                label="Google"
                icon={<GoogleMarkIcon className="size-[18px]" />}
                onClick={signIn}
              />
              <SocialButton
                label="Apple"
                icon={<AppleMarkIcon className="size-[18px] text-white" />}
                onClick={signIn}
              />
            </div>

            <Field
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Field
              label="Password"
              type={revealed ? "text" : "password"}
              autoComplete="current-password"
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

            <button type="button" className="self-start text-xs leading-[1.3] text-brand-blue500">
              Forgot Password?
            </button>
          </div>

          <div className="flex flex-col items-center gap-[38px] pt-[58px]">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#095B97] p-3 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-primary50 transition-opacity hover:opacity-90"
            >
              Login
            </button>

            <p className="text-xs leading-[1.3] text-brand-blue500">
              Not a member yet?{" "}
              <button type="button" onClick={() => navigate("/signup")} className="underline-offset-2 hover:underline">
                Sign Up
              </button>
            </p>

            <button
              type="button"
              onClick={signIn}
              aria-label="Sign in with Face ID"
              className="rounded-[14.25px] bg-white/5 p-[7.5px] text-[#11C514] transition-colors hover:bg-white/10"
            >
              <FaceIdIcon className="size-9" />
            </button>
          </div>
        </form>
      </PageTransition>
    </div>
  );
};

export default Login;
