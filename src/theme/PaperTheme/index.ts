import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { blue, deepOrange } from 'material-colors-ts';

export const LightPaperTheme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: blue[700],
    accent: deepOrange.A700,
  },
};
