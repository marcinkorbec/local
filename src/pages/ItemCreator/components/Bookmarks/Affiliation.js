import React, { useContext, useState } from 'react';
import { RemoveCircleOutline } from '@material-ui/icons';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import StyledSelect from 'common/Inputs/StyledSelect';
import * as S from '../../ItemCreator.css';
import {
  AddButton,
  Cell,
  CellRow,
  DoubleCell,
  Item,
  ItemsList,
  SymbolInput,
  SymbolLabel,
  Wrapper,
} from './Bookmarks.css';

const typeOptions = [
  {
    label: 'Pojedynczy',
    value: 'SINGLE',
  },
  {
    label: 'Złożony',
    value: 'COMPLEX',
  },
];

const Affiliation = () => {
  const { itemData, setItemData, disableAll } = useContext(CreatorContext);
  const [newKeyword, setNewKeyword] = useState({
    pl: '',
    en: '',
  });

  console.log(itemData);
  const updateState = (name, e) => {
    setItemData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: e.target.value,
      },
    }));
  };

  const updateStateSelect = (name, e) => {
    setItemData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: e.value,
      },
    }));
  };

  const handleAddKeyword = lang => {
    setItemData(prev => ({
      ...prev,
      keywords: {
        ...prev.keywords,
        [lang]: [...prev.keywords?.[lang], newKeyword[lang]],
      },
    }));

    setNewKeyword(prev => ({ ...prev, [lang]: '' }));
  };

  const handleDeleteItem = (e, lang) => {
    setItemData(prev => ({
      ...prev,
      keywords: {
        ...prev.keywords,
        [lang]: [...prev.keywords?.[lang]?.filter(el => el !== e)],
      },
    }));
  };

  const mappedKeywords = lang =>
    itemData?.keywords?.[lang]?.map(field => (
      <Item key={field}>
        <span>{field}</span>
        <RemoveCircleOutline onClick={() => handleDeleteItem(field, lang)} />
      </Item>
    ));

  return (
    <S.BookmarkWrapper disabled={disableAll}>
      <Wrapper>
        {/* <Cell>
          <span>Dział</span>
          <StyledSelect
            options={sectionOptions}
            value={itemData?.details?.section}
            onChange={e => updateStateSelect('section', e)}
          />
        </Cell> */}
        <Cell>
          <span>Typ</span>
          <StyledSelect isDisabled
            options={typeOptions}
            value={typeOptions.filter(
              e => e.value === itemData?.details?.itemType
            )}
            onChange={e => updateStateSelect('itemType', e)}
          />
        </Cell>
        <Cell />
        <Cell>
          <span>Słowa kluczowe [pl]</span>
          <CellRow>
            <input
              value={newKeyword.pl}
              onChange={e =>
                setNewKeyword(prev => ({ ...prev, pl: e.target.value }))
              }
            />
            <AddButton type='button' onClick={() => handleAddKeyword('pl')}>
              +
            </AddButton>
          </CellRow>
          <ItemsList>{mappedKeywords('pl')}</ItemsList>
        </Cell>
        <Cell>
          <span>Słowa kluczowe [eng]</span>
          <CellRow>
            <input
              value={newKeyword.en}
              onChange={e =>
                setNewKeyword(prev => ({ ...prev, en: e.target.value }))
              }
            />
            <AddButton type='button' onClick={() => handleAddKeyword('en')}>
              +
            </AddButton>
          </CellRow>
          <ItemsList>{mappedKeywords('en')}</ItemsList>
        </Cell>
        <Cell>
          <span>Numer ewidencyjny</span>
          <input
            value={itemData?.supportingEvidence}
            onChange={e =>
              setItemData(prev => ({
                ...prev,
                supportingEvidence: e.target.value,
              }))
            }
          />
        </Cell>
        <Cell>
          <span>Znak/symbol ewidencji</span>
          <CellRow>
            <SymbolLabel left textRight>
              {itemData?.symbol?.nkmf}/
            </SymbolLabel>
            <SymbolLabel textRight>{itemData?.symbol?.shortcut}/</SymbolLabel>
            <SymbolInput textRight
              value={itemData?.symbol?.number}
              onChange={e =>
                setItemData(prev => ({
                  ...prev,
                  symbol: {
                    ...prev.symbol,
                    number: e.target.value,
                  },
                }))
              }
            />
            <SymbolLabel>/</SymbolLabel>
            <SymbolInput style={{width: 30}}
              value={itemData?.symbol?.amount}
              onChange={e =>
                setItemData(prev => ({
                  ...prev,
                  symbol: {
                    ...prev.symbol,
                    amount: e.target.value,
                  },
                }))
              }
            />
            <SymbolLabel right />
            {/* <SymbolInput value={itemData?.symbol?.amount} onChange={e => */}
            {/*   setItemData(prev => ({ */}
            {/*     ...prev, */}
            {/*     symbol: { */}
            {/*         ...prev.symbol, */}
            {/*       amount: e.target.value, */}
            {/*     }, */}
            {/*   })) */}
            {/* } right>/</SymbolInput> */}
          </CellRow>
        </Cell>
        <DoubleCell>
          <span>Komentarz</span>
          <textarea
            value={itemData?.details?.additionalItemCharacteristics}
            onChange={e => updateState('additionalItemCharacteristics', e)}
          />
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default Affiliation;
