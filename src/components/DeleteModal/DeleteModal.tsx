import React from 'react';
import { PersonType } from '../../types/PersonType';

interface Props {
  people: PersonType[]
  id: number
  handleDelete: (id: number) => void
  handleIsOpen: (isOpen: boolean) => void
}

export const DeleteModal: React.FC<Props> = ({
  people,
  id,
  handleDelete,
  handleIsOpen
}) => {
  const person = people.find(person => person.id === id);

  if (person === undefined) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={() => handleIsOpen(false)}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete this user?</p>
          <button
            className="delete is-outlined"
            aria-label="close"
            onClick={() => handleIsOpen(false)}
          ></button>
        </header>
        <section className="modal-card-body">
          Id: {person.id}
          <br />
          Name: {person.name}
          <br />
          Email: {person.email}
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-danger is-outlined"
            onClick={() => handleDelete(person.id)}
          >
            Delete
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => handleIsOpen(false)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
