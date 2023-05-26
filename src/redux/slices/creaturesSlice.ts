import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRandomNumber } from '../../utils/getRandomNumber';

import { Creature } from '../../types/Creature';

export interface CreaturesState {
  creatures: Creature[];
  loading: boolean;
  error: string;
}

const initialState: CreaturesState = {
  creatures: [],
  loading: false,
  error: ''
};

export const creaturesSlice = createSlice({
  name: 'creaturesSlice',
  initialState,
  reducers: {
    addCreatures: (state, action: PayloadAction<Creature[]>) => {
      state.creatures = [...action.payload];
    },
    clear: state => {
      state.creatures = [];
    },
    add: (state, action: PayloadAction<Creature>) => {
      state.creatures.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.creatures = state.creatures.filter(
        creature => creature.id !== action.payload
      );
    },
    update: (
      state,
      action: PayloadAction<{ id: number; creature: Creature }>
    ) => {
      state.creatures = state.creatures.map(creature =>
        creature.id === action.payload.id ? action.payload.creature : creature
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.creatures = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Oops... An error occured. Try to reload the page'
      state.loading = false;
    });
  },
});

export const { addCreatures, clear, add, remove, update } =
  creaturesSlice.actions;

export default creaturesSlice.reducer;

export const init = createAsyncThunk('creatures/fetch', async () => {
  const data = await fetch('https://swapi.dev/api/people');
  const dataFromServer = await data.json();

  if (getRandomNumber(1, 10) === 1) {
    throw 123;
  }

  const formattedData = dataFromServer.results.map(
    (creature: Creature, index: number) => ({ ...creature, id: index + 1 })
  );

  return formattedData;
});
