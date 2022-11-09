import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../../types/PersonType';
import './PersonPage.scss';

type Props = {
  people: PersonType[];
};

export const PersonPage: React.FC<Props> = ({ people }) => {
  const [id, setId] = useState(+window.location.href.split('/People/')[1]);
  const user = people.find(person => person.id === id);

  if (user === undefined) {
    return null;
  }

  const {
    name,
    username,
    email,
    address,
  } = user;

  return (
    <section className="hero is-small is-primary is-warning">
      <div className="hero-body">
        <p className="title">
          <div className="mb-6">
            <Link
              to="/People"
              className="button is-link is-outlined mr-3 is-size-5"
            >
              Back to people
            </Link>
            <Link
              to={`/People/${id - 1}`}
              className={classNames(
                'button is-link is-outlined mr-3 is-size-5',
                { 'disabled is-danger': id === 1 },
              )}
              onClick={() => setId(id - 1)}
            >
              Previous
            </Link>
            <Link
              to={`/People/${id + 1}`}
              className={classNames(
                'button is-link is-outlined mr-3 is-size-5',
                { 'disabled is-danger': id === people.length },
              )}
              onClick={() => setId(id + 1)}
            >
              Next
            </Link>
          </div>

          <article>
            <p>
              Id:
              {id}
            </p>
            <p>
              Name:
              {name}
            </p>
            <p>
              Username:
              {username}
            </p>
            <p>
              Email:
              {email}
            </p>
            <p>
              City:
              {address.city}
            </p>
            <p>
              Street:
              {address.street}
            </p>
          </article>
        </p>
      </div>
    </section>

  );
};
