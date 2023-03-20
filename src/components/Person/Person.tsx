import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../../types/PersonType';
import '../../styles/person.scss'

type Props = {
	person: PersonType;
	handleIsDeleting: (isOpen: boolean) => void;
	handleIsEditing: (isEditing: boolean) => void;
	setId: (id: number) => void;
};

export const Person: React.FC<Props> = ({
	person,
	handleIsDeleting,
	handleIsEditing,
	setId,
}) => {
	const { id, name, username, email, address } = person;

	const [isEdited, setIsEdited] = useState(false);

	return (
		<div className={classNames('person', { 'is-italic': isEdited })}>
			<span className="person__id">{id}</span>
			<span className="person__infoWrapper">{name}</span>
			<span className="person__infoWrapper">{username}</span>
			<span className="person__infoWrapper">{email}</span>
			<span className="person__infoWrapper">{address.city}</span>
			<span className="person__infoWrapper">{address.street}</span>

			<div className="person__buttons">
				<Link to={`/People/${id}`} className="button is-link is-outlined mr-3">
					Select
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
