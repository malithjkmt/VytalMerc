/**
 * Vytal React Native Challenge - Malith
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavRouter } from './navigation/NavRouter';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavRouter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
});

export default App;
