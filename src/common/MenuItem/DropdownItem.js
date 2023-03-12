import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import allActions from 'store/actions';
import { StyledNavLink } from 'pages/Header/Header.css';
import { MenuButton } from './MenuItem.css';

const DropdownItem = ({ items, activePath, label, icon }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState();
  const location = useLocation();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = title => {
    if (typeof title === 'string')
      dispatch(allActions.pageTitle.setTitle(title));
    setAnchorEl(null);
  };

  const menuItems = items.map(el => (
    <MenuItem
      key={el.label}
      onClick={() => handleClose(el.label)}
      style={{ padding: 0 }}
    >
      <StyledNavLink to={el.to}>{el.label}</StyledNavLink>
    </MenuItem>
  ));

  return (
    <>
      <MenuButton
        onClick={handleClick}
        type='button'
        active={location?.pathname?.includes(activePath)}
        style={{ padding: '10px 15px' }}
      >
        {icon} {label}
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default DropdownItem;
