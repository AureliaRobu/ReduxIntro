import CreateCustomer from './customers/CreateCustomer';
import Customer from './customers/Customer';
import AccountOperations from './accounts/AccountOperations';
import BalanceDisplay from './accounts/BalanceDisplay';

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
