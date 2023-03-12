import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';

import { rowMenuItems } from './AccessionTableData';
import MenuCell from './MenuCell';

const AccessionTableRow = ({ row, cols, dragOver, handleOpenModal }) => {
  const cells = cols.map((el, idx) => (
    <>
      {el?.fieldName !== 'role' && el?.fieldName !== 'menu' && (
        <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
          {row[el?.fieldName]}
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

export default AccessionTableRow;
