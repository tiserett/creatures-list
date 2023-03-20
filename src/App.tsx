import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { actions as peopleActions } from './features/people';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { PersonPage } from './pages/PersonPage';
import { PersonType } from './types/PersonType';

export const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('https://swapi.dev/api/people');

			let dataFromServer = await data.json();

			dataFromServer = dataFromServer.results.map((person: PersonType, index: number) => ({ ...person, id: index + 1 }))

			dispatch(peopleActions.add(dataFromServer));
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

				<Route path="Creatures">
					<Route index element={<People />} />

					<Route path=":creatureId" element={<PersonPage />} />
				</Route>

				<Route path="/" element={<Navigate to="Home" replace />} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
