import Link from 'next/link';
import { styled } from 'styled-components';

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

export const StyledLink = styled(Link)<{ hovColor?: string; textsize?: string; outlined?: string }>`
  font-size: ${({ textsize = '1rem' }) => textsize};
  cursor: pointer;
  color: var(--eerieBlack);
  transition-duration: 0.4s;
  transition-property: color, background-color;

  ${({ outlined = false, hovColor = 'var(--coquelicot)' }) =>
    outlined
      ? outlineStyle
      : `
        &:hover {
        color: ${hovColor};
      }
  `}
`;

export const StyledButton = styled.button<{ backcolor?: string; textcolor?: string }>`
  cursor: pointer;
  font-size: 1rem;
  color: var(--eerieBlack);
  background: none;
  border: 1px solid var(--eerieBlack);
  border-radius: 0.5rem;

  padding: 0.25rem 0.75rem;
  transition-duration: 0.4s;
  transition-property: color, background-color;

  &:hover {
    background: ${({ backcolor = 'red' }) => backcolor};
    color: ${({ textcolor = 'white' }) => textcolor};
  }
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
      /* width: 40%; */
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
