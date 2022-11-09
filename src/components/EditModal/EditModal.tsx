/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import { actions as peopleActions } from '../../features/people';

type Props = {
  setIsEditing: (isEditing: boolean) => void;
  id: number;
};

export const EditModal: React.FC<Props> = ({
  setIsEditing,
  id,
}) => {
  const dispatch = useAppDispatch();
  const people: PersonType[] = useAppSelector(state => state.people);

  const person = people.find(user => user.id === id);

  if (person === undefined) {
    return null;
  }

  const [name, setName] = useState(person.name);
  const [username, setUsername] = useState(person.username);
  const [email, setEmail] = useState(person.email);
  const [city, setCity] = useState(person.address.city);
  const [street, setStreet] = useState(person.address.street);

  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPerson: PersonType = {
      id: person.id,
      name,
      username,
      email,
      address: {
        street,
        suite: person.address.suite,
        city,
        zipcode: person.address.zipcode,
        geo: person.address.geo,
      },
    };

    dispatch(peopleActions.add(people.map(user => {
      if (user.id === person.id) {
        return newPerson;
      }

      return user;
    })));
    setIsEditing(false);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`Edit ${person.name}`}</p>
          <button
            type="submit"
            className="delete"
            aria-label="close"
            onClick={() => setIsEditing(false)}
          />
        </header>
        <form
          action=""
          onSubmit={handleSumbit}
        >
          <section className="modal-card-body">
            <div className="field">
              <label className="label">
                Name

                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      { 'is-success': name },
                    )}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </label>

              {!name && (
                <p className="help is-danger">Please provide name</p>
              )}
            </div>

            <div className="field">
              <label className="label">
                Username

                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      { 'is-success': username },
                    )}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
              </label>
              {!username && (
                <p className="help is-danger">Please provide username</p>
              )}
            </div>

            <div className="field">
              <label className="label">
                Email

                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      { 'is-success': email },
                    )}
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </label>
              {!email && (
                <p className="help is-danger">This email is invalid</p>
              )}
            </div>

            <div className="field">
              <label className="label">
                City

                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      { 'is-success': city },
                    )}
                    type="city"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </div>
              </label>
              {!city && (
                <p className="help is-danger">Please provide city name</p>
              )}
            </div>

            <div className="field">
              <label className="label">
                Street

                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      { 'is-success': street },
                    )}
                    type="street"
                    placeholder="Street"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    required
                  />
                </div>
              </label>
              {!street && (
                <p className="help is-danger">Please provide street name</p>
              )}
            </div>
          </section>

          <footer className="modal-card-foot">
            <button
              type="submit"
              className="button is-success"
            >
              Save person
            </button>
            <button
              type="button"
              className="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
