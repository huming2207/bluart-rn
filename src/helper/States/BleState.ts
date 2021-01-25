import { makeAutoObservable } from 'mobx';
import { Device } from 'react-native-ble-plx';

export class BleState {
  public connectedDevices: Device[] = [];
  public scannedDevices: Device[] = [];

  constructor() {
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
}

export const BleStateInstance = new BleState();
