import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { CreatureType } from '../../types/CreatureType';

type Props = {
	creature?: CreatureType;
	handleCreatures: (creatures: CreatureType) => void;
	handleClose: (isOpened: boolean) => void;
	title: string;
};

export const ModalForm: React.FC<Props> = ({
	creature,
	handleCreatures,
	handleClose,
	title,
}) => {
	if (creature === undefined) {
		return null;
	}

	const [selectedCreature, setSelectedCreature] = useState<CreatureType>(creature);

	const { name, height, mass, gender } = selectedCreature;

	const planetId = Math.floor(Math.random() * (10 - 1) + 1);

	const tempCreature: CreatureType = {
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

		setSelectedCreature(prev => ({ ...prev, [e.target.name]: value }));
	};

	const handleSumbit = (
		event: FormEvent<HTMLFormElement>,
		newCreature: CreatureType
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
						<div className="field">
							<label className="label">
								Name
								<div className="control">
									<input
										className={classNames('input', { 'is-success': name }, { 'is-danger': !name })}
										type="text"
										placeholder="Name"
										name="name"
										value={name}
										onChange={handleChange}
										required
									/>
								</div>
							</label>

							{!name && <p className="help is-danger">Please provide name</p>}
						</div>

						<div className="field">
							<label className="label">
								Height
								<div className="control">
									<input
										className={classNames('input', { 'is-success': height }, { 'is-danger': !height })}
										type="text"
										placeholder="Height"
										name="height"
										value={height}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!height && (
								<p className="help is-danger">Please provide height</p>
							)}
						</div>

						<div className="field">
							<label className="label">
								Mass
								<div className="control">
									<input
										className={classNames('input', { 'is-success': mass }, { 'is-danger': !mass })}
										type="text"
										placeholder="Mass"
										name="mass"
										value={mass}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!mass && (
								<p className="help is-danger">Please provide mass</p>
							)}
						</div>
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
