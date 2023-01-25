import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { ResultsScreenProps } from '../../navigation/NavRouter';
import { SearchInputBox } from '../../components';

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <SearchInputBox isDummy={true} placeholder="Search Shop" />
      </View>
      <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
        <Text>Go to Search</Text>
      </TouchableOpacity>
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

export default ResultsScreen;
