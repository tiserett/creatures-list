import 'bulma/css/bulma.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { store } from './redux/store';
import './styles/index.scss';

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Root />);
