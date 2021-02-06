import React from 'react';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { BleStateInstance } from '../../helper/states/BleState';

export default function BluartAppBar(): JSX.Element {
  const { colors } = useTheme();
  const bleState = BleStateInstance;

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Appbar.Header>
        <Appbar.Content title="Bluart" />
        <Observer>
          {() => (
            <IconButton
              icon={bleState.currentDevice ? 'bluetooth-audio' : 'bluetooth-off'}
              color="white"
            />
          )}
        </Observer>
      </Appbar.Header>
    </>
  );
}
