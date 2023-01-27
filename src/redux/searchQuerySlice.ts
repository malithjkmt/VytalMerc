import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ParsedAddress } from '../utils/addressParser';

interface SearchQueryState {
  currentSearchQuery: ParsedAddress | null;
  searchQueryHistory: Array<ParsedAddress>;
}

const initialState: SearchQueryState = {
  currentSearchQuery: null,
  searchQueryHistory: [],
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setQuery: (state: SearchQueryState, action: PayloadAction<ParsedAddress>) => {
      state.currentSearchQuery = action.payload;
    },
    addToHistory: (state: SearchQueryState, action: PayloadAction<ParsedAddress>) => {
      state.searchQueryHistory.unshift(action.payload);
    },
    clearQuery: (state: SearchQueryState) => {
      state.currentSearchQuery = null;
    },
  },
});

export const { setQuery, addToHistory, clearQuery } = searchQuerySlice.actions;

export const selectCurrentSearchQuery = (state: RootState): ParsedAddress | null =>
  state.searchQuery.currentSearchQuery;
export const selectSearchQueryHistory = (state: RootState): Array<ParsedAddress> =>
  state.searchQuery.searchQueryHistory;

export default searchQuerySlice.reducer;
