import { DefaultTheme, Theme } from '@react-navigation/native';
import { blue } from 'material-colors-ts';

export const LightNavTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: blue.A200,
  },
};
