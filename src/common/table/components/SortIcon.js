import React from 'react';
import styled, { css } from 'styled-components';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Wrapper = styled.span`
  width: 20px;
  position: relative;

  svg {
    position: absolute;
    left: 0;
    top: -4px;
  }

  svg:nth-child(2) {
    top: 1px;
  }

  ${({ direction, isCurrent }) =>
    isCurrent &&
    (direction === 'DESC'
      ? css`
          svg:nth-child(1) {
            transform: scale(1.2);
          }
          svg:nth-child(2) {
            opacity: 0.5;
          }
        `
      : css`
          svg:nth-child(1) {
            opacity: 0.5;
          }
          svg:nth-child(2) {
            transform: scale(1.2);
          }
        `)}
`;

const SortIcon = ({ direction, isCurrent }) => (
  <Wrapper direction={direction} isCurrent={isCurrent}>
    <ArrowDropUpIcon aria-hidden='false'>
      <title>Strzałka sortowania</title>
    </ArrowDropUpIcon>
    <ArrowDropDownIcon aria-hidden='false'>
      <title>Strzałka sortowania</title>
    </ArrowDropDownIcon>
  </Wrapper>
);

export default SortIcon;
