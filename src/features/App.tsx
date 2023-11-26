import { useSelector } from 'react-redux';
import CreateCustomer from './customers/CreateCustomer';
import Customer from './customers/Customer';
import AccountOperations from './accounts/AccountOperations';
import BalanceDisplay from './accounts/BalanceDisplay';

function App() {
  const customerName = useSelector((store) => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customerName === '' ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
