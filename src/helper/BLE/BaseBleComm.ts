import { Buffer } from 'buffer';
import { PermissionsAndroid } from 'react-native';
import {
  BleManager,
  Device,
  ScanMode,
  BleError,
  ConnectionOptions,
  State,
} from 'react-native-ble-plx';

export type BleCommDeviceCallback = (err: BleError | null, device: Device | null) => void;
export type BleCommStateCallback = (state: State) => void;

export class BaseBleComm {
  protected ble = new BleManager();

  public async requestPermission(): Promise<void> {
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
  }

  public async checkPermission(): Promise<boolean> {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }

  public startScan(
    serviceUuids: string[],
    cb: BleCommDeviceCallback,
    scanMode = ScanMode.LowLatency,
  ): void {
    this.ble.startDeviceScan(serviceUuids, { scanMode }, cb);
  }

  public stopScan(): void {
    this.ble.stopDeviceScan();
  }

  public async connect(
    deviceMac: string,
    cb: BleCommDeviceCallback,
    option?: ConnectionOptions,
  ): Promise<Device> {
    await this.ble.connectToDevice(deviceMac, option);
    const device = await this.ble.discoverAllServicesAndCharacteristicsForDevice(deviceMac);
    this.ble.onDeviceDisconnected(device.id, cb);

    return device;
  }

  public async isConnected(deviceMac: string): Promise<boolean> {
    return await this.ble.isDeviceConnected(deviceMac);
  }

  public async disconnect(deviceMac: string): Promise<Device> {
    return await this.ble.cancelDeviceConnection(deviceMac);
  }

  public async readCharacteristic(
    deviceMac: string,
    serviceUuid: string,
    characteristicUuid: string,
  ): Promise<Buffer> {
    const character = await this.ble.readCharacteristicForDevice(
      deviceMac,
      serviceUuid,
      characteristicUuid,
    );

    if (!character.value) {
      return Buffer.from([]);
    }

    return Buffer.from(character.value, 'base64');
  }

  public async writeCharacteristic(
    deviceMac: string,
    serviceUuid: string,
    characteristicUuid: string,
    data: Buffer,
  ): Promise<Buffer> {
    const character = await this.ble.writeCharacteristicWithResponseForDevice(
      deviceMac,
      serviceUuid,
      characteristicUuid,
      data.toString('base64'),
    );

    if (!character.value) {
      return Buffer.from([]);
    }

    return Buffer.from(character.value, 'base64');
  }
}
