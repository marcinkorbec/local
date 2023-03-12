import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import { status, defaultDimension } from '../status';
import { rowMenuItems } from './InspectionTableData';
import MenuCell from './MenuCell';

const InspectionItemsTableRow = ({
  row,
  cols,
  dragOver,
  handleOpenModal,
  rowStatus,
}) => {
  const cells = cols.map((el, idx) => (
    <>
      {el?.fieldName !== 'status' &&
        el?.fieldName !== 'menu' &&
        el?.fieldName !== 'dimension' && (
          <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
            {row[el?.fieldName]}
            {el[idx]?.fieldName === 'status' && status[row.status].label}
          </Td>
        )}
      {el?.fieldName === 'status' && (
        <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
          {status[row.status].label}
        </Td>
      )}

      {el?.fieldName === 'dimension' && (
        <Td key={row[el?.fieldName]} dragOver={cols[idx] === dragOver}>
          {row.dimension.length > 0 &&
            row?.dimension?.map(dim => (
              <>
                <span>
                  {defaultDimension[dim?.name]?.label != null
                    ? defaultDimension[dim?.name]?.label
                    : dim.name}
                  : {dim.value} {dim.unit}
                </span>
                <br />
              </>
            ))}
        </Td>
      )}
    </>
  ));

  return (
    <Tr>
      {cells}
      <MenuCell
        row={row}
        menuItems={rowMenuItems.filter(
          el => el.notVisible !== rowStatus || el.always
        )}
        handleOpenModal={handleOpenModal}
      />
    </Tr>
  );
};

export default InspectionItemsTableRow;
