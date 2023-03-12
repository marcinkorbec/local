import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  DoubleCell,
  PointsList,
  ListEl,
  ListElDesc,
  ListElTitle,
} from './Bookmarks.css';

const PreservationPointsList = ({
  setCurrentPoint,
  setToggleAddNewPoints,
  points,
  imgId,
  setImgId,
}) => {
  const [selectedItem, setSelectedItem] = useState();
  const [toggleItem, setToggleItem] = useState(false);

  const togglePointsFromList = el => {
    setImgId(imgId);
    setToggleAddNewPoints(false);
    setSelectedItem(el.id);
    setToggleItem(true);
    if (el.id === selectedItem && toggleItem === true) {
      setToggleItem(false);
    }
    setCurrentPoint(el);
  };

  const pointsList = points.map(el => (
    <ListEl key={JSON.stringify(el)}>
      <ListElTitle onClick={() => togglePointsFromList(el)}>
        {el.title}
        {selectedItem === el?.id && toggleItem ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </ListElTitle>
      <ListElDesc toggle={selectedItem === el?.id && toggleItem}>
        {el.description}
      </ListElDesc>
    </ListEl>
  ));

  return (
    <DoubleCell>
      <PointsList>{pointsList}</PointsList>
    </DoubleCell>
  );
};

export default PreservationPointsList;
