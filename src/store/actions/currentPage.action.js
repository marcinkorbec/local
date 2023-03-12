import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import tableResults from './tableResults.action';

export const SET_CURRENT_PAGE_TABLES = 'SET_CURRENT_PAGE_TABLES';

const setCurrentPageTables = item => ({
  type: SET_CURRENT_PAGE_TABLES,
  item,
});

const tableGetAction = (name, newValue, link) => async dispatch => {
  try {
    const data = await dispatch(
      tableResults.getTableResultsAction(name, newValue, link)
    );

    dispatch(
      setCurrentPageTables({
        content: data?.content,
        type: `${name}`,
      })
    );
  } catch (e) {
    toast.error(
      'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z dostawcą oprogramowania',
      OPTIONS
    );
  }
};

export default {
  tableGetAction,
  setCurrentPageTables,
};
