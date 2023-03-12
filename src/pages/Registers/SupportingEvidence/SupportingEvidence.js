import { buttonStyles } from 'common/Buttons';
import MainWrapper from 'common/MainWrapper';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'common/Modal/Modal';
import ModalContentPriority from 'pages/Books/Inventory/components/ModalContentPriority';
import SupportingEvidenceTable from './components/SupportingEvidenceTable';

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

const HeaderLink = styled(Link)`
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

const SupportingEvidence = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainWrapper>
      <HeaderButtonsWrapper>
        <HeaderLink to='/item-creator'>Dodaj przedmiot</HeaderLink>
        <HeaderLink to='/admin/books/1'>Eksport</HeaderLink>
        <HeaderLink to='/admin/books/0'>Statystyka</HeaderLink>
        <HeaderButton onClick={() => setIsModalOpen(true)} type='button'>
          Spis kolejności
        </HeaderButton>
      </HeaderButtonsWrapper>
      <SupportingEvidenceTable />
      <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
        <ModalContentPriority />
      </Modal>
    </MainWrapper>
  );
};

export default SupportingEvidence;
