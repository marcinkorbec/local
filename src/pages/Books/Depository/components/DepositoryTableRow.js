import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import styled from 'styled-components';

import { rowMenuItems } from './DepositoryTableData';
import MenuCell from './MenuCell';

const StyledTd = styled(Td)`
  background-color: ${({ isReturned }) => (isReturned ? '#b5ffbd' : '#ffc5c5')};
`;

const DepositoryTableRow = ({ row, cols, dragOver, handleOpenModal }) => {
  const cells = cols.map((el, idx) => (
    <>
      {el?.fieldName !== 'role' && el?.fieldName !== 'menu' && (
        <>
          {el?.fieldName === 'isReturned' ? (
            <StyledTd
              isReturned={row[el?.fieldName]}
              key={row[el?.fieldName]}
              dragOver={cols[idx] === dragOver}
            >
              {row[el?.fieldName] ? 'Tak' : 'Nie'}
            </StyledTd>
          ) : (
            <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
              {el?.fieldName === 'material'
                ? row[el?.fieldName]?.[0]?.materialTypes?.pl
                : el?.fieldName === 'author'
                ? row[el?.fieldName]?.[0]?.name
                : el?.fieldName === 'technique'
                ? row[el?.fieldName]?.[0]?.techniqueTypes?.pl
                : el?.fieldName === 'source'
                ? row[el?.fieldName]?.acquisition?.source?.pl
                : row[el?.fieldName]}
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

export default DepositoryTableRow;
