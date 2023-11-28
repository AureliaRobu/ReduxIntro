import { Action, LoanPayload } from '../../interfaces/commonInterfaces';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accountReducer(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialStateAccount,
  action: Action
) {
  let loanPayload: LoanPayload | undefined;

  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + ((action.payload as number) ?? 0),
        isLoading: false,
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
    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(amount: number, currency: string) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount,
    };
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    //   API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({
      type: 'account/deposit',
      payload: convertedAmount,
    });
  };
}

export function withdraw(amount: number) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}

export function requestLoan(amount: number, purpose: string) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return { type: 'account/payLoan' };
}
