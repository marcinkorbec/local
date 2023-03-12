export const handleDragStart = (e, cols) => {
  const { id } = e.target;
  const idx = cols.map(col => col.fieldName).indexOf(id);
  e.dataTransfer.setData('colIdx', idx);
};

export const handleDragOver = e => e.preventDefault();

export const handleDragEnter = (e, setDragOver) => {
  const { id } = e.target;
  setDragOver(id);
};

export const handleOnDrop = (e, cols, setCols, setDragOver, saveColsOrder) => {
  const { id } = e.target;
  const droppedColIdx = cols.map(col => col.fieldName).indexOf(id);
  const draggedColIdx = e.dataTransfer.getData('colIdx');
  const tempCols = [...cols];

  tempCols[draggedColIdx] = cols[droppedColIdx];
  tempCols[droppedColIdx] = cols[draggedColIdx];

  // if (droppedColIdx < 0) return;

  if (!cols[droppedColIdx].draggable || droppedColIdx < 0) {
    setDragOver('');
    return;
  }

  setCols(tempCols);
  saveColsOrder(tempCols);
  setDragOver('');
};
