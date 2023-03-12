import React, { useState, useEffect, useRef } from 'react';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import MainWrapper from 'common/MainWrapper';
import PopUp from 'common/PopUp/PopUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ReactTooltip from 'react-tooltip';
import * as S from './Documents.css';

const Documents = () => {
  const [contracts, setContracts] = useState();
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const getContracts = async () => {
    try {
      const resp = await api.getContracts();
      setContracts(resp.data);
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const addContracts = async e => {
    const file = e.target.files[0];
    // eslint-disable-next-line no-undef
    const fd = new FormData();
    if (file) fd.append('file', file);
    try {
      await api.postContract(fd);
      getContracts();
      toast.success('Pomyślnie dodano plik.');
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const deleteContract = async id => {
    try {
      await api.deleteContract(id);
      getContracts();
      setTogglePopUp(false);
      toast.success('Pomyślnie usunięto plik.');
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  const getFile = async (id, filename) => {
    try {
      const resp = await api.getSingleContract(id);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const blob = new Blob([resp.data]);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      err?.response?.data?.errors?.map(el =>
        toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
      );
    }
  };

  useEffect(() => {
    getContracts();
  }, []);

  const handleSearchChange = e => {
    setQuery(e.target.value);
  };

  const handleDeletePopUp = id => {
    setSelectedId(id);
    setTogglePopUp(true);
  };

  const contractsList = contracts
    ?.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
    .map(el => (
      <S.Tr>
        <S.Td>{el.name}</S.Td>
        <S.Td menu>
          <S.Button
            type='button'
            onClick={() => getFile(el.id, el.name)}
            data-tip
            data-for='downloadFile'
          >
            <DownloadIcon />
          </S.Button>
        </S.Td>
        <S.Td menu>
          <S.Button
            type='button'
            onClick={() => handleDeletePopUp(el.id)}
            red
            data-tip
            data-for='deleteFile'
          >
            <DeleteForeverIcon />
          </S.Button>
        </S.Td>
      </S.Tr>
    ));

  return (
    <MainWrapper>
      <S.Wrapper>
        <input
          type='file'
          style={{ display: 'none' }}
          ref={fileRef}
          onChange={addContracts}
        />

        <S.TableWrapper>
          <S.TableMenu>
            <S.Input
              name='search'
              type='text'
              value={query}
              placeholder='Szukaj...'
              onChange={handleSearchChange}
            />
            <S.FileUpload onClick={() => fileRef?.current?.click()}>
              <DriveFolderUploadIcon /> Dodaj dokument
            </S.FileUpload>
          </S.TableMenu>
          <S.Table>
            <S.Tr>
              <S.Td header>Nazwa pliku</S.Td>
              <S.Td header />
              <S.Td header />
            </S.Tr>
            {contractsList?.length > 0 ? (
              contractsList
            ) : (
              <S.Notice>Brak wyników</S.Notice>
            )}
          </S.Table>
        </S.TableWrapper>
        <PopUp
          title='Usuń'
          text='Czy na pewno chcesz usunąć wybrany dokument?'
          buttons
          actionButtonFunc={() => deleteContract(selectedId)}
          actionButtonText='Usuń'
          togglePopUp={togglePopUp}
          setTogglePopUp={setTogglePopUp}
        />
      </S.Wrapper>
      <ReactTooltip id='deleteFile' effect='solid'>
        <span style={{ color: 'white' }}>Usuń dokument</span>
      </ReactTooltip>
      <ReactTooltip id='downloadFile' effect='solid'>
        <span style={{ color: 'white' }}>Pobierz dokument</span>
      </ReactTooltip>
    </MainWrapper>
  );
};

export default Documents;
