import React, { useContext, useEffect, useRef, useState } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import StyledSelect from 'common/Inputs/StyledSelect';
import ModalComponent from 'common/Modal/Modal';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import ReactTooltip from 'react-tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import * as S from '../../ItemCreator.css';
import {
  AddButton,
  Cell,
  ConserwationWrapper,
  DimensionsPopupWrapper,
  DoubleCell,
  ImageWrapper,
  SelectedFile,
  Wrapper,
} from './Bookmarks.css';
import PreservationStateMarkers from './PreservationStateMarkers';

export const typePreservation = '/preservation';
export const typeConservation = '/conservation';

const PreservationState = () => {
  const { itemData, setItemData, setEditingQueue, disableAll, getItem } =
    useContext(CreatorContext);
  const fileRef = useRef();
  const fileRefMain = useRef();
  const [popup, setPopup] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [newData, setNewData] = useState({
    description: {
      pl: '',
      en: '',
    },
    from: '',
    to: '',
    file: null,
    encoded: null,
  });

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [itemData]);

  useEffect(() => {
    if (!itemData.preservationState?.conservations) {
      setItemData(prev => ({
        ...prev,
        preservationState: {
          conservations: [],
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImage = obj => {
    const extImage = /[.]/.exec(obj?.path)
      ? /[^.]+$/.exec(obj?.path)
      : undefined;
    const encoded = obj?.encodedImage;
    const base64String = `data:image/${extImage};base64,${encoded}`;

    return base64String;
  };

  /*
  const getMainImage = enc => {
    if (enc.includes('data:image')) return enc;
    return `data:image/png;base64,${enc}`;
  }; */

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleAddImage = async file => {
    if (file) {
      const base64 = await getBase64(file);
      setNewData(prev => ({ ...prev, file, encoded: base64 }));
    }
  };

  const handleAddMainImage = async file => {
    if (file) {
      try {
        // eslint-disable-next-line no-undef
        const f = new FormData();
        f.append('image', file);
        await api.imagesADD(itemData.id, typePreservation, f, '?isMain=true');
        getItem();
      } catch {
        toast.error('Wystąpił błąd podczas dodawania zdjęcia');
      }
    }
  };

  const handleAddItem = async () => {
    if (newData.file === null || newData.encoded === null) {
      toast.error('Do wpisu należy dodać zdjęcie.', OPTIONS);
      return;
    }

    const itemToAdd = { ...newData };

    setEditingQueue(prev => [
      ...prev,
      { action: 'ADD', type: typeConservation, fileType: 'images', ...newData },
    ]);

    setItemData(prev => ({
      ...prev,
      preservationState: {
        ...prev.preservationState,
        conservations: [...prev.preservationState.conservations, itemToAdd],
      },
    }));

    setPopup(false);
    setNewData({
      description: {
        pl: '',
        en: '',
      },
      from: '',
      to: '',
      file: null,
      encoded: null,
    });
  };

  const handleCancelAdding = () => {
    setPopup(false);
    setNewData({
      description: {
        pl: '',
        en: '',
      },
      from: '',
      to: '',
      file: null,
      encoded: null,
    });
  };

  const handleDeleteImage = img => {
    if (img.id === null || img.id === undefined) {
      setEditingQueue(prev => [
        ...prev.filter(el => el.encoded !== img.encoded),
      ]);

      setItemData(prev => ({
        ...prev,
        preservationState: {
          ...prev.preservationState,
          conservations: [
            ...prev.preservationState.conservations.filter(
              el => el.encoded !== img.encoded
            ),
          ],
        },
      }));
    } else {
      setEditingQueue(prev => [
        ...prev,
        {
          action: 'DELETE',
          fileType: 'conservation',
          id: img.id,
        },
      ]);
      setItemData(prev => ({
        ...prev,
        preservationState: {
          ...prev.preservationState,
          conservations: [
            ...prev.preservationState.conservations.filter(
              el => el.id !== img.id
            ),
          ],
        },
      }));
    }
  };

  const mappedImages = itemData.preservationState?.conservations?.map(
    (img, idx) => (
      <DoubleCell
        style={{ borderRight: '1px solid lightgray' }}
        key={JSON.stringify(img)}
      >
        <ConserwationWrapper>
          <span>{`${img.from} - ${img.to}`}</span>
          <ImageWrapper>
            <img
              src={img.id ? getImage(img) : img.encoded}
              alt={`image_${idx}`}
            />
            <textarea value={img.description?.pl} disabled />
            <textarea value={img.description?.en} disabled />

            <DeleteForeverIcon
              className='delete'
              data-tip
              data-for='delete'
              onClick={() => handleDeleteImage(img)}
            />
          </ImageWrapper>
        </ConserwationWrapper>
      </DoubleCell>
    )
  );

  const mappedWorkers = workers.map(el => ({
    label: `${el.name} ${el.surname}`,
    value: el.id,
  }));

  useEffect(() => {
    const getWorkers = async () => {
      try {
        const { data } = await api.getWorkers();
        setWorkers(data);
      } catch (e) {
        toast.error(
          'Wystąpił błąd podczas ładowania listy pracowników',
          OPTIONS
        );
      }
    };
    getWorkers();
  }, []);

  return (
    <>
      <S.BookmarkWrapper disabled={disableAll}>
        <Wrapper>
          <Cell>
            <span>Osoba przeprowadzająca konserwacje</span>
            <StyledSelect
              options={mappedWorkers}
              value={mappedWorkers.filter(e => e.value === itemData.worker?.id)}
              onChange={e =>
                setItemData(prev => ({
                  ...prev,
                  worker: { id: e.value },
                }))
              }
            />
          </Cell>
          <Cell />
          <Cell>
            <span>Opis [pl]</span>
            <textarea
              value={itemData?.preservationState?.description?.pl}
              onChange={e =>
                setItemData(prev => ({
                  ...prev,
                  preservationState: {
                    ...prev.preservationState,
                    description: {
                      ...prev.preservationState?.description,
                      pl: e.target.value,
                    },
                  },
                }))
              }
            />
          </Cell>
          <Cell>
            <span>Opis [en]</span>
            <textarea
              value={itemData?.preservationState?.description?.en}
              onChange={e =>
                setItemData(prev => ({
                  ...prev,
                  preservationState: {
                    ...prev.preservationState,
                    description: {
                      ...prev.preservationState?.description,
                      en: e.target.value,
                    },
                  },
                }))
              }
            />
          </Cell>
          <DoubleCell>
            {!itemData.id && (
              <span style={{ color: 'red' }}>
                Przed dodaniem zdjęć stanu zachowania należy najpierw zapisać
                obiekt
              </span>
            )}
            <AddButton
              disabled={!itemData?.id}
              type='button'
              style={{ marginBottom: '25px' }}
              onClick={() => fileRefMain?.current?.click()}
            >
              Dodaj zdjęcie stanu zachowania
            </AddButton>
            <SelectedFile>
              <input
                ref={fileRefMain}
                type='file'
                placeholder='Dołącz'
                accept='image/*'
                onChange={e => handleAddMainImage(e.target.files[0])}
              />
              <img src={newData.file} alt='' />
            </SelectedFile>
          </DoubleCell>
          <PreservationStateMarkers itemData={itemData} getItem={getItem} />
          <DoubleCell>
            <AddButton
              type='button'
              style={{ marginBottom: '25px' }}
              onClick={() => setPopup(true)}
            >
              Dodaj przeprowadzoną konserwację
            </AddButton>
            <span>Przeprowadzone konserwacje</span>
            <Wrapper style={{ width: '100%' }}>{mappedImages}</Wrapper>
          </DoubleCell>
        </Wrapper>
      </S.BookmarkWrapper>
      <ModalComponent open={popup} cancelFunc={() => setPopup(false)}>
        <DimensionsPopupWrapper>
          <div>
            <DimensionsPopupWrapper style={{ padding: '0 25px 25px 0' }}>
              <span>Opis [pl]</span>
              <textarea
                value={newData.description?.pl}
                onChange={e =>
                  setNewData(prev => ({
                    ...prev,
                    description: { ...prev.description, pl: e.target.value },
                  }))
                }
              />
            </DimensionsPopupWrapper>
            <DimensionsPopupWrapper style={{ padding: '0 0 25px 0' }}>
              <span>Opis [eng]</span>
              <textarea
                value={newData.description?.en}
                onChange={e =>
                  setNewData(prev => ({
                    ...prev,
                    description: { ...prev.description, en: e.target.value },
                  }))
                }
              />
            </DimensionsPopupWrapper>
          </div>
          <div>
            <span>Data od</span>
            <input
              type='date'
              value={newData.from}
              onChange={e =>
                setNewData(prev => ({ ...prev, from: e.target.value }))
              }
            />
            <span>Data do</span>
            <input
              type='date'
              value={newData.to}
              onChange={e =>
                setNewData(prev => ({ ...prev, to: e.target.value }))
              }
            />
          </div>
          <AddButton
            type='button'
            style={{ margin: '25px 0' }}
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
              onChange={e => handleAddImage(e.target.files[0])}
            />
          </SelectedFile>
          <img src={newData.encoded} alt='' />
          <div>
            <AddButton type='button' onClick={handleAddItem}>
              Dodaj
            </AddButton>
            <AddButton type='button' onClick={handleCancelAdding}>
              Anuluj
            </AddButton>
          </div>
        </DimensionsPopupWrapper>
      </ModalComponent>
      <ReactTooltip id='delete' effect='solid'>
        <span style={{ color: 'white' }}>Usuń wpis</span>
      </ReactTooltip>
    </>
  );
};

export default PreservationState;
