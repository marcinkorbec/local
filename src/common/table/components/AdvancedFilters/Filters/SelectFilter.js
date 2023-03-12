import React from 'react';
import { useDispatch } from 'react-redux';

import allActions from 'store/actions';
import StyledSelect from 'common/Inputs/StyledSelect';

import * as S from '../../../Table.css';

const SelectFilter = ({
  label,
  options = [],
  nameFilter,
  nameTable,
  placeholder,
  currentValue,
}) => {
  const dispatch = useDispatch();

  const handleChangeIdsInList = values => {
    dispatch(
      allActions.filters.setFilterTable({
        nameFilter,
        value: values.value,
        nameTable,
      })
    );
  };

  return (
    <S.FilterWrapper style={{ minWidth: '200px' }}>
      <S.LabelFilter style={{ margin: '20px 0 0 0' }}>{label}</S.LabelFilter>
      <StyledSelect
        value={options.filter(el => el.value === currentValue)[0] || null}
        onChange={handleChangeIdsInList}
        placeholder={placeholder}
        options={[{ value: '', label: 'Wszystkie' }, ...options]}
        styles={{
          container: provided => ({
            ...provided,
            width: '100%',
            minWidth: '150px',
          }),
          option: provided => ({
            ...provided,
          }),
        }}
      />
    </S.FilterWrapper>
  );
};

export default SelectFilter;
