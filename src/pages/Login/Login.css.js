import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';

export const LoginWrapper = styled.div`
  ${centerFlex};

  width: 100%;
  height: 100%;
`;

export const LoginForm = styled.form`
  ${centerFlex};
  flex-direction: column;
  justify-content: space-evenly;

  width: 500px;
  height: 500px;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;

  box-shadow: 0 0 20px ${({ theme }) => theme.primary};

  h1 {
    text-align: center;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.primaryDark} !important;
  }
`;

export const SubmitButton = styled.button`
  font-size: 1.5rem;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  background-color: transparent; // ${({ theme }) => theme.primary};
  transition: 0.5s;

  &:hover {
    transform: translateX(-5%) translateY(-5%);
  }
`;
