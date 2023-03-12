import styled from 'styled-components';
import bg from 'assets/bg_local.jpg';
import MainWrapper from 'common/MainWrapper';
import { Link } from 'react-router-dom';

export const Wrapper = styled(MainWrapper)`
  position: relative;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 70px;
  box-sizing: border-box;
  z-index: 1;

  &:before {
    content: '';
    position: fixed;
    height: 95vh;
    width: 100vw;
    z-index: -1;
    top: 5vh;
    left: 0;
    background-image: url(${bg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* filter: blur(40px) opacity(30%) brightness(1.2); */
  }
`;

export const Title = styled.h1`
  align-self: left;
  color: ${({ theme }) => theme.font};
  font-weight: 400;
  font-size: 4rem;
  margin: 0;
`;

export const DateTitle = styled.h2`
  align-self: left;
  color: ${({ theme }) => theme.font};
  font-weight: 400;
  font-size: 2.5rem;
  margin: 0;
`;

export const Buttons = styled.div`
  display: flex;
  width: 40%;
`;

export const Button = styled.button`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  padding: 10px;
  font-size: 1.3rem;
  margin-right: 40px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

export const ButtonLink = styled(Link)`
  text-align: center;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  padding: 10px;
  font-size: 1.3rem;
  margin-right: 40px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.primary};
  }
`;
