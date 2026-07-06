export type TxType = "topup" | "send" | "bill" | "refund";
export type TxStatus = "completed" | "pending" | "failed";

export interface NairaTransaction {
  id: string;
  type: TxType;
  label: string;
  amount: number;
  date: string;
  status: TxStatus;
  reference: string;
  beneficiaryName?: string;
  bankName?: string;
}

export interface Beneficiary {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  createdAt: string;
}

export interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  accountName: string;
}

export interface NairaWalletState {
  balance: number;
  transactions: NairaTransaction[];
  beneficiaries: Beneficiary[];
  virtualAccount: VirtualAccount;
}
