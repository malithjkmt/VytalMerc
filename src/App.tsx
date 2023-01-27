/**
 * Vytal React Native Challenge - Malith
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { NavRouter } from './navigation/NavRouter';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <NavRouter />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
});

export default App;
