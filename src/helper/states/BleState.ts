import { makeAutoObservable } from 'mobx';
import { Device } from 'react-native-ble-plx';
import { readSelectedDevice, SavedDevice, writeSelectedDevice } from '../storage/DeviceStateStore';

export class BleState {
  public connectedDevices: Device[] = [];
  public scannedDevices: Device[] = [];
  public selectedDevice?: SavedDevice;

  constructor() {
    (async () => await this.loadSelectedDeviceStore())();
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

  public async setSelectedDevice(device: SavedDevice) {
    await writeSelectedDevice(device);
    this.selectedDevice = device;
  }

  public getSelectedDevice(): SavedDevice | undefined {
    return this.selectedDevice;
  }

  public async loadSelectedDeviceStore(): Promise<void> {
    this.selectedDevice = await readSelectedDevice();
  }
}

export const BleStateInstance = new BleState();
