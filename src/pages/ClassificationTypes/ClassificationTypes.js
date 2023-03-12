import React, { useState, useEffect } from 'react';
import MainWrapper from 'common/MainWrapper';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import ReactTooltip from 'react-tooltip';
import PopUp from 'common/PopUp/PopUp';
import { api } from '../../API';
import * as S from './ClassificationTypes.css';
import ClassificationTypesForm from './ClassificationTypesForm';

const ClassificationTypes = () => {
  const [types, setTypes] = useState();
  const [formData, setFormData] = useState({
    id: null,
    contentPL: '',
    contentEN: '',
    description: '',
    shortcut: '',
  });
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');

  const clearForm = () => {
    setFormData({
      id: null,
      contentPL: '',
      contentEN: '',
      description: '',
      shortcut: '',
    });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const getClassificationTypes = async () => {
    try {
      const resp = await api.getClassificationSystem();
      setTypes(resp.data);
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  const deleteClassificationSystem = async () => {
    try {
      await api.deleteClassificationSystem(formData.id);
      setTogglePopUp(false);
      getClassificationTypes();
      clearForm();
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  const submitClassificationSystem = async () => {
    const body = {
      contentPL: formData.contentPL,
      contentEN: formData.contentEN,
      description: formData.description,
      shortcut: formData.shortcut,
    };
    try {
      if (toggleEdit) {
        await api.postClassificationSystem(body);
        toast.success('Pomyślnie dodano nowy rodzaj zbiorów.');
      } else {
        await api.putClassificationSystem(formData.id, body);
        toast.success('Pomyślnie edytowano rodzaj zbiorów.');
      }

      getClassificationTypes();
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  useEffect(() => {
    getClassificationTypes();
  }, []);

  const closePopUp = () => {
    setTogglePopUp(false);
  };

  const toggleDeletePopUp = id => {
    setFormData(prev => ({ ...prev, id }));
    setTogglePopUp(true);
  };

  const selectRow = el => {
    if (!toggleEdit) {
      setFormData({
        id: el.id,
        contentPL: el.name.pl,
        contentEN: el.name.en,
        description: el.description,
        shortcut: el.shortcut,
      });
    }
  };

  const toggleEditFunc = () => {
    clearForm();
    setToggleEdit(prev => !prev);
  };

  const handleSearchChange = e => {
    clearForm();
    setQuery(e.target.value);
  };

  const typesList = types
    ?.filter(el => el.name.pl.toLowerCase().includes(search.toLowerCase()))
    .map(el => (
      <S.Tr onClick={() => selectRow(el)} isSelected={el.id === formData.id}>
        <S.Td>{el.id}</S.Td>
        <S.Td>{el.shortcut}</S.Td>
        <S.Td>{el.name.pl}</S.Td>
        <S.Td>{el.name.en}</S.Td>
        <S.Td>{el.description}</S.Td>
        {!toggleEdit && (
          <S.Td>
            <S.DeleteButton
              type='button'
              data-tip
              data-for='deleteType'
              onClick={() => toggleDeletePopUp(el.id)}
            >
              <ClearIcon />
            </S.DeleteButton>
          </S.Td>
        )}
      </S.Tr>
    ));

  return (
    <MainWrapper>
      <S.Wrapper>
        <S.TableWrapper>
          <S.TableMenu>
            <S.Input
              name='search'
              type='text'
              value={query}
              placeholder='Szukaj...'
              onChange={handleSearchChange}
            />
            <S.Button onClick={toggleEditFunc}>
              {toggleEdit ? 'Włącz edycję' : 'Wyłącz edycję'}
            </S.Button>
          </S.TableMenu>
          <S.Table>
            <S.Tr>
              <S.Td header>ID</S.Td>
              <S.Td header>Znak</S.Td>
              <S.Td header>Nazwa(pl)</S.Td>
              <S.Td header>Nazwa(eng)</S.Td>
              <S.Td header>Opis</S.Td>
              {!toggleEdit && <S.Td header />}
            </S.Tr>
            {typesList}
          </S.Table>
        </S.TableWrapper>
        <ClassificationTypesForm
          submitClassificationSystem={submitClassificationSystem}
          formData={formData}
          toggleEdit={toggleEdit}
          setFormData={setFormData}
        />
      </S.Wrapper>
      <PopUp
        title='Usuń wpis'
        text='Czy na pewno chcesz usunąć wybrany element?'
        actionButtonFunc={deleteClassificationSystem}
        actionButtonText='Usuń'
        togglePopUp={togglePopUp}
        setTogglePopUp={closePopUp}
        buttons
      />
      <ReactTooltip id='deleteType' effect='solid'>
        <span style={{ color: 'white' }}>Usuń rodzaj zbioru</span>
      </ReactTooltip>
    </MainWrapper>
  );
};

export default ClassificationTypes;
