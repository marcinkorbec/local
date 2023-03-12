import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import * as S from './Constructor.css';

const EmptyCell = ({ handleDelete }) => (
  <S.Cell>
    <S.CellHeader>
      <input />
    </S.CellHeader>
    <S.CellContent>
      <textarea />
    </S.CellContent>
    <S.RemoveIcon onClick={handleDelete}>
      <DeleteIcon />
    </S.RemoveIcon>
  </S.Cell>
);

export default EmptyCell;
