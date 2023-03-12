export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

const setFilterTable = item => ({
  type: SET_FILTERS,
  item,
});

const clearFiltersTable = item => ({
  type: CLEAR_FILTERS,
  item,
});

export default {
  setFilterTable,
  clearFiltersTable,
};
