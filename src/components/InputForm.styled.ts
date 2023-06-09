import styled, { css } from 'styled-components';

export const InputFormWrapper = styled.div`
  width: 95vw;
  /* outline: 1px solid red; */
  /* height: 80vh; */
  margin-inline: auto;
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 50%;
    margin: 0;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    h2 {
      margin: 0;
    }
  }
`;

const sharedWrapperStyle = css`
  & > div {
    width: 98%;
    margin-top: 1rem;
    /* outline: 1px solid black; */
  }
`;

export const FormEditWrapper = styled.div`
  padding-right: 1.5em;
  border-right: 1px solid black;
  outline: 1px solid black;

  ${sharedWrapperStyle}
`;

const aspectRatios = {
  a4: '210 / 297',
};

const paperStyle = css`
  box-sizing: border-box;
  /* background-color: yellow; */
  aspect-ratio: ${aspectRatios.a4};
  overflow: scroll;
  border: 1px solid black;
  padding: 1.5rem;
  position: relative;

  hr {
    margin: 0;
    border: 0.5px solid black;
  }

  h1 {
    font-size: 1.8rem;
    margin: 0.5rem 0 0.25rem 0;

    &.logo {
      margin: 0;
      position: absolute;
      font-size: 3rem;
      font-weight: 200;
      top: 1rem;
      right: 1.5rem;
    }
  }
  h3 {
    margin: 1rem 0 0.5rem 0;
  }
`;
export const CustomerDetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  /* first div child */
  & > div:first-child {
    border-right: 1px solid black;
  }

  & > div:last-child {
    padding-left: 0.75em;
  }

  & > div {
    box-sizing: border-box;
    width: 50%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
`;

export const PreviewTextarea = styled.textarea`
  box-sizing: border-box;
  padding: 0.25rem;
  resize: none;
  outline: none;
  border: 1px solid black;
  font-size: 0.9rem;
`;

export const ReasonWrapper = styled(CustomerDetailsWrapper)`
  & > div {
    border: none !important;
  }
  textarea {
    width: 94%;

    height: 4rem;
  }
`;

export const SpanValueStyle = styled.span<{ size?: number; inline?: string }>`
  display: flex;
  /* outline: 1px solid black; */
  flex-direction: ${({ inline = 'row' }) => inline};
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: ${({ inline = 'row' }) => (inline === 'column' ? 'flex-start' : 'flex-end')};
  font-size: ${({ size = 1 }) => size}rem;

  & > span {
    text-decoration: underline;
    color: #404040;
  }
`;
export const ItemTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* border: 1px solid black; */
  margin-bottom: 0.5rem;

  th {
    text-align: left;
  }
  th,
  td {
    border: 1px solid black;
    padding: 0.25rem;
  }
`;

export const InternalDetailsTable = styled.div`
  display: grid;
  grid-template-columns: 1.375fr 1fr 1fr;

  /* border: 1px solid black; */

  & > span {
    border: 1px solid black;
  }
`;

export const PreviewWrapper = styled.div`
  padding-left: 1.5em;
  border-left: 1px solid black;

  ${sharedWrapperStyle}

  & > div {
    ${paperStyle}
  }
`;

export const FormEditorHeading = styled.h1`
  margin: 0;
  text-align: center;
  margin-top: 1rem;
`;
