import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import MainWrapper from 'common/MainWrapper';
import * as S from './InspectionDetails.css';
import ItemsList from './ItemsList';
import ReportList from './ReportList';

const InspectionDetails = () => {
  const { id } = useParams();
  const [inspectionDetails, setInspectionDetails] = useState();
  const [smallTable, setSmallTable] = useState(false);
  const [date, setDate] = useState(null);

  const getOrdinance = async () => {
    if (inspectionDetails?.id) {
      try {
        const resp = await api.getOrdinance(inspectionDetails?.id);

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        const blob = new Blob([resp.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `Zarządzenie do skontrum ${inspectionDetails?.symbol}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        err?.response?.data?.errors?.map(el =>
          toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
        );
      }
    }
  };

  const printItemsRef = useRef();
  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printItemsRef.current,
  });
  const handlePrintReport = useReactToPrint({
    content: () => printReportRef.current,
  });

  useEffect(() => {
    const getInspectionDetails = async () => {
      try {
        let day;
        if (date != null) {
          day = `day=${date}`;
        }
        const resp = await api.getInspectionDetails(id, day);
        setInspectionDetails(resp.data);
      } catch (err) {
        err?.response?.data?.errors?.map(el =>
          toast.info(<div>{el.message}</div>, OPTIONS)
        );
      }
    };

    getInspectionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const getDate = e => {
    setDate(e.target.value);
  };

  return (
    <MainWrapper>
      <S.Menu>
        Opcje:
        <S.Button type='button' onClick={() => setSmallTable(prev => !prev)}>
          {!smallTable ? 'Mniej szczegółów' : 'Więcej szczegółów'}
        </S.Button>
        <S.Button type='button' onClick={handlePrintReport}>
          <PrintIcon /> Drukuj raport
        </S.Button>
        <S.Button type='button' onClick={handlePrint}>
          <PrintIcon /> Drukuj listę przedmiotów
        </S.Button>
        <S.Button type='button' onClick={getOrdinance}>
          Pobierz zarządzenie
        </S.Button>
        Filtruj raport:
        <input type='date' value={date} onChange={getDate} />
      </S.Menu>
      <S.Wrapper>
        <ReportList
          inspectionDetails={inspectionDetails}
          printReportRef={printReportRef}
          id='printReport'
        />
        <ItemsList
          inspectionDetails={inspectionDetails}
          printItemsRef={printItemsRef}
          id='printItems'
          smallTable={smallTable}
        />
      </S.Wrapper>
    </MainWrapper>
  );
};

export default InspectionDetails;
