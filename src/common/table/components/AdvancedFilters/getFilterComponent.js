import React from 'react';
import { useSelector } from 'react-redux';

import RadioFilter from './Filters/RadioFilter';
import ListFilter from './Filters/ListFilter';
import DataPickerFilter from './Filters/DatePickerFilter';
import SelectFilter from './Filters/SelectFilter';
import SelectMultiFilter from './Filters/SelectMultiFilter';
import TextFilter from './Filters/TextFilter';

const GetFilterComponent = ({
  type,
  name: nameFilter,
  nameTable,
  label,
  placeholder,
  options = [],
}) => {
  const filters = useSelector(state => state.filters[nameTable]);

  switch (type) {
    case 'text': {
      return (
        <TextFilter
          currentValue={filters[nameFilter]}
          label={label}
          placeholder={placeholder}
          nameFilter={nameFilter}
          nameTable={nameTable}
        />
      );
    }
    case 'date': {
      return (
        <DataPickerFilter
          prevStartDate={filters[`${nameFilter}From`]}
          prevEndDate={filters[`${nameFilter}To`]}
          label={label}
          nameFilter={nameFilter}
          nameTable={nameTable}
        />
      );
    }

    case 'list':
      return (
        <ListFilter
          prevArray={filters[nameFilter]}
          checkboxes={options}
          label={label}
          nameFilter={nameFilter}
          nameTable={nameTable}
        />
      );

    case 'radio':
      return (
        <RadioFilter
          radios={options}
          label={label}
          currentValue={filters[nameFilter]}
          nameFilter={nameFilter}
          nameTable={nameTable}
        />
      );

    case 'select':
      return (
        <SelectFilter
          options={options}
          label={label}
          currentValue={filters[nameFilter]}
          nameFilter={nameFilter}
          nameTable={nameTable}
          placeholder={placeholder}
        />
      );

    case 'selectMulti':
      return (
        <SelectMultiFilter
          options={options}
          label={label}
          currentValue={filters[nameFilter]}
          nameFilter={nameFilter}
          nameTable={nameTable}
          placeholder={placeholder}
        />
      );

    default:
      return <> </>;
  }
};

export default GetFilterComponent;
