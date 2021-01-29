import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { StorageKeys } from '../constants';

export interface SavedDevice {
  serviceUUIDs: string[];
  id: string;
  name: string;
}

export const writeSelectedDevice = async (device: SavedDevice): Promise<void> => {
  try {
    const json = JSON.stringify(device);
    await AsyncStorage.setItem(StorageKeys.SelectedDevice, json);
  } catch (err) {
    Alert.alert('Error', 'Failed to save your selected device', undefined, { cancelable: false });
  }
};

export const readSelectedDevice = async (): Promise<SavedDevice | undefined> => {
  try {
    const json = await AsyncStorage.getItem(StorageKeys.SelectedDevice);
    if (!json) {
      return undefined;
    }

    return JSON.parse(json) as SavedDevice;
  } catch (err) {
    Alert.alert('Error', 'Failed to load your selected device', undefined, { cancelable: false });
  }
};
