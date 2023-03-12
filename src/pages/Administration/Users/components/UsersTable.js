/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { api } from 'API';
import allActions from 'store/actions';
import { OPTIONS } from 'utils/toastOptions';
import { InputMui } from 'common/Inputs/StyledInputs.css';

import Modal from 'common/Modal/Modal';
import Table from 'common/table/Table';

import ModalContent from './ModalContent';
import defaultColumns from './columns';
import advancedFilters from './advancedFilters';

const changeEmailFiels = [
  {
    as: (
      <InputMui
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          autoComplete: 'off',
        }}
      />
    ),
    name: 'email',
    label: 'Email*',
    rules: { required: 'To pole jest wymagane' },
  },
];

const changePasswordFiels = [
  {
    as: (
      <InputMui
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          type: 'password',
          autocomplete: 'new-password',
        }}
      />
    ),
    name: 'password',
    label: 'Hasło*',
    rules: { required: 'To pole jest wymagane' },
  },
  {
    as: (
      <InputMui
        type=''
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          type: 'password',
          autocomplete: 'new-password',
        }}
      />
    ),
    name: 'repeatPassword',
    label: 'Powtórz hasło*',
    rules: { required: 'To pole jest wymagane' },
  },
];

// const roleFields = [
//   {
//     as: (
//       <Select
//         options={userRolesSelect}
//         placeholder='Rola użytkownika'
//         styles={{ control: base => ({ ...base, height: '50px' }) }}
//       />
//     ),
//     type: 'select',
//     name: 'role',
//     label: 'Rola*',
//     rules: { required: 'To pole jest wymagane' },
//   },
// ];

const LINK = 'local/admin/table/users';
const NAME = 'users';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users: dataTable } = useSelector(state => state.currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const activateUser = async id => {
    try {
      await api.putActivate(id);
      toast.success('Nastąpiła udana aktywacja konta', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas aktywowania konta', OPTIONS);
    }

    getValues();
    setIsModalOpen(false);
  };

  const emailChange = async (id, data) => {
    try {
      await api.putChangeEmail(id, data);
      toast.success('Nastąpiła udana zmiana adresu email', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas zmiany adresu email', OPTIONS);
    }

    getValues();
    setIsModalOpen(false);
  };

  const resetPassword = async id => {
    try {
      await api.putResetPassword(id);
      toast.success('Hasło zostało zresetowane', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas resetowania hasła', OPTIONS);
    }
    getValues();
    setIsModalOpen(false);
  };

  const deleteUser = async id => {
    try {
      await api.deleteUser(id);
      toast.success('Konto zostało usunięte', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas usuwania konta', OPTIONS);
    }
    getValues();
    setIsModalOpen(false);
  };

  const passwordChange = async (id, data) => {
    try {
      await api.putChangePassword(id, data);
      toast.success('Nastąpiła udana zmiana hasła', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas zmiany hasła', OPTIONS);
    }
    getValues();
    setIsModalOpen(false);
  };

  const roleChange = async (id, data) => {
    try {
      await api.putChangeRole(id, { role: data?.role?.value });
      toast.success('Nastąpiła udana zmiana roli', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił problem podczas zmiany roli', OPTIONS);
    }
    getValues();
    setIsModalOpen(false);
  };

  const handleOpenModal = (row, fName) => {
    let info;
    let fields;
    switch (fName) {
      case 'activateUser':
        info = 'Czy na pewno chcesz aktywować poniższego użytkownika?';
        setSubmit('activateUser');
        break;
      case 'emailChange':
        info = 'Wprowadź nowy adres email dla poniższego użytkownika.';
        fields = changeEmailFiels;
        setSubmit('emailChange');
        break;
      case 'passwordChange':
        info = 'Wprowadź nowe hasło dla poniższego użytkownika.';
        fields = changePasswordFiels;
        setSubmit('passwordChange');
        break;
      case 'resetPassword':
        info = 'Czy na pewno chcesz zresetować hasło poniższego użytkownika?';
        setSubmit('resetPassword');
        break;
      case 'deleteUser':
        info = 'Czy na pewno chcesz usunąć poniższego użytkownika?';
        setSubmit('deleteUser');
        break;
      // case 'roleChange':
      //   info = 'Czy na pewno chcesz zmienić rolę poniższego użytkownika?';
      //   fields = roleFields;
      //   setSubmit('roleChange');
      //   break;
      default:
        setSubmit('');
    }

    setModalData({
      row,
      info,
      fields,
    });

    setIsModalOpen(true);
  };

  const submitMethod = () => {
    switch (submit) {
      case 'activateUser':
        return activateUser;
      case 'emailChange':
        return emailChange;
      case 'passwordChange':
        return passwordChange;
      case 'resetPassword':
        return resetPassword;
      case 'deleteUser':
        return deleteUser;
      case 'roleChange':
        return roleChange;
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

  useEffect(() => {
    getValues();
    getColsOrder();
  }, []);

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
        noColumnFilter
        headerAutoHeight
        // handleOpenModal={handleOpenModal}
      />

      {submit && (
        <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
          <ModalContent
            onSubmit={submitMethod()}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        </Modal>
      )}
    </>
  );
};

export default UsersTable;
