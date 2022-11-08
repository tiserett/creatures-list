import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import './styles/index.scss';
import 'bulma/css/bulma.min.css';

const Root = () => (
  <Router>
    <App />
  </Router>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Root />);
