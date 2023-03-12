import { api } from 'API';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import {
  BookmarkWrapper,
  Wrapper,
  Cell,
  CellRow,
  SubmitButton,
  ItemList,
  SingleItem,
  ItemRow,
} from './Bookmarks.css';

const defaultWorker = {
  name: '',
  surname: '',
};

const Workers = () => {
  const [newWorker, setNewWorker] = useState({ ...defaultWorker });
  const [workers, setWorkers] = useState([]);
  const [workersSearch, setWorkersSearch] = useState('');
  const [currentEdit, setCurrentEdit] = useState({});

  const getWorkers = async () => {
    try {
      const { data } = await api.getAllWorkers();
      setWorkers(data);
    } catch (e) {
      toast.error('Wystąpił błąd podczas pobierania pracowników', OPTIONS);
    }
  };

  const handleAddNew = async () => {
    try {
      await api.addWorker({
        workerName: newWorker.name,
        workerSurname: newWorker.surname,
      });
      setNewWorker({ ...defaultWorker });
      getWorkers();
      toast.success('Pracownik został dodany.', OPTIONS);
    } catch (e) {
      toast.error(
        'Wystąpił błąd podczas dodawania nowego pracownika.',
        OPTIONS
      );
    }
  };

  const handleSave = async () => {
    try {
      await api.updateWorker(currentEdit.id, {
        workerName: currentEdit.name,
        workerSurname: currentEdit.surname,
      });
      setCurrentEdit({});
      getWorkers();
      toast.success('Pracownik został zaktualizowany.', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił błąd podczas aktualizowania pracownika.', OPTIONS);
    }
  };

  const handleDelete = async id => {
    try {
      await api.deleteAdminWorker(id);
      setCurrentEdit({});
      getWorkers();
      toast.success('Pracownik został usunięty.', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił błąd podczas usuwania pracownik.', OPTIONS);
    }
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const mappedEvacuations = workers
    ?.filter(e => JSON.stringify(e)?.includes(workersSearch))
    ?.map(worker => (
      <SingleItem key={worker.id}>
        <ItemRow>
          <span>Imię:</span>
          <input
            disabled={currentEdit?.id !== worker.id}
            value={
              currentEdit?.id === worker.id ? currentEdit?.name : worker.name
            }
            onChange={e =>
              setCurrentEdit(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </ItemRow>
        <ItemRow>
          <span>Nazwisko:</span>
          <input
            disabled={currentEdit?.id !== worker.id}
            value={
              currentEdit?.id === worker.id
                ? currentEdit?.surname
                : worker.surname
            }
            onChange={e =>
              setCurrentEdit(prev => ({
                ...prev,
                surname: e.target.value,
              }))
            }
          />
        </ItemRow>
        <ItemRow>
          {currentEdit?.id === worker.id ? (
            <>
              <SubmitButton type='button' onClick={() => setCurrentEdit({})}>
                Anuluj
              </SubmitButton>
              <SubmitButton type='button' onClick={handleSave}>
                Zapisz
              </SubmitButton>
            </>
          ) : (
            <SubmitButton
              type='button'
              onClick={() => setCurrentEdit({ ...worker })}
            >
              Edytuj
            </SubmitButton>
          )}
          <SubmitButton
            style={{ margin: 'auto 0 auto auto' }}
            type='button'
            onClick={() => handleDelete(worker.id)}
          >
            Usuń
          </SubmitButton>
        </ItemRow>
      </SingleItem>
    ));

  return (
    <BookmarkWrapper>
      <Wrapper>
        <Cell>
          <span>Dodaj pracownika</span>
          <CellRow>
            <span>Imię:</span>
            <input
              value={newWorker.name}
              onChange={e =>
                setNewWorker(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </CellRow>
          <CellRow>
            <span>Nazwisko:</span>
            <input
              value={newWorker.surname}
              onChange={e =>
                setNewWorker(prev => ({ ...prev, surname: e.target.value }))
              }
            />
          </CellRow>
          <SubmitButton right type='button' onClick={handleAddNew}>
            Dodaj
          </SubmitButton>
        </Cell>
        <Cell />
        <Cell>
          <span>Wszystkie kontakty</span>
          <CellRow>
            <span>Wyszukaj</span>
            <input
              value={workersSearch}
              onChange={e => setWorkersSearch(e.target.value)}
            />
          </CellRow>
          <ItemList>{mappedEvacuations}</ItemList>
        </Cell>
      </Wrapper>
    </BookmarkWrapper>
  );
};

export default Workers;
