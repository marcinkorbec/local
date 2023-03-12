import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'API';
import { CancelButton, SaveButton } from 'common/Buttons';
import { OPTIONS } from 'utils/toastOptions';
import { ButtonsWrapper, FormModal, ItemsList } from './ModalContent';

const ModalContentItemPricing = ({ cancel, row }) => {
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

    try {
      await api.putRevaluate(row.id, itemsAssigned);
      cancel();
      toast.success('Wycena została zaktualizowana', OPTIONS);
    } catch {
      toast.error('Wystąpił błąd podczas zapisywania', OPTIONS);
    }
  };

  const handlePriceChange = (e, el) => {
    setItemsAssigned(prev => {
      const arr = prev.items;
      const idx = arr?.findIndex(item => item.id === el.id);

      arr[idx].value = e.target.value;

      return {
        ...prev,
        items: arr,
      };
    });
  };

  const mappedAssignedItems = itemsAssigned?.items?.map(el => (
    <div key={el.id}>
      {el.id} - {el.name} -{' '}
      <input value={el.value} onChange={e => handlePriceChange(e, el)} /> zł
    </div>
  ));

  return (
    <FormModal onSubmit={handleSubmit}>
      <p>Wybrany przedmiot:</p>
      <p>(Obecnie wybrany będzie traktowany jako główny)</p>
      <p>
        ID: <span>{row?.id}</span>
      </p>
      <p>
        Nazwa: <span>{row?.name}</span>
      </p>
      <p>
        Łączna wartość: <span>{itemsAssigned?.summary}zł</span>
      </p>
      <p>Powiązane przedmioty:</p>
      <ItemsList>{mappedAssignedItems}</ItemsList>
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
};

export default ModalContentItemPricing;
