import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { Header } from './components/Header';
import { actions as peopleActions } from './features/people';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { PersonPage } from './pages/PersonPage';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users');

      const peopleFromServer = await data.json();

      dispatch(peopleActions.add(peopleFromServer));
    };

    try {
      fetchData();
    } catch {
      dispatch(peopleActions.add([]));
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="Home" element={<Home />} />

        <Route path="People">
          <Route index element={<People />} />

          <Route path=":personId" element={<PersonPage />} />
        </Route>

        <Route path="/" element={<Navigate to="Home" replace />} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
};
