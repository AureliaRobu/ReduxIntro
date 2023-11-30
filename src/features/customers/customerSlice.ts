import { createSlice } from '@reduxjs/toolkit';

interface CustomerState {
  fullName: string;
  nationalId: string;
  createdAt: string;
}

const initialState: CustomerState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

/*

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

 */
