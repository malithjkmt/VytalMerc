import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { ResultsScreenProps } from '../../navigation/NavRouter';

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.push('SearchScreen')}>
        <Text>Go to Search</Text>
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

export default ResultsScreen;
