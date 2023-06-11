import { styled } from 'styled-components';

export const FormEditContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    margin: 0;
    /* margin-bottom: 1rem; */
  }
`;

export const ItemDeleteButton = styled.button`
  background: red;
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--eerieBlack);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 10%;
  cursor: pointer;
  transition-duration: 0.4s;
  transition-property: background-color;

  &:hover {
    background: var(--eerieBlack);
  }
`;

export const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  font-size: 0.9rem;
  outline: none;
  border: 1px solid black;
  border-radius: 0.25rem;

  &[type='text'] {
    width: 15em;
  }

  &[type='number'] {
    width: 12em;
  }

  &[type='date'] {
    width: auto;
  }

  &.input-incremental {
    width: 5em;
  }
`;

export const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  & > span {
    width: auto;
    border-bottom: 1px solid black;
  }
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  & > table {
    border-collapse: separate;
    border-spacing: 0.5rem 0.25rem;
    margin-left: -0.5rem;
  }
`;

export const ReasonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;

    & > div:first-child {
      height: 100%;
    }
    & > div:last-child {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      row-gap: 1rem;
      column-gap: 2rem;
      width: 65%;
    }
  }

  textarea {
    width: 100%;
    min-width: 15em;
    min-height: 7em;
    max-height: 12em;
    height: 100%;
    resize: vertical;
    padding: 0.25rem 0.5rem;
    box-sizing: border-box;
    outline: none;
    border: 1px solid black;
    border-radius: 0.25rem;
  }
`;

export const SingleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }
`;
export const DoubleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  & > div {
    box-sizing: border-box;
    width: 50%;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: flex-start;
  }

  & > div:first-child {
    border-right: 1px solid black;
  }

  & > div:last-child {
    padding-left: 1rem;
  }
`;
