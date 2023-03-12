import React, { useState } from 'react';
import styled from 'styled-components';
import MainWrapper from 'common/MainWrapper';
import Modal from 'common/Modal/Modal';
import { buttonStyles } from 'common/Buttons';
import { OPTIONS } from 'utils/toastOptions';
import { api } from 'API';
import { toast } from 'react-toastify';
import MuseumObjectsTable from './components/MuseumObjectsTable';
import ModalContent from './components/ModalContent';

const HeaderButtonsWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const HeaderButton = styled.button`
  ${buttonStyles};
  border: none;
  border-radius: 0;
  border-right: 1px solid ${({ theme }) => theme.primary};
  height: 100%;
  margin: 0;
  color: ${({ theme }) => theme.font};
  background-color: ${({ theme }) => theme.primaryDark};

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const MuseumObjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dumbTrick, setDumbTrick] = useState(true);

  const addBook = async ({ data }) => {
    try {
      await api.addBook(data);
      toast.success('Księga została dodana', OPTIONS);
      setDumbTrick(prev => !prev);
      setIsModalOpen(false);
    } catch (e) {
      toast.error(
        `Wystąpił problem podczas dodawania księgi. ${JSON.stringify(
          e?.response?.data?.message || ''
        )}`,
        OPTIONS
      );
    }
  };

  return (
    <MainWrapper>
      <HeaderButtonsWrapper>
        <HeaderButton onClick={() => setIsModalOpen(true)} type='button'>
          Dodaj księgę
        </HeaderButton>
      </HeaderButtonsWrapper>
      <MuseumObjectsTable dumbTrick={dumbTrick} />
      <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
        <ModalContent
          isNew
          info='Dodaj nową księgę'
          editable
          cancel={() => setIsModalOpen(false)}
          onSubmit={addBook}
        />
      </Modal>
    </MainWrapper>
  );
};

export default MuseumObjects;
