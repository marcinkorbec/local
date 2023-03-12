import React, { useState } from 'react';

const useFilters = getValues => {
  const [value, setValue] = useState('');

  const defaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    const data = {};
    console.log(filterValue, setFilter);
    return (
      <input
        value={filterValue}
        onChange={e => {
          getValues(e.target.value);
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder='Wyszukaj...'
      />
    );
  };

  return { defaultColumnFilter };
};

export default useFilters;
