import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SearchScreenProps } from '../../navigation/NavRouter';
import { SearchInputBox } from '../../components';

const SearchScreen = ({ }: SearchScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <SearchInputBox placeholder="Search Shop" />
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
