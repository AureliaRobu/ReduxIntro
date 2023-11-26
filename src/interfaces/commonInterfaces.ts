export interface Action {
  type: string;
  payload?: number | LoanPayload | CustomerPayload;
}

export interface LoanPayload {
  amount: number;
  purpose: string;
}

export interface CustomerPayload {
  fullName: string;
  nationalId: string;
  createdAt: string;
}
