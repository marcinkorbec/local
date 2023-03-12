/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { api } from 'API';
import allActions from 'store/actions';
import { OPTIONS } from 'utils/toastOptions';

import Modal from 'common/Modal/Modal';
import Table from 'common/table/Table';

import ModalContent from './ModalContent';
import defaultColumns from './columns';
import advancedFilters from './advancedFilters';
import { modalTypes } from './MuseumObjectsTableData';

const LINK = 'local/books/evidence';
const NAME = 'evidence';

const MuseumObjectsTable = ({ dumbTrick }) => {
  const dispatch = useDispatch();
  const { [NAME]: dataTable } = useSelector(state => state.currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(modalTypes.default);
  const [submit, setSubmit] = useState('');
  const [modalData, setModalData] = useState({});
  const [columns, setColumns] = useState(defaultColumns);

  const [menuFunctions, setMenuFunctions] = useState({
    changeStatus: false,
    delete: false,
    invite: false,
    thanks: false,
    currentRow: null,
  });

  const getValues = (newValue = null) => {
    dispatch(allActions.currentPage.tableGetAction(NAME, newValue, LINK));
  };

  const deleteBook = async ({ id }) => {
    try {
      await api.deleteBook(id);
      toast.success('Księga została usunięta', OPTIONS);
      getValues();
      setIsModalOpen(false);
    } catch (e) {
      toast.error(
        `Wystąpił problem podczas usuwania księgi.  ${JSON.stringify(
          e?.response?.data?.message || ''
        )}`,
        OPTIONS
      );
    }
  };

  const copyBook = async ({ id }) => {
    try {
      await api.copyBook(id);
      toast.success('Księga została skopiowana.', OPTIONS);
      getValues();
      setIsModalOpen(false);
    } catch (e) {
      toast.error(
        `Wystąpił problem podczas kopiowania księgi. ${JSON.stringify(
          e?.response?.data?.message || ''
        )}`,
        OPTIONS
      );
    }
  };

  const editBook = async ({ id, data }) => {
    try {
      await api.updateBook(id, data);
      toast.success('Księga została zaktualizowana', OPTIONS);
      getValues();
      setIsModalOpen(false);
    } catch (e) {
      toast.error(
        `Wystąpił problem podczas aktualizowania księgi. ${JSON.stringify(
          e?.response?.data?.message || ''
        )}`,
        OPTIONS
      );
    }
  };

  const handleOpenModal = (row, fName) => {
    let info;
    switch (fName) {
      case 'copyBook':
        info = 'Kopiuj poniższą księgę';
        setModalType(modalTypes.copyBook);
        setSubmit(modalTypes.copyBook);
        break;
      case 'editBook':
        info = 'Edytuj poniższą księgę';
        setModalType(modalTypes.editBook);
        setSubmit(modalTypes.editBook);
        break;
      case 'deleteBook':
        info = 'Czy na pewno chcesz usunąć poniższą księgę?';
        setModalType(modalTypes.deleteBook);
        setSubmit('deleteBook');
        break;
      default:
        setModalType(modalTypes.default);
        setSubmit('');
    }

    setModalData({
      bookId: row?.id,
      info,
    });

    setIsModalOpen(true);
  };

  const submitMethod = () => {
    switch (submit) {
      case 'deleteBook':
        return deleteBook;
      case 'editBook':
        return editBook;
      case 'copyBook':
        return copyBook;
      default:
        // eslint-disable-next-line no-console
        return console.log;
    }
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

  const getModalContent = () => {
    switch (modalType) {
      case modalTypes.copyBook:
        return (
          <ModalContent
            onSubmit={submitMethod()}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      case modalTypes.editBook:
        return (
          <ModalContent
            editable
            onSubmit={submitMethod()}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      case modalTypes.deleteBook:
        return (
          <ModalContent
            onSubmit={submitMethod()}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      default:
        return (
          <ModalContent
            onSubmit={submitMethod()}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
    }
  };

  useEffect(() => {
    getValues();
    getColsOrder();
  }, [dumbTrick]);

  return (
    <>
      <Table
        name={NAME}
        columns={[...columns]}
        rows={dataTable}
        getValues={getValues}
        searchPlaceholder='Szukaj'
        advancedFilters={advancedFilters}
        tableToolData={{}}
        data={dataTable}
        menuFunctions={menuFunctions}
        setMenuFunctions={setMenuFunctions}
        tableStyle={{ border: 'none' }}
        rowFunctions={{ handleOpenModal }}
        saveColsOrder={saveColsOrder}
        noFilterColumns={['isActive', 'id']}
      />

      {submit && (
        <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
          {getModalContent()}
        </Modal>
      )}
    </>
  );
};

export default MuseumObjectsTable;
