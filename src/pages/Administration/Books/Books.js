import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MainWrapper from 'common/MainWrapper';

import * as S from 'pages/ItemCreator/ItemCreator.css';
import CreatorContext from './BookContext';
import SideMenu from './components/SideMenu';
import Bookmark from './components/Bookmarks/Bookmark';

const useQuery = () => new URLSearchParams(useLocation().search);

const Books = () => {
  const { bookmarkId } = useParams();
  const query = useQuery();
  const defaultBook = query.get('book');
  const [currentBookmark, setCurrentBookmark] = useState(
    parseInt(bookmarkId || 0, 10)
  );
  return (
    <CreatorContext.Provider
      value={{
        currentBookmark,
        setCurrentBookmark,
        defaultBook,
      }}
    >
      <MainWrapper>
        <S.CreatorWrapper>
          <S.ContentWrapper>
            <SideMenu />
            <Bookmark />
          </S.ContentWrapper>
        </S.CreatorWrapper>
      </MainWrapper>
    </CreatorContext.Provider>
  );
};

export default Books;
