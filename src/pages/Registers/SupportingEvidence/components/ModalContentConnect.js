import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'API';
import { CancelButton, SaveButton } from 'common/Buttons';
import StyledSelect from 'common/Inputs/StyledSelect';
import { OPTIONS } from 'utils/toastOptions';
import getImage from 'common/helpers/getImage';
import { ButtonsWrapper, FormModal, ItemsList } from './ModalContent';

const ModalContentConnect = ({ getValues, cancel, row }) => {
  const [itemsToAssign, setItemsToAssign] = useState([]);
  const [itemsAssigned, setItemsAssigned] = useState();
  const [selectedItems, setSelectedItems] = useState();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await api.getItemsAssign(row.id);
        const { data: data2 } = await api.getItemsAssigned(row.id);
        setItemsToAssign(data);
        setItemsAssigned(data2);
        // setBooks(data);
      } catch {
        toast.error('Wystąpił błąd podczas ładowania listy ksiąg');
      }
    };
    getBooks();
  }, [row.id]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await Promise.all(
        selectedItems?.map(el => api.putAssignItems(row.id, el.value))
      );
      toast.success(
        <div>
          Do przedmiotu {row.name} zostały przypisane przedmioty:{' '}
          {selectedItems?.map(el => (
            <p>{el.label}</p>
          ))}
        </div>,
        OPTIONS
      );
      cancel();
      getValues();
    } catch (err) {
      toast.error(
        `Wystąpił błąd podczas przenoszenia przedmiotu. ${err?.response}`,
        OPTIONS
      );
    }
  };

  const mappedItemsToAssign = itemsToAssign?.map(el => ({
    label: `${el.name} - ${el.id} - ${el.symbol}`,
    value: el.id,
  }));

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
      <p>(Obecnie wybrany będzie traktowany jako główny)</p>
      <p>ID: {row?.id}</p>
      <p>Nazwa: {row?.name}</p>
      <p>Powiązane przedmioty:</p>
      <ItemsList>{mappedAssignedItems}</ItemsList>
      <p>Przypisz przedmioty:</p>
      <StyledSelect
        value={selectedItems}
        options={mappedItemsToAssign}
        onChange={e => setSelectedItems(e)}
        isMulti
      />
      <ButtonsWrapper>
        <CancelButton type='button' onClick={cancel} isVisible>
          Anuluj
        </CancelButton>
        <SaveButton
          small
          type='submit'
          isVisible
          disabled={selectedItems === null || selectedItems === undefined}
        >
          Zatwierdź
        </SaveButton>
      </ButtonsWrapper>
    </FormModal>
  );
};

export default ModalContentConnect;
