import React from 'react';
import { inspStatus } from '../status';
import * as S from './InspectionDetails.css';

const ReportList = ({ inspectionDetails, printReportRef }) => {
  const workers = inspectionDetails?.inspectionMembers?.map(el => (
    <>
      <S.Tr>
        <S.Td>{el.name}</S.Td>
        <S.Td>{el.surname}</S.Td>
        <S.Td>{el.participationType}</S.Td>
        <S.Td>{el.team}</S.Td>
      </S.Tr>
    </>
  ));

  return (
    <S.ReportWrap ref={printReportRef}>
      <S.Title>Raport</S.Title>
      <S.ReportTablesWrap>
        <tr>
          <td>
            <S.Header>Szczegóły skontrum:</S.Header>
            <S.Table>
              <S.Tr>
                <S.Td>Nr inwentarzowy:</S.Td>
                <S.Td>{inspectionDetails?.symbol}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Numer dokumentu:</S.Td>
                <S.Td>{inspectionDetails?.documentNumber}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Data rozpoczęcia:</S.Td>
                <S.Td>{inspectionDetails?.dateFrom}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Data zakończenia:</S.Td>
                <S.Td>{inspectionDetails?.dateTo}</S.Td>
              </S.Tr>

              <S.Tr>
                <S.Td>Wstęp:</S.Td>
                <S.Td>{inspectionDetails?.introduction}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Uwagi:</S.Td>
                <S.Td>{inspectionDetails?.comments}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Podsumowanie:</S.Td>
                <S.Td>{inspectionDetails?.summary}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Dział muzeum:</S.Td>
                <S.Td>{inspectionDetails?.classificationSystem}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Status:</S.Td>
                <S.Td>{inspStatus[inspectionDetails?.status]?.label}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Ilość spisowa:</S.Td>
                <S.Td>{inspectionDetails?.censusQuantity}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Ilość potwierdzona:</S.Td>
                <S.Td>{inspectionDetails?.confirmedQuantity}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Ilość wypożyczonych:</S.Td>
                <S.Td>{inspectionDetails?.borrowedQuantity}</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Ilość braków:</S.Td>
                <S.Td>{inspectionDetails?.missingQuantity}</S.Td>
              </S.Tr>
            </S.Table>
          </td>
          <td>
            <S.Header>Uczestnicy skontrum:</S.Header>
            <S.Table>
              <S.Tr>
                <S.Td header>Imię</S.Td>
                <S.Td header>Nazwisko</S.Td>
                <S.Td header> Typ uczestnictwa</S.Td>
                <S.Td header>Nazwa zespołu</S.Td>
              </S.Tr>
              {workers}
            </S.Table>
          </td>
        </tr>
      </S.ReportTablesWrap>
    </S.ReportWrap>
  );
};

export default ReportList;
