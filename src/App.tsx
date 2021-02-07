import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider as PaperProvider } from 'react-native-paper';
import LedScreen from './screen/LedScreen';
import { LightPaperTheme } from './theme/PaperTheme';
import { LightNavTheme } from './theme/NavigationTheme';
import { ScreenNames } from './screen/common/ScreenNames';
import BleScreen from './screen/BleScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BluartAppBar from './components/BluartAppBar';
import UartScreen from './screen/UartScreen';

const Tab = createMaterialTopTabNavigator();

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <NavigationContainer theme={LightNavTheme}>
      <PaperProvider theme={LightPaperTheme}>
        <BluartAppBar />
        <Tab.Navigator initialRouteName={ScreenNames.LedControlScreen}>
          <Tab.Screen name={ScreenNames.LedControlScreen} component={LedScreen} />
          <Tab.Screen name={ScreenNames.UartScreen} component={UartScreen} />
          <Tab.Screen name={ScreenNames.BleConfigScreen} component={BleScreen} />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
