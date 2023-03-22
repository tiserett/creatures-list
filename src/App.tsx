import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Home } from './pages/Home';
import { Creatures } from './pages/Creatures';
import { CreaturePage } from './pages/CreaturePage';

export const App = () => {
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
