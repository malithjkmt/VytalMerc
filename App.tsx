/**
 * Vytal React Native Challenge - Malith
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Text style={{ color: 'white', textAlign: 'center' }}>VytalMerc</Text>
    </SafeAreaView>
  );
}

export default App;
