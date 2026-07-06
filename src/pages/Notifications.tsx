import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const notifications = [
  { id: 0, title: "You earned 200 DeeXpoints! 🎁", message: "Your first deposit unlocked the deposit reward from your invite code DX-WELCOME500.", time: "Today 3:12 PM", type: "reward" },
  { id: 1, title: "Login Notification", message: "You just successfully logged into your account. Happy trading!", time: "Today 1:43 PM", type: "login" },
  { id: 2, title: "Session Terminated", message: "Your previous session on device Galaxy S10 was terminated due to a new login from another device.", time: "Today 1:43 PM", type: "session" },
  { id: 3, title: "Login Notification", message: "You just successfully logged into your account. Happy trading!", time: "Today 1:43 PM", type: "login" },
  { id: 4, title: "Session Terminated", message: "Your previous session on device Galaxy S10 was terminated due to a new login from another device.", time: "Today 1:43 PM", type: "session" },
  { id: 5, title: "CRYPTO TO NAIRA SIMPLIFIED. ⚡", message: "You're just a few taps away Login to trade your crypto the easy way. 🎆", time: "Today 1:31 PM", type: "promo" },
  { id: 6, title: "THE DAY ISN'T OVER YET 🌙", message: "Deex is always open for you. Flip your crypto and get paid instantly. ⚡", time: "Yesterday 7:36 PM", type: "promo" },
  { id: 7, title: "SHARP ON WEEKDAYS, EVEN SHARPER ON WEEKENDS 😂", message: "Weekend vibes + DeeX rates = easy money. Trade now!", time: "Yesterday 2:15 PM", type: "promo" },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground w-full text-center">Notification</h2>
        </div>

        <h3 className="text-base font-bold text-foreground mb-4">All</h3>

        <div className="bg-card rounded-2xl overflow-hidden">
          {notifications.map((n, i) => (
            <div key={n.id}>
              <div className="px-5 py-4">
                <p className={`text-sm font-semibold mb-1 ${n.type === "promo" ? "text-warning" : n.type === "reward" ? "text-success" : "text-foreground"}`}>
                  {n.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
              </div>
              {i < notifications.length - 1 && (
                <div className="mx-5 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notifications;
