import { configureStore } from '@reduxjs/toolkit';
import creaturesSliceReducer from './slices/creaturesSlice';

export const store = configureStore({
  reducer: {
    creatures: creaturesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
