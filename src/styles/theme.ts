import { DefaultTheme } from 'styled-components';

const color = {
  red_700: '#D32F2F',
} as const;

const background = {
  default: '#f1eded',
} as const;

export type Color = typeof color;
export type Background = typeof background;

const theme: DefaultTheme = {
  color,
  background,
};

export default theme;
