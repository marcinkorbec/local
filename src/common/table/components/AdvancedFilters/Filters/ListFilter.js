import React from 'react';
import { useDispatch } from 'react-redux';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import allActions from 'store/actions';
import * as S from '../../../Table.css';

const ListFilter = ({
  label,
  prevArray,
  nameFilter,
  nameTable,
  checkboxes,
}) => {
  const dispatch = useDispatch();

  const handleChangeIdsInList = e => {
    let tempArray = prevArray;
    if (e.target.checked) {
      tempArray = [...tempArray, +e.target.value];
    } else {
      tempArray = tempArray.filter(el => el !== +e.target.value);
    }

    dispatch(
      allActions.filters.setFilterTable({
        nameFilter,
        value: tempArray,
        nameTable,
      })
    );
  };

  return (
    <S.FilterWrapper>
      <p style={{ margin: '20px 0 0 0', fontSize: '1.1rem' }}>{label}</p>
      <FormGroup>
        {checkboxes.map(check => (
          <FormControlLabel
            key={check.nameFilter}
            control={
              <Checkbox
                checked={prevArray.includes(check.id)}
                onChange={handleChangeIdsInList}
                name={check.nameFilter}
                value={check.id}
                style={{ color: '#1B69F2', padding: '5px' }}
              />
            }
            label={check.nameFilter}
          />
        ))}
      </FormGroup>
    </S.FilterWrapper>
  );
};

export default ListFilter;
