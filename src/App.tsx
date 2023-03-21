import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Home } from './pages/Home';
import { Creatures } from './pages/Creatures';
import { CreaturePage } from './pages/CreaturePage';
import { CreatureType } from './types/CreatureType';
import { addCreatures, clearCreatures } from './redux/slices/creaturesSlice';
import { useDispatch } from 'react-redux';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('https://swapi.dev/api/people');

			let dataFromServer = await data.json();

			dataFromServer = dataFromServer.results.map(
				(creature: CreatureType, index: number) => ({ ...creature, id: index + 1 })
			)

			dispatch(addCreatures(dataFromServer));
		};

		try {
			fetchData();
		} catch {
			dispatch(clearCreatures)();
		}
	}, []);

	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="Home" element={<Home />} />

				<Route path="Creatures">
					<Route index element={<Creatures />} />

					<Route path=":creatureId" element={<CreaturePage />} />
				</Route>

				<Route path="/" element={<Navigate to="Home" replace />} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
