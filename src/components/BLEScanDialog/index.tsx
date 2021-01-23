import React, { useState } from 'react';
import { Modal, Portal, Button, Provider, List } from 'react-native-paper';
import { ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { FlatList } from 'react-native-gesture-handler';
import { LedComm } from '../../helper/BLE/LedComm';

export interface BLEScanDialogProps {
  ledComm: LedComm;
  buttonText?: string;
  buttonMode?: 'text' | 'outlined' | 'contained';
  buttonStyle?: StyleProp<ViewStyle>;
  dialogStyle?: StyleProp<ViewStyle>;
}

export const BLEScanDialog = (props: BLEScanDialogProps) => {
  const [visible, setVisible] = useState(false);
  const { ledComm } = props;

  const showModal = () => {
    ledComm.startScan();
    setVisible(true);
  };
  const hideModal = () => {
    ledComm.stopScan();
    setVisible(false);
  };

  const containerStyle = props.dialogStyle || { backgroundColor: 'white', padding: 20 };

  const renderDeviceItem = (item: ListRenderItemInfo<Device>): React.ReactElement => {
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
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <FlatList
            data={ledComm.scannedDevices}
            renderItem={renderDeviceItem}
            keyExtractor={(item: Device): string => {
              return item.id;
            }}
          />
        </Modal>
      </Portal>
      <Button style={props.buttonStyle} onPress={showModal} mode={props.buttonMode || 'contained'}>
        {props.buttonText || 'Scan nearby devices'}
      </Button>
    </Provider>
  );
};
