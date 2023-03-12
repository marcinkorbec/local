import styled from 'styled-components';
import { device } from 'styles/devices';

export const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  padding: 0;
  height: 100%;
  font-size: 1rem;
  background-color: transparent;
  /* 
  background-color: ${({ theme, active }) =>
    active ? theme.background : 'transparent'}; */

  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  svg {
    margin: auto 5px;
  }

  @media ${device.laptopL} {
    font-size: 0.7rem;
  }
`;
