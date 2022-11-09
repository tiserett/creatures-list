/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import { PersonType } from '../../types/PersonType';

type Props = {
  person?: PersonType;
  handleSubmit: (event: FormEvent<HTMLFormElement>, data: PersonType) => void;
  handleClose: (isOpened: boolean) => void;
  title: string;
};

export const ModalForm: React.FC<Props> = ({
  person,
  handleSubmit,
  handleClose,
  title,
}) => {
  if (person === undefined) {
    return null;
  }

  const [name, setName] = useState(person.name || 'John');
  const [username, setUsername] = useState(person.username || 'Doe');
  const [email, setEmail] = useState(person.email || 'johndoe@gmail.com');
  const [city, setCity] = useState(person.address.city || 'Odessa');
  const [street, setStreet] = useState(person.address.street || 'Primorska');

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
    phone: person.phone,
    website: person.website,
    company: {
      name: person.company.name,
      catchPhrase: person.company.catchPhrase,
      bs: person.company.catchPhrase,
    },
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {title}
          </p>
          <button
            type="submit"
            className="delete"
            aria-label="close"
            onClick={() => handleClose(false)}
          />
        </header>
        <form
          action=""
          onSubmit={event => handleSubmit(event, newPerson)}
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
