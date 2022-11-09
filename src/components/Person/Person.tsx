import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../../types/PersonType';

type Props = {
  person: PersonType;
  handleIsDeleting: (isOpen: boolean) => void;
  handleIsEditing: (isEditing: boolean) => void;
  setId: (id: number) => void;
};

export const Person: React.FC<Props> = ({
  person,
  handleIsDeleting,
  handleIsEditing,
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
          Select
        </Link>
        <button
          type="submit"
          className="button is-info is-outlined mr-3"
          onClick={() => {
            setId(id);
            handleIsEditing(true);
          }}
        >
          Edit
        </button>

        <button
          type="submit"
          className="button is-danger is-outlined"
          onClick={() => {
            setId(id);
            handleIsDeleting(true);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};
