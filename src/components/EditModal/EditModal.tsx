import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updateCreature } from '../../redux/slices/creaturesSlice';
import { CreaturesState } from '../../types/CreatureState';
import { CreatureType } from '../../types/CreatureType';
import { ModalForm } from '../ModalForm';

type Props = {
	setIsEditing: (isEditing: boolean) => void;
	id: number;
};

export const EditModal: React.FC<Props> = ({ setIsEditing, id }) => {
	const dispatch = useDispatch();
	const creatures: CreatureType[] = useSelector((state: CreaturesState) => state.creatures.creatures);

	const selectedCreature = creatures.find(creature => creature.id === id);

	if (selectedCreature === undefined) {
		return null;
	}

	const handleCreatures = (newCreature: CreatureType) => {
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
