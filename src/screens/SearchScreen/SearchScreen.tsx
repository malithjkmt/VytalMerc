import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { SearchScreenProps } from '../../navigation/NavRouter';

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text>goBack</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
