import React, { useContext, useState } from 'react';
import { RemoveCircleOutline } from '@material-ui/icons';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import ModalComponent from 'common/Modal/Modal';

import StyledSelect from 'common/Inputs/StyledSelect';
import * as S from '../../ItemCreator.css';
import {
  AddButton,
  Cell,
  CellRow,
  DimensionsPopupWrapper,
  Item,
  ItemsList,
  Wrapper,
} from './Bookmarks.css';

const lengthUnits = [
  {
    label: 'cm',
    value: 'cm',
  },
];

const weightUnits = [
  {
    label: 'g',
    value: 'g',
  },
  {
    label: 'dag',
    value: 'dag',
  },
  {
    label: 'kg',
    value: 'kg',
  },
];

const formatUnits = [
  {
    label: 'A5',
    value: 'A5',
  },
  {
    label: 'A4',
    value: 'A4',
  },
  {
    label: 'A3',
    value: 'A3',
  },
  {
    label: 'A2',
    value: 'A2',
  },
  {
    label: 'A1',
    value: 'A1',
  },
  {
    label: 'A0',
    value: 'A0',
  },
];

const defaultDimension = [
  {
    label: 'Wysokość',
    name: { pl: 'height', en: 'height' },
    options: lengthUnits,
  },
  {
    label: 'Szerokość',
    name: { pl: 'width', en: 'width' },
    options: lengthUnits,
  },
  {
    label: 'Głębokość',
    name: { pl: 'depth', en: 'depth' },
    options: lengthUnits,
  },
  {
    label: 'Średnica',
    name: { pl: 'diameter', en: 'diameter' },
    options: lengthUnits,
  },
  {
    label: 'Grubość',
    name: { pl: 'thickness', en: 'thickness' },
    options: lengthUnits,
  },
  {
    label: 'Obwód',
    name: { pl: 'circumference', en: 'circumference' },
    options: lengthUnits,
  },
  {
    label: 'Format',
    name: { pl: 'format', en: 'format' },
    options: formatUnits,
  },
  { label: 'Waga', name: { pl: 'weight', en: 'weight' }, options: weightUnits },
];

const Dimensions = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);
  const [popup, setPopup] = useState(false);
  const [newData, setNewData] = useState({
    name: {
      pl: '',
      en: '',
    },
    value: 0,
    unit: '',
  });

  const updateState = (e, name, type) => {
    setItemData(prev => {
      const arr = prev?.dimensions;
      const itemIdx = arr.findIndex(el => el.name?.pl === name?.pl);
      let old;
      if (itemIdx === -1) {
        old = {
          name,
          value: 0,
          unit: '',
        };
        const newItem = { ...old, [type]: e?.target?.value || e?.value };
        arr.push(newItem);
      } else {
        old = arr[itemIdx];
        const newItem = { ...old, [type]: e?.target?.value || e?.value };
        arr[itemIdx] = newItem;
      }

      return {
        ...prev,
        dimensions: arr,
      };
    });
  };

  const getField = (name, type) =>
    itemData?.dimensions?.filter(el => el.name?.pl === name?.pl)[0]?.[type];

  const handleAddItem = () => {
    setItemData(prev => ({
      ...prev,
      dimensions: [...prev.dimensions, { ...newData }],
    }));

    setNewData({
      name: {
        pl: '',
        en: '',
      },
      value: 0,
      unit: '',
    });
    setPopup(false);
  };

  const handleCancelAdding = () => {
    setNewData({
      name: {
        pl: '',
        en: '',
      },
      value: 0,
      unit: '',
    });
    setPopup(false);
  };

  const handleDeleteItem = e => {
    setItemData(prev => ({
      ...prev,
      dimensions: [...prev.dimensions?.filter(el => el.name !== e.name)],
    }));
  };

  const mappedFields = defaultDimension.map(el => (
    <Cell key={el.label}>
      <span>{el.label}</span>
      <CellRow>
        <input
          type='number'
          value={getField(el.name, 'value')}
          onChange={e => updateState(e, el.name, 'value')}
        />
        <StyledSelect
          value={el.options.filter(e => e.value === getField(el.name, 'unit'))}
          onChange={e => updateState(e, el.name, 'unit')}
          options={el.options}
        />
      </CellRow>
    </Cell>
  ));

  const mappedAddedFields = itemData.dimensions
    .filter(
      el => !defaultDimension.map(inner => inner.name?.pl).includes(el.name?.pl)
    )
    .map(field => (
      <Item key={JSON.stringify(field)}>
        <span>
          {field.name?.pl}/{field.name?.en}: {field.value} {field.unit}
        </span>
        <RemoveCircleOutline onClick={() => handleDeleteItem(field)} />
      </Item>
    ));

  return (
    <>
      <S.BookmarkWrapper disabled={disableAll}>
        <Wrapper>
          {mappedFields}
          <Cell>
            <span>Wymiary uzupełniające</span>

            <AddButton type='button' onClick={() => setPopup(prev => !prev)}>
              + Dodaj wymiar
            </AddButton>
          </Cell>
          <Cell />
          <Cell>
            <ItemsList>{mappedAddedFields}</ItemsList>
          </Cell>
        </Wrapper>
      </S.BookmarkWrapper>

      <ModalComponent open={popup} cancelFunc={() => setPopup(false)}>
        <DimensionsPopupWrapper>
          <span>Nazwa [pl]</span>
          <input
            value={newData.name?.pl}
            onChange={e =>
              setNewData(prev => ({
                ...prev,
                name: { ...prev.name, pl: e.target.value },
              }))
            }
          />
          <span>Nazwa [eng]</span>
          <input
            value={newData.name?.en}
            onChange={e =>
              setNewData(prev => ({
                ...prev,
                name: { ...prev.name, en: e.target.value },
              }))
            }
          />
          <span>Wartość</span>
          <input
            type='number'
            value={newData.value}
            onChange={e =>
              setNewData(prev => ({ ...prev, value: e.target.value }))
            }
          />
          <span>Jednostka</span>
          <input
            value={newData.unit}
            onChange={e =>
              setNewData(prev => ({ ...prev, unit: e.target.value }))
            }
          />
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
    </>
  );
};

export default Dimensions;
