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

  /* input with class input-incremental */
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
