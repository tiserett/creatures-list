import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { PersonType } from '../../types/PersonType';

type Props = {
	person?: PersonType;
	handlePeople: (people: PersonType) => void;
	handleClose: (isOpened: boolean) => void;
	title: string;
};

export const ModalForm: React.FC<Props> = ({
	person,
	handlePeople,
	handleClose,
	title,
}) => {
	if (person === undefined) {
		return null;
	}

	const [user, setUser] = useState<PersonType>(person);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (value === ' ') {
			return;
		}

		setUser(prev => ({ ...prev, [e.target.name]: value }));
	};

	const tempPerson: PersonType = {
		id: person.id,
		name: user.name,
		height: user.height,
		mass: user.mass,
		gender: user.gender
	};

	const handleSumbit = (
		event: FormEvent<HTMLFormElement>,
		newPerson: PersonType
	) => {
		event.preventDefault();

		handlePeople(newPerson);
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
				<form action="" onSubmit={event => handleSumbit(event, tempPerson)}>
					<section className="modal-card-body">
						<div className="field">
							<label className="label">
								Name
								<div className="control">
									<input
										className={classNames('input', { 'is-success': user.name }, { 'is-danger': !user.name })}
										type="text"
										placeholder="Name"
										name="name"
										value={user.name}
										onChange={handleChange}
										required
									/>
								</div>
							</label>

							{!user.name && <p className="help is-danger">Please provide name</p>}
						</div>

						<div className="field">
							<label className="label">
								Height
								<div className="control">
									<input
										className={classNames('input', { 'is-success': user.height }, { 'is-danger': !user.height })}
										type="text"
										placeholder="Height"
										name="height"
										value={user.height}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!user.height && (
								<p className="help is-danger">Please provide height</p>
							)}
						</div>

						<div className="field">
							<label className="label">
								Mass
								<div className="control">
									<input
										className={classNames('input', { 'is-success': user.mass }, { 'is-danger': !user.mass })}
										type="text"
										placeholder="Mass"
										name="mass"
										value={user.mass}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!user.mass && (
								<p className="help is-danger">Please provide mass</p>
							)}
						</div>
					</section>

						<footer className="modal-card-foot">
							<button type="submit" className="button is-success">
								Save person
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
