import React, { useContext } from 'react';
import BookContext from 'pages/Administration/Books/BookContext';
import Statistics from './Statistics';
import Export from './Export';

const Bookmark = () => {
  const { currentBookmark } = useContext(BookContext);

  switch (currentBookmark) {
    case 0:
      return <Statistics />;
    case 1:
      return <Export />;
    default:
      return <> </>;
  }
};

export default Bookmark;
