import { makeAutoObservable } from 'mobx';
import { Device } from 'react-native-ble-plx';
import { readPreviousDevice, SavedDevice, writePreviousDevice } from '../storage/DeviceStateStore';

export class BleState {
  public connectedDevices: Device[] = [];
  public scannedDevices: Device[] = [];
  public previousDevice?: SavedDevice;
  public currentDevice: Device | undefined = undefined;

  constructor() {
    (async () => await this.loadPreviousDeviceStore())();
    makeAutoObservable(this);
  }

  public addConnectedDevice(device: Device) {
    if (this.connectedDevices.some((item) => item.id === device.id)) {
      return;
    }

    this.connectedDevices.push(device);
  }

  public addScannedDevice(device: Device) {
    if (this.scannedDevices.some((item) => item.id === device.id)) {
      return;
    }

    console.log(this.scannedDevices);
    this.scannedDevices = [...this.scannedDevices, device];
  }

  public removeConnectedDevice(device: Device) {
    this.connectedDevices = this.connectedDevices.filter((item) => item.id !== device.id);
  }

  public removeScannedDevice(device: Device) {
    this.scannedDevices = this.scannedDevices.filter((item) => item.id !== device.id);
  }

  public async setPreviousDevice(device: SavedDevice) {
    await writePreviousDevice(device);
    this.previousDevice = device;
  }

  public async loadPreviousDeviceStore(): Promise<void> {
    this.previousDevice = await readPreviousDevice();
  }

  public setCurrentDevice(device: Device) {
    this.currentDevice = device;
  }
}

export const BleStateInstance = new BleState();
