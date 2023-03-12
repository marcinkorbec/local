import { buttonStyles } from 'common/Buttons';
import MainWrapper from 'common/MainWrapper';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ShortagesTable from './components/ShortagesTable';

const HeaderButtonsWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const HeaderLink = styled(Link)`
  ${buttonStyles};
  border: none;
  border-radius: 0;
  border-right: 1px solid ${({ theme }) => theme.primary};
  height: 100%;
  margin: 0;
  color: ${({ theme }) => theme.font};
  background-color: ${({ theme }) => theme.primaryDark};

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const Shortages = () => (
  <MainWrapper>
    <HeaderButtonsWrapper>
      {/* <HeaderLink to='/item-creator'>Dodaj przedmiot</HeaderLink> */}
      <HeaderLink to='/admin/books/1?book=SHORTAGES'>Eksport</HeaderLink>
      <HeaderLink to='/admin/books/0'>Statystyka</HeaderLink>
    </HeaderButtonsWrapper>
    <ShortagesTable />
  </MainWrapper>
);

export default Shortages;
