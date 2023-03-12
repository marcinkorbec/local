/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import allActions from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';

import MainWrapper from 'common/MainWrapper';
import PopUp from 'common/PopUp/PopUp';
import Table from 'common/table/Table';
import Attachments from './InspectionItemsTable/Attachments';
import * as S from './Inspection.css';
import InspectionWorkers from './InspectionWorkers';

import defaultColumns from './columns';
import EditInspection from './EditInspection';
import InspectionItemsTable from './InspectionItemsTable/InspectionItemsTable';

import advancedFilters from './advancedFilters';

const NAME = 'inspection';
const LINK = 'local/inspection/management/table';

const Inspection = () => {
  const dispatch = useDispatch();
  const { inspection: dataTable } = useSelector(state => state.currentPage);
  const [columns, setColumns] = useState(defaultColumns);
  const [currentId, setCurrentId] = useState();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [activeInspectionData, setActiveInspectionData] = useState({});

  const detailsPattern = {
    symbol: '',
    documentNumber: '',
    dateFrom: '',
    dateTo: '',
    classificationSystem: '',
    introduction: '',
    comments: '',
    summary: '',
  };

  const [inventoryDetails, setInventoryDetails] = useState(detailsPattern);
  const [rowStatus, setRowStatus] = useState();

  const getStatus = () => {
    const row = dataTable?.find(el => el.inspectionId === currentId);
    setRowStatus(row?.status);
  };

  const updateInventoryDetails = (name, e, isSelect) => {
    if (isSelect === 'select') {
      setInventoryDetails(prev => ({
        ...prev,
        [name]: e.value,
      }));
    } else
      setInventoryDetails(prev => ({
        ...prev,
        [name]: e.target.value,
      }));
  };

  const [togglePopUp, setTogglePopUp] = useState(false);
  const [toggleOrdPopUp, setToggleOrdPopUp] = useState(false);

  const closePopUp = () => {
    setTogglePopUp(false);
    setInventoryDetails(detailsPattern);
  };

  const getValues = (newValue = null) => {
    dispatch(allActions.currentPage.tableGetAction(NAME, newValue, LINK));
  };

  const saveColsOrder = cols => {
    localStorage.setItem(`${NAME}_settings`, JSON.stringify(cols));
    setColumns(cols);
  };

  const getColsOrder = () => {
    try {
      const imported = JSON.parse(localStorage.getItem(`${NAME}_settings`));
      const cols = imported || defaultColumns;
      setColumns(cols);
    } catch {
      localStorage.removeItem(`${NAME}_settings`);
    }
  };

  const getActiveInspectionDetails = async () => {
    try {
      const resp = await api.getActiveInspectionDetails();
      setActiveInspectionData(resp.data);
    } catch (err) {
      setActiveInspectionData({});
      err?.response?.data?.errors?.map(el =>
        toast.info(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const newInspection = async () => {
    try {
      const resp = await api.postNewInspection();
      setCurrentId(resp.data);
      setInventoryDetails(detailsPattern);
      getValues();
      toast.success(
        'Pomyślnie utworzono nowe skontrum. Dodaj szczegóły teraz lub uzupełnij je później.',
        OPTIONS
      );
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  const updateInspection = async e => {
    try {
      e.preventDefault();
      await api.putEditInspection(currentId, inventoryDetails);
      setInventoryDetails(detailsPattern);
      getValues();
      closePopUp();
      toast.success('Pomyślnie zmieniono szczegóły skontrum.', OPTIONS);
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  const startInspection = async () => {
    try {
      await api.putStartInspection(currentId);
      getValues();
      getActiveInspectionDetails();
      toast.success('Pomyślnie rozpoczęto skontrum.');
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const endInspection = async () => {
    try {
      await api.putEndInspection(currentId);
      getValues();
      getActiveInspectionDetails();
      toast.success('Pomyślnie zakończono skontrum.', OPTIONS);
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const closeInspection = async () => {
    try {
      await api.putCloseInspection(currentId);
      getValues();
      getActiveInspectionDetails();
      toast.success('Pomyślnie zamknięto skontrum', OPTIONS);
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const getInspectionDetails = async () => {
    if (currentId)
      try {
        const resp = await api.getInspectionDetails(currentId);
        setInventoryDetails(resp.data);
      } catch (err) {
        toast.error('Wystąpił błąd');
      }
  };

  useEffect(() => {
    getStatus();
  }, [currentId]);

  useEffect(() => {
    getValues();
    getActiveInspectionDetails();
    getColsOrder();
  }, []);

  const editInspection = () => {
    getInspectionDetails();
    setToggleEdit(true);
    setTogglePopUp(true);
  };

  const createInspection = () => {
    newInspection();
    setToggleEdit(true);
    setTogglePopUp(true);
  };

  const recalculate = () => {
    getValues();
  };

  const ordinancePopUp = () => {
    setToggleOrdPopUp(true);
  };

  return (
    <MainWrapper>
      <S.Wrapper>
        <InspectionWorkers inspectionId={currentId} />
        <S.TableWrapper>
          <Table
            name={NAME}
            columns={[...columns]}
            rows={dataTable}
            getValues={getValues}
            data={dataTable}
            tableStyle={{ border: 'none' }}
            saveColsOrder={saveColsOrder}
            inspectionId={currentId}
            setInspectionId={setCurrentId}
            noColumnFilter
            advancedFilters={advancedFilters}
            noSearch
            headerAutoHeight
          />
          <S.ButtonsWrapper>
            <S.Button onClick={createInspection}>Utwórz nowe skontrum</S.Button>
            <S.Button onClick={startInspection} disabled={currentId == null}>
              Rozpocznij skontrum
            </S.Button>
            <S.Button onClick={endInspection} disabled={currentId == null}>
              Zakończ skontrum
            </S.Button>
            <S.Button onClick={closeInspection} disabled={currentId == null}>
              Zamknij skontrum
            </S.Button>
            <S.Button onClick={ordinancePopUp} disabled={currentId == null}>
              Dodaj zarządzenie
            </S.Button>
            <S.Button onClick={editInspection} disabled={currentId == null}>
              Edytuj szczegóły
            </S.Button>
            <Link
              to={`/inspection/details/${currentId}`}
              style={{
                pointerEvents: currentId == null ? 'none' : 'auto',
                cursor: currentId == null ? 'not-allowed' : 'pointer',
                display: 'flex',
              }}
            >
              <S.Button disabled={currentId == null}> Zobacz raport </S.Button>
            </Link>

            <S.Button onClick={recalculate}>Przelicz</S.Button>
          </S.ButtonsWrapper>
        </S.TableWrapper>

        <S.ItemsTableWrapper>
          <InspectionItemsTable
            activeInspectionData={activeInspectionData}
            inspectionId={currentId}
            rowStatus={rowStatus}
          />
        </S.ItemsTableWrapper>
        <EditInspection
          newInspection={newInspection}
          togglePopUp={togglePopUp}
          closePopUp={closePopUp}
          inventoryDetails={inventoryDetails}
          updateInventoryDetails={updateInventoryDetails}
          toggleEdit={toggleEdit}
          updateInspection={updateInspection}
        />

        <PopUp
          title='Dodaj zarządzenie'
          togglePopUp={toggleOrdPopUp}
          setTogglePopUp={setToggleOrdPopUp}
        >
          <Attachments
            inspectionId={currentId}
            closePopUp={() => setToggleOrdPopUp(false)}
          />
        </PopUp>
      </S.Wrapper>
    </MainWrapper>
  );
};

export default Inspection;
