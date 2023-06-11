import Link from 'next/link';
import { styled } from 'styled-components';
import css from 'styled-jsx/css';
import { string } from 'zod';

export const FormOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const ControlDiv = styled.div`
  width: 80%;
  height: 4em;
  align-items: center;
  display: flex;
  border-bottom: 1.5px solid black;
  flex-direction: row;
  gap: 1rem;
`;

const outlineStyle = `
  text-decoration: none;
  border: 1px solid var(--eerieBlack);
  border-radius: 0.5rem;
  padding: 0.5rem;

  &:hover {
    background: var(--eerieBlack);
    color: white;
  }
`;

export const StyledLink = styled(Link)<{ textSize?: string; outlined?: boolean }>`
  font-size: ${({ textSize = '1rem' }) => textSize};
  cursor: pointer;
  color: var(--eerieBlack);
  transition-duration: 0.4s;
  transition-property: color, background-color;

  ${({ outlined = false }) =>
    outlined
      ? outlineStyle
      : `

    &:hover {
      color: var(--coquelicot);
    }
  `}
`;

export const StyledButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  color: var(--eerieBlack);
  background: none;

  ${outlineStyle}

  padding: 0.25rem 0.75rem;
  transition-duration: 0.4s;
  transition-property: color, background-color;
`;

export const OverviewTableWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;

  & > table {
    width: 100%;
    border-collapse: collapse;

    & td {
      border: 1px solid black;
      padding: 0.5rem;
    }
    & th {
      padding-bottom: 0.5rem;
      font-size: 1.15rem;

      & > span {
        border-bottom: 1px solid black;
      }
    }
  }
`;
