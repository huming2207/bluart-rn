import { PermissionsAndroid } from 'react-native';

export const requestBlePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Need location permission for BLE',
        message: 'You know that',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the BLE now');
    } else {
      console.log('BLE permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
