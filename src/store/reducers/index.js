import { combineReducers } from 'redux';
import filters from './filters.reducer';
import currentPage from './currentPage.reducer';
import tableResults from './tableResults.reducer';
import pageTitle from './pageTitle.reducer';

const rootReducer = combineReducers({
  filters,
  currentPage,
  tableResults,
  pageTitle,
});

export default rootReducer;
