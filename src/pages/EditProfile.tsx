import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import { TextField } from "@/components/dashboard/FormFields";
import { LockIcon } from "@/components/dashboard/icons";

/** Details fixed by verification — shown, but not editable here. */
const verified = [
  { label: "First Name", value: "John" },
  { label: "Last Name", value: "Doe" },
  { label: "Email", value: "johndoe@email.com" },
  { label: "Date of Birth", value: "1995-06-15" },
];

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("@johndoe");
  const [phone, setPhone] = useState("+234 810 367 4006");

  const save = () => {
    toast.success("Profile updated");
    navigate("/profile");
  };

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Edit Profile" onBack={() => navigate(-1)} />

        <SectionCard className="flex flex-col items-center px-4 py-6">
          <span className="flex size-[72px] items-center justify-center rounded-full bg-brand-primary100 text-[32px] font-semibold leading-[1.4] text-brand-blue500">
            JD
          </span>
          <button type="button" className="pt-3 text-xs font-semibold text-brand-blue500">
            Tap to change photo
          </button>
        </SectionCard>

        <SectionCard className="mt-3 flex flex-col gap-4 px-4 py-5">
          {verified.map((f) => (
            <div key={f.label} className="flex min-w-0 flex-col gap-1">
              <span className="flex items-center gap-1 text-xs leading-[1.3] text-brand-bodyText">
                {f.label}
                <LockIcon className="size-3 text-brand-grey400" />
              </span>
              <p className="w-full border-b border-brand-grey100 py-2 text-[15px] leading-[1.4] text-brand-grey500">
                {f.value}
              </p>
            </div>
          ))}

          <p className="-mt-1 text-xs leading-[1.6] text-brand-grey400">
            These come from your verification. Contact support if they need to change.
          </p>

          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Phone Number" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <PrimaryButton className="mt-2" onClick={save}>
            Save Changes
          </PrimaryButton>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default EditProfile;
