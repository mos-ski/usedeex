import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const [firstName] = useState("John");
  const [lastName] = useState("Doe");
  const [email] = useState("johndoe@email.com");
  const [dob] = useState("1995-06-15");
  const [username, setUsername] = useState("@johndoe");
  const [phone, setPhone] = useState("+234 810 367 4006");

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
            {/* Non-editable: First Name */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1.5">First Name <Lock className="w-3 h-3" /></label>
              <div className="w-full h-12 bg-muted rounded-xl px-4 flex items-center text-muted-foreground">{firstName}</div>
            </div>
            {/* Non-editable: Last Name */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1.5">Last Name <Lock className="w-3 h-3" /></label>
              <div className="w-full h-12 bg-muted rounded-xl px-4 flex items-center text-muted-foreground">{lastName}</div>
            </div>
            {/* Non-editable: Email */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1.5">Email <Lock className="w-3 h-3" /></label>
              <div className="w-full h-12 bg-muted rounded-xl px-4 flex items-center text-muted-foreground">{email}</div>
            </div>
            {/* Non-editable: Date of Birth */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-1.5">Date of Birth <Lock className="w-3 h-3" /></label>
              <div className="w-full h-12 bg-muted rounded-xl px-4 flex items-center text-muted-foreground">{dob}</div>
            </div>

            {/* Editable: Username */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            {/* Editable: Phone Number */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <button onClick={handleSave} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold mt-8 mb-8">Save Changes</button>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default EditProfile;
