import React, { FormEvent, useState } from 'react';
import { PersonType } from '../../types/PersonType';

type Props = {
  people: PersonType[];
  setPeople: (value: PersonType[]) => void;
  setIsAdding: (isAdding: boolean) => void;
};

export const AddModal: React.FC<Props> = ({
  people,
  setPeople,
  setIsAdding,
}) => {
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

    setPeople([...people, newPerson]);
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
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label className="label">
                Username

                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
              </label>
              {/* <p className="help is-success">This username is available</p> */}
            </div>

            <div className="field">
              <label className="label">
                Email

                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </label>
              {/* <p className="help is-danger">This email is invalid</p> */}
            </div>

            <div className="field">
              <label className="label">
                City

                <div className="control">
                  <input
                    className="input"
                    type="city"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </div>
              </label>
              {/* <p className="help is-danger">Please enter city name</p> */}
            </div>

            <div className="field">
              <label className="label">
                Street

                <div className="control">
                  <input
                    className="input"
                    type="street"
                    placeholder="Street"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    required
                  />
                </div>
              </label>
              {/* <p className="help is-danger">Please enter street name</p> */}
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
