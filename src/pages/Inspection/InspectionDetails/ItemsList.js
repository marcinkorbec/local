import React from 'react';
import { status, defaultDimension } from '../status';
import * as S from './InspectionDetails.css';

const ItemsList = ({ inspectionDetails, printItemsRef, smallTable }) => {
  const smallItemsList = inspectionDetails?.items?.map(el => (
    <S.Tr>
      <S.Td>{el.name}</S.Td>
      <S.Td>{status[el.status].label}</S.Td>
    </S.Tr>
  ));

  const itemsList = inspectionDetails?.items?.map(el => (
    <S.Tr>
      <S.Td>{el.name}</S.Td>
      <S.Td>{el.comment}</S.Td>
      <S.Td>
        {el.dimension.map(dim => (
          <>
            <span>
              {defaultDimension[dim.name]?.label != null
                ? defaultDimension[dim.name]?.label
                : dim.name}
              : {dim.value} {dim.unit}
            </span>
            <br />
          </>
        ))}
      </S.Td>
      <S.Td>{el.technique}</S.Td>
      <S.Td>
        {el.value} {el.value && 'zł'}
      </S.Td>
      <S.Td>{status[el.status].label}</S.Td>
    </S.Tr>
  ));

  return (
    <S.ReportWrap ref={printItemsRef}>
      <S.Header>
        <div>Lista przedmiotów:</div>
      </S.Header>
      {smallTable ? (
        <S.Table>
          <S.Tr>
            <S.Td header>Nazwa</S.Td>
            <S.Td header>Status</S.Td>
          </S.Tr>
          {smallItemsList}
        </S.Table>
      ) : (
        <S.Table>
          <S.Tr>
            <S.Td header>Nazwa</S.Td>
            <S.Td header>Komentarz</S.Td>
            <S.Td header>Wymiary</S.Td>
            <S.Td header>Technika</S.Td>
            <S.Td header>Wartość</S.Td>
            <S.Td header>Status</S.Td>
          </S.Tr>
          {itemsList}
        </S.Table>
      )}
    </S.ReportWrap>
  );
};

export default ItemsList;
