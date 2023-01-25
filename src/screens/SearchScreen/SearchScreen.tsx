import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { selectSearchQueryHistory, saveQuery } from '../../redux/searchQuerySlice';

import { SearchScreenProps } from '../../navigation/NavRouter';
import { SearchInputBox } from '../../components';

const SearchScreen = ({ }: SearchScreenProps) => {
  const dispatch = useAppDispatch();

  const searchHistory = useAppSelector(selectSearchQueryHistory);
  console.log(searchHistory);

  const onSearch = (query: string) => {
    console.log(query);
    dispatch(saveQuery(query));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <SearchInputBox placeholder="Search Shop" onSubmit={onSearch} />
      </View>

      {searchHistory.map(q => (
        <Text>{q}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
