import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { RadioRow, SelectField, Stepper, TextField } from "@/components/dashboard/FormFields";
import {
  CheckCircleIcon,
  DocumentUploadIcon,
  FaceIdIcon,
  InfoCircleIcon,
  VerifyIcon,
} from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

/** Trading and withdrawal ceilings each level unlocks (Figma 8485:72342). */
const levels = [
  { level: 1, title: "Profile Set up", limits: "$1K trading • $100 withdrawal", trading: "$1K", withdrawal: "$100" },
  { level: 2, title: "BVN Verification", limits: "$10K trading • $500 withdrawal", trading: "$10K", withdrawal: "$500" },
  { level: 3, title: "ID Verification", limits: "$25K trading • $1K withdrawal", trading: "$25K", withdrawal: "$1K" },
];

const countries = [{ value: "NG", label: "Nigeria", icon: <span aria-hidden="true">🇳🇬</span> }];

const idTypes = [
  { value: "bvn", label: "BVN" },
  { value: "nin", label: "NIN" },
  { value: "passport", label: "International Passport" },
  { value: "licence", label: "Driver's Licence" },
  { value: "voters", label: "Voter's Card" },
];

const states = [
  "Lagos", "Abuja (FCT)", "Rivers", "Oyo", "Kano", "Enugu", "Kaduna", "Delta", "Anambra", "Ogun",
].map((s) => ({ value: s, label: s }));

/** Accepted proofs of address (Figma 4234:16640). */
const addressProofs = ["Utility Bill", "Recent Nepa Bill/Receipt", "Meter Number"];

/** The level-3 identity journey, shown in the stepper. */
const identitySteps = ["Identity", "Proof of Address", "Selfie"];

type Step =
  | "levels"
  | "profile"
  | "bvn"
  | "identity-intro"
  | "identity-doc"
  | "identity-address"
  | "identity-selfie"
  | "pending";

/** The level a given step belongs to, for the pending screen's copy. */
const stepLevel: Partial<Record<Step, number>> = {
  profile: 1,
  bvn: 2,
  "identity-intro": 3,
  "identity-doc": 3,
  "identity-address": 3,
  "identity-selfie": 3,
};

