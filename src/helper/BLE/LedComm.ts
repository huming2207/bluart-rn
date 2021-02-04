import { Buffer } from 'buffer';
import { Alert } from 'react-native';
import { BleError, Device, ScanMode } from 'react-native-ble-plx';
import { BaseBleComm, BleCommDeviceCallback } from './BaseBleComm';
import { BLEServiceUUID, LEDColorCharacteristicUUID } from './constants';

export interface LedColor {
  red: number;
  green: number;
  blue: number;
  white: number;
}

export class LedComm extends BaseBleComm {
  constructor() {
    super();
  }

  private roundColor(colorByte: number): number {
    if (colorByte < 0) {
      return 0;
    }

    if (colorByte > 255) {
      return 255;
    }

    return Math.round(colorByte);
  }

  private colorNumToBuffer(color: LedColor): Buffer {
    return Buffer.from([
      this.roundColor(color.white),
      this.roundColor(color.blue),
      this.roundColor(color.green),
      this.roundColor(color.red),
    ]);
  }

  private bufferToColorNum(colorBuf: Buffer): LedColor | null {
    if (colorBuf.length !== 4) {
      return null;
    }

    return {
      red: colorBuf[3],
      green: colorBuf[2],
      blue: colorBuf[1],
      white: colorBuf[0],
    };
  }

  public scanLEDDevices(cb: BleCommDeviceCallback): void {
    console.log('Start scanning!');
    this.startScan([BLEServiceUUID], cb, ScanMode.LowLatency);
  }

  public async writeColor(deviceMac: string, color: LedColor): Promise<LedColor> {
    if (!(await this.isConnected(deviceMac))) {
      await this.connect(deviceMac, this.handleDisconnectError);
    }

    const rxBuf = await this.writeCharacteristic(
      deviceMac,
      BLEServiceUUID,
      LEDColorCharacteristicUUID,
      this.colorNumToBuffer(color),
    );

    const rxColor = this.bufferToColorNum(rxBuf);
    if (!rxColor) {
      throw new Error('Failed to write color info');
    }

    return rxColor;
  }

  public async readColor(deviceMac: string): Promise<LedColor> {
    if (!(await this.isConnected(deviceMac))) {
      await this.connect(deviceMac, this.handleDisconnectError);
    }

    const rxBuf = await this.readCharacteristic(
      deviceMac,
      BLEServiceUUID,
      LEDColorCharacteristicUUID,
    );

    const rxColor = this.bufferToColorNum(rxBuf);
    if (!rxColor) {
      throw new Error('Failed to read color info');
    }

    return rxColor;
  }

  public handleDisconnectError(err: BleError | null, device: Device | null): void {
    Alert.alert(
      `Error: ${device?.id || 'device' + ' disconnected unexpectly'}`,
      err?.message || 'Unknown error',
    );
  }
}

export const LedCommInstance = new LedComm();
