import { SET_SEARCH_PARAMETERS } from '../actions/tableResults.action';

const INITIAL_STATE = {
  defaultParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  accessionParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  inventoryParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  depositoryParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  inspectionParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  inspectionItemsParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  shortagesParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  evidenceParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
  committeeParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
};

const paginationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMETERS: {
      const parametersName = `${action.item?.reduxName}Parameters`;
      return { ...state, [parametersName]: action.item };
    }

    default:
      return state;
  }
};

export default paginationReducer;
