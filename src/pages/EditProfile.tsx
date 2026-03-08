import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [dob, setDob] = useState("1995-06-15");

  const handleSave = () => {
    toast.success("Profile updated successfully");
    navigate("/profile");
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Edit Profile</h2>
            <NewBadge />
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-3">JD</div>
            <p className="text-xs text-muted-foreground">Tap to change photo</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Date of Birth</label>
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>

            {/* Non-editable fields */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1.5">Username <Lock className="w-3 h-3" /></label>
              <div className="w-full h-12 bg-muted rounded-xl px-4 flex items-center text-muted-foreground">@johndoe</div>
              <p className="text-[10px] text-muted-foreground mt-1">Contact support to change username</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1.5">Phone Number <Lock className="w-3 h-3" /></label>
              <div className="w-full h-12 bg-muted rounded-xl px-4 flex items-center text-muted-foreground">+234 810 367 4006</div>
              <p className="text-[10px] text-muted-foreground mt-1">Contact support to change phone number</p>
            </div>
          </div>

          <button onClick={handleSave} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold mt-8">Save Changes</button>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default EditProfile;
