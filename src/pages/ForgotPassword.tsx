import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "email" | "otp" | "success";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const sendCode = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) setStep("otp");
  };

  const verifyCode = (value: string) => {
    setCode(value);
    if (value.length === 6) setTimeout(() => setStep("success"), 180);
  };

  const pasteCode = async () => {
    try {
      const value = (await navigator.clipboard.readText()).replace(/\D/g, "").slice(0, 6);
      if (value) verifyCode(value);
    } catch {
      // Clipboard permission can be declined; the six fields remain editable.
    }
  };

  if (step === "success") {
    return (
      <SuccessScreen
        title="Password Reset!"
        message=""
        primaryLabel="Go to Login"
        onPrimary={() => navigate("/login")}
        contentClassName="pb-[155px]"
      />
    );
  }

  return (
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-white antialiased">
      <PageTransition>
        <form
          onSubmit={sendCode}
          className="mx-auto flex min-h-[100dvh] w-full max-w-[420px] flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[max(env(safe-area-inset-top),44px)]"
        >
          <header className="flex flex-col items-center gap-1 px-6 py-[18px] text-center">
            <p className="text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600">We will send a code</p>
            <h1 className="font-gasoek text-[33px] uppercase leading-[1.4]">
              <span className="block">Reset</span>
              <span className="block">Password</span>
            </h1>
          </header>

          <div className="flex flex-col gap-[58px] pt-[9px]">
            <label className="flex w-full flex-col gap-1 border-b border-[#1F2326] p-3">
              <span className="text-xs leading-[1.3] text-[#656367]">Enter your email</span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="youremail@gmail.com"
                className="w-full bg-transparent text-[15px] leading-[1.4] text-[#C9C9C9] outline-none placeholder:text-[#C9C9C9]"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#095B97] p-3 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-primary50 transition-opacity hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </form>
      </PageTransition>

      <Drawer open={step === "otp"} onOpenChange={(open) => !open && setStep("email")} shouldScaleBackground={false}>
        <DrawerContent className="rounded-t-lg border-0 bg-white px-3 pb-[calc(1rem+env(safe-area-inset-bottom))] font-roboto [&>div:first-child]:mt-3 [&>div:first-child]:h-1 [&>div:first-child]:w-12 [&>div:first-child]:bg-[#D9D9D9]">
          <div className="mx-auto w-full max-w-[420px] pt-9">
            <DrawerTitle className="text-xs font-semibold leading-[1.4] text-brand-grey900">OTP Sent!</DrawerTitle>
            <DrawerDescription className="mt-4 text-xs leading-[1.3] text-[#656367]">
              Enter the 6-digits verification code sent to{" "}
              <span className="text-brand-blue500">{email}</span>. Not receiving OTP? Check your spam folder.
            </DrawerDescription>

            <InputOTP
              maxLength={6}
              value={code}
              onChange={verifyCode}
              inputMode="numeric"
              autoFocus
              containerClassName="w-full py-[23px]"
            >
              <InputOTPGroup className="grid w-full grid-cols-6 gap-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-12 w-full rounded-lg border border-[#AEBCC6] text-lg text-brand-grey900 first:rounded-lg first:border last:rounded-lg"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <button
              type="button"
              onClick={pasteCode}
              className="w-full rounded-t bg-[#EFF8FF] px-2 py-1.5 text-center font-manrope text-[13px] font-bold leading-[1.6] text-brand-blue500"
            >
              Paste
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ForgotPassword;
