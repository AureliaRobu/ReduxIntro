import { combineReducers, createStore } from 'redux';

interface LoanPayload {
  amount: number;
  purpose: string;
}

interface CustomerPayload {
  fullName: string;
  nationalId: string;
  createdAt: string;
}

interface Action {
  type: string;
  payload?: number | LoanPayload | CustomerPayload;
}

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function accountReducer(state = initialStateAccount, action: Action) {
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

// eslint-disable-next-line @typescript-eslint/default-param-last
function customerReducer(state = initialStateCustomer, action: Action) {
  let customerPayload: CustomerPayload | undefined;
  switch (action.type) {
    case 'customer/createCustomer':
      customerPayload = action.payload as CustomerPayload;
      return {
        ...state,
        fullName: customerPayload.fullName,
        nationalId: customerPayload.nationalId,
        createdAt: customerPayload.createdAt,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

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

function createCustomer(fullName: string, nationalId: string) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}

const store = createStore(rootReducer);
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a cheap car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer('Aurelia Robu', '1234'));
console.log(store.getState());
