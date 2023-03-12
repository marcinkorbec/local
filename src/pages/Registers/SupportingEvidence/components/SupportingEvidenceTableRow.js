import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import styled from 'styled-components';
import getImage from 'common/helpers/getImage';

import { rowMenuItems } from './SupportingEvidenceTableData';
import MenuCell from './MenuCell';

const ObjectMainImage = styled.div`
  position: relative;
  width: 100px;
  height: 60px;

  .preview {
    z-index: 1000;
    max-height: 40px;
    position: absolute;
    transition: 0.5s;
    transform: scale(1) translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  &:hover {
    .preview {
      transform: scale(10) translateX(60%);
    }
  }
`;

const MainImageMini = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  max-height: 40px;
`;

const SupportingEvidenceTableRow = ({
  row,
  cols,
  dragOver,
  handleOpenModal,
}) => {
  const cells = cols.map((el, idx) => (
    <>
      {el?.fieldName !== 'role' && el?.fieldName !== 'menu' && (
        <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
          {el?.fieldName === 'image' ? (
            <ObjectMainImage>
              <MainImageMini
                src={getImage(row[el?.fieldName]?.encoded)}
                alt=''
              />
              <img
                className='preview'
                src={getImage(row[el?.fieldName]?.encoded)}
                alt=''
              />
            </ObjectMainImage>
          ) : el?.fieldName === 'material' ? (
            row[el?.fieldName]?.[0]?.materialTypes?.pl
          ) : el?.fieldName === 'author' ? (
            row[el?.fieldName]?.[0]?.name
          ) : el?.fieldName === 'technique' ? (
            row[el?.fieldName]?.[0]?.techniqueTypes?.pl
          ) : (
            row[el?.fieldName]
          )}
        </Td>
      )}
    </>
  ));

  return (
    <Tr>
      {cells}
      <Td>
        <MenuCell
          row={row}
          menuItems={rowMenuItems.filter(
            el => el.notVisible === row.role || el.always
          )}
          handleOpenModal={handleOpenModal}
        />
      </Td>
    </Tr>
  );
};

export default SupportingEvidenceTableRow;
