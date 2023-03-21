import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Creature } from '../../types/Creature';
import { Planet } from '../../types/Planet';
import { addCommas } from '../../utils/addComas';
import '../../styles/CreaturePage.scss';
import { useAppSelector } from '../../hooks/redux';
import { ThreeDots } from 'react-loader-spinner'

export const CreaturePage: React.FC = () => {
	const [planet, setPlanet] = useState<Planet>({
		name: '',
		terrain: '',
		climate: '',
		population: 0
	});
	const [isLoading, setIsLoading] = useState(false);
	const creatures: Creature[] = useAppSelector(state => state.creatures.creatures);
	const { creatureId } = useParams();

	const id = Number(creatureId);
	const creature = creatures.find(creature => creature.id === id);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			if (!creature) {
				return;
			}

			const data = await fetch(String(creature?.homeworld));
			const planet = await data.json();

			setTimeout(() => {
				setIsLoading(false)
				setPlanet(planet);
			}, 1000);
		};

		try {
			fetchData();
		} catch {
			setPlanet({
				name: 'unknown',
				terrain: 'unknown',
				climate: 'unknown',
				population: 0
			})
		}
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
		<>
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
			)}
		</>
	);
};
