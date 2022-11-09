import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import { actions as peopleActions } from '../../features/people';

type Props = {
  setIsAdding: (isAdding: boolean) => void;
};

export const AddModal: React.FC<Props> = ({ setIsAdding }) => {
  const dispatch = useAppDispatch();
  const people: PersonType[] = useAppSelector(state => state.people);

  const [name, setName] = useState('John');
  const [username, setUsername] = useState('Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [city, setCity] = useState('Odessa');
  const [street, setStreet] = useState('Primorska');

  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = [...people].sort((p1, p2) => p2.id - p1.id)[0].id;

    const newPerson: PersonType = {
      id: maxId + 1,
      name,
      username,
      email,
      address: {
        street,
        suite: 'Apt. 556',
        city,
        zipcode: '64581',
        geo: {
          lat: '-37.3159',
          lan: '81.1496',
        },
      },
    };

    dispatch(peopleActions.add([...people, newPerson]));
    setIsAdding(false);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add person</p>
          <button
            type="submit"
            className="delete"
            aria-label="close"
            onClick={() => setIsAdding(false)}
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
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
