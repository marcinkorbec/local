import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import PreviewIcon from '@mui/icons-material/Preview';

export const rowMenuItems = [
  {
    icon: (
      <CreateIcon aria-hidden='false'>
        <title>Edytuj komentarz</title>
      </CreateIcon>
    ),
    label: 'Edytuj komentarz',
    function: 'editComment',
    notVisible: 'CLOSED',
  },
  {
    icon: (
      <CreateIcon aria-hidden='false'>
        <title>Zmień status</title>
      </CreateIcon>
    ),
    label: 'Zmień status',
    function: 'changeStatus',
    notVisible: 'CLOSED',
  },
  {
    icon: (
      <CancelIcon aria-hidden='false'>
        <title>Usuń</title>
      </CancelIcon>
    ),
    label: 'Usuń',
    function: 'deleteItem',
    notVisible: 'CLOSED',
  },
  {
    icon: (
      <PreviewIcon aria-hidden='false'>
        <title>Wyświetl szczegóły</title>
      </PreviewIcon>
    ),
    label: 'Wyświetl szczegóły',
    function: 'viewDetails',
    always: true,
  },
];
