import { useState } from 'react';

const useSortResults = getValues => {
  const [lastSortBy, setLastSortBy] = useState('');
  const [lastSortType, setLastSortType] = useState(false);

  const changeSort = value => {
    const newSortType = lastSortBy === value ? !lastSortType : false;

    const data = {
      sortBy: value,
      sortDirection: newSortType ? 'DESC' : 'ASC',
    };

    setLastSortType(newSortType);
    setLastSortBy(value);
    getValues(data);
  };

  return { changeSort };
};

export default useSortResults;
