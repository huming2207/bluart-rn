import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LedScreen from '../../screen/LedScreen';

const Drawer = createDrawerNavigator();

export default function BluartNavDrawer(): JSX.Element {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="LED" component={LedScreen} />
      </Drawer.Navigator>
    </>
  );
}
