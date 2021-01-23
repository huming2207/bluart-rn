import React from 'react';
import { Text, View } from 'react-native';
import { BLEScanDialog } from '../../components/BLEScanDialog';
import { LedCommInstance } from '../../helper/BLE/LedComm';

export default function BleScreen(): JSX.Element {
  return (
    <>
      <View>
        <Text>{'BLE screen'}</Text>
        <BLEScanDialog ledComm={LedCommInstance} />
      </View>
    </>
  );
}
