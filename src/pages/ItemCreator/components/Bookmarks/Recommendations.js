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

const Recommendations = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);
  const [newRecommendation, setNewRecommendation] = useState('');

  const handleAdd = () => {
    setItemData(prev => ({
      ...prev,
      conservationRecommendations: prev.conservationRecommendations
        ? [...prev.conservationRecommendations, newRecommendation]
        : [newRecommendation],
    }));

    setNewRecommendation('');
  };

  const handleDeleteItem = e => {
    setItemData(prev => ({
      ...prev,
      conservationRecommendations: [
        ...prev.conservationRecommendations?.filter(el => el !== e),
      ],
    }));
  };

  const mappedBibliography = itemData?.conservationRecommendations?.map(
    field => (
      <Item key={field}>
        <span>{field}</span>
        <RemoveCircleOutline onClick={() => handleDeleteItem(field)} />
      </Item>
    )
  );

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <DoubleCell>
          <span>Dodaj zalecenie</span>
          <CellRow>
            <input
              value={newRecommendation}
              onChange={e => setNewRecommendation(e.target.value)}
            />
            <AddButton type='button' onClick={handleAdd}>
              +
            </AddButton>
          </CellRow>
        </DoubleCell>
        <DoubleCell>
          <span>Zalecenia konserwatorskie</span>
          <ItemsList full>{mappedBibliography}</ItemsList>
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Recommendations;
