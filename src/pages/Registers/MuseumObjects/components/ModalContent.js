import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { CancelButton, SaveButton } from 'common/Buttons';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import { api } from 'API';
import StyledSelect from 'common/Inputs/StyledSelect';

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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  span {
    margin: 5px auto 5px 0px;
    font-weight: 700;
  }

  ${({ row }) =>
    row &&
    css`
      flex-direction: row;
      align-items: center;

      span {
        margin: 5px 0;
      }

      input {
        margin: 10px auto auto 15px;
      }
    `}
`;

const bookTypes = [
  { label: 'Wpływów', value: 'DELIVERY' },
  { label: 'Braków', value: 'SHORTAGES' },
  { label: 'Inwentarzowa', value: 'INVENTORY' },
  { label: 'Depozytowa', value: 'DEPOSIT' },
];

const ModalContent = ({ onSubmit, cancel, bookId, info, isNew, editable }) => {
  const [workers, setWorkers] = useState([]);
  const [currentWorker, setCurrentWorker] = useState();
  const [currentType, setCurrentType] = useState();
  const [bookData, setBookData] = useState({
    name: '',
    sign: '',
    bookType: {},
    isActive: false,
    worker: {},
    comments: '',
  });

  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await api.getBook(bookId);
        setCurrentType(bookTypes.filter(el => el.value === data.bookType)[0]);
        setBookData(prev => ({ ...prev, ...data }));
      } catch (e) {
        toast.error(
          `Wystąpił błąd podczas ładowania danych księgi. ${JSON.stringify(
            e?.response?.data?.message || ''
          )}`,
          OPTIONS
        );
      }
    };

    const getWorkers = async () => {
      try {
        const { data } = await api.getWorkers();
        const mappedWorkers = data.map(w => ({
          label: `${w.name} ${w.surname}`,
          value: w,
        }));
        setWorkers(mappedWorkers);
      } catch (e) {
        toast.error(
          `Wystąpił błąd podczas ładowania danych księgi. ${JSON.stringify(
            e?.response?.data?.message || ''
          )}`,
          OPTIONS
        );
      }
    };

    if (!isNew) getBook();
    getWorkers();
  }, [bookId, isNew]);

  useEffect(() => {
    if (workers.length > 0)
      setCurrentWorker(
        workers.filter(el => el.value?.id === bookData.worker?.id)[0]
      );
  }, [workers, bookData]);

  const handleStateChange = (name, e) => {
    setBookData(prev => ({
      ...prev,
      [name]: e?.target?.value,
    }));
  };

  return (
    <FormModal
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          id: bookId,
          data: {
            ...bookData,
            bookType: currentType?.value,
            worker: { ...currentWorker?.value },
          },
        });
      }}
    >
      <p>{info}</p>
      <Field row>
        <span>Aktywna:</span>
        <input
          type='checkbox'
          disabled={!editable}
          checked={bookData.isActive}
          onChange={() =>
            setBookData(prev => ({ ...prev, isActive: !prev.isActive }))
          }
        />
      </Field>
      {bookData?.id && (
        <p>
          <span>Id:</span> {bookData.id}
        </p>
      )}
      <Field>
        <span>Nazwa:</span>{' '}
        <input
          disabled={!editable}
          value={bookData.name}
          onChange={e => handleStateChange('name', e)}
        />
      </Field>
      <Field>
        <span>Znak:</span>
        <input
          disabled={!editable}
          value={bookData.sign}
          onChange={e => handleStateChange('sign', e)}
        />
      </Field>
      <Field>
        <span>Komentarz:</span>
        <textarea
          disabled={!editable}
          value={bookData.comments}
          onChange={e => handleStateChange('comment', e)}
        />
      </Field>
      <Field>
        <span>Typ księgi:</span>
        <StyledSelect
          isDisabled={!editable}
          options={bookTypes}
          value={currentType}
          onChange={setCurrentType}
        />
      </Field>
      <Field>
        <span>Opiekun:</span>
        <StyledSelect
          isDisabled={!editable}
          options={workers}
          value={currentWorker}
          onChange={setCurrentWorker}
        />
      </Field>

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

export default ModalContent;
