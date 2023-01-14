import 'styled-components';
import { Background, Color, Height, Input, Padding } from '~/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Color;
    background: Background;
    input: Input;
    padding: Padding;
    width: Width;
    height: Height;
  }
}
