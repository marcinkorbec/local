import React, { useContext } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import * as S from '../../ItemCreator.css';
import { Cell, CellRow, DoubleCell, Wrapper } from './Bookmarks.css';

const Origin = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);

  const updateState = (name, e, lang) => {
    setItemData(prev => ({
      ...prev,
      origin: {
        ...prev.origin,
        [name]: {
          ...prev.origin?.[name],
          [lang]: e.target.value,
        },
      },
    }));
  };

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <Cell>
          <span>Kraj</span>
          <CellRow>
            <input
              value={itemData?.origin?.country?.pl}
              onChange={e => updateState('country', e, 'pl')}
              placeholder='pl'
            />
            <input
              value={itemData?.origin?.country?.en}
              onChange={e => updateState('country', e, 'en')}
              placeholder='eng'
            />
          </CellRow>
        </Cell>
        <Cell>
          <span>Region</span>
          <CellRow>
            <input
              value={itemData?.origin?.region?.pl}
              onChange={e => updateState('region', e, 'pl')}
              placeholder='pl'
            />
            <input
              value={itemData?.origin?.region?.en}
              onChange={e => updateState('region', e, 'en')}
              placeholder='eng'
            />
          </CellRow>
        </Cell>
        <Cell>
          <span>Miasto</span>
          <CellRow>
            <input
              value={itemData?.origin?.city?.pl}
              onChange={e => updateState('city', e, 'pl')}
              placeholder='pl'
            />
            <input
              value={itemData?.origin?.city?.en}
              onChange={e => updateState('city', e, 'en')}
              placeholder='eng'
            />
          </CellRow>
        </Cell>
        <DoubleCell>
          <span>Inne</span>
          <CellRow>
            <textarea
              value={itemData?.origin?.otherPlace?.pl || ''}
              onChange={e => updateState('otherPlace', e, 'pl')}
              placeholder='pl'
            />
            <textarea
              value={itemData?.origin?.otherPlace?.eng || ''}
              onChange={e => updateState('otherPlace', e, 'en')}
              placeholder='eng'
            />
          </CellRow>
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Origin;
