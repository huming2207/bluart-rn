import React, { useState } from 'react';
import { ListRenderItemInfo, Text, View } from 'react-native';
import { BleError, Device, LogLevel, ScanMode } from 'react-native-ble-plx';
import { FlatList } from 'react-native-gesture-handler';
import { Button, List } from 'react-native-paper';
import { BLE } from '../../helper/BLE';
import { BLEServiceUUID } from '../../helper/BLE/constants';
import { requestBlePermission } from '../../helper/Permission';

export default function BleScreen(): JSX.Element {
  const [deviceList, setDeviceList] = useState<Device[]>([]);

  const startScan = async () => {
    await requestBlePermission();
    BLE.setLogLevel(LogLevel.Verbose);
    BLE.startDeviceScan(
      [BLEServiceUUID],
      { scanMode: ScanMode.LowLatency },
      handleScanResult,
    );

    const state = await BLE.state();
    console.log(state);
  };

  const handleScanResult = (err: BleError | null, device: Device | null) => {
    if (err) {
      console.error('Failed to scan!', err);
      return;
    }

    if (!device || deviceList.some((element) => element.id === device.id)) {
      return;
    }

    setDeviceList([...deviceList, device]);
  };

  const renderDeviceItem = (
    item: ListRenderItemInfo<Device>,
  ): React.ReactElement => {
    return (
      <>
        <List.Item
          title={item.item.name || item.item.localName || 'Unknown name'}
          description={item.item.id}
        />
      </>
    );
  };

  return (
    <>
      <View>
        <Text>{'BLE screen'}</Text>
        <Button mode="contained" onPress={startScan}>
          Start scanning
        </Button>
        <FlatList
          data={deviceList}
          renderItem={renderDeviceItem}
          keyExtractor={(item: Device): string => {
            return item.id;
          }}
        />
      </View>
    </>
  );
}
