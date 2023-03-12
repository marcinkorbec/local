import React from 'react';
import routes from 'routes';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import GridOnIcon from '@material-ui/icons/GridOn';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import ListAltIcon from '@material-ui/icons/ListAlt';
// import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import DescriptionIcon from '@material-ui/icons/Description';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';

export default [
  {
    label: 'Księgi',
    icon: <MenuBookIcon />,
    items: [
      {
        to: routes.book.accession,
        label: 'Księga wpływów',
      },
      {
        to: routes.book.inventory,
        label: 'Księgi inwentarzowe',
      },
      {
        to: routes.book.deposit,
        label: 'Księga depozytowa',
      },
      {
        to: routes.book.shortage,
        label: 'Księga braków',
      },
    ],
  },
  {
    label: 'Rejestry',
    icon: <GridOnIcon />,
    items: [
      {
        to: routes.register.museumObjects,
        label: 'Ewidencja obiektów muzealnych',
      },
      {
        to: routes.register.evidence,
        label: 'Zbiory według ewidencji',
      },
      {
        to: routes.register.supportingEvidence,
        label: 'Zbiory według ewidencji pomocniczej',
      },
    ],
  },
  {
    label: 'Skontrum',
    icon: <FolderSpecialIcon />,
    to: routes.inspection,
  },
  {
    label: 'Rodzaje i typy zbiorów',
    icon: <ListAltIcon />,
    to: routes.typesOfSets,
  },
  // {
  //   label: 'Panel Centrum Kompetencji Obiektu',
  //   icon: <ViewCompactIcon />,
  //   to: routes.pcko,
  // },
  {
    label: 'Dokumenty',
    icon: <DescriptionIcon />,
    to: routes.documents,
  },
  {
    label: 'Komisja gromadzenia/Zakupy zbiorów',
    icon: <BusinessCenterIcon />,
    to: routes.committee,
  },
  {
    label: 'Administracja',
    icon: <PermDataSettingIcon />,
    items: [
      {
        to: routes.admin.users,
        label: 'Użytkownicy strony internetowej',
      },
      {
        to: '/admin/books/',
        label: 'Zarządzanie księgami',
      },
      {
        to: '/admin/generalData/',
        label: 'Zarządzanie danymi ogólnymi',
      },
    ],
  },
];
