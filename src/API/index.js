import axios from 'axios';
import qs from 'qs';
import { ACCESS_TOKEN, API_BASE_URL } from 'utils/constants';

export const sendRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-cache, no-store',
    Pragma: 'no-cache',
    Expires: 0,
    'X-XSS-Protection': '1;mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Expect-CT': 'enforce, max-age=86400',
  },
});

export const sendRequestBlob = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-cache, no-store',
    Pragma: 'no-cache',
    Expires: 0,
    'X-XSS-Protection': '1;mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Expect-CT': 'enforce, max-age=86400',
  },
});

sendRequest.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  error => {
    if (
      window.location.pathname.includes('login') &&
      error?.response?.status === 401
    ) {
      return;
    }
    if (error?.response?.status === 401) {
      window.location.href = '/login';
      return;
    }

    console.error(error?.response?.data?.status);
  }
);

sendRequest.interceptors.response.use(
  success => success,
  error => {
    if (error?.response?.status === 403) {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

sendRequestBlob.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // eslint-disable-next-line no-param-reassign
    config.responseType = 'blob';
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  error => {
    if (
      window.location.pathname.includes('login') &&
      error?.response?.status === 401
    ) {
      return;
    }
    if (error?.response?.status === 401) {
      window.location.href = '/login';
      return;
    }

    console.error(error?.response.data);
  }
);

export const api = {
  login: body => sendRequest.post('/global/login', body),

  deleteUser: id => sendRequest.delete(`/local/admin/${id}/user`),
  putActivate: id => sendRequest.put(`/local/admin/${id}/user/activate`),
  putChangeEmail: (id, body) =>
    sendRequest.put(`/local/admin/${id}/user/change/email`, body),
  putChangePassword: (id, body) =>
    sendRequest.put(`/local/admin/${id}/user/change/password`, body),
  putResetPassword: id =>
    sendRequest.put(`/local/admin/${id}/user/reset/password`),

  getTableResults: ({ link, ...paramsObj }) => {
    const params = qs.stringify(paramsObj, { arrayFormat: 'repeat' });
    return sendRequest.get(`/${link}?${params}`);
  },

  getBackup: () => sendRequest.get('local/admin/backup'),
  postBackup: body => sendRequest.post('local/admin/backup', body),

  postNewInspection: () => sendRequest.post('/local/inspection/management/new'),
  putStartInspection: inspectionId =>
    sendRequest.put(`/local/inspection/management/${inspectionId}/start`),
  putEndInspection: inspectionId =>
    sendRequest.put(`/local/inspection/management/${inspectionId}/end`),
  putCloseInspection: inspectionId =>
    sendRequest.put(`/local/inspection/management/${inspectionId}/close`),
  putEditInspection: (inspectionId, body) =>
    sendRequest.put(
      `/local/inspection/management/${inspectionId}/edit/details`,
      body
    ),
  putAddWorker: (inspectionId, body) =>
    sendRequest.put(
      `/local/inspection/management/${inspectionId}/add/person`,
      body
    ),
  putAddOrdinance: (inspectionId, body) =>
    sendRequest.put(
      `/local/inspection/management/${inspectionId}/add/ordinance`,
      body
    ),
  getOrdinance: inspectionId =>
    sendRequestBlob.get(
      `/local/inspection/management/${inspectionId}/download/ordinance`
    ),

  getInspectionWorkers: () =>
    sendRequest.get('/local/inspection/management/workers'),
  getInspectionTeams: () =>
    sendRequest.get('/local/inspection/management/teams'),
  getInspectionDetails: (inspectionId, day) =>
    sendRequest.get(
      `/local/inspection/management/${inspectionId}/details?${day}`
    ),
  getParticipationTypes: () =>
    sendRequest.get('/local/inspection/management/participation/types'),
  getInspectionProcess: () =>
    sendRequest.get('/local​/inspection​/process​/table'),
  getActiveInspectionDetails: () =>
    sendRequest.get('/local/inspection/management/active'),

  deleteWorker: (inspectionId, workerId) =>
    sendRequest.delete(
      `/local/inspection/management/${inspectionId}/delete/${workerId}/worker`
    ),
  deleteInspectionItem: (inspectionId, itemId) =>
    sendRequest.delete(
      `/local/inspection/management/${inspectionId}/delete/${itemId}/item`
    ),

  putInspectionProcessComment: (itemId, body) =>
    sendRequest.put(
      `/local/inspection/process/${itemId}/item/change/comment`,
      body
    ),
  putInspectionProcessStatus: (itemId, status) =>
    sendRequest.put(
      `/local/inspection/process/${itemId}/item/${status}/status`
    ),

  putFixInspectionProcessComment: (inspectionId, itemId, body) =>
    sendRequest.put(
      `/local/inspection/process/${inspectionId}/fix/${itemId}/item/comment`,
      body
    ),
  putFixInspectionProcessStatus: (inspectionId, itemId, status) =>
    sendRequest.put(
      `/local/inspection/process/${inspectionId}/fix/${itemId}/item/${status}/status`
    ),

  getReports: () => sendRequest.get('/local/reports/'),
  postReport: body => sendRequest.post('/local/reports/add', body),
  putReport: (id, body) => sendRequest.put(`/local/reports/${id}`, body),
  deleteReport: id => sendRequest.delete(`/local/reports/${id}`),

  getItem: id => sendRequest.get(`/local/items/${id}`),
  deleteItem: id => sendRequest.delete(`/local/items/${id}`),
  putUpdateItem: (id, body) => sendRequest.put(`/local/items/${id}`, body),
  postAddItem: body => sendRequest.post('/local/items/add', body),

  imagesADD: (id, type = '', body, params) =>
    sendRequest.post(`/local/items/${id}${type}/image/add${params}`, body),
  imagesDELETE: id => sendRequest.delete(`/local/items/image/${id}`),

  fileADD: (id, type, body) =>
    sendRequest.post(`/local/items/${id}/file/${type}/add`, body),
  fileDELETE: id => sendRequest.delete(`/local/items/file/${id}`),
  getFile: id => sendRequestBlob.get(`/local/items/file/${id}`),

  authorsDELETE: id => sendRequest.delete(`/local/items/author/${id}`),
  techniqueDELETE: id => sendRequest.delete(`/local/items/technique/${id}`),
  materialDELETE: id => sendRequest.delete(`/local/items/material/${id}`),
  historyDELETE: id => sendRequest.delete(`/local/items/history/${id}`),
  conservationDELETE: id =>
    sendRequest.delete(`/local/items/conservation/${id}`),

  getClassifications: () => sendRequest.get('/local/classification/system/'),
  getWorkers: () => sendRequest.get('/local/inspection/management/workers'),
  getBooks: (param = '') => sendRequest.get(`/local/books/${param}`),
  getBook: id => sendRequest.get(`/local/books/${id}`),
  updateBook: (id, body) => sendRequest.put(`/local/books/${id}`, body),
  addBook: body => sendRequest.post('/local/books/add', body),
  copyBook: id => sendRequest.post(`/local/books/${id}/copy`),
  deleteBook: id => sendRequest.delete(`/local/books/${id}`),
  getItemsAssign: id => sendRequest.get(`/local/items/${id}/assign`),
  getItemsAssigned: id => sendRequest.get(`/local/items/${id}/assigned`),

  putRemoveAssign: id => sendRequest.put(`/local/items/${id}/unAssign`),
  putAssignItems: (id1, id2, isMain = true) =>
    sendRequest.put(`/local/items/${id1}/assign/${id2}?isMain=${isMain}`),
  putRevaluate: (id, body) =>
    sendRequest.put(`/local/items/${id}/revaluate`, body),

  // putAssignItem: (itemId, bookId) => sendRequest.put(`/local/items/${itemId}/move/${bookId}`),
  putMoveItem: (itemId, bookId, param, body) =>
    sendRequest.put(`/local/items/${itemId}/move/${bookId}${param}`, body),
  putRemoveItem: (itemId, bookId) =>
    sendRequest.put(`/local/items/${itemId}/remove/${bookId}`),
  putReturnItem: (itemId, body) =>
    sendRequest.put(`/local/items/${itemId}/deposit/return`, body),

  getExportFile: (bookType, exportType) =>
    sendRequestBlob.get(`/local/books/${bookType}/export/${exportType}`),
  getStatistics: () => sendRequest.get('/local/books/statistics'),

  getLocation: id => sendRequest.get(`/local/location/${id}`),
  getLocations: () => sendRequest.get('/local/location/list'),
  getEvacuations: () => sendRequest.get('/local/location/evacuation'),
  addLocation: body => sendRequest.post('/local/location/new', body),
  updateLocation: body => sendRequest.put('/local/location/update', body),
  assignItemToLocation: (locId, itemId) =>
    sendRequest.put(`/local/location/${locId}/add/${itemId}/item`),
  deleteLocation: locId => sendRequest.delete(`/local/location/${locId}`),

  getContacts: () => sendRequest.get('/local/items/contacts/'),
  updateContact: (id, body) =>
    sendRequest.put(`/local/items/contacts/${id}`, body),
  deleteContact: id => sendRequest.delete(`/local/items/contacts/${id}`),
  addContact: body => sendRequest.post('/local/items/contacts/add', body),

  getAllWorkers: () => sendRequest.get('/local/workers/'),
  updateWorker: (id, body) => sendRequest.put(`/local/workers/${id}`, body),
  deleteAdminWorker: id => sendRequest.delete(`/local/workers/${id}`),
  addWorker: body => sendRequest.post('/local/workers/add', body),

  postCorrection: (imageId, body) =>
    sendRequest.post(`/local/items/image/${imageId}/correction/add`, body),
  putCorrection: (correctionId, body) =>
    sendRequest.put(`/local/items/image/correction/${correctionId}`, body),
  deleteCorrection: correctionId =>
    sendRequest.delete(`/local/items/image/correction/${correctionId}`),

  getNotifications: () => sendRequest.get('/local/deposit/'),
  putNotificationTurnOff: id => sendRequest.put(`/local/deposit/${id}/turnOff`),

  getContracts: () => sendRequest.get('/local/contracts/'),
  deleteContract: id => sendRequest.delete(`/local/contracts/${id}`),
  getSingleContract: id => sendRequestBlob.get(`/local/contracts/${id}`),
  postContract: body => sendRequestBlob.post('/local/contracts/add', body),

  getClassificationSystem: () =>
    sendRequest.get('/local/classification/system/'),
  postClassificationSystem: body =>
    sendRequest.post('/local/classification/system/add', body),
  putClassificationSystem: (id, body) =>
    sendRequest.put(`/local/classification/system/${id}`, body),
  deleteClassificationSystem: id =>
    sendRequest.delete(`/local/classification/system/${id}`),

  getClassificationSystemNumber: id =>
    sendRequest.get(`/local/items/symbol/potential/${id}`),

  getElement: id => sendRequest.get(`/local/items/element/${id}`),
  deleteElement: id => sendRequest.delete(`/local/items/element/${id}/`),
  addElement: (itemId, body) =>
    sendRequest.post(`/local/items/${itemId}/element/add`, body),
  updateElement: (id, body) =>
    sendRequest.put(`/local/items/element/${id}/`, body),
  addElementImage: (elId, body) =>
    sendRequest.post(`/local/items/element/${elId}/image/add`, body),
};
