import React from 'react';

import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export const rowMenuItems = [
  {
    icon: (
      <CheckIcon aria-hidden='false'>
        <title>Aktywuj użytkownika</title>
      </CheckIcon>
    ),
    label: 'Aktywuj użytkownika',
    function: 'activateUser',
    notVisible: 'NOT_VERIFIED',
  },
  {
    icon: (
      <CreateIcon aria-hidden='false'>
        <title>Zmień adres email</title>
      </CreateIcon>
    ),
    label: 'Zmień adres email',
    function: 'emailChange',
    always: true,
  },
  {
    icon: (
      <CreateIcon aria-hidden='false'>
        <title>Zmień hasło</title>
      </CreateIcon>
    ),
    label: 'Zmień hasło',
    function: 'passwordChange',
    always: true,
  },
  {
    icon: (
      <RotateLeftIcon aria-hidden='false'>
        <title>Zresetuj hasło</title>
      </RotateLeftIcon>
    ),
    label: 'Zresetuj hasło',
    function: 'resetPassword',
    always: true,
  },
  // {
  //   icon: (
  //     <SupervisorAccountIcon aria-hidden='false'>
  //       <title>Zmień rolę</title>
  //     </SupervisorAccountIcon>
  //   ),
  //   label: 'Zmień rolę',
  //   function: 'roleChange',
  //   always: true,
  // },
  {
    icon: (
      <CancelIcon aria-hidden='false'>
        <title>Usuń użytkownika</title>
      </CancelIcon>
    ),
    label: 'Usuń użytkownika',
    function: 'deleteUser',
    always: true,
  },
];
