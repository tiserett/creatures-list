import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCreature } from '../../redux/slices/creaturesSlice';
import { CreaturesState } from '../../types/CreatureState';
import { CreatureType } from '../../types/CreatureType';
import { ModalForm } from '../ModalForm';

type Props = {
	setIsAdding: (isAdding: boolean) => void;
};

export const AddModal: React.FC<Props> = ({ setIsAdding }) => {
	const dispatch = useDispatch();
	const creatures: CreatureType[] = useSelector((state: CreaturesState) => state.creatures.creatures);

	const maxId = [...creatures].sort((p1, p2) => p2.id - p1.id)[0].id;

	const defaultCreature: CreatureType = {
		id: maxId + 1,
		name: 'Droid',
		height: 170,
		mass: 65,
		gender: 'male'
	};

	const handleCreatures = (newCreature: CreatureType) => {
		dispatch(addCreature(newCreature));
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
