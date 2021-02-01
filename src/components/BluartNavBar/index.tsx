import React from 'react';
import { Appbar, IconButton, Menu, useTheme } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';
import { ScreenNames } from '../../screen/common/ScreenNames';
import { StatusBar } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { BleStateInstance } from '../../helper/states/BleState';

export default function BluartNavBar(props: StackHeaderProps): JSX.Element {
  const { previous, navigation } = props;
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { colors } = useTheme();
  const bleState = BleStateInstance;

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Observer>
        {() => (
          <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="Bluart" />
            <IconButton
              icon={bleState.selectedDevice ? 'bluetooth-audio' : 'bluetooth-off'}
              color="white"
            />
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
              <Menu.Item
                onPress={() => {
                  navigation.push(ScreenNames.LedControlScreen);
                }}
                icon={'led-on'}
                title="LED Control"
              />
              <Menu.Item
                onPress={() => {
                  console.log('Option 2 was pressed');
                }}
                icon={'serial-port'}
                title="UART Console"
              />
              <Menu.Item
                onPress={() => {
                  navigation.push(ScreenNames.BleConfigScreen);
                }}
                icon={'bluetooth'}
                title="BLE Pairing"
              />
            </Menu>
          </Appbar.Header>
        )}
      </Observer>
    </>
  );
}
