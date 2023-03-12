import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { MenuButton } from 'common/MenuItem/MenuItem.css';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import routes from 'routes';
import allActions from 'store/actions';
import DropdownItem from 'common/MenuItem/DropdownItem';
import menuItems from './menuItems';
import { CurrentPage, HeaderWrapper, StyledNavLink } from './Header.css';

const Header = () => {
  const history = useHistory();
  const title = useSelector(state => state.pageTitle);
  const dispatch = useDispatch();

  const handleLinkClick = label =>
    dispatch(allActions.pageTitle.setTitle(label));

  const mappedItems = menuItems.map(el => {
    if (el.items) return <DropdownItem key={el.label} {...el} />;
    return (
      <MenuButton
        key={el.label}
        type='button'
        onClick={() => handleLinkClick(el.label)}
      >
        <StyledNavLink to={el.to}>
          {el.icon} {el.label}
        </StyledNavLink>
      </MenuButton>
    );
  });

  return (
    <>
      <HeaderWrapper>
        <MenuButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </MenuButton>
        <MenuButton
          type='button'
          key='home'
          onClick={() => handleLinkClick('Ekran startowy')}
        >
          <StyledNavLink exact to={routes.home}>
            <HomeIcon />
          </StyledNavLink>
        </MenuButton>
        {mappedItems}
        <CurrentPage data-tip data-for='pageTitle'>
          {title}
        </CurrentPage>
      </HeaderWrapper>
      <ReactTooltip id='pageTitle' effect='solid'>
        <span style={{ color: 'white' }}>Obecna strona</span>
      </ReactTooltip>
    </>
  );
};

export default Header;
