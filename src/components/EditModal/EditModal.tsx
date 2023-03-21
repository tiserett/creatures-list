import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateCreature } from '../../redux/slices/creaturesSlice';
import { Creature } from '../../types/Creature';
import { ModalForm } from '../ModalForm';

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
		dispatch(updateCreature({ id: selectedCreature.id, creature: newCreature }));
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
