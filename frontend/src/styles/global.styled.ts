'use client';
import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`${css`
  * {
    font-weight: 200;
  }

  // root colors
  :root {
    --timberwolf: #ced0ce;
    --eerieBlack: #191919;
    --platinum: #e6e8e6;
    --coquelicot: #f15025;
    --green: #8bf125;
    --myGreen: #a4de02;
  }

  body {
    margin: 0;
    padding: 0;
    background: white;
    color: var(--eerieBlack);

    /* font-family: 'Inter', sans-serif; */
  }

  input[type='number']:not(.input-incremental) {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  nav {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`}`;
