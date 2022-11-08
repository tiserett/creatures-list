import
React, {
  useEffect,
  useState
} from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { Person } from './types/Person';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users');

      const peopleFromServer = await data.json();

      setPeople(peopleFromServer);
    };

    try {
      fetchData();
    } catch {
      setPeople([]);
    }
  }, []);

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
            element={<People people={people} />}
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
