import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { api } from 'API';
import Modal from 'common/Modal/Modal';
import ModalContentMove from 'pages/Books/Inventory/components/ModalContentMove';
import CreatorContext from '../CreatorContext';

import * as S from '../ItemCreator.css';
import { AddButton } from './Bookmarks/Bookmarks.css';

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
`;

const HeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 200px;
  margin-left: 25px;

  > input {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;
  }

  > div {
    width: 100%;
  }

  span {
    color: ${({ theme }) => theme.font};
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const HeaderButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 25px;
`;

const CreatorHeader = () => {
  const { handleCancel, handleSave, itemData, getItem } =
    useContext(CreatorContext);

  const [booksData, setBooksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const mappedReq = itemData.booksIds?.map(el => api.getBook(el));
        const data = await Promise.all(mappedReq);
        setBooksData(data?.map(book => book.data));
      } catch {
        toast.error('Wystąpił błąd podczas ładowania informacji o księgach');
      }
    };

    if (itemData?.id) getBooks();
  }, [itemData]);

  const mappedItem = {
    id: itemData?.id,
    name: itemData?.name?.pl,
  };

  const mappedBook = booksData?.map(book => (
    <HeaderItem>
      <span>{book.name}</span>
      <p>{book.sign}</p>
    </HeaderItem>
  ));

  return (
    <S.CreatorHeader>
      <HeaderContent>
        {itemData?.id && (
          <>
            <HeaderItem>
              <span>Przedmiot należy do:</span>
            </HeaderItem>
            {mappedBook}
          </>
        )}
        <HeaderButtonsWrapper>
          {itemData?.id && (
            <AddButton
              type='button'
              style={{ marginRight: '25px', fontWeight: 600 }}
              onClick={() => setIsModalOpen(true)}
            >
              Przenieś przedmiot
            </AddButton>
          )}
          <AddButton
            type='button'
            style={{ marginRight: '25px', fontWeight: 600 }}
            onClick={handleSave}
          >
            Zapisz
          </AddButton>
          <AddButton
            type='button'
            style={{ fontWeight: 600 }}
            onClick={handleCancel}
          >
            Anuluj
          </AddButton>
        </HeaderButtonsWrapper>
      </HeaderContent>
      <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
        <ModalContentMove
          getValues={getItem}
          row={mappedItem}
          cancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </S.CreatorHeader>
  );
};

export default CreatorHeader;
