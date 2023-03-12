import styled, { css } from 'styled-components';

export const BookmarkWrapper = styled.fieldset`
  border: none;
  width: calc(100% - 300px);
  height: 100%;
  padding: 25px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Wrapper = styled.div`
  width: 75%;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  ${({ row }) =>
    row &&
    css`
      align-items: center;
    `};

  > input,
  > textarea {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;

    ${({ row }) =>
      row &&
      css`
        margin: auto 50% auto auto;
      `};
  }

  > textarea {
    min-height: 150px;
    resize: vertical;
    height: 100%;
  }

  > span {
    color: ${({ theme }) => theme.font};
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const DoubleCell = styled(Cell)`
  grid-column: 1 / span 2;

  > input[type='date'] {
    max-width: 300px;
  }
`;

export const SubmitButton = styled.button`
  max-width: 300px;
  height: 38px;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
  background-color: white;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    background-color: lightgray;
    &:hover {
      background-color: lightgray;
    }
  }
`;
