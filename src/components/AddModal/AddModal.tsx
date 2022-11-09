import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import { actions as peopleActions } from '../../features/people';
import { ModalForm } from '../ModalForm';

type Props = {
  setIsAdding: (isAdding: boolean) => void;
};

export const AddModal: React.FC<Props> = ({ setIsAdding }) => {
  const dispatch = useAppDispatch();
  const people: PersonType[] = useAppSelector(state => state.people);

  const maxId = [...people].sort((p1, p2) => p2.id - p1.id)[0].id;

  const defaultPerson: PersonType = {
    id: maxId + 1,
    name: 'John',
    username: 'Doe',
    email: 'johndoe@gmail.com',
    address: {
      street: 'Primorska',
      suite: 'Apt. 556',
      city: 'Odessa',
      zipcode: '64581',
      geo: {
        lat: '-37.3159',
        lan: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'github.com/tiserett',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };

  const handlePeople = (newPerson: PersonType) => {
    dispatch(peopleActions.add([...people, newPerson]));
  };

  return (
    <ModalForm
      person={defaultPerson}
      handlePeople={handlePeople}
      handleClose={setIsAdding}
      title="Add new person"
    />
  );
};
