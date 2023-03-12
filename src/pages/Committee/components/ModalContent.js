import React from 'react';
import styled from 'styled-components';
import { CancelButton, SaveButton } from 'common/Buttons';

export const ButtonsWrapper = styled.div`
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
  min-width: 400px;
  max-width: 700px;

  > p {
    margin: 5px auto 5px 0px;
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

  input[type='date'] {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    width: 100%;
  }
`;

export const SelectedFile = styled.div`
  display: flex;
  flex-direction: row;

  button {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;
    background-color: white;
  }

  input {
    display: none;
  }

  span {
    margin: auto 15px;
  }

  svg {
    margin: auto 0;
  }
`;

export const ItemsList = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 10px;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid lightgray;

    input {
      margin: auto 0 auto auto;
      border: none;
      border-bottom: 1px solid lightgray;
      text-align: right;
    }

    img {
      max-height: 40px;
      margin: auto 10px;
    }
  }
`;

const ModalContent = ({ onSubmit, cancel, row, info }) => (
  <FormModal
    onSubmit={e => {
      e.preventDefault();
      onSubmit(row.id);
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