const KycVerification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("levels");

  /** Levels already approved — drives the pills and which upgrade is offered. */
  const [completed, setCompleted] = useState<number[]>([]);
  const [submittedLevel, setSubmittedLevel] = useState(1);

  // Level 1 — profile
  const [country, setCountry] = useState("NG");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postcode, setPostcode] = useState("");

  // Level 2 — BVN
  const [idType, setIdType] = useState("bvn");
  const [idNumber, setIdNumber] = useState("");

  // Level 3 — identity
  const [docFile, setDocFile] = useState<string | null>(null);
  const [proof, setProof] = useState(addressProofs[0]);
  const [selfieTaken, setSelfieTaken] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const nextLevel = levels.find((l) => !completed.includes(l.level))?.level ?? 3;
  const unlocked = levels.filter((l) => completed.includes(l.level)).at(-1);

  const submit = (level: number) => {
    setSubmittedLevel(level);
    setCompleted((done) => (done.includes(level) ? done : [...done, level]));
    setStep("pending");
  };

  const startLevel = (level: number) =>
    setStep(level === 1 ? "profile" : level === 2 ? "bvn" : "identity-intro");

  const shell = (title: string, onBack: () => void, children: React.ReactNode) => (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title={title} onBack={onBack} />
        {children}
      </PageTransition>
    </AppShell>
  );

  /* ---------------- Pending (Figma 4134:15510) ---------------- */
  if (step === "pending") {
    return shell("KYC Verification", () => setStep("levels"), (
      <div className="flex flex-col items-center px-4 pt-16 text-center">
        <span className="flex size-[111px] items-center justify-center rounded-full bg-brand-tint">
          <span className="flex size-[88px] items-center justify-center rounded-full bg-brand-primary100">
            <VerifyIcon className="size-10 text-brand-blue500" />
          </span>
        </span>
        <h2 className="pt-8 text-2xl font-bold leading-[1.4] text-brand-grey900">Verification Pending</h2>
        <p className="max-w-[275px] pt-3 text-sm leading-[1.6] text-brand-bodyText">
          Your level {submittedLevel} verification will be confirmed within the next few mins. We will notify you when
          your submission is approved.
        </p>
        <div className="w-full pt-10">
          <PrimaryButton onClick={() => setStep("levels")}>See details</PrimaryButton>
        </div>
      </div>
    ));
  }

  /* ---------------- Level 1 — profile (Figma 6994:66167) ---------------- */
  if (step === "profile") {
    const ready = dob && address.trim() && city.trim() && stateName && postcode.trim();
    return shell("KYC Verification", () => setStep("levels"), (
      <SectionCard className="flex flex-col gap-4 px-4 py-5">
        <SelectField label="Select Country" value={country} options={countries} onChange={setCountry} />
        <TextField
          label="Enter Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <TextField
          label="Home Address"
          placeholder="No. and Street Name"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex items-start gap-3">
          <TextField
            label="City"
            placeholder="E.g Ikeja"
            className="flex-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <SelectField label="State" className="flex-1" value={stateName} options={states} onChange={setStateName} />
        </div>
        <TextField label="Postal Code" value={postcode} onChange={(e) => setPostcode(e.target.value)} />

        <PrimaryButton className="mt-2" disabled={!ready} onClick={() => submit(1)}>
          Submit
        </PrimaryButton>
      </SectionCard>
    ));
  }

  /* ---------------- Level 2 — BVN (Figma 4134:15326) ---------------- */
  if (step === "bvn") {
    const label = idTypes.find((t) => t.value === idType)?.label ?? "BVN";
    return shell("KYC Verification", () => setStep("levels"), (
      <SectionCard className="flex flex-col gap-4 px-4 py-5">
        <SelectField label="Select Country" value={country} options={countries} onChange={setCountry} />
        <SelectField label="Select ID Type" value={idType} options={idTypes} onChange={setIdType} />
        <TextField
          label={label}
          placeholder="Type here"
          inputMode={idType === "bvn" || idType === "nin" ? "numeric" : "text"}
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          helper={idType === "bvn" ? "You can dial the shortcode (*565*0#) to see your BVN." : undefined}
        />

        <PrimaryButton className="mt-2" disabled={idNumber.trim().length < 6} onClick={() => submit(2)}>
          Submit
        </PrimaryButton>
      </SectionCard>
    ));
  }

  /* ---------------- Level 3 — identity intro (Figma 4134:16575) ---------------- */
  if (step === "identity-intro") {
    return shell("KYC Verification", () => setStep("levels"), (
      <SectionCard className="flex flex-col items-center px-4 py-8 text-center">
        <h2 className="text-xl font-bold leading-[1.4] text-brand-grey900">Let's verify your identity</h2>
        <p className="pt-1 text-sm leading-[1.6] text-brand-bodyText">To get verified, you will need to:</p>

        <div className="flex flex-col items-center gap-6 pt-8">
          {[
            { n: 1, Icon: DocumentUploadIcon, copy: "Upload photos of documents proving your identity" },
            { n: 2, Icon: FaceIdIcon, copy: "Take a Selfie" },
          ].map(({ n, Icon, copy }) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <span className="relative flex size-[88px] items-center justify-center rounded-full bg-brand-tint">
                <span className="absolute -top-1 left-1 flex size-7 items-center justify-center rounded-full bg-brand-navy text-xs font-semibold text-white">
                  {n}
                </span>
                <Icon className="size-10 text-brand-blue500" />
              </span>
              <p className="max-w-[200px] text-xs leading-[1.6] text-brand-grey400">{copy}</p>
            </div>
          ))}
        </div>

        <div className="w-full pt-10">
          <PrimaryButton onClick={() => setStep("identity-doc")}>Start</PrimaryButton>
          <p className="pt-3 text-xs leading-[1.6] text-brand-grey400">
            By clicking the "Start" button, you agree to our User Terms and Conditions and our Privacy Policy
          </p>
        </div>
      </SectionCard>
    ));
  }

  /* ---------------- Level 3 step 1 — document ---------------- */
  if (step === "identity-doc") {
    return shell("KYC Verification", () => setStep("identity-intro"), (
      <SectionCard className="flex flex-col gap-5 px-4 py-5">
        <Stepper steps={identitySteps} current={0} />

        <div>
          <h2 className="text-[17px] font-bold leading-[1.4] text-brand-grey900">Upload your Government ID</h2>
          <p className="pt-1 text-xs leading-[1.3] text-brand-bodyText">
            Country: {countries.find((c) => c.value === country)?.label}
          </p>
        </div>

        <SelectField label="Select ID Type" value={idType} options={idTypes.slice(1)} onChange={setIdType} />

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setDocFile(URL.createObjectURL(file));
          }}
        />

        {docFile ? (
          <div className="flex flex-col items-center gap-3">
            <img src={docFile} alt="Uploaded document" className="h-[170px] w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="text-xs font-semibold text-brand-blue500"
            >
              Replace photo
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex h-[163px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-brand-grey500"
          >
            <DocumentUploadIcon className="size-16 text-brand-grey400" />
            <span className="rounded-lg bg-brand-primary100 px-2.5 py-[5px] font-manrope text-base font-medium leading-[1.6] text-brand-blue500">
              Upload document
            </span>
          </button>
        )}

        <p className="flex gap-1 text-xs leading-[1.6] text-brand-grey400">
          <InfoCircleIcon className="mt-0.5 size-4 shrink-0 text-brand-blue500" />
          Make sure every corner is visible and the details are readable.
        </p>

        <PrimaryButton disabled={!docFile} onClick={() => setStep("identity-address")}>
          Next
        </PrimaryButton>
      </SectionCard>
    ));
  }

  /* ---------------- Level 3 step 2 — proof of address (Figma 4234:16640) ---------------- */
  if (step === "identity-address") {
    return shell("KYC Verification", () => setStep("identity-doc"), (
      <SectionCard className="flex flex-col gap-5 px-4 py-5">
        <Stepper steps={identitySteps} current={1} />

        <div>
          <h2 className="text-[17px] font-bold leading-[1.4] text-brand-grey900">Select a utility bill to submit</h2>
          <p className="pt-1 text-xs leading-[1.3] text-brand-bodyText">
            Country: {countries.find((c) => c.value === country)?.label}
          </p>
        </div>

        <div className="flex flex-col">
          {addressProofs.map((option) => (
            <RadioRow key={option} label={option} selected={proof === option} onSelect={() => setProof(option)} />
          ))}
        </div>

        <p className="text-center text-xs leading-[1.6] text-brand-grey400">
          Make sure the name on the bill match with your profile details for successful verification.
        </p>

        <PrimaryButton onClick={() => setStep("identity-selfie")}>Next</PrimaryButton>
      </SectionCard>
    ));
  }

  /* ---------------- Level 3 step 3 — selfie ---------------- */
  if (step === "identity-selfie") {
    return shell("KYC Verification", () => setStep("identity-address"), (
      <SectionCard className="flex flex-col items-center gap-5 px-4 py-5">
        <Stepper steps={identitySteps} current={2} />

        <h2 className="text-[17px] font-bold leading-[1.4] text-brand-grey900">Take a Selfie</h2>
        <p className="max-w-[260px] text-center text-xs leading-[1.6] text-brand-grey400">
          Hold your phone at eye level, make sure your face is fully visible and well lit.
        </p>

        <span
          className={cn(
            "flex size-[180px] items-center justify-center rounded-full border-2 border-dashed transition-colors",
            selfieTaken ? "border-brand-successText bg-brand-tint" : "border-brand-grey300",
          )}
        >
          {selfieTaken ? (
            <CheckCircleIcon className="size-16 text-brand-successText" />
          ) : (
            <FaceIdIcon className="size-20 text-brand-grey400" />
          )}
        </span>

        {!selfieTaken && (
          <button
            type="button"
            onClick={() => {
              setSelfieTaken(true);
              toast.success("Selfie captured");
            }}
            className="rounded-lg bg-brand-primary100 px-4 py-2 font-manrope text-base font-medium leading-[1.6] text-brand-blue500"
          >
            Capture selfie
          </button>
        )}

        <PrimaryButton disabled={!selfieTaken} onClick={() => submit(3)}>
          Submit
        </PrimaryButton>
      </SectionCard>
    ));
  }

  /* ---------------- Levels (Figma 8485:72342 / 4133:15549) ---------------- */
  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="KYC Verification" onBack={() => navigate(-1)} />

        {/* Current limits */}
        <SectionCard className="px-4 py-5">
          <div className="flex items-stretch">
            {[
              { label: "Trading", value: unlocked?.trading ?? "$0", note: "One-time Payout" },
              { label: "Withdrawal", value: unlocked?.withdrawal ?? "$0", note: "Daily Withdrawal" },
            ].map((cell, index) => (
              <div
                key={cell.label}
                className={cn("flex flex-1 flex-col items-center gap-1", index === 0 && "border-r border-brand-grey100")}
              >
                <span className="text-xs uppercase leading-[1.6] text-brand-grey500">{cell.label}</span>
                <span className="text-[32px] font-bold leading-[1.2] text-brand-grey900">{cell.value}</span>
                <span className="text-xs leading-[1.6] text-brand-amberBrown">{cell.note}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4">
            <span className="h-1 min-w-0 flex-1 overflow-hidden rounded-sm bg-brand-grey100">
              <span
                className="block h-full rounded-sm bg-brand-blue500 transition-all"
                style={{ width: `${(completed.length / levels.length) * 100}%` }}
              />
            </span>
            <span className="shrink-0 text-xs leading-[1.6] text-brand-grey500">
              {completed.length}/{levels.length}
            </span>
          </div>
        </SectionCard>

        {/* Levels */}
        <div className="mt-3 flex flex-col gap-3">
          {levels.map((l) => {
            const done = completed.includes(l.level);
            return (
              <SectionCard key={l.level} className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => (done ? undefined : startLevel(l.level))}
                  disabled={done}
                  className="flex w-full items-center gap-3 text-left disabled:cursor-default"
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-center gap-2">
                      <span className="text-[17px] font-bold leading-[1.4] text-brand-grey900">Level {l.level}</span>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-semibold uppercase leading-[1.6]",
                          done ? "bg-brand-tint text-brand-blue500" : "bg-brand-noteAmber text-brand-amberBrown",
                        )}
                      >
                        {done ? "Completed" : "Required"}
                      </span>
                    </span>
                    <span className="pt-1 text-xs leading-[1.3] text-brand-bodyText">{l.title}</span>
                    <span className="pt-0.5 text-xs leading-[1.3] text-brand-grey400">{l.limits}</span>
                  </span>
                  {done && <CheckCircleIcon className="size-5 shrink-0 text-brand-successText" />}
                </button>
              </SectionCard>
            );
          })}
        </div>

        {/* Why verify */}
        <SectionCard className="mt-3 px-4 py-4">
          <h2 className="text-[15px] font-bold leading-[1.4] text-brand-danger">Why verify your account?</h2>
          <p className="pt-2 text-xs leading-[1.6] text-brand-bodyText">
            Complete KYC verification to unlock trading, withdrawals, and access to DeeX's full features. Your security
            is our priority.
          </p>
          <button
            type="button"
            onClick={() => navigate("/about")}
            className="mt-3 border-t border-brand-grey100 pt-3 text-xs font-medium leading-[1.6] text-brand-blue500"
          >
            Learn more about Limits
          </button>
        </SectionCard>

        <div className="px-4 pt-6">
          <PrimaryButton
            disabled={completed.length === levels.length}
            onClick={() => startLevel(nextLevel)}
          >
            {completed.length === levels.length ? "All levels verified" : `Upgrade to level ${nextLevel}`}
          </PrimaryButton>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default KycVerification;
