import { Action, CustomerPayload } from '../../interfaces/commonInterfaces';

interface CustomerState {
  fullName: string;
  nationalId: string;
  createdAt: string;
}

const initialStateCustomer: CustomerState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

export default function customerReducer(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialStateCustomer,
  action: Action
) {
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

export function createCustomer(fullName: string, nationalId: string) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}
