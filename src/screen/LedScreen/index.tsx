import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker';
import { HsvColor } from 'react-native-color-picker/src/typeHelpers';
import { Button, Divider, Text } from 'react-native-paper';
import tinycolor from 'tinycolor2';
import { LedCommInstance } from '../../helper/BLE/LedComm';
import { BleStateInstance } from '../../helper/states/BleState';

export default function LedScreen(): JSX.Element {
  const [color, setColor] = useState<HsvColor>({ h: 0, s: 0, v: 0 });
  const [white, setWhite] = useState<number>(0);

  const handleWhiteSlider = (value: number) => {
    const rounded = Math.round(value);
    if (rounded < 0) {
      setWhite(0);
    } else if (rounded > 255) {
      setWhite(255);
    }

    setWhite(rounded);
  };

  const handleCommitColor = () => {
    const deviceId = BleStateInstance.currentDevice?.id;
    if (!deviceId) {
      Alert.alert('Error', 'No device selected');
      return;
    }

    const currColor = tinycolor(color);
    const rgb = currColor.toRgb();
    console.log('Current color', currColor, rgb);

    LedCommInstance.writeColor(deviceId, { red: rgb.r, green: rgb.g, blue: rgb.b, white });
  };

  const style = StyleSheet.create({
    button: {
      padding: 10,
      margin: 10,
    },
    colorPicker: {
      marginBottom: 10,
      flex: 1,
    },
    whiteSelector: {
      display: 'flex',
      flexDirection: 'row',
    },
    whiteSelectorLabel: {
      marginTop: 18,
      marginLeft: 10,
      marginRight: 5,
    },
    whiteSelectorSlider: {
      width: '65%',
      height: 60,
    },
  });

  return (
    <>
      <TriangleColorPicker
        color={color}
        style={style.colorPicker}
        onColorChange={(newColor) => setColor(newColor)}
        hideSliders={true}
      />
      <Divider />
      <View style={style.whiteSelector}>
        <Text style={style.whiteSelectorLabel}>White light:</Text>
        <Slider
          style={style.whiteSelectorSlider}
          onValueChange={handleWhiteSlider}
          minimumValue={0}
          maximumValue={255}
          value={white}
          minimumTrackTintColor="#111111"
          maximumTrackTintColor="#555555"
        />
      </View>
      <Divider />
      <Button mode="contained" style={style.button} onPress={handleCommitColor}>
        Set color
      </Button>
    </>
  );
}
