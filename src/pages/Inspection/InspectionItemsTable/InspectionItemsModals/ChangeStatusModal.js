import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Buttons, Button } from 'common/PopUp/PopUp.css';
import { status } from '../../status';
import * as S from '../../Inspection.css';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ChangeStatusModal = ({
  rowData,
  formFields,
  handleSelectInput,
  actionButtonFunc,
  closePopUp,
}) => {
  const options = Object.values(status);

  const submitForm = e => {
    e.preventDefault();
    actionButtonFunc();
  };
  return (
    <Form onSubmit={submitForm}>
      <S.Label htmlFor='comment'>
        {`Zmień status dla przedmiotu o nazwie 
           ${rowData.name} oraz id ${rowData.itemId}:`}
      </S.Label>
      <Select
        options={options}
        value={options.filter(el => el.value === formFields.status)}
        onChange={handleSelectInput}
        name='status'
        style={{
          width: '100% !important',
        }}
      />
      <Buttons>
        <Button type='submit' onClick={e => submitForm(e)}>
          Zmień
        </Button>
        <Button onClick={closePopUp} type='button'>
          Anuluj
        </Button>
      </Buttons>
    </Form>
  );
};

export default ChangeStatusModal;
