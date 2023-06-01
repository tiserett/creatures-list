import React, { useEffect, useMemo, useState } from 'react';

import * as creaturesActions from '../../redux/slices/creaturesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { ThreeDots } from 'react-loader-spinner'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import '../../styles/creature.scss';
import '../../styles/transition.scss';
import '../../styles/index.scss'
import { AddModal, Creature, DeleteModal, EditModal } from '../../components';

export const Creatures: React.FC = () => {
	const dispatch = useAppDispatch();

	const { creatures, loading, error } = useAppSelector(state => state.creatures);
	const [query, setQuery] = useState('');
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [id, setId] = useState(0);

	useEffect(() => {
		dispatch(creaturesActions.init())
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

	if (loading) {
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

	if (error) {
		return (<div className="error">{error}</div>)
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
