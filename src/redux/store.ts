import { configureStore } from "@reduxjs/toolkit";
import creaturesSliceReducer from './slices/creaturesSlice';

export const store = configureStore({
	reducer: {
		creatures: creaturesSliceReducer
	}
});
