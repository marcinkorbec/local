import React from 'react';
import * as S from '../../Inspection.css';

const EditCommentModal = ({ rowData, formFields, handleInput }) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <S.Label htmlFor='comment'>
      {`Dodaj komentarz dla przedmiotu o nazwie 
           ${rowData.name} oraz id ${rowData.itemId}:`}
    </S.Label>
    <S.Input
      style={{ width: '100%' }}
      id='comment'
      name='comment'
      value={formFields?.comment}
      onChange={handleInput}
      maxLength={100}
    />
  </div>
);

export default EditCommentModal;
