import React, { useState, useRef } from 'react';
import { api } from 'API';
import { toast } from 'react-toastify';
import UploadIcon from '@mui/icons-material/Upload';
import styled from 'styled-components';
import { format } from 'date-fns';
import { OPTIONS } from 'utils/toastOptions';
import { Buttons, Button } from '../../../common/PopUp/PopUp.css';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 38px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 3px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  padding: 8px 20px;
  border: 1px solid ${({ theme }) => theme.secondaryDark};
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background: ${({ theme }) => theme.primaryDark};
  }

  svg {
    margin-right: 10px;
  }
`;

const Attachments = ({ inspectionId, closePopUp }) => {
  const [newFile, setNewFile] = useState();
  const [error, setError] = useState();
  const [ordinanceForm, setOrdinanceFormData] = useState({
    ordinanceDate: format(new Date(), 'yyyy-MM-dd'),
    workerName: '',
    workerSurname: '',
  });
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const formInput = (e, type) => {
    setOrdinanceFormData(prev => ({ ...prev, [type]: e.target.value }));
  };

  const submitFile = async e => {
    if (e) {
      e.preventDefault();
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      formData.append('file', newFile);
      formData.append(
        'data',
        new Blob([JSON.stringify(ordinanceForm)], {
          type: 'application/json',
        })
      );
      try {
        e.preventDefault();
        await api.putAddOrdinance(inspectionId, formData);
        closePopUp();
        toast.success('Pomyślnie zaktualizowano zarządzenie.');
      } catch (err) {
        err?.response?.data?.errors?.map(el =>
          toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
        );
      }
    }
  };

  const handleFileChange = e => {
    if (e.target.files[0].type.match(/.(pdf)$/i)) {
      const file = e.target.files[0];
      setNewFile(file);
      setError(null);
    } else {
      setNewFile(null);
      setError('Niewłaściwy typ pliku.');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={submitFile}>
        <Label htmlFor='ordinanceDate'>
          Data zarządzenia:
          <Input
            type='date'
            value={ordinanceForm.ordinanceDate}
            onChange={e => formInput(e, 'ordinanceDate')}
            id='ordinanceDate'
            name='ordinanceDate'
          />
        </Label>
        <Label htmlFor='workerName'>
          Imię:
          <Input
            value={ordinanceForm.workerName}
            onChange={e => formInput(e, 'workerName')}
            id='workerName'
            name='workerName'
          />
        </Label>
        <Label htmlFor='workerSurname'>
          Nazwisko:
          <Input
            value={ordinanceForm.workerSurname}
            onChange={e => formInput(e, 'workerSurname')}
            id='workerSurname'
            name='workerSurname'
          />
        </Label>
        <input
          type='file'
          ref={hiddenFileInput}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <UploadButton onClick={handleClick} type='button'>
          <UploadIcon /> Prześlij plik
        </UploadButton>
        {newFile && 'Wybrany plik:' && newFile?.name}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Buttons>
          <Button type='submit'>Dodaj zarządzenie</Button>
          <Button onClick={closePopUp} type='button'>
            Anuluj
          </Button>
        </Buttons>
      </form>
    </Wrapper>
  );
};

export default Attachments;
