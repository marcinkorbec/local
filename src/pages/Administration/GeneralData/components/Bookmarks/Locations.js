import { api } from 'API';
import getImage from 'common/helpers/getImage';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
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
  QrWrapper,
} from './Bookmarks.css';

const defaultLocation = {
  name: '',
  priority: '',
};

const Locations = () => {
  const printRef = useRef();
  const [newLocation, setNewLocation] = useState({ ...defaultLocation });
  const [locations, setLocations] = useState([]);
  const [evacuations, setEvacuations] = useState([]);
  const [locationSearch, setLocationSearch] = useState('');
  const [evacuationSearch, setEvacuationSearch] = useState('');
  const [currentEdit, setCurrentEdit] = useState({});
  const [currentCode, setCurrentCode] = useState({});

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const getLocations = async () => {
    try {
      const { data } = await api.getLocations();
      const { data: data2 } = await api.getEvacuations();
      setLocations(data);
      setEvacuations(data2);
    } catch (e) {
      toast.error('Wystąpił błąd podczas pobierania lokalizacji.', OPTIONS);
    }
  };

  const handleAddNew = async () => {
    try {
      await api.addLocation(newLocation);
      setNewLocation({ ...defaultLocation });
      getLocations();
      toast.success('Lokalizacja została dodana.', OPTIONS);
    } catch (e) {
      toast.error(
        'Wystąpił błąd podczas dodawania nowej lokalizacji.',
        OPTIONS
      );
    }
  };

  const handleSave = async () => {
    try {
      await api.updateLocation({
        ...currentEdit,
        locationId: currentEdit.id || currentEdit.locationId,
      });
      setCurrentEdit({});
      getLocations();
      toast.success('Lokalizacja została zaktualizowana.', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił błąd podczas aktualziwania lokalizacji.', OPTIONS);
    }
  };

  const handleDelete = async id => {
    try {
      await api.deleteLocation(id);
      setCurrentEdit({});
      getLocations();
      toast.success('Lokalizacja została usunięta.', OPTIONS);
    } catch (e) {
      toast.error(
        'Wystąpił błąd podczas usuwania lokalizacji. Sprawdź, czy jeden z obiektów nie jest przypisany do tej lokalizacji.',
        OPTIONS
      );
    }
  };

  const handlePrintQr = async loc => {
    try {
      const { data } = await api.getLocation(loc.id);
      setCurrentCode({ name: data.name, qrCode: getImage(data.encodedQr) });
      handlePrint();
    } catch {
      toast.error('Wystąpił bład podczas ładowania kodu QR');
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const mappedEvacuations = evacuations
    ?.filter(e =>
      `${e?.name} ${e.priority}`
        .toLowerCase()
        .includes(evacuationSearch.toLowerCase())
    )
    ?.map(loc => (
      <SingleItem key={loc.locationId}>
        <ItemRow>
          <span>Nazwa:</span>
          <input
            disabled={currentEdit?.locationId !== loc.locationId}
            value={
              currentEdit?.locationId === loc.locationId
                ? currentEdit?.name
                : loc.name
            }
            onChange={e =>
              setCurrentEdit(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </ItemRow>
        <ItemRow>
          <span>Priorytet:</span>
          <input
            disabled={currentEdit?.locationId !== loc.locationId}
            type='number'
            value={
              currentEdit?.locationId === loc.locationId
                ? currentEdit?.priority
                : loc.priority
            }
            onChange={e =>
              setCurrentEdit(prev => ({ ...prev, priority: e.target.value }))
            }
          />
        </ItemRow>
        <ItemRow>
          <SubmitButton type='button' onClick={() => handlePrintQr(loc)}>
            Drukuj kod QR
          </SubmitButton>
          {currentEdit?.locationId === loc.locationId ? (
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
              onClick={() => setCurrentEdit({ ...loc })}
            >
              Edytuj
            </SubmitButton>
          )}
          <SubmitButton
            style={{ margin: 'auto 0 auto auto' }}
            type='button'
            onClick={() => handleDelete(loc.locationId)}
          >
            Usuń
          </SubmitButton>
        </ItemRow>
      </SingleItem>
    ));

  const mappedLocations = locations
    ?.filter(e =>
      `${e?.name} ${e.priority}`
        .toLowerCase()
        .includes(locationSearch.toLowerCase())
    )
    ?.map(loc => (
      <SingleItem key={loc.id}>
        <ItemRow>
          <span>Nazwa:</span>
          <input
            disabled={currentEdit?.id !== loc.id}
            value={currentEdit?.id === loc.id ? currentEdit?.name : loc.name}
            onChange={e =>
              setCurrentEdit(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </ItemRow>
        <ItemRow>
          <span>Priorytet:</span>
          <input
            disabled={currentEdit?.id !== loc.id}
            type='number'
            value={
              currentEdit?.id === loc.id ? currentEdit?.priority : loc.priority
            }
            onChange={e =>
              setCurrentEdit(prev => ({ ...prev, priority: e.target.value }))
            }
          />
        </ItemRow>
        <ItemRow>
          <SubmitButton type='button' onClick={() => handlePrintQr(loc)}>
            Drukuj kod QR
          </SubmitButton>
          {currentEdit?.id === loc.id ? (
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
              onClick={() => setCurrentEdit({ ...loc })}
            >
              Edytuj
            </SubmitButton>
          )}
          <SubmitButton
            style={{ margin: 'auto 0 auto auto' }}
            type='button'
            onClick={() => handleDelete(loc.id)}
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
          <span>Dodaj lokalizację</span>
          <CellRow>
            <span>Nazwa:</span>
            <input
              value={newLocation.name}
              onChange={e =>
                setNewLocation(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </CellRow>
          <CellRow>
            <span>Priorytet:</span>
            <input
              type='number'
              value={newLocation.priority}
              onChange={e =>
                setNewLocation(prev => ({ ...prev, priority: e.target.value }))
              }
            />
          </CellRow>
          <SubmitButton right type='button' onClick={handleAddNew}>
            Dodaj
          </SubmitButton>
        </Cell>
        <Cell />
        <Cell>
          <span>Wszystkie lokalizacje</span>
          <CellRow>
            <span>Wyszukaj</span>
            <input
              value={locationSearch}
              onChange={e => setLocationSearch(e.target.value)}
            />
          </CellRow>
          <ItemList>{mappedLocations}</ItemList>
        </Cell>
        <Cell>
          <span>Wszystkie lokalizacje z przypisanymi przedmiotami</span>
          <CellRow>
            <span>Wyszukaj</span>
            <input
              value={evacuationSearch}
              onChange={e => setEvacuationSearch(e.target.value)}
            />
          </CellRow>
          <ItemList>{mappedEvacuations}</ItemList>
        </Cell>
      </Wrapper>
      <QrWrapper ref={printRef}>
        <img src={currentCode.qrCode} alt='Kod lokalizacji' />
        <span>{currentCode.name}</span>
      </QrWrapper>
    </BookmarkWrapper>
  );
};

export default Locations;
