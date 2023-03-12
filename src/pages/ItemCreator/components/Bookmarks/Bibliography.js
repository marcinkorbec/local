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

const Bibliography = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);
  const [newBibliography, setNewBibliography] = useState('');

  const handleAddKeyword = () => {
    setItemData(prev => ({
      ...prev,
      bibliography: prev.bibliography
        ? [...prev.bibliography, newBibliography]
        : [newBibliography],
    }));

    setNewBibliography('');
  };

  const handleDeleteItem = e => {
    setItemData(prev => ({
      ...prev,
      bibliography: [...prev.bibliography?.filter(el => el !== e)],
    }));
  };

  const mappedBibliography = itemData?.bibliography?.map(field => (
    <Item key={field}>
      <span>{field}</span>
      <RemoveCircleOutline onClick={() => handleDeleteItem(field)} />
    </Item>
  ));

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <DoubleCell>
          <span>Dodaj bibliografię</span>
          <CellRow>
            <input
              value={newBibliography}
              onChange={e => setNewBibliography(e.target.value)}
            />
            <AddButton type='button' onClick={handleAddKeyword}>
              +
            </AddButton>
          </CellRow>
        </DoubleCell>
        <DoubleCell>
          <span>Bibliografia</span>
          <ItemsList full>{mappedBibliography}</ItemsList>
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Bibliography;
