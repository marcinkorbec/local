import React from 'react';
import { useDispatch } from 'react-redux';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import allActions from 'store/actions';
import * as S from '../../../Table.css';

const RadioFilter = ({
  label,
  radios,
  currentValue,
  nameFilter,
  nameTable,
}) => {
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(
      allActions.filterss.setFilterTable({
        nameFilter,
        value: e.target.value,
        nameTable,
      })
    );
  };

  return (
    <S.FilterWrapper>
      <p style={{ margin: '20px 0 0 0', fontSize: '1.1rem' }}>{label}</p>
      <RadioGroup
        aria-label='gender'
        name='userStatus'
        value={currentValue}
        onChange={handleChange}
      >
        {radios.map(radio => (
          <FormControlLabel
            key={radio.id}
            value={radio.nameFilter}
            control={<Radio style={{ color: '#1B69F2' }} />}
            label={radio.label}
          />
        ))}
      </RadioGroup>
    </S.FilterWrapper>
  );
};

export default RadioFilter;
