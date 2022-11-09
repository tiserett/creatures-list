import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../../types/PersonType';

type Props = {
  person: PersonType;
  handleIsOpen: (isOpen: boolean) => void;
  setId: (id: number) => void;
};

export const Person: React.FC<Props> = ({
  person,
  handleIsOpen,
  setId,
}) => {
  const {
    id,
    name,
    username,
    email,
    address,
  } = person;

  return (
    <tr>
      <th>{id}</th>
      <th>{name}</th>
      <th>{username}</th>
      <th>{email}</th>
      <th>{address.city}</th>
      <th>{address.street}</th>
      <th>
        <Link to={`/People/${id}`} className="button is-link is-outlined mr-3">
          Open
        </Link>
        <button
          type="submit"
          className="button is-info is-outlined mr-3"
        >
          Edit
        </button>
        <button
          type="submit"
          className="button is-danger is-outlined"
          onClick={() => {
            setId(id);
            handleIsOpen(true);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};
