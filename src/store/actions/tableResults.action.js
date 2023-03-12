import { api } from 'API';
import { OPTIONS } from 'utils/toastOptions';
import { toast } from 'react-toastify';

export const SET_SEARCH_PARAMETERS = 'SET_SEARCH_PARAMETERS';

const setTableResultsParameters = item => ({
  type: SET_SEARCH_PARAMETERS,
  item,
});

const fetchTableResults = async params => {
  try {
    const { data } = await api.getTableResults(params);
    return data;
  } catch (e) {
    toast.error(
      'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z dostawcą oprogramowania',
      OPTIONS
    );
    return {};
  }
};

const getTableResultsAction =
  (name, newValue, link) => async (dispatch, getState) => {
    const { tableResults } = getState();
    const { defaultParameters } = tableResults;
    const specificDefaultParameters = tableResults[`${name}ParametersDefault`];

    const prevParams = tableResults[`${name}Parameters`];

    const defaultParams = specificDefaultParameters || defaultParameters;

    const params =
      newValue === 'clear' || newValue === 'clearAll'
        ? {
            reduxName: name,
            page: 1,
            size: 10,
            ...defaultParams,

            link,
          }
        : {
            ...prevParams,
            ...newValue,

            link,
          };

    try {
      const { content, data } = await fetchTableResults(params);
      dispatch(
        setTableResultsParameters({
          ...params,
          reduxName: name,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
        })
      );

      if (newValue === 'clearAll') return;
      // eslint-disable-next-line consistent-return
      return { content };
    } catch (e) {
      toast.error(
        'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z dostawcą oprogramowania',
        OPTIONS
      );
    }
  };

export default { getTableResultsAction };
