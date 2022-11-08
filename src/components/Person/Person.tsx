import React from 'react';
import { PersonType } from '../../types/PersonType';

interface Props {
  person: PersonType
  handleIsOpen: (isOpen: boolean) => void
  setId: (id: number) => void
};

export const Person: React.FC<Props> = ({
  person,
  handleIsOpen,
  setId
}) => {
  const { id, name, username, email, address } = person;

  return (
    <tr>
      <th>{id}</th>
      <th>{name}</th>
      <th>{username}</th>
      <th>{email}</th>
      <th>{address.city}</th>
      <th>{address.street}</th>
      <th>
        <button className="button is-info mr-3">
          Edit
        </button>
        <button
          className="button is-danger"
          onClick={() => {
            setId(id)
            handleIsOpen(true)
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}
