import React from 'react';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export const modalTypes = {
  default: '',
  move: 'move',
  returnItem: 'returnItem',
};

export const rowMenuItems = [
  {
    icon: (
      <DoubleArrowIcon aria-hidden='false'>
        <title>Przenieś</title>
      </DoubleArrowIcon>
    ),
    label: 'Przenieś',
    function: 'move',
    always: true,
  },
  {
    icon: (
      <RotateLeftIcon aria-hidden='false'>
        <title>Zwróć obiekt</title>
      </RotateLeftIcon>
    ),
    label: 'Zwróć obiekt',
    function: 'returnItem',
    always: true,
  },
];
