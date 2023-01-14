import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html, body {
    max-width: ${(props) => props.theme.width.default_global_width};
    margin: 0 auto;
    overflow-x: hidden;
    height: 100%;
  }
  #__next {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    width: 100%;
    height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
