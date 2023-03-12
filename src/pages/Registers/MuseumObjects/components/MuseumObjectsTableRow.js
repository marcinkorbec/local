import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import styled from 'styled-components';

import { rowMenuItems } from './MuseumObjectsTableData';
import MenuCell from './MenuCell';

const StyledTd = styled(Td)`
  background-color: ${({ isReturned }) => (isReturned ? '#b5ffbd' : '#ffc5c5')};
`;

const MuseumObjectsTableRow = ({ row, cols, dragOver, handleOpenModal }) => {
  const cells = cols.map((el, idx) => (
    <>
      {el?.fieldName !== 'role' && el?.fieldName !== 'menu' && (
        <>
          {el?.fieldName === 'isActive' ? (
            <StyledTd
              isReturned={row[el?.fieldName]}
              key={row[el?.fieldName]}
              dragOver={cols[idx] === dragOver}
            >
              {row[el?.fieldName] ? 'Tak' : 'Nie'}
            </StyledTd>
          ) : (
            <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
              {row[el?.fieldName]}
            </Td>
          )}
        </>
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

export default MuseumObjectsTableRow;
