import React, { useEffect, useState } from 'react';
import PopUp from 'common/PopUp/PopUp';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import Select from 'react-select';
import { Buttons, Button } from '../../common/PopUp/PopUp.css';
import { api } from '../../API';

const Label = styled.label`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Input = styled.input`
  height: 30px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 3px;
  margin: 3px 0 15px;
`;

const TextArea = styled.textarea`
  height: 60px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 3px;
  margin: 3px 0 15px;
  resize: none;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin: 3px 0 15px;
`;

const EditInspection = ({
  newInspection,
  togglePopUp,
  closePopUp,
  inventoryDetails,
  updateInventoryDetails,
  toggleEdit,
  updateInspection,
  disabled,
}) => {
  const [options, setOptions] = useState();
  const getClassificationSystem = async () => {
    try {
      const resp = await api.getClassifications();
      setOptions(
        resp?.data?.map(el => ({
          label: el.name.pl,
          value: el.name.pl,
        }))
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

  useEffect(() => {
    getClassificationSystem();
  }, []);

  return (
    <PopUp
      title={toggleEdit === true ? 'Edytuj szczegóły' : 'Utwórz nowe skontrum'}
      togglePopUp={togglePopUp}
      setTogglePopUp={closePopUp}
    >
      <Form onSubmit={toggleEdit === true ? updateInspection : newInspection}>
        <Label htmlFor='symbol'>
          Nr inwentarzowy:
          <Input
            id='symbol'
            value={inventoryDetails.symbol}
            onChange={e => updateInventoryDetails('symbol', e)}
          />
        </Label>

        <Label htmlFor='documentNumber'>
          Numer dokumentu:
          <Input
            id='documentNumber'
            value={inventoryDetails.documentNumber}
            onChange={e => updateInventoryDetails('documentNumber', e)}
          />
        </Label>
        <Label>
          Data rozpoczęcia:
          <Input
            id='dateFrom'
            value={inventoryDetails.dateFrom}
            onChange={e => updateInventoryDetails('dateFrom', e)}
            type='date'
            format='dd-MM-yyyy'
          />
        </Label>
        <Label>
          Data zakończenia:
          <Input
            id='dateFrom'
            value={inventoryDetails.dateTo}
            onChange={e => updateInventoryDetails('dateTo', e)}
            type='date'
          />
        </Label>
        <Label htmlFor='classificationSystem'>
          Dział muzeum:
          <StyledSelect
            options={options}
            value={options?.filter(
              obj => obj.value === inventoryDetails.classificationSystem
            )}
            onChange={e =>
              updateInventoryDetails('classificationSystem', e, 'select')
            }
          />
        </Label>
        <Label htmlFor='introduction'>
          Wstęp:
          <TextArea
            id='introduction'
            value={inventoryDetails.introduction}
            onChange={e => updateInventoryDetails('introduction', e)}
          />
        </Label>
        <Label htmlFor='comments'>
          Uwagi:
          <TextArea
            id='comments'
            value={inventoryDetails.comments}
            onChange={e => updateInventoryDetails('comments', e)}
          />
        </Label>
        <Label htmlFor='summary'>
          Podsumowanie:
          <TextArea
            id='summary'
            value={inventoryDetails.summary}
            onChange={e => updateInventoryDetails('summary', e)}
          />
        </Label>
        <Buttons>
          <Button
            onClick={toggleEdit === true ? updateInspection : newInspection}
            type='submit'
            disabled={disabled}
          >
            {toggleEdit === true ? 'Zapisz' : 'Utwórz skontrum'}
          </Button>
          <Button onClick={closePopUp} type='button'>
            Anuluj
          </Button>
        </Buttons>
      </Form>
    </PopUp>
  );
};

export default EditInspection;
