import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const MobileLayout = ({ children, hideNav }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen relative">
        <div className={hideNav ? "" : "pb-20"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
