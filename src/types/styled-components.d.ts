import 'styled-components';
import { Background, Color, Input, Padding } from '~/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Color;
    background: Background;
    input: Input;
    padding: Padding;
  }
}
