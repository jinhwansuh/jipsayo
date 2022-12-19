import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    max-width: 700px;
    margin: 0 auto;
    overflow-x: hidden;
  }
  #__next {
    background-color: #eee;
    min-height: 100vh;
    width: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
