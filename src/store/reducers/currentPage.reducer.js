import { SET_CURRENT_PAGE_TABLES } from '../actions/currentPage.action';

const INITIAL_STATE = {};

const currentPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE_TABLES:
      return { ...state, [action.item.type]: action.item.content };

    default:
      return state;
  }
};

export default currentPageReducer;
