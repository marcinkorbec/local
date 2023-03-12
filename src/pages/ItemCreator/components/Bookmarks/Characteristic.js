import React, { useContext } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import * as S from '../../ItemCreator.css';
import { DoubleCell, Wrapper } from './Bookmarks.css';

const Characteristic = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);

  const updateState = (name, e) => {
    setItemData(prev => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <DoubleCell>
          <span>Krótki opis</span>
          <textarea
            value={itemData?.shortDescription}
            onChange={e => updateState('shortDescription', e)}
          />
        </DoubleCell>
        <DoubleCell>
          <span>Charakterystyka</span>
          <textarea
            value={itemData?.characteristics}
            onChange={e => updateState('characteristics', e)}
          />
        </DoubleCell>
        <DoubleCell>
          <span>Dane uzupełniające</span>
          <textarea
            value={itemData?.supplementaryData}
            onChange={e => updateState('supplementaryData', e)}
          />
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Characteristic;
