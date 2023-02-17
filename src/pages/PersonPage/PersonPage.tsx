import classNames from 'classnames';
import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import './PersonPage.scss';

export const PersonPage: React.FC = () => {
  const people: PersonType[] = useAppSelector(state => state.people);
  const { personId } = useParams();

  const id = Number(personId);

  const user = people.find(person => person.id === id);

  if (user === undefined || !id) {
    return <Navigate to="/Home" replace />;
  }

  const nextUser = people.find(person => person.id > id);
  const prevUser = [...people]
    .sort((p1, p2) => p2.id - p1.id)
    .find(person => person.id < id);

  const { name, username, email, address, phone, company } = user;

  return (
    <section className="fullHeight hero is-small is-primary is-warning">
      <div className="hero-body">
        <section className="title">
          <div className="mb-6">
            <Link
              to="/People"
              className="button is-link is-outlined mr-3 is-size-5"
            >
              Back to people
            </Link>
            <Link
              to={`/People/${prevUser ? prevUser.id : id}`}
              className={classNames(
                'button is-link is-outlined mr-3 is-size-5',
                { 'disabled is-danger': prevUser ? !prevUser.id : true }
              )}
            >
              Previous
            </Link>
            <Link
              to={`/People/${nextUser ? nextUser.id : id}`}
              className={classNames(
                'button is-link is-outlined mr-3 is-size-5',
                { 'disabled is-danger': nextUser ? !nextUser.id : true }
              )}
            >
              Next
            </Link>
          </div>

          <ul className="personInfo">
            <li>
              Id:
              {id}
            </li>
            <li>
              Name:
              {name}
            </li>
            <li>
              Username:
              {username}
            </li>
            <li>
              Email:
              {email}
            </li>
            <li>
              City:
              {address.city}
            </li>
            <li>
              Street:
              {address.street}
            </li>
            <li>
              Phone:
              {phone}
            </li>
            <li>
              Company:
              {company.name}
              <br />
              Cath phrase:
              {company.catchPhrase}
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
};
