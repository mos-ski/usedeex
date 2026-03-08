import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Monitor, Megaphone } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const notifications = [
  { id: 1, icon: LogIn, title: "New Login Detected", message: "Login from Chrome on Windows 11", time: "2 hours ago", type: "login" },
  { id: 2, icon: Monitor, title: "Session Expired", message: "Your previous session has ended", time: "5 hours ago", type: "session" },
  { id: 3, icon: Megaphone, title: "🎉 Weekend Promo!", message: "Get 2x DeeXpoints on all trades this weekend", time: "1 day ago", type: "promo" },
  { id: 4, icon: LogIn, title: "New Login Detected", message: "Login from Safari on iPhone", time: "2 days ago", type: "login" },
  { id: 5, icon: Megaphone, title: "Rate Update", message: "BTC rate has been updated. Check the latest rates.", time: "3 days ago", type: "promo" },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 bg-secondary rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                <n.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notifications;
