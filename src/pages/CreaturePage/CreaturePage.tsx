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
	const creatures: CreatureType[] = useSelector((state: CreaturesState) => state.creatures.creatures);
	const { creatureId } = useParams();

	const id = Number(creatureId);
	const creature = creatures.find(creature => creature.id === id);

	useEffect(() => {
		const fetchData = async () => {
			if (!creature) {
				return;
			}

			const data = await fetch(String(creature?.homeworld));

			const planet = await data.json();

			setPlanet(planet);
		};

		fetchData();
	}, [creatureId]);

	if (!creature || !id) {
		return <Navigate to="/Creatures" replace />;
	}

	const nextCreature = creatures.find(creature => creature.id > id);
	const prevCreature = [...creatures]
		.sort((p1, p2) => p2.id - p1.id)
		.find(creature => creature.id < id);

	const { name: creatureName, gender } = creature;
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
							to={`/Creatures/${prevCreature ? prevCreature.id : id}`}
							className={classNames(
								'button is-link is-outlined mr-3 is-size-5',
								{ 'disabled is-danger': prevCreature ? !prevCreature.id : true }
							)}
						>
							Previous
						</Link>
						<Link
							to={`/Creatures/${nextCreature ? nextCreature.id : id}`}
							className={classNames(
								'button is-link is-outlined mr-3 is-size-5',
								{ 'disabled is-danger': nextCreature ? !nextCreature.id : true }
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
