import React, { useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AddModal } from '../../components/AddModal';
import { DeleteModal } from '../../components/DeleteModal';
import { EditModal } from '../../components/EditModal';
import '../../styles/transition.scss';
import '../../styles/creature.scss';
import { Creature as CreatureType } from '../../types/Creature';
import { Creature } from '../../components/Creature';
import { useAppSelector } from '../../hooks/redux';

export const Creatures: React.FC = () => {
	const creatures: CreatureType[] = useAppSelector(state => state.creatures.creatures);
	const [query, setQuery] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [id, setId] = useState(0);

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
	);
};
