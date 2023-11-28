import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import accountReducer from '../features/accounts/accountSlice';
import customerReducer from '../features/customers/customerSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
export default store;
