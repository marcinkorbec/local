import React, { useContext, useEffect, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import * as S from '../../ItemCreator.css';
import {
  AddButton,
  Cell,
  DoubleCell,
  ImageWrapper,
  SelectedFile,
  Wrapper,
} from './Bookmarks.css';

const ObjectImages = () => {
  const fileRef = useRef();
  const { itemData, setItemData, setEditingQueue, disableAll } =
    useContext(CreatorContext);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [itemData]);

  const getImage = obj => {
    const extImage = /[.]/.exec(obj?.path)
      ? /[^.]+$/.exec(obj?.path)
      : undefined;
    const encoded = obj?.encodedImage;
    const base64String = `data:image/${extImage};base64,${encoded}`;

    return base64String;
  };

  const getMainImage = () => {
    const img = [...itemData?.images, ...itemData?.newImages]?.filter(
      el => el.isMain
    )[0];
    const src = img?.id ? getImage(img) : img?.encoded;

    return src;
  };

  const handleSelectMain = obj => {
    const images = [];
    const newImages = [];
    itemData.images.forEach(el => {
      images.push({ ...el, isMain: el.id === obj.id });
    });
    itemData.newImages.forEach(el => {
      newImages.push({ ...el, isMain: el.count === obj.count });
    });
    setItemData(prev => ({
      ...prev,
      mainImage: obj.id,
      mainCount: obj.count,
      images,
      newImages,
    }));
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

  const handleAddImage = async file => {
    if (file) {
      const base64 = await getBase64(file);
      const fileToAdd = {
        encoded: base64,
        count: itemData.newImages?.length,
        isNew: true,
      };

      setEditingQueue(prev => [
        ...prev,
        { action: 'ADD', fileType: 'images', file, count: fileToAdd.count },
      ]);

      setItemData(prev => ({
        ...prev,
        newImages: [...prev.newImages, fileToAdd],
      }));
    }
  };

  const handleDeleteImage = file => {
    setItemData(prev => {
      const filteredNew = prev.newImages?.filter(e => e !== file);
      const filteredOld = prev.images?.filter(e => e !== file);
      return {
        ...prev,
        images: [...filteredOld],
        newImages: [...filteredNew],
      };
    });

    if (!file.isNew) {
      setEditingQueue(prev => [
        ...prev,
        { action: 'DELETE', fileType: 'images', id: file.id },
      ]);
    } else {
      setEditingQueue(prev => [...prev.filter(e => e.file !== file)]);
    }
  };

  const mappedImages = [...itemData.images, ...itemData.newImages]?.map(
    (img, idx) => (
      <Cell
        style={{ borderRight: '1px solid lightgray' }}
        key={JSON.stringify(img)}
      >
        <ImageWrapper>
          <img
            src={img.id ? getImage(img) : img.encoded}
            alt={`image_${idx}`}
          />

          <StarIcon
            className='star'
            data-tip
            data-for='star-full'
            style={{ visibility: img.isMain ? 'visible' : 'hidden' }}
          />

          <StarBorderIcon
            className='star'
            data-tip
            data-for='star-empty'
            style={{ visibility: !img.isMain ? 'visible' : 'hidden' }}
            onClick={() => handleSelectMain(img)}
          />

          <DeleteForeverIcon
            className='delete'
            data-tip
            data-for='delete'
            onClick={() => handleDeleteImage(img)}
          />
        </ImageWrapper>
      </Cell>
    )
  );

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <Cell>
          <span>Wizerunek główny obiektu</span>
          <ImageWrapper>
            {getMainImage() ? (
              <img src={getMainImage()} alt='Brak wizerunku głównego' />
            ) : (
              <span>Brak wizerunku</span>
            )}
          </ImageWrapper>
        </Cell>
        <Cell />
        <Cell>
          <span>Opis obiektu [pl]</span>
          <textarea
            value={itemData?.description?.pl}
            onChange={e =>
              setItemData(prev => ({
                ...prev,
                description: { ...prev.description, pl: e.target.value },
              }))
            }
          />
        </Cell>
        <Cell>
          <span>Opis obiektu [eng]</span>
          <textarea
            value={itemData?.description?.en}
            onChange={e =>
              setItemData(prev => ({
                ...prev,
                description: { ...prev.description, en: e.target.value },
              }))
            }
          />
        </Cell>
        <DoubleCell>
          <AddButton
            type='button'
            style={{ marginBottom: '25px' }}
            onClick={() => fileRef?.current?.click()}
          >
            Dodaj zdjęcie
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
          <Wrapper style={{ width: '100%' }}>{mappedImages}</Wrapper>
        </DoubleCell>
      </Wrapper>

      <ReactTooltip id='star-full' effect='solid'>
        <span style={{ color: 'white' }}>Wizerunek główny</span>
      </ReactTooltip>
      <ReactTooltip id='star-empty' effect='solid'>
        <span style={{ color: 'white' }}>Wybierz jako główny</span>
      </ReactTooltip>
      <ReactTooltip id='delete' effect='solid'>
        <span style={{ color: 'white' }}>Usuń obraz</span>
      </ReactTooltip>
    </S.BookmarkWrapper>
  );
};

export default ObjectImages;
