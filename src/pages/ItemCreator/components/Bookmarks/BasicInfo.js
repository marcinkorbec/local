import React, { useContext, useEffect, useState } from 'react';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import { RemoveCircleOutline } from '@material-ui/icons';
import StyledSelect from 'common/Inputs/StyledSelect';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import Modal from 'common/Modal/Modal';
import ModalContent from 'pages/Books/Inventory/components/ModalContent';
import ModalContentConnect from 'pages/Books/Inventory/components/ModalContentConnect';

import * as S from '../../ItemCreator.css';
import {
  AddButton,
  Cell,
  CellRow,
  Item,
  ItemsList,
  Wrapper,
} from './Bookmarks.css';

const fields = [
  {
    label: 'Twórca/ wytwórnia',
    name: 'authors',
    propertyName: 'name',
    noLang: true,
  },
  {
    label: 'Technika',
    name: 'technique',
    propertyName: 'techniqueTypes',
  },
  {
    label: 'Materiał',
    name: 'material',
    propertyName: 'materialTypes',
  },
];

const estimatedTime = [
  '1800-1850',
  '1851-1900',
  '1901-1950',
  '1951-2000',
  '2001',
  'XIXw',
  'XXw',
  'XXIw',
];

const BasicInfo = () => {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classification, setClassification] = useState([]);
  const { itemData, setItemData, setEditingQueue, disableAll } =
    useContext(CreatorContext);
  const [inputs, setInputs] = useState({
    authors: '',
    technique: {
      pl: '',
      en: '',
    },
    material: {
      pl: '',
      en: '',
    },
    subject: '',
  });

  const handleInputChange = e => {
    const name = e?.target?.name;
    const lang = e?.target?.lang;
    const value = e?.target?.value;

    setInputs(prev => ({
      ...prev,
      [name]: !lang ? value : { ...prev[name], [lang]: value },
    }));
  };

  const handleAdd = (name, propName, noLang) => {
    const value = inputs[name];
    setInputs(prev => ({
      ...prev,
      [name]: noLang
        ? ''
        : {
            pl: '',
            en: '',
          },
    }));
    setItemData(prev => ({
      ...prev,
      [name]: [
        ...prev[name],
        {
          [propName]: value,
          additionalCharacteristics: noLang
            ? ''
            : {
                pl: '',
                en: '',
              },
        },
      ],
    }));
  };

  const handleDeleteItem = (e, val) => {
    if (val.id)
      setEditingQueue(prev => [
        ...prev,
        { action: 'DELETE', fileType: e.name, id: val.id },
      ]);

    setItemData(prev => ({
      ...prev,
      [e.name]: [
        ...prev[e.name]?.filter(
          el => el[e.propertyName] !== val[e.propertyName]
        ),
      ],
    }));
  };

  const handleRemoveAssign = async id => {
    try {
      await api.putRemoveAssign(id);
      toast.success('Powiązania przedmiotu zostały usunięte.', OPTIONS);
      setIsModalOpen('');
    } catch (e) {
      toast.error(
        <div>
          <p>Wystąpił błąd</p>
          <p>
            {JSON.stringify(e?.response?.data?.message || e?.response?.data)}
          </p>
        </div>,
        OPTIONS
      );
    }
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const { data } = await api.getLocations();
        setLocations(data);
      } catch (e) {
        toast.error(
          'Wystąpił błąd podczas ładowania listy lokalizacji',
          OPTIONS
        );
      }
    };

    const getClassifications = async () => {
      try {
        const { data } = await api.getClassifications();
        setClassification(data);
      } catch (e) {
        toast.error(
          'Wystąpił błąd podczas ładowania listy opcji klasyfikacji',
          OPTIONS
        );
      }
    };

    getClassifications();
    getLocations();
  }, []);

  useEffect(() => {
    const getNumber = async () => {
      try {
        const { data } = await api.getClassificationSystemNumber(
          itemData.classificationSystem?.id
        );

        setItemData(prev => ({
          ...prev,
          symbol: { ...prev.symbol, number: data },
        }));
      } catch {
        toast.error('Wystąpił błąd podczas pobierania informacji o symbolu');
      }
    };

    // if (itemData.classificationSystem?.id) getNumber();

    if (itemData.classificationSystem?.shortcut)
      setItemData(prev => ({
        ...prev,
        symbol: {
          ...prev.symbol,
          shortcut: itemData.classificationSystem?.shortcut,
        },
      }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData.classificationSystem]);

  const mappedItem = {
    id: itemData?.id,
    name: itemData?.name?.pl,
    entryDate: itemData?.entryDate,
  };

  const mappedLocations = locations.map(el => ({
    label: el.name,
    value: el.id,
  }));

  const mappedCalssifications = classification.map(el => ({
    label: `${el.name?.pl}/${el.name?.en}`,
    value: el,
  }));

  const mappedEstimatedTime = estimatedTime.map(el => ({
    label: el,
    value: el,
  }));

  const mappedFields = fields.map(el => (
    <Cell key={el.label}>
      <span>{el.label}</span>
      <CellRow>
        {el.noLang ? (
          <input
            {...el.inputProps}
            name={el.name}
            value={inputs[el.name]}
            onChange={handleInputChange}
          />
        ) : (
          <>
            <input
              {...el.inputProps}
              name={el.name}
              lang='pl'
              value={inputs[el.name]?.pl}
              onChange={handleInputChange}
              placeholder='pl'
            />
            <input
              {...el.inputProps}
              name={el.name}
              lang='en'
              value={inputs[el.name]?.en}
              onChange={handleInputChange}
              placeholder='eng'
            />
          </>
        )}
        <AddButton
          {...el.inputProps}
          type='button'
          onClick={() => handleAdd(el.name, el.propertyName, el.noLang)}
        >
          +
        </AddButton>
      </CellRow>
      <ItemsList>
        {itemData[el.name]?.map(val => (
          <Item key={JSON.stringify(val)}>
            <span>
              {el?.noLang
                ? val[el.propertyName]
                : `${val[el.propertyName]?.pl}/${val[el.propertyName]?.en}`}
            </span>
            <RemoveCircleOutline onClick={() => handleDeleteItem(el, val)} />
          </Item>
        ))}
      </ItemsList>
    </Cell>
  ));

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        <Cell>
          <span>Nazwa [pl]</span>
          <input
            value={itemData?.name?.pl}
            onChange={e =>
              setItemData(prev => ({
                ...prev,
                name: {
                  ...prev.name,
                  pl: e.target.value,
                },
              }))
            }
          />
        </Cell>

        <Cell>
          <span>Nazwa [eng]</span>
          <input
            value={itemData?.name?.en}
            onChange={e =>
              setItemData(prev => ({
                ...prev,
                name: {
                  ...prev.name,
                  en: e.target.value,
                },
              }))
            }
          />
        </Cell>

        <Cell>
          <span>Czas powstania</span>
          <input
            type='date'
            value={itemData?.timeOfOrigin}
            onChange={e =>
              setItemData(prev => ({ ...prev, timeOfOrigin: e.target.value }))
            }
          />
        </Cell>
        <Cell>
          <span>Szacowany czas powstania</span>
          <StyledSelect
            value={
              mappedEstimatedTime.filter(
                e => e.value === itemData.estimatedTimeOfOrigin
              )[0]
            }
            options={mappedEstimatedTime}
            onChange={e =>
              setItemData(prev => ({ ...prev, estimatedTimeOfOrigin: e.value }))
            }
          />
        </Cell>
        <Cell>
          <span>Miejsce przechowania</span>
          <StyledSelect
            value={
              mappedLocations.filter(e => e.value === itemData.location?.id)[0]
            }
            options={mappedLocations}
            onChange={e =>
              setItemData(prev => ({ ...prev, location: { id: e.value } }))
            }
          />
        </Cell>
        <Cell>
          <span>Określenie obiektu</span>
          <StyledSelect
            options={mappedCalssifications}
            value={
              mappedCalssifications.filter(
                e => e.value?.id === itemData.classificationSystem?.id
              ) || ''
            }
            onChange={e =>
              setItemData(prev => ({
                ...prev,
                classificationSystem: { ...e.value },
              }))
            }
          />
        </Cell>
        {mappedFields}
        <Cell>
          <span>
            Zarządzanie połączeniami{' '}
            {!itemData?.id && '(przedmiot musi zostać najpierw zapisany)'}
          </span>
          <AddButton
            type='button'
            disabled={!itemData?.id}
            onClick={() => setIsModalOpen('assign')}
          >
            Zarządzaj
          </AddButton>
          <AddButton
            style={{ marginTop: '30px' }}
            type='button'
            disabled={!itemData?.id}
            onClick={() => setIsModalOpen('remove')}
          >
            Usuń wszystkie połączenia
          </AddButton>
        </Cell>
      </Wrapper>
      <Modal
        open={isModalOpen === 'assign'}
        cancelFunc={() => setIsModalOpen('')}
      >
        <ModalContentConnect
          getValues={() => {}}
          row={mappedItem}
          cancel={() => setIsModalOpen('')}
        />
      </Modal>
      <Modal
        open={isModalOpen === 'remove'}
        cancelFunc={() => setIsModalOpen('')}
      >
        <ModalContent
          getValues={() => {}}
          row={mappedItem}
          onSubmit={handleRemoveAssign}
          cancel={() => setIsModalOpen('')}
          info='Czy na pewno chcesz usunąć powiązania poniższego przedmiotu?'
        />
      </Modal>
    </S.BookmarkWrapper>
  );
};

export default BasicInfo;
