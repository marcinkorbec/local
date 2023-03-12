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

export const CellRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;

  > input,
  > textarea {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;
    width: 100%;

    &:first-child {
      margin-right: 10px;
    }
  }

  > input[type='date'] {
    max-width: 300px;
  }

  > textarea {
    min-height: 100px;
    resize: vertical;
  }

  > div {
    min-width: 80px;
    margin-left: 10px;
  }

  > button {
    margin: auto 0 auto 10px;
  }

  > span {
    margin: auto 15px auto 0;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 500px;
  border: 1px solid lightgray;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SingleItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 150px;
  padding: 10px 0;
  border-bottom: 1px solid lightgray;
`;

export const ItemRow = styled(CellRow)`
  input {
    &:disabled {
      border: none;
      background-color: transparent;
    }
  }
`;

export const QrWrapper = styled.div`
  display: none;
  flex-direction: column;
  background-color: white;
  max-width: 200px;

  img {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  span {
    padding-bottom: 10px;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
  }

  @media print {
    display: flex;
  }
`;
