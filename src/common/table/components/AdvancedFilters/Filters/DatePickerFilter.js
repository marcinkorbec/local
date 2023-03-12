import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import allActions from 'store/actions';

import DataPicker from '../../../../Inputs/DatePicker';
import * as S from '../../../Table.css';

const formatDate = date => format(new Date(date), 'yyyy-MM-dd');

const DataPickerFilter = ({
  label,
  prevStartDate,
  prevEndDate,
  nameFilter,
  nameTable,
}) => {
  const dispatch = useDispatch();

  const setDate = (name, value) => {
    dispatch(
      allActions.filters.setFilterTable({
        nameFilter: name,
        value: value ? formatDate(value) : null,
        nameTable,
      })
    );
  };

  return (
    <S.DatePickerWrapper>
      <S.LabelFilter style={{ margin: '20px 0 0 0' }}>{label}</S.LabelFilter>
      <DataPicker
        startDate={prevStartDate ? new Date(prevStartDate) : null}
        endDate={prevEndDate ? new Date(prevEndDate) : null}
        setStartDate={value => setDate(`${nameFilter}From`, value)}
        setEndDate={value => setDate(`${nameFilter}To`, value)}
      />
    </S.DatePickerWrapper>
  );
};

export default DataPickerFilter;
