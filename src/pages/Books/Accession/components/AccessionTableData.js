import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import LinkIcon from '@material-ui/icons/Link';
import PrintIcon from '@material-ui/icons/Print';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export const rowMenuItems = [
  {
    icon: (
      <LinkIcon aria-hidden='false'>
        <title>Przypisz obiekt</title>
      </LinkIcon>
    ),
    label: 'Przypisz obiekt',
    function: 'connectItem',
    always: true,
  },
  {
    icon: (
      <CreateIcon aria-hidden='false'>
        <title>Popraw</title>
      </CreateIcon>
    ),
    label: 'Popraw',
    to: '/item-creator/',
    always: true,
  },
  {
    icon: (
      <PrintIcon aria-hidden='false'>
        <title>Drukuj</title>
      </PrintIcon>
    ),
    label: 'Drukuj',
    to: '/report/',
    always: true,
  },
  {
    icon: (
      <CancelIcon aria-hidden='false'>
        <title>Usuń</title>
      </CancelIcon>
    ),
    label: 'Usuń',
    function: 'deleteItem',
    always: true,
  },
];
