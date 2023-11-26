import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './features/App';
import './index.css';
import store from './store/store';

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
