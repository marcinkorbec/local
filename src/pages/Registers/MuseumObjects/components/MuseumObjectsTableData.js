import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export const modalTypes = {
  default: '',
  copyBook: 'copyBook',
  editBook: 'editBook',
  deleteBook: 'deleteBook',
};

export const rowMenuItems = [
  {
    icon: (
      <FileCopyIcon aria-hidden='false'>
        <title>Kopiuj</title>
      </FileCopyIcon>
    ),
    label: 'Kopiuj',
    function: 'copyBook',
    always: true,
  },
  {
    icon: (
      <CreateIcon aria-hidden='false'>
        <title>Edytuj</title>
      </CreateIcon>
    ),
    label: 'Edytuj',
    function: 'editBook',
    always: true,
  },
  {
    icon: (
      <CancelIcon aria-hidden='false'>
        <title>Usuń</title>
      </CancelIcon>
    ),
    label: 'Usuń',
    function: 'deleteBook',
    always: true,
  },
];
