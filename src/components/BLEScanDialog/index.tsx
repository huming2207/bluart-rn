import React, { useCallback, useEffect, useState } from 'react';
import { List, RadioButton } from 'react-native-paper';
import {
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  FlatList,
  View,
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
    radioButton: {
      marginTop: 10,
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

  useEffect(() => {
    startDeviceScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopScan = () => {
    ledComm.stopScan();
    setRefreshing(false);
  };

  const handleDeviceItemPress = async (device: Device) => {
    bleState.setCurrentDevice(device);
    await ledComm.connect(device.id, ledComm.handleDisconnectError);
  };

  const renderDeviceItem = (item: ListRenderItemInfo<Device>): React.ReactElement => {
    return (
      <Observer>
        {() => (
          <>
            <List.Item
              title={item.item.name || item.item.localName || 'Unknown name'}
              description={item.item.id}
              onPress={() => handleDeviceItemPress(item.item)}
              right={() => (
                <View style={styles.radioButton}>
                  <RadioButton
                    value=""
                    status={
                      bleState.currentDevice && bleState.currentDevice.id === item.item.id
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                </View>
              )}
            />
          </>
        )}
      </Observer>
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
