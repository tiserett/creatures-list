import React from 'react';

import * as creaturesActions from '../../redux/slices/creaturesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { ModalForm } from '../ModalForm';

import { Creature } from '../../types/Creature';

type Props = {
	setIsAdding: (isAdding: boolean) => void;
};

export const AddModal: React.FC<Props> = ({ setIsAdding }) => {
	const dispatch = useAppDispatch();
	const creatures: Creature[] = useAppSelector(state => state.creatures.creatures);

	const maxId = [...creatures].sort((p1, p2) => p2.id - p1.id)[0].id;

	const defaultCreature: Creature = {
		id: maxId + 1,
		name: 'Droid',
		height: 170,
		mass: 65,
		gender: 'male'
	};

	const handleCreatures = (newCreature: Creature) => {
		dispatch(creaturesActions.add(newCreature));
	};

	return (
		<ModalForm
			creature={defaultCreature}
			handleCreatures={handleCreatures}
			handleClose={setIsAdding}
			title="Add new creature"
		/>
	);
};
