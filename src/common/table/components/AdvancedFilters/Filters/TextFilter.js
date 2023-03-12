import React from 'react';
import { useDispatch } from 'react-redux';
import allActions from 'store/actions';
import * as S from '../../../Table.css';

const TextFilter = ({
  label,
  nameFilter,
  nameTable,
  placeholder,
  currentValue,
}) => {
  const dispatch = useDispatch();

  const onChange = value => {
    dispatch(
      allActions.filters.setFilterTable({
        nameFilter,
        value,
        nameTable,
      })
    );
  };

  return (
    <S.FilterWrapper>
      <S.LabelFilter style={{ margin: '20px 0 0 0' }}>{label}</S.LabelFilter>
      <S.TextWrapper>
        <input
          value={currentValue || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </S.TextWrapper>
    </S.FilterWrapper>
  );
};

export default TextFilter;
