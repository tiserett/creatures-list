import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Creature } from '../../types/Creature';

interface CreaturesState {
  creatures: Creature[];
}

const initialState: CreaturesState = {
  creatures: [],
};

export const creaturesSlice = createSlice({
  name: 'creaturesSlice',
  initialState,
  reducers: {
    addCreatures: (state, action: PayloadAction<Creature[]>) => {
      for (const creature of action.payload) {
        state.creatures.push(creature);
      }
    },
    clearCreatures: state => {
      state.creatures = [];
    },
    addCreature: (state, action: PayloadAction<Creature>) => {
      state.creatures.push(action.payload);
    },
    deleteCreature: (state, action: PayloadAction<number>) => {
      state.creatures = [...state.creatures].filter(
        creature => creature.id !== action.payload
      );
    },
    updateCreature: (
      state,
      action: PayloadAction<{ id: number; creature: Creature }>
    ) => {
      state.creatures = [...state.creatures].map(creature => {
        if (creature.id === action.payload.id) {
          return action.payload.creature;
        }

        return creature;
      });
    },
  },
});

export const {
  addCreatures,
  clearCreatures,
  addCreature,
  deleteCreature,
  updateCreature,
} = creaturesSlice.actions;

export default creaturesSlice.reducer;
