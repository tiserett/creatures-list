import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as peopleActions } from '../../features/people';
import { PersonType } from '../../types/PersonType';

type Props = {
	id: number;
	handleIsDeleting: (isOpen: boolean) => void;
};

export const DeleteModal: React.FC<Props> = ({ id, handleIsDeleting }) => {
	const dispatch = useAppDispatch();
	const people: PersonType[] = useAppSelector(state => state.people);
	const user = people.find(person => person.id === id);

	if (user === undefined) {
		return null;
	}

	const { name, gender } = user;

	const handleDelete = (personId: number) => {
		dispatch(
			peopleActions.add(people.filter(person => person.id !== personId))
		);
	};

	return (
		<div className="modal is-active">
			<div
				className="modal-background"
				onClick={() => handleIsDeleting(false)}
			/>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Delete {name}?</p>
					<button
						type="submit"
						className="delete is-outlined"
						aria-label="close"
						onClick={() => handleIsDeleting(false)}
					/>
				</header>
				<section className="modal-card-body">
					<p>
						{`Id: ${id}`}
					</p>
					<p>
						{`Name: ${name}`}
					</p>
					<p>
						{`Gender: ${gender}`}
					</p>
				</section>
				<footer className="modal-card-foot">
					<button
						type="submit"
						className="button is-danger is-outlined"
						onClick={() => {
							handleDelete(id);
							handleIsDeleting(false);
						}}
					>
						Delete
					</button>
					<button
						type="submit"
						className="button is-info is-outlined"
						onClick={() => handleIsDeleting(false)}
					>
						Cancel
					</button>
				</footer>
			</div>
		</div>
	);
};
