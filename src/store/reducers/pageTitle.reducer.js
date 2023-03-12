import { SET_TITLE } from 'store/actions/pageTitle.action';

const INITIAL_STATE = 'Ekran startowy';

const pageTitleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TITLE: {
      return action.title;
    }

    default:
      return state;
  }
};

export default pageTitleReducer;
