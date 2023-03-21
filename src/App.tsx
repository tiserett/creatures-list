import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Home } from './pages/Home';
import { Creatures } from './pages/Creatures';
import { CreaturePage } from './pages/CreaturePage';
import { addCreatures, clearCreatures } from './redux/slices/creaturesSlice';
import { Creature } from './types/Creature';
import { useAppDispatch } from './hooks/redux';
import { ThreeDots } from 'react-loader-spinner'

export const App = () => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const data = await fetch('https://swapi.dev/api/people');
			let dataFromServer = await data.json();
			dataFromServer = dataFromServer.results.map(
				(creature: Creature, index: number) => ({ ...creature, id: index + 1 })
			)

			setTimeout(() => {
				setIsLoading(false)
				dispatch(addCreatures(dataFromServer));
			}, 1000);
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

			{isLoading ? (
				<ThreeDots
					height="80"
					width="80"
					radius="9"
					color="#4fa94d"
					ariaLabel="three-dots-loading"
					visible={true}
					wrapperStyle={{
						display: 'grid',
						placeItems: 'center',
						height: 'calc(100vh - 52px)'
					}}
				/>
			) : (
				<Routes>
					<Route path="Home" element={<Home />} />

					<Route path="Creatures">
						<Route index element={<Creatures />} />

						<Route path=":creatureId" element={<CreaturePage />} />
					</Route>

					<Route path="/" element={<Navigate to="Home" replace />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			)}
		</div>
	);
};
