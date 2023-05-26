import React from 'react';

import * as creaturesActions from '../../redux/slices/creaturesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { Creature } from '../../types/Creature';

type Props = {
	id: number;
	handleIsDeleting: (isOpen: boolean) => void;
};

export const DeleteModal: React.FC<Props> = ({ id, handleIsDeleting }) => {
	const dispatch = useAppDispatch();
	const creatures: Creature[] = useAppSelector(state => state.creatures.creatures);
	const creature = creatures.find(creature => creature.id === id);

	if (creature === undefined) {
		return null;
	}

	const { name, gender } = creature;

	const handleDelete = (creatureId: number) => {
		dispatch(creaturesActions.remove(creatureId));
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
