import React, { useCallback, useState } from 'react';
import { List } from 'react-native-paper';
import {
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  FlatList,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { Observer } from 'mobx-react-lite';
import { BleState } from '../../helper/states/BleState';
import { LedCommInstance } from '../../helper/BLE/LedComm';
import useTimeout from '@rooks/use-timeout';

export interface BLEScanDialogProps {
  bleState: BleState;
  buttonText?: string;
  buttonMode?: 'text' | 'outlined' | 'contained';
  buttonStyle?: StyleProp<ViewStyle>;
  dialogStyle?: StyleProp<ViewStyle>;
}

export const BLEScanDialog = (props: BLEScanDialogProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });

  const ledComm = LedCommInstance;
  const { bleState } = props;

  const handleScanResult = (err: BleError | null, device: Device | null): void => {
    if (err) {
      console.error('Error when scanning', err);
      return;
    }

    if (device) {
      bleState.addScannedDevice(device);
    }
  };

  const scanTimeout = useTimeout(() => stopScan(), 5000);

  const startDeviceScan = useCallback(() => {
    setRefreshing(true);
    ledComm.scanLEDDevices(handleScanResult);
    scanTimeout.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  const stopScan = () => {
    ledComm.stopScan();
    setRefreshing(false);
  };

  const handleDeviceItemPress = (device: Device) => {
    bleState.setSelectedDevice({
      id: device.id,
      name: device.name || device.localName || 'Unknown',
      serviceUUIDs: device.serviceUUIDs || [],
    });
  };

  const renderDeviceItem = (item: ListRenderItemInfo<Device>): React.ReactElement => {
    return (
      <>
        <List.Item
          title={item.item.name || item.item.localName || 'Unknown name'}
          description={item.item.id}
          onPress={() => handleDeviceItemPress(item.item)}
        />
      </>
    );
  };

  return (
    <Observer>
      {() => (
        <FlatList
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl enabled={true} refreshing={refreshing} onRefresh={startDeviceScan} />
          }
          data={bleState.scannedDevices.slice()}
          renderItem={renderDeviceItem}
          keyExtractor={(item: Device) => item.id}
          ListHeaderComponent={<Text>{'Pull to refresh'}</Text>}
        />
      )}
    </Observer>
  );
};
