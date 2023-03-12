import React from 'react';

// import CancelIcon from '@material-ui/icons/Cancel';
// import CreateIcon from '@material-ui/icons/Create';
// import LinkIcon from '@material-ui/icons/Link';
import PrintIcon from '@material-ui/icons/Print';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
// import CopyrightIcon from '@mui/icons-material/Copyright';
import DescriptionIcon from '@mui/icons-material/Description';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export const modalTypes = {
  default: '',
  move: 'move',
  copyItem: 'copyItem',
  connectItem: 'connectItem',
  removeItem: 'removeItem',
  itemElements: 'itemElements',
  itemPricing: 'itemPricing',
};

export const rowMenuItems = [
  // {
  //   icon: (
  //     <LinkIcon aria-hidden='false'>
  //       <title>Przypisz obiekt</title>
  //     </LinkIcon>
  //   ),
  //   label: 'Przypisz obiekt',
  //   function: 'connectItem',
  //   always: true,
  // },
  // {
  //   icon: (
  //     <DoubleArrowIcon aria-hidden='false'>
  //       <title>Przenieś</title>
  //     </DoubleArrowIcon>
  //   ),
  //   label: 'Przenieś',
  //   function: 'move',
  //   always: true,
  // },
  // {
  //   icon: (
  //     <FileCopyIcon aria-hidden='false'>
  //       <title>Kopiuj obiekt</title>
  //     </FileCopyIcon>
  //   ),
  //   label: 'Kopiuj obiekt',
  //   function: 'copyItem',
  //   always: true,
  // },
  {
    icon: (
      <ViewModuleIcon aria-hidden='false'>
        <title>Elementy obiekt</title>
      </ViewModuleIcon>
    ),
    label: 'Elementy obiektu',
    function: 'itemElements',
    always: true,
  },
  // {
  //   icon: (
  //     <CreateIcon aria-hidden='false'>
  //       <title>Popraw</title>
  //     </CreateIcon>
  //   ),
  //   label: 'Popraw',
  //   to: '/item-creator/',
  //   always: true,
  // },
  {
    icon: (
      <PrintIcon aria-hidden='false'>
        <title>Raport</title>
      </PrintIcon>
    ),
    label: 'Raport',
    to: '/report/',
    always: true,
  },
  // {
  //   icon: (
  //     <PrintIcon aria-hidden='false'>
  //       <title>Drukuj kod QR</title>
  //     </PrintIcon>
  //   ),
  //   label: 'Drukuj kod QR',
  //   to: '/item-creator/',
  //   bookmark: '?bookmarkId=12',
  //   always: true,
  // },
  {
    icon: (
      <HistoryEduIcon aria-hidden='false'>
        <title>Historia obiektu</title>
      </HistoryEduIcon>
    ),
    label: 'Historia obiektu',
    to: '/item-creator/',
    bookmark: '?bookmarkId=6',
    always: true,
  },
  // {
  //   icon: (
  //     <CopyrightIcon aria-hidden='false'>
  //       <title>Historia obiektu</title>
  //     </CopyrightIcon>
  //   ),
  //   label: 'Prawa autorskie',
  //   to: '/item-creator/',
  //   bookmark: '?bookmarkId=11',
  //   always: true,
  // },
  {
    icon: (
      <DescriptionIcon aria-hidden='false'>
        <title>Dokumenty</title>
      </DescriptionIcon>
    ),
    label: 'Dokumenty',
    to: '/item-creator/',
    bookmark: '?bookmarkId=13',
    always: true,
  },
  {
    icon: (
      <PriceChangeIcon aria-hidden='false'>
        <title>Wyceny</title>
      </PriceChangeIcon>
    ),
    label: 'Wyceny',
    function: 'itemPricing',
    always: true,
  },
  // {
  //   icon: (
  //     <CancelIcon aria-hidden='false'>
  //       <title>Zdejmij ze stanu</title>
  //     </CancelIcon>
  //   ),
  //   label: 'Zdejmij ze stanu',
  //   function: 'removeItem',
  //   always: true,
  // },
  // {
  //   icon: (
  //     <CancelIcon aria-hidden='false'>
  //       <title>Usuń</title>
  //     </CancelIcon>
  //   ),
  //   label: 'Usuń',
  //   function: 'deleteItem',
  //   always: true,
  // },
];
