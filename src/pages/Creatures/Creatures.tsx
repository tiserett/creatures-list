import React, { useEffect, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AddModal } from '../../components/AddModal';
import { DeleteModal } from '../../components/DeleteModal';
import { EditModal } from '../../components/EditModal';
import '../../styles/transition.scss';
import '../../styles/creature.scss';
import { Creature as CreatureType } from '../../types/Creature';
import { Creature } from '../../components/Creature';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCreatures, clearCreatures } from '../../redux/slices/creaturesSlice';
import { ThreeDots } from 'react-loader-spinner'

export const Creatures: React.FC = () => {
	const dispatch = useAppDispatch();
	const creatures: CreatureType[] = useAppSelector(state => state.creatures.creatures);
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [id, setId] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const data = await fetch('https://swapi.dev/api/people');
			let dataFromServer = await data.json();
			dataFromServer = dataFromServer.results.map(
				(creature: CreatureType, index: number) => ({ ...creature, id: index + 1 })
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

	const visibleCreatures = useMemo(() => {
		return creatures.filter(creatures =>
			creatures.name.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, creatures]);

	const handleQuery = (value: string) => {
		if (value === ' ') {
			return;
		}

		setQuery(value);
	};

	if (isLoading) {
		return <ThreeDots
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
	}

	return (
		<section className="hero">
			<div className="hero-body p-5">
				<p className="title">Creatures</p>

				<button
					type="submit"
					className="button is-success is-outlined title is-5"
					onClick={() => setIsAdding(true)}
				>
					Add new creature
				</button>

				<input
					className="input mb-5"
					type="text"
					placeholder="Enter name"
					value={query}
					onChange={event => handleQuery(event.target.value)}
				/>

				<TransitionGroup component="div" className="creature__wrapper">
					{visibleCreatures.map(creature => (
						<CSSTransition key={creature.id} timeout={1000} classNames="item">
							<Creature
								creature={creature}
								handleIsDeleting={setIsDeleting}
								handleIsEditing={setIsEditing}
								setId={setId}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>

			{isAdding && <AddModal setIsAdding={setIsAdding} />}
			{isEditing && <EditModal setIsEditing={setIsEditing} id={id} />}
			{isDeleting && <DeleteModal id={id} handleIsDeleting={setIsDeleting} />}
		</section>
	)
};
