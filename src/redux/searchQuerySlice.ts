import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface SearchQueryState {
  currentSearchQuery: null | string;
  searchQueryHistory: Array<string>;
}

const initialState: SearchQueryState = {
  currentSearchQuery: null,
  searchQueryHistory: [],
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    saveQuery: (state: SearchQueryState, action: PayloadAction<string>) => {
      state.currentSearchQuery = action.payload;
      state.searchQueryHistory.push(action.payload);
    },
  },
});

export const { saveQuery } = searchQuerySlice.actions;

export const selectCurrentSearchQuery = (state: RootState) => state.searchQuery.currentSearchQuery;
export const selectSearchQueryHistory = (state: RootState) => state.searchQuery.searchQueryHistory;

export default searchQuerySlice.reducer;
