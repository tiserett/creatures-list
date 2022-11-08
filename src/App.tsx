import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { People } from './pages/People';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="Home"
          element={<Home />}
        />

        <Route path="People">
          <Route
            index
            element={<People />}
          />

          <Route
            path=":personId"
            element={<h2>Person info</h2>}
          />
        </Route>

        <Route path="/" element={<Navigate to="Home" replace />} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  )
}
