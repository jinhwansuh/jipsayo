import { DefaultTheme } from 'styled-components';

const color = {
  red_700: '#D32F2F',
} as const;

const background = {
  default: '#f1eded',
} as const;

const input = {
  border: '2px solid rgba(8, 113, 75, 0.3)',
  borderFocus: '2.5px solid rgba(8, 113, 75, 1)',
} as const;

const padding = {
  default_top_bottom: '20px',
  default_left_right: '20px',
} as const;

export type Color = typeof color;
export type Background = typeof background;
export type Input = typeof input;
export type Padding = typeof padding;

const theme: DefaultTheme = {
  color,
  background,
  input,
  padding,
};

export default theme;
