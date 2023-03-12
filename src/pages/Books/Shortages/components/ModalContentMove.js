import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'API';
import { CancelButton, SaveButton } from 'common/Buttons';
import StyledSelect from 'common/Inputs/StyledSelect';
import { OPTIONS } from 'utils/toastOptions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ButtonsWrapper, FormModal, SelectedFile } from './ModalContent';

const REMOVE_BOOK_ID = 2;

const ModalContentMove = ({ copy, removeItem, getValues, cancel, row }) => {
  const fileRef = useRef();
  const [books, setBooks] = useState([]);
  const [rentTo, setRentTo] = useState('');
  const [file, setFile] = useState();
  const [selectedBook, setSelectedBook] = useState();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await api.getBooks();
        setBooks(data);
      } catch {
        toast.error('Wystąpił błąd podczas ładowania listy ksiąg');
      }
    };
    getBooks();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    let param = '';

    if (rentTo) param = `?rentTo=${rentTo}`;
    // eslint-disable-next-line no-undef
    const fd = new FormData();
    if (file) fd.append('file', file);

    try {
      await api.putMoveItem(row.id, selectedBook.value, param, fd);
      toast.success(
        `Przedmiot ${row.name} został przeniesiony do księgi: ${selectedBook.label}`,
        OPTIONS
      );
      cancel();
      getValues();
    } catch (err) {
      toast.error(
        `Wystąpił błąd podczas przenoszenia przedmiotu. ${err?.response?.data}`,
        OPTIONS
      );
    }
  };

  const mappedBooks = books?.map(el => ({
    label: `${el.name} - ${el.sign}`,
    value: el.id,
  }));

  useEffect(() => {
    if (removeItem)
      setSelectedBook(mappedBooks.filter(el => el.value === REMOVE_BOOK_ID)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  return (
    <FormModal onSubmit={handleSubmit}>
      <p>
        {removeItem
          ? 'Zdejmij ze stanu przedmiot:'
          : copy
          ? 'Kopiuj przedmiot'
          : 'Przenieś przedmiot:'}
      </p>
      <p>
        ID: <span>{row?.id}</span>
      </p>
      <p>
        Nazwa: <span>{row?.name}</span>
      </p>
      <p>{removeItem ? 'Zostanie on przeniesiony do księgi:' : 'Do księgi:'}</p>
      <StyledSelect
        disabled={removeItem}
        value={selectedBook}
        options={mappedBooks}
        onChange={removeItem ? () => {} : e => setSelectedBook(e)}
      />
      <p style={{ marginTop: '30px' }}>
        {removeItem
          ? 'Wymagane dodatkowe informacje'
          : 'Dodatkowe informacje (wymagane w przypadku księgi depozytowej)'}
      </p>
      <p>Data do:</p>
      <input
        type='date'
        value={rentTo}
        onChange={e => setRentTo(e.target.value)}
      />
      <p>Dokument: </p>
      <SelectedFile>
        <input
          ref={fileRef}
          type='file'
          placeholder='Dołącz'
          onChange={e => setFile(e.target.files[0])}
        />
        <button type='button' onClick={() => fileRef?.current?.click()}>
          Dołącz
        </button>
        <span>{file?.name} </span>
        {file?.name && <HighlightOffIcon onClick={() => setFile(null)} />}
      </SelectedFile>
      <ButtonsWrapper>
        <CancelButton type='button' onClick={cancel} isVisible>
          Anuluj
        </CancelButton>
        <SaveButton
          small
          type='submit'
          isVisible
          disabled={
            removeItem
              ? file === null || rentTo === ''
              : selectedBook === null || selectedBook === undefined
          }
        >
          Zatwierdź
        </SaveButton>
      </ButtonsWrapper>
    </FormModal>
  );
};

export default ModalContentMove;
