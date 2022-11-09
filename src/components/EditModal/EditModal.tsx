/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import { actions as peopleActions } from '../../features/people';
import { ModalForm } from '../ModalForm';
import { validateEmail } from '../../utils/validateEmail';

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

  const handleSumbit = (
    event: FormEvent<HTMLFormElement>,
    newPerson: PersonType,
  ) => {
    event.preventDefault();

    if (!validateEmail(newPerson.email)) {
      return;
    }

    dispatch(peopleActions.add(people.map(user => {
      if (user.id === person.id) {
        return newPerson;
      }

      return user;
    })));
    setIsEditing(false);
  };

  return (
    <ModalForm
      person={person}
      handleSubmit={handleSumbit}
      handleClose={setIsEditing}
      title={`Edit: ${person.name}`}
    />
  );
};
