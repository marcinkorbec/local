/* eslint-disable react/no-array-index-key */
import React, { useContext, useRef } from 'react';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DescriptionIcon from '@material-ui/icons/Description';

import * as S from '../../ItemCreator.css';
import {
  Cell,
  DoubleCell,
  Wrapper,
  SelectedFile,
  ItemsList,
  Item,
} from './Bookmarks.css';

const type = 'OTHER';

const Attachments = () => {
  const fileRef = useRef();
  const { itemData, setItemData, setEditingQueue, disableAll } =
    useContext(CreatorContext);

  const handleAddFile = e => {
    const file = e.target.files[0];
    setEditingQueue(prev => [
      ...prev,
      { action: 'ADD', fileType: 'file', type, file },
    ]);

    setItemData(prev => ({
      ...prev,
      newAttachments: [
        ...prev.newAttachments,
        {
          file,
          name: file?.name,
          type,
        },
      ],
    }));
  };

  const getAddedFilesList = itemData?.newAttachments?.filter(
    el => el.type === type
  );

  const handleDeleteAddedFile = el => {
    setEditingQueue(prev => [...prev.filter(e => e.file !== el)]);

    setItemData(prev => {
      const arr = prev.newAttachments.filter(file => file !== el);

      return {
        ...prev,
        newAttachments: [...arr],
      };
    });
  };

  const handleDeleteFile = id => {
    setEditingQueue(prev => [
      ...prev,
      { action: 'DELETE', fileType: 'file', type, id },
    ]);
    setItemData(prev => {
      const arr = prev.attachments.filter(el => el.id !== id);

      return {
        ...prev,
        attachments: [...arr],
      };
    });
  };

  const handleGetFile = async file => {
    let blob;
    if (file.id) {
      try {
        const { data } = await api.getFile(file.id);
        blob = new Blob([data]);
      } catch {
        toast.error('Wystąpił błąd podczas pobierania pliku', OPTIONS);
      }
    } else {
      blob = new Blob([file.file]);
    }

    if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(blob, file.name);
    else {
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  const mappedAttachments = itemData?.attachments?.map((el, idx) => (
    <Item key={idx}>
      <span>
        <DescriptionIcon onClick={() => handleGetFile(el)} />
        {el?.name || `Plik ${idx}`}
      </span>
      <HighlightOffIcon onClick={() => handleDeleteFile(el.id)} />
    </Item>
  ));

  const mappedAddedAttachments = getAddedFilesList?.map((el, idx) => (
    <Item key={idx}>
      <span>
        <DescriptionIcon onClick={() => handleGetFile(el)} />
        {el?.name || `Plik ${idx}`}
      </span>
      <HighlightOffIcon onClick={() => handleDeleteAddedFile(el)} />
    </Item>
  ));

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <Cell>
          <Cell>
            <span>Dodane załączniki</span>
            <SelectedFile>
              <input
                ref={fileRef}
                type='file'
                placeholder='Dołącz'
                onChange={handleAddFile}
              />
              <button type='button' onClick={() => fileRef?.current?.click()}>
                Dodaj nowy
              </button>
            </SelectedFile>
          </Cell>
        </Cell>
        {getAddedFilesList?.length > 0 && (
          <DoubleCell>
            <span>Dodane pliki:</span>
            <ItemsList>{mappedAddedAttachments}</ItemsList>
          </DoubleCell>
        )}
        {itemData?.attachments?.length > 0 && (
          <DoubleCell>
            <span>Pliki w systemie:</span>
            <ItemsList>{mappedAttachments}</ItemsList>
          </DoubleCell>
        )}
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Attachments;
