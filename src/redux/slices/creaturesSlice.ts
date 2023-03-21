import { createSlice } from '@reduxjs/toolkit';
import { CreatureInitialState } from '../../types/CreatureInitialState';

const initialState = {
  creatures: [],
} as CreatureInitialState;

export const creaturesSlice = createSlice({
  name: 'creaturesSlice',
  initialState,
  reducers: {
    addCreatures: (state, action) => {
      for (const creature of action.payload) {
        state.creatures.push(creature);
      }
    },
    clearCreatures: state => {
      state.creatures = [];
    },
    addCreature: (state, action) => {
      state.creatures.push(action.payload);
    },
    deleteCreature: (state, action) => {
      state.creatures = [...state.creatures].filter(
        creature => creature.id !== action.payload
      );
    },
    updateCreature: (state, action) => {
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
