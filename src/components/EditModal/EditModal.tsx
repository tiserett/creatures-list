/* eslint-disable react-hooks/rules-of-hooks */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PersonType } from '../../types/PersonType';
import { actions as peopleActions } from '../../features/people';
import { ModalForm } from '../ModalForm';

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

  const handlePeople = (newPerson: PersonType) => {
    dispatch(peopleActions.add(people.map(user => {
      if (user.id === person.id) {
        return newPerson;
      }

      return user;
    })));
  };

  return (
    <ModalForm
      person={person}
      handlePeople={handlePeople}
      handleClose={setIsEditing}
      title={`Edit: ${person.name}`}
    />
  );
};
