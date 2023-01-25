/**
 *
 * @format
 */

import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import ResultsScreen from '../screens/ResultsScreen';
import SearchScreen from '../screens/SearchScreen';

type RootStackParamList = {
  ResultsScreen: undefined;
  SearchScreen: undefined;
};

export type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultsScreen'>;
export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchScreen'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavRouter: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ResultsScreen"
          component={ResultsScreen}
          options={{ title: 'VytalMerc', headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false, animation: 'none' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { NavRouter };
