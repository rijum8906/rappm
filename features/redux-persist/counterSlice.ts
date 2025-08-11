// src/features/counter/counterSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the slice state type & payload types

interface CounterState {
  value: number;
}

// Initial state
const initialState: CounterState = {
  value: 0;
};

// Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// 4. Export actions
export const { increase, decrease, reset, set } = counterSlice.actions;

// 5. Export reducer
export default counterSlice.reducer;
