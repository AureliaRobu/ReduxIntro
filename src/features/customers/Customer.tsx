import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function Customer() {
  const customerName = useSelector(
    (store: RootState) => store.customer.fullName
  );
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
