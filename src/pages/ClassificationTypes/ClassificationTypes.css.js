import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 30px;
  padding-top: 50px;
  min-height: 100%;
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
`;

export const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 50%;
  span {
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  height: 38px;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
`;

export const Textarea = styled.textarea`
  height: 150px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
`;

export const Title = styled.div`
  font-weight: 600;
  width: 50%;
`;

export const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 50%;

  :hover {
    background: ${({ theme, disabled }) => (disabled ? 'none' : theme.primary)};
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    :hover {
      fill: ${({ theme }) => theme.red};
    }
  }
`;

export const TableWrapper = styled.div`
  width: 60%;
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

export const Notice = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryDark};
  margin: 10px;
`;
