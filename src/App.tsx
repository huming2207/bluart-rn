import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BluartNavBar from './components/BluartNavBar';

import LedScreen from './screen/LedScreen';

const Stack = createStackNavigator();

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LED"
        screenOptions={{header: BluartNavBar}}>
        <Stack.Screen name="LED" component={LedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
