import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CreaturesState } from '../../types/CreatureState';
import { CreatureType } from '../../types/CreatureType';
import { Planet } from '../../types/Planet';
import { addCommas } from '../../utils/addComas';
import '../../styles/CreaturePage.scss';

export const CreaturePage: React.FC = () => {
	const [planet, setPlanet] = useState<Planet>({
		name: '',
		terrain: '',
		climate: '',
		population: 0
	});
	const people: CreatureType[] = useSelector((state: CreaturesState) => state.creatures.creatures);
	const { creatureId } = useParams();

	const id = Number(creatureId);
	const user = people.find(person => person.id === id);

	useEffect(() => {
		const fetchData = async () => {
			if (!user) {
				return;
			}

			const data = await fetch(String(user?.homeworld));

			const planet = await data.json();

			setPlanet(planet);
		};

		fetchData();
	}, [creatureId]);

	if (!user || !id) {
		return <Navigate to="/Creatures" replace />;
	}

	const nextUser = people.find(person => person.id > id);
	const prevUser = [...people]
		.sort((p1, p2) => p2.id - p1.id)
		.find(person => person.id < id);

	const { name: creatureName, gender } = user;
	const { name: planetName, terrain, climate, population } = planet;

	const populationText = population > 0
		? `Currently there are more than ${addCommas(population)} inhabitants`
		: `Amount of current inhabitants is unknown`

	return (
		<section className="fullHeight hero is-small is-primary is-warning">
			<div className="hero-body">
				<section className="title">
					<div className="mb-6">
						<Link
							to="/Creatures"
							className="button is-link is-outlined mr-3 is-size-5"
						>
							Back to creatures
						</Link>
						<Link
							to={`/Creatures/${prevUser ? prevUser.id : id}`}
							className={classNames(
								'button is-link is-outlined mr-3 is-size-5',
								{ 'disabled is-danger': prevUser ? !prevUser.id : true }
							)}
						>
							Previous
						</Link>
						<Link
							to={`/Creatures/${nextUser ? nextUser.id : id}`}
							className={classNames(
								'button is-link is-outlined mr-3 is-size-5',
								{ 'disabled is-danger': nextUser ? !nextUser.id : true }
							)}
						>
							Next
						</Link>
					</div>

					<p>
						{creatureName} is a {gender} who started it`s path on {planetName}
						<br />
						<br />
						{planetName} has {terrain} terrain with {climate} climate
						<br />
						{populationText}
					</p>
				</section>
			</div>
		</section>
	);
};
