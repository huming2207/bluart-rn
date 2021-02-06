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

const Tab = createMaterialTopTabNavigator();

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <NavigationContainer theme={LightNavTheme}>
      <PaperProvider theme={LightPaperTheme}>
        <BluartAppBar />
        <Tab.Navigator initialRouteName={ScreenNames.BleConfigScreen}>
          <Tab.Screen name={'LED Control'} component={LedScreen} />
          <Tab.Screen name={'BLE Devices'} component={BleScreen} />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
