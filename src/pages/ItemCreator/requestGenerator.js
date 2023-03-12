import { api } from 'API';
import {
  typeConservation,
  typePreservation,
} from './components/Bookmarks/PreservationState';

// example images
// { action: 'ADD', fileType: 'image', file }
// { action: 'DELETE', fileType: 'image', id }

// example files
// { action: 'ADD', fileType: 'file', type, file },
// { action: 'DELETE', fileType: 'file', type, id },

export const requestGenerator = ({ queue, itemId, presId, mainCount }) =>
  queue.map(el => {
    const requestName = `${el.fileType}${el.action}`;
    const id = el.type === typePreservation ? presId : itemId;
    const params = `?description=${el.description || ''}&from=${
      el.from || ''
    }&to=${el.to || ''}&mainImage=${el.count === mainCount ? 0 : ''}`;

    // eslint-disable-next-line no-undef
    const f = new FormData();
    if (el.type === typePreservation || el.type === typeConservation) {
      f.append('image', el.file);
    } else {
      f.append(`${el.fileType}`, el.file);
    }

    if (el.action === 'ADD') return api[requestName](id, el.type, f, params);
    if (el.action === 'DELETE') return api[requestName](el.id);

    return 'Action not found';
  });
