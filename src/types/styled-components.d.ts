import 'styled-components';
import { Background, Color } from '~/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Color;
    background: Background;
  }
}
