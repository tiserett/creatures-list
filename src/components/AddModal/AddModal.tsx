import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as peopleActions } from '../../features/people';
import { PersonType } from '../../types/PersonType';
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
		name: 'Droid',
		height: 170,
		mass: 65,
		gender: 'male'
	};

	const handlePeople = (newPerson: PersonType) => {
		dispatch(peopleActions.add([...people, newPerson]));
	};

	return (
		<ModalForm
			person={defaultPerson}
			handlePeople={handlePeople}
			handleClose={setIsAdding}
			title="Add new creature"
		/>
	);
};
