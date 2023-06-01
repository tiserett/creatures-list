import React, { FormEvent, useState } from 'react';
import { Creature } from '../../types/Creature';
import { getRandomNumber } from '../../utils/getRandomNumber';
import { FormField } from '../FormField';

type Props = {
	creature?: Creature;
	handleCreatures: (creatures: Creature) => void;
	handleClose: (isOpened: boolean) => void;
	title: string;
};

export const ModalForm: React.FC<Props> = ({
	creature,
	handleCreatures,
	handleClose,
	title,
}) => {
	if (!creature) {
		return null;
	}

	const [selectedCreature, setSelectedCreature] = useState<Creature>(creature);

	const { name, height, mass, gender } = selectedCreature;

	const planetId = getRandomNumber(1, 10);

	const tempCreature: Creature = {
		id: creature.id,
		name,
		height,
		mass,
		gender,
		homeworld: `https://swapi.dev/api/planets/${planetId}/`
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (value === ' ') {
			return;
		}

		setSelectedCreature(prev => ({ ...prev, [e.target.name]: typeof value === 'string' ? value : +value }));
	};

	const handleSumbit = (
		event: FormEvent<HTMLFormElement>,
		newCreature: Creature
	) => {
		event.preventDefault();

		handleCreatures(newCreature);
		handleClose(false);
	};

	return (
		<div className="modal is-active">
			<div className="modal-background" onClick={() => handleClose(false)} />
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">{title}</p>
					<button
						type="submit"
						className="delete"
						aria-label="close"
						onClick={() => handleClose(false)}
					/>
				</header>
				<form action="" onSubmit={event => handleSumbit(event, tempCreature)}>
					<section className="modal-card-body">
						<FormField value={name} placeholder='Name' type='text' handleChange={handleChange}/>

						<FormField value={height} placeholder='Height' type='number' handleChange={handleChange} />

						<FormField value={mass} placeholder='Mass' type='number' handleChange={handleChange} />
					</section>

					<footer className="modal-card-foot">
						<button type="submit" className="button is-success">
							Save creature
						</button>
						<button
							type="button"
							className="button"
							onClick={() => handleClose(false)}
						>
							Cancel
						</button>
					</footer>
				</form>
			</div>
		</div>
	);
};
