import { styled } from 'styled-components';

export const PreviewWrapper = styled.div`
  margin: auto;
  width: 80vw;
  height: 80vh;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 30%;
    height: 100%;
  }

  & textarea {
    width: 80%;
    height: 90%;
    background: var(--platinum);
  }
`;
