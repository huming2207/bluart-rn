import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluartNavBar from './components/BluartNavBar';

import { Provider as PaperProvider } from 'react-native-paper';
import LedScreen from './screen/LedScreen';
import { LightPaperTheme } from './theme/PaperTheme';
import { LightNavTheme } from './theme/NavigationTheme';
import { ScreenNames } from './screen/common/ScreenNames';
import BleScreen from './screen/BleScreen';

const Stack = createStackNavigator();

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <PaperProvider theme={LightPaperTheme}>
      <NavigationContainer theme={LightNavTheme}>
        <Stack.Navigator
          initialRouteName={ScreenNames.BleConfigScreen}
          screenOptions={{ header: BluartNavBar }}>
          <Stack.Screen
            name={ScreenNames.LedControlScreen}
            component={LedScreen}
          />
          <Stack.Screen
            name={ScreenNames.BleConfigScreen}
            component={BleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
