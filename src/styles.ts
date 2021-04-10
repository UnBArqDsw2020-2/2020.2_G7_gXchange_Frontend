import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    outline: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${
      window.location.pathname === '/cadastro' || '/editarUsuario'
        ? 'var(--purpleBackground)'
        : ''
    };
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 1rem !important;
  }

  html {
    --white: #fff;
    --gray: #7e7d7d;
    --black: #0f0c14;
    --error: #f44336;
    --success: #07bc0c;
    --primary: #36BF66;
    --warning: #ffcc00;
    --inputBackground: #f2ebd5;
    --purpleBackground: #17092E;
    --lightGreenBackground: #E6F5F0;
  }
`;
