// src/features/theme/themeSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the slice state type & payload types
export type ThemeType = 'light' | 'dark';

interface ThemeState {
  theme: ThemeType;
}

// Initial state
const initialState: ThemeState = {
  theme: 'system',
};

// Create Slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

// 4. Export actions
export const { setTheme, toggleTheme } = themeSlice.actions;

// 5. Export reducer
export default themeSlice.reducer;
