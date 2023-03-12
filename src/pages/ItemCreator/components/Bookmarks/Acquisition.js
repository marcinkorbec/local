import React, { useContext, useEffect, useRef, useState } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StyledSelect from 'common/Inputs/StyledSelect';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';

import * as S from '../../ItemCreator.css';
import { Cell, Wrapper, SelectedFile } from './Bookmarks.css';

const fileType = 'ACQUISITION';

const Acquisition = () => {
  const fileRef = useRef();
  const [contacts, setContacts] = useState([]);
  const { itemData, setItemData, setEditingQueue, disableAll } =
    useContext(CreatorContext);

  const updateState = (name, e, lang) => {
    setItemData(prev => ({
      ...prev,
      acquisitionMethod: {
        ...prev.acquisitionMethod,
        [name]: lang
          ? { ...prev.acquisitionMethod?.[name], [lang]: e.target.value }
          : e.target.value,
      },
    }));
  };

  const handleAddFile = e => {
    const file = e.target.files[0];
    const idx = itemData?.newAttachments?.findIndex(el => el.type === fileType);

    setEditingQueue(prev => [
      ...prev.filter(el => el.type !== fileType),
      { action: 'ADD', fileType: 'file', type: fileType, file },
    ]);

    if (itemData?.acquisitionMethod?.document?.id)
      setEditingQueue(prev => [
        ...prev,
        {
          action: 'DELETE',
          fileType: 'file',
          type: fileType,
          id: itemData?.acquisitionMethod?.document?.id,
        },
      ]);

    setItemData(prev => {
      const arr = [...prev.newAttachments];
      const newItem = {
        file,
        name: file?.name,
        type: fileType,
        fileType: 'file',
      };

      if (idx !== -1) {
        arr[idx] = newItem;
      } else {
        arr.push(newItem);
      }

      return {
        ...prev,
        acquisitionMethod: {
          ...prev.acquisitionMethod,
          document: {},
        },
        newAttachments: [...arr],
      };
    });
  };

  const getFile = () =>
    itemData?.newAttachments?.filter(e => e.type === fileType)[0]?.name ||
    itemData?.acquisitionMethod?.document?.name;

  const handleDeleteFile = () => {
    const idx = itemData?.newAttachments?.findIndex(el => el.type === fileType);

    setEditingQueue(prev => [...prev.filter(el => el.type !== fileType)]);

    if (itemData?.acquisitionMethod?.document?.id) {
      setEditingQueue(prev => [
        ...prev,
        {
          action: 'DELETE',
          fileType: 'file',
          type: fileType,
          id: itemData?.acquisitionMethod?.document?.id,
        },
      ]);
      setItemData(prev => ({
        ...prev,
        acquisitionMethod: { ...prev.acquisitionMethod, document: {} },
      }));
    }

    setItemData(prev => {
      const arr = prev.newAttachments.splice(idx, 1);

      return {
        ...prev,
        newAttachments: [...arr],
      };
    });
  };

  const mappedContacts = contacts.map(el => ({
    label: el.name,
    value: el.id,
  }));

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await api.getContacts();
        setContacts(data);
      } catch (e) {
        toast.error(
          'Wystąpił błąd podczas ładowania listy lokalizacji',
          OPTIONS
        );
      }
    };
    getContacts();
  }, []);

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <Cell>
          <span>Źródło nabycia [pl]</span>
          <input
            value={itemData?.acquisitionMethod?.source?.pl}
            onChange={e => updateState('source', e, 'pl')}
          />
        </Cell>
        <Cell>
          <span>Dokument</span>
          <SelectedFile>
            <input
              ref={fileRef}
              type='file'
              placeholder='Dołącz'
              onChange={handleAddFile}
            />
            <button type='button' onClick={() => fileRef?.current?.click()}>
              Dołącz
            </button>
            <span>{getFile()} </span>
            {getFile() && <HighlightOffIcon onClick={handleDeleteFile} />}
          </SelectedFile>
        </Cell>
        <Cell>
          <span>Źródło nabycia [eng]</span>
          <input
            value={itemData?.acquisitionMethod?.source?.en}
            onChange={e => updateState('source', e, 'en')}
          />
        </Cell>
        <Cell />
        <Cell>
          <span>Data nabycia</span>
          <input
            type='date'
            value={itemData?.acquisitionMethod?.acquisitionDate}
            onChange={e => updateState('acquisitionDate', e)}
          />
        </Cell>
        <Cell>
          <span>Obecna wartość (zł)</span>
          <input
            type='number'
            value={itemData?.value}
            onChange={e =>
              setItemData(prev => ({ ...prev, value: e.target.value }))
            }
          />
        </Cell>
        <Cell>
          <span>Kontakt</span>
          <StyledSelect
            options={mappedContacts}
            value={
              mappedContacts.filter(e => e.value === itemData?.contact?.id)[0]
            }
            onChange={e =>
              setItemData(prev => ({ ...prev, contact: { id: e.value } }))
            }
          />
        </Cell>
        <Cell>
          <span>Wartość w dniu nabycia (zł)</span>
          <input
            type='number'
            value={itemData?.acquisitionMethod?.valueOnAcquisition}
            onChange={e => updateState('valueOnAcquisition', e)}
          />
        </Cell>
        {/* <Cell>
          <span>Inny kontakt</span>
          <input
            value={itemData?.acquisitionMethod?.contact}
            onChange={e => updateState('contact', e)}
          />
        </Cell>
        <Cell>
          <span>Wartość przyjęta do ubezpieczeń (zł)</span>
          <input
            type='number'
            value={itemData?.acquisitionMethod?.valueOnAcquisition}
            onChange={e => updateState('valueOnAcquisition', e)}
          />
        </Cell> */}
        <Cell>
          <span>Stan zachowania w dniu nabycia [pl]</span>
          <textarea
            value={itemData?.acquisitionMethod?.conditionOnPurchaseDate?.pl}
            onChange={e => updateState('conditionOnPurchaseDate', e, 'pl')}
          />
        </Cell>
        <Cell>
          <span>Stan zachowania w dniu nabycia [eng]</span>
          <textarea
            value={itemData?.acquisitionMethod?.conditionOnPurchaseDate?.en}
            onChange={e => updateState('conditionOnPurchaseDate', e, 'en')}
          />
        </Cell>
        {/* <DoubleCell>
          <span>Uwagi (z księgi wpływu)</span>
          <textarea
            disabled
            value={itemData?.acquisitionMethod?.conditionOnPurchaseDate}
            onChange={e => updateState('conditionOnPurchaseDate', e)}
          />
        </DoubleCell> */}
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Acquisition;
