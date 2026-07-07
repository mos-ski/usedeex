import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface AppliedInviteCode {
  code: string;
  depositReward: number;
  tradeReward: number;
  minDeposit: number;
  minTrade: number;
}

interface InviteCodeState {
  appliedCode: AppliedInviteCode | null;
  depositCompleted: boolean;
  tradeCompleted: boolean;
  hasSeenDashboardModal: boolean;
}

interface InviteCodeContextValue extends InviteCodeState {
  applyCode: (code: string) => void;
  completeDeposit: () => void;
  completeTrade: () => void;
  markDashboardModalSeen: () => void;
}

const STORAGE_KEY = "deex_invite_code_state";

export const mockInviteCode: AppliedInviteCode = {
  code: "DX-WELCOME500",
  depositReward: 200,
  tradeReward: 300,
  minDeposit: 50,
  minTrade: 100,
};

const defaultState: InviteCodeState = {
  appliedCode: null,
  depositCompleted: false,
  tradeCompleted: false,
  hasSeenDashboardModal: false,
};

const InviteCodeContext = createContext<InviteCodeContextValue | null>(null);

const loadState = (): InviteCodeState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
};

export const InviteCodeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<InviteCodeState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const applyCode = (code: string) => {
    if (code.toUpperCase() !== mockInviteCode.code) return;
    setState(prev => ({ ...prev, appliedCode: mockInviteCode, hasSeenDashboardModal: true }));
  };

  const completeDeposit = () => {
    setState(prev => (prev.appliedCode && !prev.depositCompleted ? { ...prev, depositCompleted: true } : prev));
  };

  const completeTrade = () => {
    setState(prev => (prev.appliedCode && !prev.tradeCompleted ? { ...prev, tradeCompleted: true } : prev));
  };

  const markDashboardModalSeen = () => {
    setState(prev => ({ ...prev, hasSeenDashboardModal: true }));
  };

  return (
    <InviteCodeContext.Provider value={{ ...state, applyCode, completeDeposit, completeTrade, markDashboardModalSeen }}>
      {children}
    </InviteCodeContext.Provider>
  );
};

export const useInviteCode = () => {
  const ctx = useContext(InviteCodeContext);
  if (!ctx) throw new Error("useInviteCode must be used within InviteCodeProvider");
  return ctx;
};
