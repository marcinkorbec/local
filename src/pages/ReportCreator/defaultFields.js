import React from 'react';
import styled, { css } from 'styled-components';
import { centerFlex } from 'styles/mixins';

const Cell = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  overflow: hidden;

  ${({ center }) => center && centerFlex};
`;

const CellHeader = styled.div`
  padding: 10px 0 10px 10px;
  width: 100%;
  /* height: 3rem; */
  font-size: 1.5rem;
  border-bottom: 1px solid black;
  height: 40px;
  overflow: hidden;
`;

const CellContent = styled.div`
  padding: ${({ img }) => (img ? '0' : '10px')};
  height: 100%;
  width: 100%;
  max-width: 100%;
  /* height: calc(100% - 3rem);
  max-height: calc(100% - 3rem); */
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ center }) =>
    center &&
    css`
      padding: 5px;
      justify-content: center;
    `}

  img {
    pointer-events: none;
    object-fit: contain;
    width: ${({ full }) => (full ? '100%' : '90%')};
    height: ${({ full }) => (full ? '100%' : '85%')};
    margin: 0 auto auto auto;
    /* max-height: 100%; */
  }
`;

const getImage = obj => {
  if (!obj) return '';
  const extImage = /[.]/.exec(obj?.path) ? /[^.]+$/.exec(obj?.path) : 'png';
  const encoded = obj?.encodedImage || obj;
  const base64String = `data:image/${extImage};base64,${encoded}`;

  return base64String;
};

export const layout = [
  {
    i: 'reportTitle',
    x: 0,
    y: 0,
    w: 32,
    h: 2,
    static: true,
  },
  {
    i: 'description',
    x: 0,
    y: 2,
    w: 15,
    h: 8,
  },
  {
    i: 'mainImage',
    x: 16,
    y: 2,
    w: 15,
    h: 8,
  },
  //------------------
  {
    i: 'id',
    x: 0,
    y: 10,
    w: 5,
    h: 3,
  },
  {
    i: 'authors',
    x: 5,
    y: 10,
    w: 8,
    h: 3,
  },
  {
    i: 'additionalItemCharacteristics',
    x: 13,
    y: 10,
    w: 10,
    h: 3,
  },
  {
    i: 'name',
    x: 23,
    y: 10,
    w: 7,
    h: 3,
  },
  //----------------------
  {
    i: 'origin',
    x: 0,
    y: 13,
    w: 10,
    h: 3,
  },
  {
    i: 'source',
    x: 10,
    y: 13,
    w: 5,
    h: 3,
  },
  {
    i: 'supportingEvidence',
    x: 15,
    y: 13,
    w: 15,
    h: 3,
  },
  // Drugi raz księga wpływu?
  {
    i: 'width',
    x: 0,
    y: 16,
    w: 6,
    h: 3,
  },
  {
    i: 'height',
    x: 6,
    y: 16,
    w: 6,
    h: 3,
  },
  {
    i: 'diameter',
    x: 12,
    y: 16,
    w: 5,
    h: 3,
  },
  {
    i: 'thickness',
    x: 17,
    y: 16,
    w: 5,
    h: 3,
  },
  {
    i: 'circumference',
    x: 22,
    y: 16,
    w: 4,
    h: 3,
  },
  {
    i: 'weight',
    x: 26,
    y: 16,
    w: 4,
    h: 3,
  },
  // -----------------
  {
    i: 'material',
    x: 0,
    y: 19,
    w: 7,
    h: 3,
  },
  {
    i: 'technique',
    x: 7,
    y: 19,
    w: 8,
    h: 3,
  },
  {
    i: 'acquisation',
    x: 15,
    y: 19,
    w: 9,
    h: 3,
  },
  {
    i: 'timeOfOrigin',
    x: 24,
    y: 19,
    w: 6,
    h: 3,
  },
  //-----------------------
  {
    i: 'history',
    x: 0,
    y: 22,
    w: 12,
    h: 5,
  },
  {
    i: 'biblography',
    x: 12,
    y: 22,
    w: 12,
    h: 5,
  },
  {
    i: 'location',
    x: 24,
    y: 22,
    w: 6,
    h: 5,
  },
  //-----------------------
  {
    i: 'img1',
    x: 0,
    y: 27,
    w: 6,
    h: 4,
  },
  {
    i: 'img2',
    x: 6,
    y: 27,
    w: 6,
    h: 4,
  },
  {
    i: 'img3',
    x: 12,
    y: 27,
    w: 6,
    h: 4,
  },
  {
    i: 'img4',
    x: 18,
    y: 27,
    w: 6,
    h: 4,
  },
  {
    i: 'img5',
    x: 24,
    y: 27,
    w: 6,
    h: 4,
  },
  {
    i: 'img6',
    x: 0,
    y: 31,
    w: 6,
    h: 4,
  },
  {
    i: 'img7',
    x: 6,
    y: 31,
    w: 6,
    h: 4,
  },
  {
    i: 'img8',
    x: 12,
    y: 31,
    w: 6,
    h: 4,
  },
  {
    i: 'img9',
    x: 18,
    y: 31,
    w: 6,
    h: 4,
  },
  {
    i: 'img10',
    x: 24,
    y: 31,
    w: 6,
    h: 4,
  },
];

export const cellsContent = data => [
  {
    key: 'reportTitle',
    content: (
      <Cell center>
        <h1>NARODOWE CENTRUM KULTURY FILMOWEJ</h1>
      </Cell>
    ),
  },
  {
    key: 'name',
    content: (
      <Cell>
        <CellHeader>Nazwa obiektu</CellHeader>
        <CellContent>{data?.name?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'description',
    content: (
      <Cell>
        <CellHeader>Opis obiektu</CellHeader>
        <CellContent>{data?.description?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'mainImage',
    content: (
      <Cell>
        <CellHeader>Wizerunek obiektu</CellHeader>
        <CellContent img>
          {data?.images?.filter(e => e.isMain)[0] && (
            <img
              src={getImage(data?.images?.filter(e => e.isMain)[0])}
              alt=''
            />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'id',
    content: (
      <Cell>
        <CellHeader>Nr. obiektu</CellHeader>
        <CellContent>{data?.id}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'authors',
    content: (
      <Cell>
        <CellHeader>Autor/wytwórnia</CellHeader>
        <CellContent>{data?.authors?.[0]?.name}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'additionalItemCharacteristics',
    content: (
      <Cell>
        <CellHeader>Typ/rodzaj</CellHeader>
        <CellContent>{data?.classificationSystem?.name?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'origin',
    content: (
      <Cell>
        <CellHeader>Pochodzenie</CellHeader>
        <CellContent>{`${data?.origin?.country?.pl || ''} ${
          data?.origin?.region?.pl || ''
        } ${data?.origin?.city?.pl || ''}`}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'source',
    content: (
      <Cell>
        <CellHeader>Dział</CellHeader>
        <CellContent>{data?.acquisitionMethod?.source?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'supportingEvidence',
    content: (
      <Cell>
        <CellHeader>Numer porządkowy</CellHeader>
        <CellContent>{data?.supportingEvidence}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'width',
    content: (
      <Cell>
        <CellHeader>Szerokość</CellHeader>
        <CellContent>
          {data?.dimensions?.filter(el => el.name?.pl === 'width')?.[0]?.value}
          {data?.dimensions?.filter(el => el.name?.pl === 'width')?.[0]?.unit}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'height',
    content: (
      <Cell>
        <CellHeader>Wysokość</CellHeader>
        <CellContent>
          {data?.dimensions?.filter(el => el.name?.pl === 'height')?.[0]?.value}
          {data?.dimensions?.filter(el => el.name?.pl === 'height')?.[0]?.unit}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'diameter',
    content: (
      <Cell>
        <CellHeader>Średnica</CellHeader>
        <CellContent>
          {
            data?.dimensions?.filter(el => el.name?.pl === 'diameter')?.[0]
              ?.value
          }
          {
            data?.dimensions?.filter(el => el.name?.pl === 'diameter')?.[0]
              ?.unit
          }
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'thickness',
    content: (
      <Cell>
        <CellHeader>Grubość</CellHeader>
        <CellContent>
          {
            data?.dimensions?.filter(el => el.name?.pl === 'thickness')?.[0]
              ?.value
          }
          {
            data?.dimensions?.filter(el => el.name?.pl === 'thickness')?.[0]
              ?.unit
          }
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'circumference',
    content: (
      <Cell>
        <CellHeader>Obwód</CellHeader>
        <CellContent>
          {
            data?.dimensions?.filter(el => el.name?.pl === 'circumference')?.[0]
              ?.value
          }
          {
            data?.dimensions?.filter(el => el.name?.pl === 'circumference')?.[0]
              ?.unit
          }
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'weight',
    content: (
      <Cell>
        <CellHeader>Waga</CellHeader>
        <CellContent>
          {data?.dimensions?.filter(el => el.name?.pl === 'weight')?.[0]?.value}
          {data?.dimensions?.filter(el => el.name?.pl === 'weight')?.[0]?.unit}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'material',
    content: (
      <Cell>
        <CellHeader>Materiał</CellHeader>
        <CellContent>{data?.material?.[0]?.materialTypes?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'technique',
    content: (
      <Cell>
        <CellHeader>Technika</CellHeader>
        <CellContent>{data?.technique?.[0]?.techniqueTypes?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'acquisation',
    content: (
      <Cell>
        <CellHeader>Sposób nabycia</CellHeader>
        <CellContent>
          {data?.acquisitionMethod?.acquisitionDate}{' '}
          {data?.acquisitionMethod?.source?.pl}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'timeOfOrigin',
    content: (
      <Cell>
        <CellHeader>Datowanie</CellHeader>
        <CellContent>{data?.timeOfOrigin}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'history',
    content: (
      <Cell>
        <CellHeader>Historia</CellHeader>
        <CellContent>
          {data?.history?.splice(0, 3)?.map(el => (
            <p>
              {el.date} : {el.event?.pl}
            </p>
          ))}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'biblography',
    content: (
      <Cell>
        <CellHeader>Bibliografia</CellHeader>
        <CellContent>
          {data?.bibliography?.splice(0, 3)?.map(el => (
            <p>{el}</p>
          ))}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'location',
    content: (
      <Cell>
        <CellHeader>Lokalizacja</CellHeader>
        <CellContent>{data?.location?.name}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'img1',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[0] && (
            <img src={getImage(data?.images?.[0])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img2',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[1] && (
            <img src={getImage(data?.images?.[1])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img3',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[2] && (
            <img src={getImage(data?.images?.[2])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img4',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[3] && (
            <img src={getImage(data?.images?.[3])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img5',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[4] && (
            <img src={getImage(data?.images?.[4])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img6',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[5] && (
            <img src={getImage(data?.images?.[5])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img7',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[6] && (
            <img src={getImage(data?.images?.[6])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img8',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[7] && (
            <img src={getImage(data?.images?.[7])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img9',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[8] && (
            <img src={getImage(data?.images?.[8])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'img10',
    content: (
      <Cell>
        <CellContent img full>
          {data?.images?.[9] && (
            <img src={getImage(data?.images?.[9])} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
];

export const layout2 = [
  {
    i: 'reportTitle',
    x: 0,
    y: 0,
    w: 32,
    h: 2,
    static: true,
  },
  {
    i: 'preservationState',
    x: 0,
    y: 2,
    w: 30,
    h: 1,
    static: true,
  },
  {
    i: 'description',
    x: 0,
    y: 3,
    w: 15,
    h: 10,
    static: true,
  },
  {
    i: 'encodedImage',
    x: 15,
    y: 3,
    w: 15,
    h: 10,
    static: true,
  },
  {
    i: 'conservation',
    x: 0,
    y: 13,
    w: 30,
    h: 1,
    static: true,
  },
  {
    i: 'conservations_title_1',
    x: 0,
    y: 14,
    w: 8,
    h: 1,
    static: true,
  },
  {
    i: 'conservations_title_2',
    x: 8,
    y: 14,
    w: 7,
    h: 1,
    static: true,
  },
  {
    i: 'conservations_title_3',
    x: 15,
    y: 14,
    w: 8,
    h: 1,
    static: true,
  },
  {
    i: 'conservations_title_4',
    x: 23,
    y: 14,
    w: 7,
    h: 1,
    static: true,
  },

  ...[...Array(10)].map((_, idx) => ({
    i: `conservations_desc_${idx}`,
    x: 0 + (idx % 2) * 15,
    y: 15 + Math.floor(idx / 2) * 4,
    w: 8,
    h: 4,
    static: true,
  })),

  ...[...Array(10)].map((_, idx) => ({
    i: `conservations_view_${idx}`,
    x: 8 + (idx % 2) * 15,
    y: 15 + Math.floor(idx / 2) * 4,
    w: 7,
    h: 4,
    static: true,
  })),
];

export const cellsContent2 = data => [
  {
    key: 'reportTitle',
    content: (
      <Cell center>
        <h1>NARODOWE CENTRUM KULTURY FILMOWEJ</h1>
      </Cell>
    ),
  },
  {
    key: 'preservationState',
    content: (
      <Cell>
        <CellContent center>Stan zachowania</CellContent>
      </Cell>
    ),
  },
  {
    key: 'description',
    content: (
      <Cell>
        <CellHeader>Opis</CellHeader>
        <CellContent>{data?.preservationState?.description?.pl}</CellContent>
      </Cell>
    ),
  },
  {
    key: 'encodedImage',
    content: (
      <Cell>
        <CellHeader>Widok</CellHeader>
        <CellContent img>
          {data?.preservationState?.encodedImage && (
            <img src={getImage(data?.preservationState?.encodedImage)} alt='' />
          )}
        </CellContent>
      </Cell>
    ),
  },
  {
    key: 'conservation',
    content: (
      <Cell>
        <CellContent center>Zabiegi konserwacyjne</CellContent>
      </Cell>
    ),
  },
  {
    key: 'conservations_title_1',
    content: (
      <Cell>
        <CellContent center>Opis</CellContent>
      </Cell>
    ),
  },
  {
    key: 'conservations_title_2',
    content: (
      <Cell>
        <CellContent center>Widok</CellContent>
      </Cell>
    ),
  },
  {
    key: 'conservations_title_3',
    content: (
      <Cell>
        <CellContent center>Opis</CellContent>
      </Cell>
    ),
  },
  {
    key: 'conservations_title_4',
    content: (
      <Cell>
        <CellContent center>Widok</CellContent>
      </Cell>
    ),
  },
  ...[...Array(10)].map((_, idx) => ({
    key: `conservations_desc_${idx}`,
    content: (
      <Cell>
        <CellContent>
          {data?.preservationState?.conservations?.[idx]?.description?.pl}
        </CellContent>
      </Cell>
    ),
  })),
  ...[...Array(10)].map((_, idx) => ({
    key: `conservations_view_${idx}`,
    content: (
      <Cell>
        <CellContent img full>
          {data?.preservationState?.conservations?.[idx]?.encodedImage && (
            <img
              src={getImage(data?.preservationState?.conservations?.[idx])}
              alt=''
            />
          )}
        </CellContent>
      </Cell>
    ),
  })),
];
