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
import { modalTypes } from './SupportingEvidenceTableData';
import ModalContentMove from './ModalContentMove';
import ModalContentConnect from './ModalContentConnect';
import ModalContentItemElements from './ModalContentItemElements';
import ModalContentItemPricing from './ModalContentItemPricing';

const LINK = 'local/items/supporting/evidence';
const NAME = 'supportingEvidenceItem';

const SupportingEvidenceTable = () => {
  const dispatch = useDispatch();
  const { [NAME]: dataTable } = useSelector(state => state.currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(modalTypes.default);
  const [submit, setSubmit] = useState('');
  const [modalData, setModalData] = useState({});
  const [columns, setColumns] = useState(defaultColumns);
  const [classifications, setClassifications] = useState([]);

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

  const getClassifications = async () => {
    try {
      const { data } = await api.getClassificationSystem();
      const mapped = data?.map(el => ({
        label: `${el.shortcut} - ${el.name?.pl}`,
        value: el.name?.pl,
      }));
      setClassifications(mapped);
    } catch {
      toast.error(
        'Wystąpił problem podczas pobierania danych filtrowania',
        OPTIONS
      );
    }
  };

  const deleteItem = async id => {
    try {
      await api.deleteItem(id);
      toast.success('Przedmiot został usunięty', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas usuwania przedmiotu', OPTIONS);
    }
    getValues();
    setIsModalOpen(false);
  };

  const handleOpenModal = (row, fName) => {
    let info;
    switch (fName) {
      case 'move':
        setModalType(modalTypes.move);
        setSubmit(modalTypes.move);
        break;
      case 'copyItem':
        setModalType(modalTypes.copyItem);
        setSubmit(modalTypes.copyItem);
        break;
      case 'connectItem':
        setModalType(modalTypes.connectItem);
        setSubmit(modalTypes.connectItem);
        break;
      case 'removeItem':
        setModalType(modalTypes.removeItem);
        setSubmit(modalTypes.removeItem);
        break;
      case 'itemPricing':
        setModalType(modalTypes.itemPricing);
        setSubmit(modalTypes.itemPricing);
        break;
      case 'itemElements':
        setModalType(modalTypes.itemElements);
        setSubmit(modalTypes.itemElements);
        break;
      case 'deleteItem':
        info = 'Czy na pewno chcesz usunąć poniższy przedmiot?';
        setModalType(modalTypes.default);
        setSubmit('deleteItem');
        break;
      default:
        setModalType(modalTypes.default);
        setSubmit('');
    }

    setModalData({
      row,
      info,
    });

    setIsModalOpen(true);
  };

  const submitMethod = () => {
    switch (submit) {
      case 'deleteItem':
        return deleteItem;
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
      if (imported?.length !== defaultColumns?.length) {
        localStorage.removeItem(`${NAME}_settings`);
        setColumns(defaultColumns);
      }
      const cols = imported || defaultColumns;
      setColumns(cols);
    } catch {
      localStorage.removeItem(`${NAME}_settings`);
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case modalTypes.move:
        return (
          <ModalContentMove
            getValues={getValues}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      case modalTypes.copyItem:
        return (
          <ModalContentMove
            copy
            getValues={getValues}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      case modalTypes.removeItem:
        return (
          <ModalContentMove
            removeItem
            getValues={getValues}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      case modalTypes.connectItem:
        return (
          <ModalContentConnect
            getValues={getValues}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );
      case modalTypes.itemElements:
        return (
          <ModalContentItemElements
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        );

      case modalTypes.itemPricing:
        return (
          <ModalContentItemPricing
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
    getClassifications();
  }, []);

  return (
    <>
      <Table
        name={NAME}
        columns={[...columns]}
        rows={dataTable}
        getValues={getValues}
        searchPlaceholder='Szukaj'
        advancedFilters={advancedFilters({ classifications })}
        tableToolData={{}}
        data={dataTable}
        menuFunctions={menuFunctions}
        setMenuFunctions={setMenuFunctions}
        tableStyle={{ border: 'none' }}
        rowFunctions={{ handleOpenModal }}
        saveColsOrder={saveColsOrder}
        noFilterColumns={['image', 'id']}
      />

      {submit && (
        <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
          {getModalContent()}
        </Modal>
      )}
    </>
  );
};

export default SupportingEvidenceTable;
