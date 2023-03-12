import React, { useContext } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import * as S from '../../ItemCreator.css';
import { DoubleCell, Wrapper } from './Bookmarks.css';

const Final = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <DoubleCell>
          <span>Nazwa po opracowaniu</span>
          <input
            value={itemData?.finalName}
            onChange={e =>
              setItemData(prev => ({ ...prev, finalName: e.target.value }))
            }
          />
        </DoubleCell>

        <DoubleCell>
          <span>Data opracowania karty</span>
          <input
            type='date'
            value={itemData?.entryDate}
            onChange={e =>
              setItemData(prev => ({ ...prev, entryDate: e.target.value }))
            }
          />
        </DoubleCell>
        <DoubleCell row>
          <span>Cyfrowe Repozytorium Narodowego Centrum Kultury Filmowej</span>
          <input
            type='checkbox'
            defaultChecked={itemData.availableOnWeb}
            onChange={() =>
              setItemData(prev => ({
                ...prev,
                availableOnWeb: !prev.availableOnWeb,
              }))
            }
          />
        </DoubleCell>
        <DoubleCell row>
          <span>Udostępnij przedmiot dla serwisów zewnętrznych</span>
          <input type='checkbox' />
        </DoubleCell>
        <DoubleCell row>
          <span>Obiekt zaakceptowany</span>
          <input
            type='checkbox'
            defaultChecked={itemData.accepted}
            onChange={() =>
              setItemData(prev => ({ ...prev, accepted: !prev.accepted }))
            }
          />
        </DoubleCell>
        <DoubleCell row>
          <span>Obiekt zamknięty</span>
          <input
            type='checkbox'
            defaultChecked={itemData.closed}
            onChange={() =>
              setItemData(prev => ({
                ...prev,
                closed: !prev.closed,
              }))
            }
          />
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Final;
