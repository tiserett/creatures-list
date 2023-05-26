import React from 'react';

import * as creaturesActions from '../../redux/slices/creaturesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { ModalForm } from '../ModalForm';

import { Creature } from '../../types/Creature';

type Props = {
	setIsEditing: (isEditing: boolean) => void;
	id: number;
};

export const EditModal: React.FC<Props> = ({ setIsEditing, id }) => {
	const dispatch = useAppDispatch();
	const creatures: Creature[] = useAppSelector(state => state.creatures.creatures);

	const selectedCreature = creatures.find(creature => creature.id === id);

	if (selectedCreature === undefined) {
		return null;
	}

	const handleCreatures = (newCreature: Creature) => {
		dispatch(creaturesActions.update({ id: selectedCreature.id, creature: newCreature }));
	};

	return (
		<ModalForm
			creature={selectedCreature}
			handleCreatures={handleCreatures}
			handleClose={setIsEditing}
			title={`Edit: ${selectedCreature.name}`}
		/>
	);
};
