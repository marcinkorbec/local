import React, { useContext } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import * as S from '../../ItemCreator.css';
import { DoubleCell, Wrapper } from './Bookmarks.css';

const Copyright = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <DoubleCell>
          <span>Prawa autorskie</span>
          <textarea
            value={itemData?.copyright}
            onChange={e =>
              setItemData(prev => ({ ...prev, copyright: e.target.value }))
            }
          />
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Copyright;
