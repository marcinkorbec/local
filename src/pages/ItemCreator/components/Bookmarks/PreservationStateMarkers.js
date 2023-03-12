import React, { useContext, useEffect, useState } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  AddButton,
  DoubleCell,
  ConservationImageWrapper,
  ConservationDetails,
  ConservationWrap,
  ConservationPoint,
  DeleteButton,
  Notice,
  ButtonsWrap,
} from './Bookmarks.css';
import PreservationPointsList from './PreservationPointsList';
import { api } from '../../../../API';

const PreservationStateMarkers = ({ itemData }) => {
  const { getItem, setItemData } = useContext(CreatorContext);
  const [toggleAddNewPoints, setToggleAddNewPoints] = useState(false);
  const [points, setPoints] = useState([]);
  const emptyPoint = {
    id: null,
    x: null,
    y: null,
    title: '',
    description: '',
  };
  const [imgId, setImgId] = useState();
  const [currentPoint, setCurrentPoint] = useState(emptyPoint);

  useEffect(() => {
    setPoints(itemData.preservationState.images);
  }, [itemData]);

  const getMainImage = enc => {
    if (enc.includes('data:image')) return enc;
    return `data:image/png;base64,${enc}`;
  };

  const placeMarker = (e, id) => {
    if (toggleAddNewPoints) {
      setImgId(id);
      setCurrentPoint(emptyPoint);
      const x = (
        ((e.clientX - e.currentTarget.getBoundingClientRect().left - 10) *
          100) /
        e.currentTarget.getBoundingClientRect().width
      ).toFixed(2);
      const y = (
        ((e.clientY - e.currentTarget.getBoundingClientRect().top - 10) * 100) /
        e.currentTarget.getBoundingClientRect().height
      ).toFixed(2);
      setCurrentPoint({
        x,
        y,
        title: '',
        description: '',
      });
    }
  };

  const selectEditPoint = (imageId, el) => {
    setCurrentPoint({
      id: el.id,
      x: el.x,
      y: el.y,
      title: el.title,
      description: el.description,
    });
    setImgId(imageId);
  };

  const mappedPoints = (p, imageId) =>
    p?.map(el => (
      <ConservationPoint
        top={el.y}
        left={el.x}
        active={
          JSON.stringify([currentPoint.x, currentPoint.y]) ===
          JSON.stringify([el.x, el.y])
        }
        onClick={() => selectEditPoint(imageId, el)}
        key={el.id}
      >
        <CircleTwoToneIcon />
      </ConservationPoint>
    ));

  const deletePoint = async id => {
    try {
      await api.deleteCorrection(id);
      toast.success('Pomyślnie usunięto oznaczenie.', OPTIONS);
      setCurrentPoint(emptyPoint);
      getItem();
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const handlePointEdit = (e, fieldname) => {
    setCurrentPoint(prev => ({ ...prev, [fieldname]: e.target.value }));
  };

  const savePoint = async id => {
    const data = {
      title: currentPoint.title,
      description: currentPoint.description,
      x: currentPoint.x,
      y: currentPoint.y,
    };
    try {
      if (!toggleAddNewPoints) {
        await api.putCorrection(currentPoint.id, data);
        toast.success('Pomyślnie edytowano oznaczenie.', OPTIONS);
        getItem();
        setCurrentPoint(emptyPoint);
      } else {
        await api.postCorrection(id, data);
        toast.success('Pomyślnie dodano oznaczenie.', OPTIONS);
        getItem();
        setCurrentPoint(emptyPoint);
      }
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const toggleAddingPoints = () => {
    setCurrentPoint(emptyPoint);
    setToggleAddNewPoints(prev => !prev);
  };

  const handleSelectMain = obj => {
    const images = [];
    itemData.preservationState.images.forEach(el => {
      images.push({ ...el, isMain: el.id === obj.id });
    });

    setItemData(prev => ({
      ...prev,
      preservationState: {
        ...prev.preservationState,
        images,
      },
    }));
  };

  const handleDeleteImage = async id => {
    try {
      await api.imagesDELETE(id);
      toast.success('Pomyślnie usunięto zdjęcie.', OPTIONS);
      getItem();
    } catch {
      toast.error('Wystąpił błąd podczas usuwania zdjęcia.', OPTIONS);
    }
  };

  const mappedImages = itemData?.preservationState?.images?.map(el => (
    <>
      <DoubleCell row key={el.id}>
        <ConservationWrap>
          <span>Stan zachowania</span>
          {el.encodedImage && (
            <ButtonsWrap>
              <AddButton type='button' onClick={toggleAddingPoints}>
                {toggleAddNewPoints
                  ? 'Wyłącz dodawanie oznaczeń'
                  : 'Włącz dodawanie oznaczeń'}
              </AddButton>
              {el.isMain ? (
                <AddButton type='button'>
                  Wybrano jako zdjęcie główne <StarRoundedIcon />
                </AddButton>
              ) : (
                <AddButton type='button' onClick={() => handleSelectMain(el)}>
                  Wybierz jako zdjęcie główne <StarBorderRoundedIcon />
                </AddButton>
              )}
              <AddButton type='button' onClick={() => handleDeleteImage(el.id)}>
                Usuń zdjęcie <CancelIcon />
              </AddButton>
            </ButtonsWrap>
          )}
          <ConservationImageWrapper onClick={e => placeMarker(e, el.id)}>
            {el.encodedImage ? (
              <img
                src={getMainImage(el.encodedImage)}
                alt='Brak wizerunku głównego'
              />
            ) : (
              <span>Brak wizerunku</span>
            )}

            {points && mappedPoints(el.imageCorrections, el.id)}
            {toggleAddNewPoints && el.id === imgId && (
              <ConservationPoint
                top={currentPoint?.y}
                left={currentPoint?.x}
                active
              >
                <CircleTwoToneIcon />
              </ConservationPoint>
            )}
          </ConservationImageWrapper>
        </ConservationWrap>
        {el.imageCorrections.find(a => a.id === currentPoint.id)?.id ===
          currentPoint.id && imgId === el.id ? (
          <ConservationDetails>
            <label htmlFor='title'>
              <span> Nazwa:</span>
              <input
                value={currentPoint.title}
                onChange={e => handlePointEdit(e, 'title')}
                id='title'
                maxLength={150}
              />
            </label>
            <label htmlFor='title'>
              <span>Opis:</span>
              <textarea
                value={currentPoint.description}
                onChange={e =>
                  setCurrentPoint(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </label>
            {!toggleAddNewPoints && (
              <DeleteButton
                type='button'
                onClick={() => deletePoint(currentPoint.id)}
              >
                <DeleteForeverIcon className='delete' /> Usuń oznaczenie
              </DeleteButton>
            )}
            <AddButton onClick={() => savePoint(el.id)}>Zapisz</AddButton>
          </ConservationDetails>
        ) : (
          el.encodedImage && (
            <Notice>
              {toggleAddNewPoints &&
                'Kliknij na obszarze zdjęcia aby umieścić znacznik.'}
              {points?.length > 0 &&
                !toggleAddNewPoints &&
                'Wybierz punkt ze zdjęcia aby edytować treść.'}
              {!toggleAddNewPoints && (!points || points?.length === 0) && (
                <>
                  Aby dodać znacznik, włącz dodawanie oznaczeń i kliknij na
                  obszarze zdjęcia. Jeśli dodano nowe zdjęcie,{' '}
                  <b>pamiętaj aby najpierw zapisać obiekt.</b>
                </>
              )}
            </Notice>
          )
        )}
      </DoubleCell>
      <PreservationPointsList
        setCurrentPoint={setCurrentPoint}
        setToggleAddNewPoints={setToggleAddNewPoints}
        setImgId={setImgId}
        points={el.imageCorrections}
        imgId={el.id}
      />
    </>
  ));

  return <>{mappedImages}</>;
};

export default PreservationStateMarkers;
