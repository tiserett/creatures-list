import React from 'react';
import { NavLink } from 'react-router-dom';

export const Home = () => (
	<section className="fullHeight hero is-medium is-primary">
		<div className="hero-body">
			<p className="title is-1 has-text-black-bis mb-6">
				Welcome to People Table
				<br />
				Done by Maksym Sobko
			</p>

			<NavLink to="/People" className="button is-large is-link mb-4">
				Show people
			</NavLink>
			<br />
			<a
				href="https://www.linkedin.com/in/maksym-sobko-253a8824a/"
				target="_blank"
				rel="noreferrer"
				className="button is-large is-link"
			>
				Linkedin
			</a>
		</div>
	</section>
);
