import { DefaultTheme } from 'styled-components';

const color = {
  green: 'rgba(8, 113, 75, 1)',
  green_light: 'rgba(8, 113, 75, 0.3)',
  main_content_background: '#559FFF',
  button_select: '#BFD9FA',
  default_header: '#559FFF',
  blue_default: '#4983EF',
} as const;

const background = {
  default: '#ffffff',
} as const;

const input = {
  border: '2px solid rgba(73, 131, 239, 0.3)',
  borderFocus: '2.5px solid rgba(73, 131, 239, 1)',
  track_border_radius: '10px',
} as const;

const padding = {
  default_top_bottom: '20px',
  default_left_right: '20px',
  modal_default_top_bottom: '20px',
  modal_default_left_right: '30px',
} as const;

const width = {
  default_global_width: '600px',
} as const;

const height = {
  header_height: '50px',
  kakao_map_header: '66px',
} as const;

export type Color = typeof color;
export type Background = typeof background;
export type Input = typeof input;
export type Padding = typeof padding;
export type Width = typeof width;
export type Height = typeof height;

const theme: DefaultTheme = {
  color,
  background,
  input,
  padding,
  width,
  height,
};

export default theme;
