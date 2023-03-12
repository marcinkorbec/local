import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

export const FileUpload = styled.button`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  background: #fff;
  border-radius: 5px;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }

  :hover {
    background: ${({ theme }) => theme.primary};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  align-self: flex-start;
`;

export const Tr = styled.tr`
  :nth-of-type(2n + 1) {
    background: ${({ theme }) => theme.primary};
  }

  :hover {
    background: ${({ theme }) => theme.primaryDark};
  }

  ${({ isSelected }) =>
    isSelected === true &&
    css`
      background: ${({ theme }) => theme.primaryDark} !important;
    `}
`;

export const Td = styled.td`
  padding: 10px;
  height: 100%;

  ${({ header }) =>
    header === true &&
    css`
      font-weight: 600;
      background: ${({ theme }) => theme.primaryDark};
    `}

  ${({ menu }) =>
    menu === true &&
    css`
      text-align: center;
      width: 100px;
    `}
`;

export const Input = styled.input`
  height: 38px;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
`;

export const TableWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const TableMenu = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 70%;
  }

  button {
    width: 20%;
  }
`;

export const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  :hover {
    svg {
      fill: ${({ theme, red }) => (red ? theme.red : theme.secondary)};
    }
  }
`;

export const Notice = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryDark};
  margin: 10px;
`;
