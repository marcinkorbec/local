/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useRef, useState } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import { api } from 'API';
import getImage from 'common/helpers/getImage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';

import * as S from '../../ItemCreator.css';
import {
  AddButton,
  SelectedFile,
  DoubleCell,
  Item,
  Wrapper,
  Cell,
  ItemsList,
  ImageWrapper,
} from './Bookmarks.css';

const defaultState = {
  namePL: '',
  nameEN: '',
  descriptionPL: '',
  descriptionEN: '',
  preservationStatePL: '',
  preservationStateEN: '',
  images: [],
};

const ItemElements = () => {
  const { itemData, getItem, disableAll } = useContext(CreatorContext);
  const [elementData, setElementData] = useState(defaultState);
  const [isEdit, setIsEdit] = useState(false);
  const fileRef = useRef();
  const [currentImage, setCurrentImage] = useState();

  const mapElementToState = el => ({
    ...el,
    namePL: el?.name?.pl,
    nameEN: el?.name?.en,
    descriptionPL: el?.description?.pl,
    descriptionEN: el?.description?.en,
    preservationStatePL: el?.preservationState?.pl,
    preservationStateEN: el?.preservationState?.en,
  });

  const handleDelete = async id => {
    try {
      await api.deleteElement(id);
      toast.success('Element został usunięty', OPTIONS);
      getItem();
      setIsEdit(false);
      setElementData(defaultState);
    } catch {
      toast.error('Wystąpił błąd podczas usuwania.', OPTIONS);
    }
  };

  const handleAdd = async () => {
    try {
      await api.addElement(itemData.id, elementData);
      toast.success('Element został dodany', OPTIONS);
      getItem();
      setIsEdit(false);
      setElementData(defaultState);
    } catch {
      toast.error('Wystąpił błąd podczas dodawania.', OPTIONS);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateElement(elementData.id, elementData);
      toast.success('Element został zaktualizowany', OPTIONS);
      getItem();
      setIsEdit(false);
      setElementData(defaultState);
    } catch {
      toast.error('Wystąpił błąd podczas aktualizacji.', OPTIONS);
    }
  };

  const handleDeleteImage = async id => {
    try {
      await api.imagesDELETE(id);
      const { data } = await api.getElement(elementData.id);
      setElementData(mapElementToState(data));
      toast.success('Zdjęcie zostało usunięte', OPTIONS);
    } catch {
      toast.error('Wystąpił błąd podczas usuwania zdjęcia.', OPTIONS);
    }
  };

  const handleAddImage = async () => {
    try {
      // eslint-disable-next-line no-undef
      const fd = new FormData();
      fd.append('image', currentImage.file);
      await api.addElementImage(elementData.id, fd);

      setCurrentImage();
      const { data } = await api.getElement(elementData.id);
      setElementData(mapElementToState(data));
    } catch {
      toast.error('Wystąpił błąd podczas dodawania zdjęcia.', OPTIONS);
    }
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const mappedElements = itemData?.elements?.map(el => (
    <Item key={JSON.stringify(el.name)} smallImg>
      {el.images[0] && <img src={getImage(el.images[0])} alt='Wizerunek' />}
      <span>
        {el.name?.pl || 'Brak nazwy'} - {el.symbol || 'Brak symbolu'}
      </span>
      <DeleteForeverIcon onClick={() => handleDelete(el.id)} />
      <CreateIcon
        style={{ margin: 'auto 10px' }}
        onClick={() => {
          setIsEdit(true);
          setElementData(mapElementToState(el));
        }}
      />
    </Item>
  ));

  const mappedImages = elementData?.images?.map((img, idx) => (
    <ImageWrapper key={JSON.stringify(img)}>
      <img src={img.id ? getImage(img) : img.encoded} alt={`image_${idx}`} />

      <DeleteForeverIcon
        className='delete'
        data-tip
        data-for='delete'
        onClick={() => handleDeleteImage(img.id)}
      />
    </ImageWrapper>
  ));

  return (
    <S.BookmarkWrapper disabled={!itemData.id || disableAll}>
      {!itemData.id && (
        <h1 style={{ color: 'red' }}>
          Aby dodawać elementy przedmiotu należy najpierw zapisać obiekt
        </h1>
      )}
      <Wrapper>
        <Cell>
          <span>Nazwa [pl]</span>
          <input
            value={elementData.namePL}
            onChange={e =>
              setElementData(prev => ({ ...prev, namePL: e.target.value }))
            }
          />
        </Cell>
        <Cell>
          <span>Nazwa [eng]</span>
          <input
            value={elementData.nameEN}
            onChange={e =>
              setElementData(prev => ({ ...prev, nameEN: e.target.value }))
            }
          />
        </Cell>
        <Cell>
          <span>Opis [pl]</span>
          <textarea
            value={elementData.descriptionPL}
            onChange={e =>
              setElementData(prev => ({
                ...prev,
                descriptionPL: e.target.value,
              }))
            }
          />
        </Cell>
        <Cell>
          <span>Opis [eng]</span>
          <textarea
            value={elementData.descriptionEN}
            onChange={e =>
              setElementData(prev => ({
                ...prev,
                descriptionEN: e.target.value,
              }))
            }
          />
        </Cell>
        <Cell>
          <span>Stan Zachowania [pl]</span>
          <textarea
            value={elementData.preservationStatePL}
            onChange={e =>
              setElementData(prev => ({
                ...prev,
                preservationStatePL: e.target.value,
              }))
            }
          />
        </Cell>
        <Cell>
          <span>Stan Zachowania [eng]</span>
          <textarea
            value={elementData.preservationStateEN}
            onChange={e =>
              setElementData(prev => ({
                ...prev,
                preservationStateEN: e.target.value,
              }))
            }
          />
        </Cell>
        {elementData.id && (
          <>
            <Cell>
              <AddButton
                type='button'
                style={{ marginBottom: '25px' }}
                onClick={() => fileRef?.current?.click()}
              >
                Wybierz zdjęcie
              </AddButton>
              <SelectedFile>
                <input
                  ref={fileRef}
                  type='file'
                  placeholder='Dołącz'
                  accept='image/*'
                  onChange={async e =>
                    setCurrentImage({
                      file: e.target.files[0],
                      encoded: await getBase64(e.target.files[0]),
                    })
                  }
                />
              </SelectedFile>
            </Cell>
            <Cell />
            <Cell>
              <AddButton onClick={handleAddImage} type='button'>
                Dodaj zdjęcie
              </AddButton>
            </Cell>
            <Cell>
              <span>Wybrane zdjęcie</span>
              {currentImage && (
                <img src={currentImage?.encoded} alt='Wybrane zdjęcie' />
              )}
            </Cell>
            <DoubleCell>{mappedImages}</DoubleCell>
          </>
        )}
        <Cell>
          {!elementData.id && (
            <span style={{ color: 'red' }}>
              Zdjęcia można dodawać do zapisanego elementu
            </span>
          )}
          <AddButton onClick={isEdit ? handleUpdate : handleAdd}>
            {isEdit ? 'Zapisz przedmiot' : 'Dodaj element'}
          </AddButton>
        </Cell>
        <Cell>
          {isEdit && (
            <AddButton
              onClick={() => {
                setElementData(defaultState);
                setIsEdit(false);
              }}
            >
              Anuluj
            </AddButton>
          )}
        </Cell>
        <DoubleCell>
          <span>Elementy przedmiotu</span>
          <ItemsList>{mappedElements}</ItemsList>
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default ItemElements;
