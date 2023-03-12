import React from 'react';
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';

import { pl } from 'date-fns/locale';
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import styled from 'styled-components';
import { AccessibilityLabel } from '../table/Table.css';

const TextFiledStyled = styled(TextField)`
  input {
    padding: 5px 10px;
    background-color: #fff;
  }

  .MuiOutlinedInput-root {
    border-radius: 2px;
    background-color: #fff;
    height: 40px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
  }
`;

const DatePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  disabled,
}) => (
  <DateRangePicker
    startDate={startDate}
    endDate={endDate}
    onStartDateChange={setStartDate}
    onEndDateChange={setEndDate}
    minimumLength={1}
    format='dd-MM-yyyy'
    locale={pl}
  >
    {({ startDateInputProps, endDateInputProps, focus }) => (
      <div className='date-range' style={{ display: 'flex' }}>
        <AccessibilityLabel>
          <p>Data od:</p>

          <TextFiledStyled
            variant='outlined'
            className={`input${focus === START_DATE ? ' -focused' : ''}`}
            {...startDateInputProps}
            placeholder={format(new Date(), 'dd-MM-yyyy')}
            disabled={disabled}
            id='date_from'
          />
        </AccessibilityLabel>

        <span className='date-range_arrow' />
        <AccessibilityLabel>
          <p>Data do:</p>

          <TextFiledStyled
            variant='outlined'
            className={`input'${focus === END_DATE ? ' -focused' : ''}`}
            {...endDateInputProps}
            placeholder={format(new Date(), 'dd-MM-yyyy')}
            style={{ marginLeft: '20px' }}
            disabled={disabled}
            id='date_to'
          />
        </AccessibilityLabel>
      </div>
    )}
  </DateRangePicker>
);

export default DatePicker;
