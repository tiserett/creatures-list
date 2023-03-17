import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { PersonType } from '../../types/PersonType';
import { validateEmail } from '../../utils/validateEmail';

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
		const name = e.target.name;

		if (value === ' ') {
			return;
		}

		setUser(prev => {
			let person: PersonType = { ...prev };

			if (name === 'city' || name === 'street') {
				person.address[name] = value;
			} else {
				person = { ...prev, [name]: value };
			}

			return person;
		});
	};

	const tempPerson: PersonType = {
		id: person.id,
		name: user.name,
		username: user.username,
		email: user.email,
		address: {
			street: user.address.street,
			suite: person.address.suite,
			city: user.address.city,
			zipcode: person.address.zipcode,
			geo: person.address.geo,
		},
		phone: person.phone,
		website: person.website,
		company: {
			name: person.company.name,
			catchPhrase: person.company.catchPhrase,
			bs: person.company.catchPhrase,
		},
	};

	const handleSumbit = (
		event: FormEvent<HTMLFormElement>,
		newPerson: PersonType
	) => {
		event.preventDefault();

		if (!validateEmail(newPerson.email)) {
			return;
		}

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
								Username
								<div className="control">
									<input
										className={classNames('input', { 'is-success': user.username }, { 'is-danger': !user.username })}
										type="text"
										placeholder="Username"
										name="username"
										value={user.username}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!user.username && (
								<p className="help is-danger">Please provide username</p>
							)}
						</div>

						<div className="field">
							<label className="label">
								Email
								<div className="control">
									<input
										className={classNames('input',
											{ 'is-success': validateEmail(user.email) },
											{ 'is-danger': !validateEmail(user.email) }
										)}
										type="email"
										placeholder="yourname@gmail.com"
										name="email"
										value={user.email}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!validateEmail(user.email) && (
								<p className="help is-danger">This email is invalid</p>
							)}
						</div>

						<div className="field">
							<label className="label">
								City
								<div className="control">
									<input
										className={classNames('input',
											{ 'is-success': user.address.city },
											{ 'is-danger': !user.address.city }
										)}
										type="city"
										placeholder="City"
										name="city"
										value={user.address.city}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!user.address.city && (
								<p className="help is-danger">Please provide city</p>
							)}
						</div>

						<div className="field">
							<label className="label">
								Street
								<div className="control">
									<input
										className={classNames('input',
											{ 'is-success': user.address.street },
											{ 'is-danger': !user.address.street }
										)}
										type="street"
										placeholder="Street"
										name="street"
										value={user.address.street}
										onChange={handleChange}
										required
									/>
								</div>
							</label>
							{!user.address.street && (
								<p className="help is-danger">Please provide street</p>
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
