import React, { useContext } from 'react';
import GeneralDataContext from 'pages/Administration/GeneralData/GeneralDataContext';
import Locations from './Locations';
import Workers from './Workers';
import Contacts from './Contacts';

const Bookmark = () => {
  const { currentBookmark } = useContext(GeneralDataContext);

  switch (currentBookmark) {
    case 0:
      return <Locations />;
    case 1:
      return <Workers />;
    case 2:
      return <Contacts />;
    default:
      return <> </>;
  }
};

export default Bookmark;
