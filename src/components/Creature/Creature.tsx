import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreatureType } from '../../types/CreatureType';
import '../../styles/creature.scss'

type Props = {
	creature: CreatureType;
	handleIsDeleting: (isOpen: boolean) => void;
	handleIsEditing: (isEditing: boolean) => void;
	setId: (id: number) => void;
};

export const Creature: React.FC<Props> = ({
	creature,
	handleIsDeleting,
	handleIsEditing,
	setId,
}) => {
	const { id, name, height, mass, gender } = creature;

	const [isEdited, setIsEdited] = useState(false);

	return (
		<div className={classNames('creature', { 'is-italic': isEdited })}>
			<span className="creature__id">{id}</span>
			<span className="creature__infoWrapper">{name}</span>
			<span className="creature__infoWrapper">{height}</span>
			<span className="creature__infoWrapper">{mass}</span>
			<span className="creature__infoWrapper">{gender}</span>

			<div className="creature__buttons">
				<Link to={`/Creatures/${id}`} className="button is-link is-outlined mr-3">
					Read more
				</Link>
				<button
					type="submit"
					className="button is-info is-outlined mr-3"
					onClick={() => {
						setId(id);
						handleIsEditing(true);
						setIsEdited(true);
					}}
				>
					Edit
				</button>

				<button
					type="submit"
					className="button is-danger is-outlined"
					onClick={() => {
						setId(id);
						handleIsDeleting(true);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
