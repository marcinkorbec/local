import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MainWrapper from 'common/MainWrapper';

import * as S from 'pages/ItemCreator/ItemCreator.css';
import GeneralDataContext from './GeneralDataContext';
import SideMenu from './components/SideMenu';
import Bookmark from './components/Bookmarks/Bookmark';

const useQuery = () => new URLSearchParams(useLocation().search);

const GeneralData = () => {
  const { bookmarkId } = useParams();
  const query = useQuery();
  const defaultLocation = query.get('locationId');
  const [currentBookmark, setCurrentBookmark] = useState(
    parseInt(bookmarkId || 0, 10)
  );
  return (
    <GeneralDataContext.Provider
      value={{
        currentBookmark,
        setCurrentBookmark,
        defaultLocation,
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
    </GeneralDataContext.Provider>
  );
};

export default GeneralData;
