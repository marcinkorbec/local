import React from 'react';
import styled from 'styled-components';
import { CancelButton, SaveButton } from 'common/Buttons';

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const FormModal = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;

  > p {
    margin: 5px auto 0px 0px;
    font-size: 16px;
    span {
      font-weight: 700;
    }
  }

  > div {
    width: 100%;
  }

  div {
    border-radius: 0;
  }
`;

const ModalContent = ({ onSubmit, cancel, row, info }) => (
  <FormModal
    onSubmit={e => {
      e.preventDefault();
      onSubmit(row.id, row.booksIds);
    }}
  >
    <p>{info}</p>
    <p>
      <span>Id:</span> {row.id}
    </p>
    <p>
      <span>Nazwa:</span> {row.name}
    </p>
    <p>
      <span>Data wpisu:</span> {row.entryDate}
    </p>

    <ButtonsWrapper>
      <CancelButton type='button' onClick={cancel} isVisible>
        Anuluj
      </CancelButton>
      <SaveButton small type='submit' isVisible>
        Zatwierdź
      </SaveButton>
    </ButtonsWrapper>
  </FormModal>
);

export default ModalContent;
