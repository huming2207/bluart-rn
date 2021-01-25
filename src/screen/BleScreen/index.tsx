import React, { useEffect } from 'react';
import { View } from 'react-native';
import { BLEScanDialog } from '../../components/BLEScanDialog';
import { LedCommInstance } from '../../helper/BLE/LedComm';
import { BleStateInstance } from '../../helper/States/BleState';

export default function BleScreen(): JSX.Element {
  useEffect(() => {
    (async () => {
      const allowed = await LedCommInstance.checkPermission();
      if (!allowed) {
        await LedCommInstance.requestPermission();
      }
    })();
  }, []);

  return (
    <>
      <View>
        <BLEScanDialog bleState={BleStateInstance} />
      </View>
    </>
  );
}
