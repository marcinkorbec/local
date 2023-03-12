export const handleOnChangeSelectedRows = (
  id,
  selectedRows,
  setSelectedRows
) => {
  let tempArray;
  if (selectedRows.includes(id)) {
    tempArray = selectedRows.filter(el => el !== id);
  } else {
    tempArray = [...selectedRows, id];
  }
  setSelectedRows(tempArray);
};

export const toggleSelectAllRows = ({
  selectedRows,
  dataTable,
  setSelectedRows,
}) => {
  if (selectedRows?.length === dataTable?.length) {
    setSelectedRows([]);
  } else {
    setSelectedRows(dataTable.map(el => el.id));
  }
};
