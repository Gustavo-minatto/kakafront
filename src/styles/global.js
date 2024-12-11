import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root{
  font-size: 62.5%;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
   background-color:${({ theme }) => theme.COLORS.BACKGROUND};
   color:${({ theme }) => theme.COLORS.GOLDEN};
  }

  body, input, button, textarea{
  font-family: 'Roboto Slab', serif;
  font-size: 1.6rem;
  outline: none;
}

  a{
    text-decoration: none;
  }

  button,a{
    cursor: pointer;
    transition: filter 0.2s;
  }

  button{
    border: none;
  }
  
  button,a{
  filter: brightness(0.9);
  }
  

`;