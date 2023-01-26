import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface SearchQueryState {
  currentSearchQuery: string;
  searchQueryHistory: Array<string>;
}

const initialState: SearchQueryState = {
  currentSearchQuery: '',
  searchQueryHistory: [],
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setQuery: (state: SearchQueryState, action: PayloadAction<string>) => {
      state.currentSearchQuery = action.payload;
    },
    addToHistory: (state: SearchQueryState, action: PayloadAction<string>) => {
      state.searchQueryHistory.unshift(action.payload);
    },
    clearQuery: (state: SearchQueryState) => {
      state.currentSearchQuery = '';
    },
  },
});

export const { setQuery, addToHistory, clearQuery } = searchQuerySlice.actions;

export const selectCurrentSearchQuery = (state: RootState) => state.searchQuery.currentSearchQuery;
export const selectSearchQueryHistory = (state: RootState) => state.searchQuery.searchQueryHistory;

export default searchQuerySlice.reducer;
