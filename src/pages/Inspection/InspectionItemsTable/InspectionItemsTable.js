/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import allActions from 'store/actions';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { OPTIONS } from 'utils/toastOptions';

import Table from 'common/table/Table';
import PopUp from 'common/PopUp/PopUp';

import { api } from 'API';
import * as S from '../Inspection.css';
import defaultColumns from './columns';

import EditCommentModal from './InspectionItemsModals/EditCommentModal';
import ChangeStatusModal from './InspectionItemsModals/ChangeStatusModal';

const NAME = 'inspectionItems';
const LINK = 'local/inspection/process/table';

const ActiveInsp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;

  span {
    font-weight: 600;
  }
`;

const InspectionItemsTable = ({
  activeInspectionData,
  inspectionId,
  rowStatus,
}) => {
  const dispatch = useDispatch();
  const { inspectionItems: dataTable } = useSelector(
    state => state.currentPage
  );
  const [columns, setColumns] = useState(defaultColumns);
  const [menuFunctions, setMenuFunctions] = useState({
    changeStatus: false,
    deleteItem: false,
    editComment: false,
    currentRow: null,
  });
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalData, setModalData] = useState({
    rowId: '',
    fName: '',
  });

  const [formFields, setFormFields] = useState({
    comment: '',
    status: '',
  });

  const handleInput = e => {
    setFormFields(prev => ({
      ...prev,
      [e?.target?.name]: e.target.value,
    }));
  };

  const handleSelectInput = e => {
    setFormFields(prev => ({
      ...prev,
      status: e.value,
    }));
  };

  const getValues = (newValue = null) => {
    if (Object.keys(activeInspectionData).length === 0 && inspectionId != null)
      dispatch(
        allActions.currentPage.tableGetAction(
          NAME,
          { ...newValue, inspectionId },
          LINK
        )
      );
    else if (Object.keys(activeInspectionData).length > 0)
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

  useEffect(() => {
    getValues();
    getColsOrder();
  }, [activeInspectionData, inspectionId]);

  useEffect(() => {
    if (Object.keys(activeInspectionData).length === 0) {
      dispatch(
        allActions.filters.setFilterTable({
          nameFilter: 'inspectionId',
          value: inspectionId,
          nameTable: NAME,
        })
      );
    }
  }, [inspectionId]);

  const handleOpenModal = (row, fName) => {
    setModalData({ rowId: row.itemId, fName });
    setRowData(row);
    setTogglePopUp(true);
    if (row.comment != null) {
      setFormFields(prev => ({ ...prev, comment: row.comment }));
    }
    if (row.status != null) {
      setFormFields(prev => ({ ...prev, status: row.status }));
    }
  };

  const deleteItem = async () => {
    const id = activeInspectionData.id ? activeInspectionData.id : inspectionId;
    try {
      await api.deleteInspectionItem(id, modalData.rowId);
      setTogglePopUp(false);
      toast.success('Pomyślnie usunięto przedmiot ze skontrum.');
      getValues();
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const editComment = async () => {
    const data = { content: formFields.comment };
    try {
      if (activeInspectionData.id != null)
        await api.putInspectionProcessComment(modalData.rowId, data);
      else
        await api.putFixInspectionProcessComment(
          inspectionId,
          modalData.rowId,
          data
        );
      toast.success('Pomyślnie edytowano komentarz do przedmiotu.');
      setTogglePopUp(false);
      setFormFields({
        comment: '',
        status: '',
      });
      getValues();
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const changeStatus = async () => {
    try {
      if (activeInspectionData.id != null)
        await api.putInspectionProcessStatus(
          modalData.rowId,
          formFields.status
        );
      else
        await api.putFixInspectionProcessStatus(
          inspectionId,
          modalData.rowId,
          formFields.status
        );
      toast.success('Pomyślnie zmieniono status przedmiotu.');
      setTogglePopUp(false);
      setFormFields({
        comment: '',
        status: '',
      });
      getValues();
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const closePopUp = () => {
    setTogglePopUp(false);
    setFormFields({
      comment: '',
      status: '',
    });
  };

  return (
    <>
      {Object.keys(activeInspectionData).length > 0 || inspectionId != null ? (
        <>
          <ActiveInsp>
            {Object.keys(activeInspectionData).length > 0 ? (
              <div>
                Aktywne skontrum o nr inwentarzowym:
                <span> {activeInspectionData.symbol} </span>
              </div>
            ) : (
              <div>
                Wybrano skontrum o id:
                <span> {inspectionId} </span>
              </div>
            )}
          </ActiveInsp>

          <Table
            name={NAME}
            columns={[...columns]}
            rows={dataTable}
            getValues={getValues}
            data={dataTable}
            tableStyle={{ border: 'none' }}
            tableToolData={{}}
            noColumnFilter
            saveColsOrder={saveColsOrder}
            rowFunctions={{ handleOpenModal }}
            menuFunctions={menuFunctions}
            setMenuFunctions={setMenuFunctions}
            rowStatus={rowStatus}
          />
        </>
      ) : (
        <S.Notice style={{ height: '100%' }}>
          Wybierz skontrum z tabeli lub rozpocznij skontrum, aby zobaczyć listę
          przedmiotów.
        </S.Notice>
      )}

      {modalData.fName === 'deleteItem' && (
        <PopUp
          title='Usuń przedmiot'
          text={`Czy na pewno chcesz usunąć przedmiot o nazwie 
           ${rowData.name} oraz id ${rowData.itemId}`}
          togglePopUp={togglePopUp}
          setTogglePopUp={closePopUp}
          buttons
          actionButtonText='Usuń'
          actionButtonFunc={deleteItem}
        />
      )}

      {modalData.fName === 'editComment' && (
        <PopUp
          title='Edytuj komentarz'
          togglePopUp={togglePopUp}
          setTogglePopUp={closePopUp}
          buttons
          actionButtonText='Dodaj'
          actionButtonFunc={editComment}
        >
          <EditCommentModal
            rowData={rowData}
            formFields={formFields}
            handleInput={handleInput}
          />
        </PopUp>
      )}

      {modalData.fName === 'changeStatus' && (
        <PopUp
          title='Zmień status'
          togglePopUp={togglePopUp}
          setTogglePopUp={setTogglePopUp}
        >
          <ChangeStatusModal
            rowData={rowData}
            formFields={formFields}
            handleSelectInput={handleSelectInput}
            actionButtonFunc={changeStatus}
            closePopUp={closePopUp}
          />
        </PopUp>
      )}

      {
        // temporary link, replace with item page when done
        modalData.fName === 'viewDetails' && (
          <Redirect to={`/item-creator/${modalData.rowId}`} />
        )
      }
    </>
  );
};

export default InspectionItemsTable;
