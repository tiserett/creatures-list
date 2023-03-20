import React, { useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppSelector } from '../../app/hooks';
import { AddModal } from '../../components/AddModal';
import { DeleteModal } from '../../components/DeleteModal';
import { EditModal } from '../../components/EditModal';
import { Person } from '../../components/Person';
import '../../styles/transition.scss';
import '../../styles/creature.scss';
import { PersonType } from '../../types/PersonType';

export const People: React.FC = () => {
	const people: PersonType[] = useAppSelector(state => state.people);
	const [query, setQuery] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [id, setId] = useState(0);

	const visiblePeople = useMemo(() => {
		return people.filter(person =>
			person.name.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, people]);

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
					{visiblePeople.map(person => (
						<CSSTransition key={person.id} timeout={1000} classNames="item">
							<Person
								person={person}
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
