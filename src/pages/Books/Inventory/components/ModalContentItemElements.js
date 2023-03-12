import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'API';
import { OPTIONS } from 'utils/toastOptions';
import getImage from 'common/helpers/getImage';
import { FormModal, ItemsList } from './ModalContent';

const ModalContentItemElements = ({ row }) => {
  const [itemsAssigned, setItemsAssigned] = useState();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await api.getItemsAssigned(row.id);
        setItemsAssigned(data);
      } catch {
        toast.error('Wystąpił błąd podczas ładowania listy ksiąg', OPTIONS);
      }
    };
    getBooks();
  }, [row.id]);

  const handleSubmit = async e => {
    e.preventDefault();
  };

  const mappedAssignedItems = itemsAssigned?.items?.map(el => (
    <div key={JSON.stringify(el)}>
      {el.id}
      {el.encodedImage && (
        <img src={getImage(el.encodedImage)} alt={`Wizerunek ${el.name}`} />
      )}{' '}
      {el.name}
    </div>
  ));

  return (
    <FormModal onSubmit={handleSubmit}>
      <p>Wybrany przedmiot:</p>
      <p>
        ID: <span>{row?.id}</span>
      </p>
      <p>
        Nazwa: <span>{row?.name}</span>
      </p>
      <p>Elementy przedmiotu:</p>
      <ItemsList>{mappedAssignedItems}</ItemsList>
    </FormModal>
  );
};

export default ModalContentItemElements;
