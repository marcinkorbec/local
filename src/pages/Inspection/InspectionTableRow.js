import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import styled from 'styled-components';
import { inspStatus } from './status';

const StyledTd = styled(Td)`
  background: ${({ theme, selected }) =>
    selected ? theme.primaryDark : 'none'};
  height: 20%;
`;

const StyledTr = styled(Tr)`
  :hover {
    background: ${({ theme }) => theme.primaryDark} !important;
  }
`;

const InspectionTableRow = ({
  row,
  cols,
  dragOver,
  setInspectionId,
  inspectionId,
}) => {
  const cells = cols.map((el, idx) => (
    <>
      {el?.fieldName !== 'status' && el?.fieldName !== 'menu' && (
        <StyledTd
          key={row[el?.fieldName]}
          dragOver={cols[idx] === dragOver}
          onClick={() => setInspectionId(row.inspectionId)}
          selected={row.inspectionId === inspectionId}
        >
          {row[el?.fieldName]}
        </StyledTd>
      )}

      {el?.fieldName === 'status' && (
        <StyledTd
          key={row[el?.fieldName]}
          dragOver={cols[idx] === dragOver}
          selected={row.inspectionId === inspectionId}
        >
          {inspStatus[row?.status]?.label}
        </StyledTd>
      )}
    </>
  ));

  return <StyledTr>{cells}</StyledTr>;
};

export default InspectionTableRow;
