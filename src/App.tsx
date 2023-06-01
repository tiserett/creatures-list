import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreaturePage, Creatures, Home } from './pages';
import { Header, NotFoundPage } from './components';

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
