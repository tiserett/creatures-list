import classNames from 'classnames';
import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import './PersonPage.scss';

export const PersonPage: React.FC = () => {
	const people: PersonType[] = useAppSelector(state => state.people);
	const { creatureId } = useParams();

	const id = Number(creatureId);

	const user = people.find(person => person.id === id);

	if (user === undefined || !id) {
		return <Navigate to="/Home" replace />;
	}

	const nextUser = people.find(person => person.id > id);
	const prevUser = [...people]
		.sort((p1, p2) => p2.id - p1.id)
		.find(person => person.id < id);

	const { name, height, mass, gender } = user;

	return (
		<section className="fullHeight hero is-small is-primary is-warning">
			<div className="hero-body">
				<section className="title">
					<div className="mb-6">
						<Link
							to="/Creatures"
							className="button is-link is-outlined mr-3 is-size-5"
						>
							Back to people
						</Link>
						<Link
							to={`/Creatures/${prevUser ? prevUser.id : id}`}
							className={classNames(
								'button is-link is-outlined mr-3 is-size-5',
								{ 'disabled is-danger': prevUser ? !prevUser.id : true }
							)}
						>
							Previous
						</Link>
						<Link
							to={`/Creatures/${nextUser ? nextUser.id : id}`}
							className={classNames(
								'button is-link is-outlined mr-3 is-size-5',
								{ 'disabled is-danger': nextUser ? !nextUser.id : true }
							)}
						>
							Next
						</Link>
					</div>

					<ul className="creatureInfo">
						<li>
							{`Name: ${name}`}
						</li>
						<li>
							{`Height: ${height}`}
						</li>
						<li>
							{`Mass: ${mass}`}
						</li>
						<li>
							{`Gender: ${gender}`}
						</li>
					</ul>
				</section>
			</div>
		</section>
	);
};
