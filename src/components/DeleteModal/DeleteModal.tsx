import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import { actions as peopleActions } from '../../features/people';

type Props = {
  id: number;
  handleIsOpen: (isOpen: boolean) => void;
};

export const DeleteModal: React.FC<Props> = ({
  id,
  handleIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const people: PersonType[] = useAppSelector(state => state.people);
  const user = people.find(person => person.id === id);

  if (user === undefined) {
    return null;
  }

  const { name, email } = user;

  const handleDelete = (personId: number) => {
    dispatch(peopleActions.add(people.filter(
      person => person.id !== personId,
    )));
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete this user?</p>
          <button
            type="submit"
            className="delete is-outlined"
            aria-label="close"
            onClick={() => handleIsOpen(false)}
          />
        </header>
        <section className="modal-card-body">
          <p>
            Id:
            {id}
          </p>
          <p>
            Name:
            {name}
          </p>
          <p>
            Email:
            {email}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            type="submit"
            className="button is-danger is-outlined"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
          <button
            type="submit"
            className="button is-info is-outlined"
            onClick={() => handleIsOpen(false)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
