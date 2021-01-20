import { Buffer } from 'buffer';
import { makeObservable, observable } from 'mobx';
import { PermissionsAndroid } from 'react-native';
import {
  BleManager,
  Device,
  ScanMode,
  BleError,
  ConnectionOptions,
  State,
} from 'react-native-ble-plx';

export const BLE = new BleManager();

export class BaseBleComm {
  @observable
  public connectedDevices: Device[] = [];

  @observable
  public scannedDevices: Device[] = [];

  @observable
  public bleState: State = State.Unknown;

  protected ble = new BleManager();
  private static instance: BaseBleComm;

  constructor() {
    makeObservable(this);

    this.ble.onStateChange((state: State) => {
      this.bleState = state;
    });
  }

  public static getInstance(): BaseBleComm {
    if (!BaseBleComm.instance) {
      BaseBleComm.instance = new BaseBleComm();
    }

    return BaseBleComm.instance;
  }

  public requestPermission = async (): Promise<void> => {
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

  public startScan = (serviceUuids: string[], scanMode = ScanMode.Balanced): void => {
    this.ble.startDeviceScan([...serviceUuids], { scanMode }, this.handleScanResult);
  };

  public stopScan = (): void => {
    this.ble.stopDeviceScan();
  };

  public connect = async (deviceMac: string, option?: ConnectionOptions): Promise<Device> => {
    await this.ble.connectToDevice(deviceMac, option);
    const device = await this.ble.discoverAllServicesAndCharacteristicsForDevice(deviceMac);
    this.ble.onDeviceDisconnected(device.id, this.handleDeviceDisconnect);

    this.scannedDevices.push(device);
    return device;
  };

  public disconnect = async (deviceMac: string): Promise<Device> => {
    const device = await this.ble.cancelDeviceConnection(deviceMac);
    this.scannedDevices = this.scannedDevices.filter((item) => item.id !== device.id);
    return device;
  };

  public readCharacteristic = async (
    deviceMac: string,
    serviceUuid: string,
    characteristicUuid: string,
  ): Promise<Buffer> => {
    const character = await BLE.readCharacteristicForDevice(
      deviceMac,
      serviceUuid,
      characteristicUuid,
    );

    if (!character.value) {
      return Buffer.from([]);
    }

    return Buffer.from(character.value, 'base64');
  };

  public writeCharacteristic = async (
    deviceMac: string,
    serviceUuid: string,
    characteristicUuid: string,
    data: Buffer,
  ): Promise<Buffer> => {
    const character = await BLE.writeCharacteristicWithResponseForDevice(
      deviceMac,
      serviceUuid,
      characteristicUuid,
      data.toString('base64'),
    );

    if (!character.value) {
      return Buffer.from([]);
    }

    return Buffer.from(character.value, 'base64');
  };

  private handleScanResult = (err: BleError | null, device: Device | null) => {
    if (err) {
      console.error('Failed to scan!', err);
      throw err;
    }

    if (!device || this.scannedDevices.some((element) => element.id === device.id)) {
      return;
    }

    this.scannedDevices.push(device);
  };

  private handleDeviceDisconnect = (err: BleError | null, device: Device | null) => {
    if (err) {
      console.error('Disconnected with error', err);
      throw err;
    }

    if (!device) {
      return;
    }

    this.scannedDevices = this.scannedDevices.filter((item) => item.id !== device.id);
  };
}
