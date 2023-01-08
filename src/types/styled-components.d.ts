import 'styled-components';
import { Background, Color, Input } from '~/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Color;
    background: Background;
    input: Input;
  }
}
