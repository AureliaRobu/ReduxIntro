import { createStore } from 'redux';

interface LoanPayload {
  amount: number;
  purpose: string;
}

interface Action {
  type: string;
  payload?: number | LoanPayload;
}

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function reducer(state = initialState, action: Action) {
  let loanPayload: LoanPayload | undefined;

  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + ((action.payload as number) ?? 0),
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - ((action.payload as number) ?? 0),
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;

      loanPayload = action.payload as LoanPayload;
      return {
        ...state,
        loan: loanPayload.amount ?? 0,
        balance: state.balance + (loanPayload.amount ?? 0),
        loanPurpose: loanPayload.purpose,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function deposit(amount: number) {
  return {
    type: 'account/deposit',
    payload: amount,
  };
}

function withdraw(amount: number) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}

function requestLoan(amount: number, purpose: string) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: 'account/payLoan' };
}

const store = createStore(reducer);
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a cheap car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
