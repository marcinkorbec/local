import React from 'react';
import { useDispatch } from 'react-redux';

import allActions from 'store/actions';
import { Select } from 'm-web-components';

import * as S from '../../../Table.css';

const SelectMultiFilter = ({
  label,
  options = [],
  nameFilter,
  nameTable,
  placeholder,
  currentValue,
}) => {
  const dispatch = useDispatch();

  const handleChangeIdsInList = values => {
    const newValues = values?.map(el => el.value) || [];
    dispatch(
      allActions.filters.setFilterTable({
        nameFilter,
        value: newValues,
        nameTable,
      })
    );
  };

  return (
    <S.FilterWrapper>
      <S.LabelFilter style={{ margin: '20px 0 0 0' }}>{label}</S.LabelFilter>
      <Select
        value={options.filter(el => currentValue.includes(el.value)) || null}
        onChange={handleChangeIdsInList}
        placeholder={placeholder}
        options={options}
        isMulti
        styles={{
          ...S.customSelectStyles,
          container: provided => ({
            ...provided,
            maxWidth: '100%',
          }),
          option: provided => ({
            ...provided,
          }),
        }}
      />
    </S.FilterWrapper>
  );
};

export default SelectMultiFilter;
