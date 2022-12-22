import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html, body {
    max-width: 700px;
    margin: 0 auto;
    overflow-x: hidden;
    height: 100%;
  }
  #__next {
    background-color: #eee;
    min-height: 100vh;
    width: 100%;
    height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default GlobalStyle;
