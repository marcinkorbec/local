import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import * as S from 'pages/ItemCreator/ItemCreator.css';
import GeneralDataContext from '../GeneralDataContext';
import { bookmarks } from '../constants';

const MenuButton = styled.button`
  width: 100%;
  border: none;
  padding: 8px 25px;
  text-align: start;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
  transition: 0.3s;
  cursor: pointer;

  ${({ theme, active }) =>
    active &&
    css`
      background-color: ${theme.background};
      font-weight: 600;
    `};

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const SideMenu = () => {
  const { currentBookmark, setCurrentBookmark } =
    useContext(GeneralDataContext);

  const mappedButtons = bookmarks.map(el => (
    <MenuButton
      key={el.label}
      type='button'
      active={currentBookmark === el.value}
      onClick={() => setCurrentBookmark(el.value)}
    >
      {el.label}
    </MenuButton>
  ));

  return <S.SideMenu>{mappedButtons}</S.SideMenu>;
};

export default SideMenu;
