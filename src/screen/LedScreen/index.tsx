import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker';
import { HsvColor } from 'react-native-color-picker/src/typeHelpers';
import { Button, Divider, Text } from 'react-native-paper';

export default function LedScreen(): JSX.Element {
  const [color, setColor] = useState<HsvColor>({ h: 0, s: 0, v: 0 });

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
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#111111"
          maximumTrackTintColor="#555555"
        />
      </View>
      <Divider />
      <Button mode="contained" style={style.button}>
        Set color
      </Button>
    </>
  );
}
