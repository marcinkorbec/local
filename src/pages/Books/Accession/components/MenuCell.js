import React, { useState } from 'react';
import styled from 'styled-components';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Button } from 'common/MenuInTable';
import HiddenMenu from 'common/HiddenMenu';
import { Link } from 'react-router-dom';

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  color: ${({ theme }) => theme.font};
  background: none;
  border: none;

  svg {
    margin-right: 10px;
  }

  :hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.fontLight};
  }
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  color: ${({ theme }) => theme.font};
  background: none;
  border: none;

  svg {
    margin-right: 10px;
  }

  :hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.fontLight};
  }
`;

const MenuCell = ({ row, menuItems, handleOpenModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button type='button' onClick={e => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon style={{ color: '#888794' }} aria-hidden='false'>
          <title>Menu</title>
        </MoreVertIcon>
        <HiddenMenu />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map(el => (
          <MenuItem key={el.label} style={{ padding: 0 }}>
            {el.to ? (
              <MenuLink to={`${el.to}${row.id}`}>
                {el.icon}
                {el.label}
              </MenuLink>
            ) : (
              <MenuButton onClick={() => handleOpenModal(row, el.function)}>
                {el.icon}
                {el.label}
              </MenuButton>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuCell;
