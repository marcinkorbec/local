import { Button } from 'm-web-components';
import styled, { css } from 'styled-components';

export const buttonStyles = css`
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) => margin || 'auto'};
  padding: ${({ padding }) => padding || '6px 10px'};
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
  background-color: white;
  transition: 0.5s;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    background-color: lightgray;
  }

  font-size: 1.5rem;
  font-weight: 500;

  ${({ notVisible }) =>
    notVisible &&
    css`
      display: none;
    `}

  ${({ right }) =>
    right &&
    css`
      margin-right: 0px;
    `}
`;

export const DefaultButton = styled(Button)`
  ${buttonStyles};
`;

export const EditButton = styled(DefaultButton)`
  background-color: transparent;
  text-decoration: underline;
  border: none;
`;

export const SaveButton = styled(DefaultButton)`
  ${({ small }) =>
    !small &&
    css`
      width: 100%;
    `}
`;

export const CancelButton = styled(DefaultButton)``;
