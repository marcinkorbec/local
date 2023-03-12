import React, { useContext, useState } from 'react';
import { RemoveCircleOutline } from '@material-ui/icons';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import * as S from '../../ItemCreator.css';
import {
  AddButton,
  CellRow,
  DoubleCell,
  Item,
  ItemsList,
  Wrapper,
} from './Bookmarks.css';

const ObjectHistory = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);
  const [newHistory, setNewHistory] = useState({
    event: {
      pl: '',
      en: '',
    },
    date: '',
  });

  const handleAddKeyword = () => {
    setItemData(prev => ({
      ...prev,
      history: prev.history ? [...prev.history, newHistory] : [newHistory],
    }));

    setNewHistory({
      event: {
        pl: '',
        en: '',
      },
      date: '',
    });
  };

  const handleDeleteItem = e => {
    setItemData(prev => ({
      ...prev,
      history: [...prev.history?.filter(el => el !== e)],
    }));
  };

  const mappedHistory = itemData?.history?.map(field => (
    <Item key={JSON.stringify(field)}>
      <aside>{field.date || 'Brak podanej daty'}</aside>
      <span>
        {field.event?.pl}/{field.event?.en}
      </span>
      <RemoveCircleOutline onClick={() => handleDeleteItem(field)} />
    </Item>
  ));

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <DoubleCell>
          <span>Dodaj wydarzenie</span>
          <input
            style={{ marginBottom: '10px' }}
            value={newHistory.event?.pl}
            placeholder='Krótki opis [pl]...'
            onChange={e =>
              setNewHistory(prev => ({
                ...prev,
                event: { ...prev.event, pl: e.target.value },
              }))
            }
          />
          <input
            style={{ marginBottom: '10px' }}
            value={newHistory.event?.en}
            placeholder='Krótki opis [en]...'
            onChange={e =>
              setNewHistory(prev => ({
                ...prev,
                event: { ...prev.event, en: e.target.value },
              }))
            }
          />
          <CellRow>
            <input
              type='date'
              value={newHistory.date}
              onChange={e =>
                setNewHistory(prev => ({ ...prev, date: e.target.value }))
              }
            />
            <AddButton type='button' onClick={handleAddKeyword}>
              +
            </AddButton>
          </CellRow>
        </DoubleCell>
        <DoubleCell>
          <span>Historia obiektu</span>
          <ItemsList full>{mappedHistory}</ItemsList>
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default ObjectHistory;
