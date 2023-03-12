import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/devices';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;

  background-color: ${({ theme }) => theme.primary};
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  transition: 0.5s;

  display: flex;
  align-items: center;

  /* &.active {
    background-color: ${({ theme }) => theme.background};
  } */
`;

export const CurrentPage = styled.div`
  min-width: 210px;
  height: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.primaryDark};
  transition: width 0.5s;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: default;
  margin-left: auto;

  @media ${device.laptopL} {
    font-size: 0.7rem;
  }
`;
