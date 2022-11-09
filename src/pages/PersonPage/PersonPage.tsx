import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import './PersonPage.scss';

export const PersonPage: React.FC = () => {
  const people: PersonType[] = useAppSelector(state => state.people);
  const [id, setId] = useState(+window.location.href.split('/People/')[1]);
  const user = people.find(person => person.id === id);

  if (user === undefined) {
    return null;
  }

  const nextUser = people.find(person => person.id > id);
  const prevUser = [...people]
    .sort((p1, p2) => p2.id - p1.id)
    .find(person => person.id < id);

  const {
    name,
    username,
    email,
    address,
    phone,
    company,
  } = user;

  return (
    <section className="hero is-small is-primary is-warning">
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
                { 'disabled is-danger': prevUser ? !prevUser.id : true },
              )}
              onClick={() => setId(prevUser ? prevUser.id : id)}
            >
              Previous
            </Link>
            <Link
              to={`/People/${nextUser ? nextUser.id : id}`}
              className={classNames(
                'button is-link is-outlined mr-3 is-size-5',
                { 'disabled is-danger': nextUser ? !nextUser.id : true },
              )}
              onClick={() => setId(nextUser ? nextUser.id : id)}
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
            <p>
              Phone:
              {phone}
            </p>
            <p>
              Company:
              {company.name}
              <br />
              Cath phrase:
              {company.catchPhrase}
            </p>
          </article>
        </section>
      </div>
    </section>
  );
};
