import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SearchScreenProps } from '../../navigation/NavRouter';
import { SearchInputBox } from '../../components';

const SearchScreen = ({ }: SearchScreenProps) => {
  const onSearch = (query: string) => {
    console.log(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <SearchInputBox placeholder="Search Shop" onSubmit={onSearch} />
      </View>
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
