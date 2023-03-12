import React, { useContext } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import BasicInfo from './BasicInfo';
import Acquisition from './Acquisition';
import Origin from './Origin';
import Characteristic from './Characteristic';
import Affiliation from './Affiliation';
import Dimensions from './Dimensions';
import ObjectImages from './ObjectImages';
import Bibliography from './Bibliography';
import Copyright from './Copyright';
import QRCode from './QRCode';
import Attachments from './Attachments';
import Final from './Final';
import ObjectHistory from './ObjectHistory';
import PreservationState from './PreservationState';
import Recommendations from './Recommendations';
import MultimediaFiles from './MultimediaFiles';
import ItemElements from './ItemElements';

const Bookmark = () => {
  const { currentBookmark } = useContext(CreatorContext);

  switch (currentBookmark) {
    case 0:
      return <BasicInfo />;
    case 1:
      return <Acquisition />;
    case 2:
      return <ObjectImages />;
    case 3:
      return <Origin />;
    case 4:
      return <Affiliation />;
    case 5:
      return <Bibliography />;
    case 6:
      return <ObjectHistory />;
    case 7:
      return <Recommendations />;
    case 8:
      return <PreservationState />;
    case 9:
      return <Dimensions />;
    case 10:
      return <Characteristic />;
    case 11:
      return <Copyright />;
    case 12:
      return <QRCode />;
    case 13:
      return <Attachments />;
    case 14:
      return <MultimediaFiles />;
    case 15:
      return <Final />;
    case 16:
      return <ItemElements />;
    default:
      return <> </>;
  }
};

export default Bookmark;
