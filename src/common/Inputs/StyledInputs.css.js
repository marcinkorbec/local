import { TextField } from '@material-ui/core';
import styled from 'styled-components';

export const InputMui = styled(TextField)`
  width: 100%;
  label {
    font-size: 15px;
    transform: none;
    color: ${({ theme }) => theme.font};
    position: relative;
    font-weight: 600;
  }

  input {
    border: 1px solid ${({ theme }) => theme.primaryDark};
    height: 48px;
    padding: 0 5px;
    width: 100%;
  }

  div:before {
    border: none;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.primaryDark};
  }
`;
