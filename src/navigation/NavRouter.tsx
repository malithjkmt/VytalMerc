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
          options={{ headerShown: true, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { NavRouter };
