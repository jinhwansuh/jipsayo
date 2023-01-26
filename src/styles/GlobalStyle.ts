import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html, body {
    width: 100%;
    overflow-x: hidden;
    height: 100%;
  }
  body {
    background: #f2f4f6;
  }
  #__next {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    height: 100%;
    width: 100%;
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
