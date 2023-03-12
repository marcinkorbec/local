import { SET_FILTERS, CLEAR_FILTERS } from '../actions/filters.action';

const INITIAL_STATE = {
  default: {
    chIn: '',
    createFrom: null,
    createTo: null,
  },
  users: {
    chIn: '',
    createFrom: null,
    createTo: null,
  },
  accession: {
    chIn: '',
    createFrom: null,
    createTo: null,
  },
  inventory: {
    chIn: '',
  },
  depository: {
    chIn: '',
  },
  inspection: {
    year: '',
    month: null,
    status: null,
  },
  inspectionItems: {
    inspectionId: null,
  },
  shortages: {
    chIn: '',
  },
  evidence: {
    chIn: '',
    isActive: '',
  },
  supportingEvidenceItem: {
    chIn: '',
  },
  evidenceItem: {
    chIn: '',
  },
  committee: {
    chIn: '',
  },
};

const filtersTableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        [action.item.nameTable]: {
          ...state[action.item.nameTable],
          [action.item.nameFilter]: action.item.value,
        },
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        [action.item]: INITIAL_STATE[action.item],
      };

    default:
      return state;
  }
};

export default filtersTableReducer;
