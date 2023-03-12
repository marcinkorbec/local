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

const defaultContact = {
  name: '',
  type: 'MAIN',
};

const Contacts = () => {
  const [newContact, setNewContact] = useState({ ...defaultContact });
  const [contacts, setContacts] = useState([]);
  const [contactsSearch, setContactSearch] = useState('');
  const [currentEdit, setCurrentEdit] = useState({});

  const getContacts = async () => {
    try {
      const { data } = await api.getContacts();
      setContacts(data);
    } catch (e) {
      toast.error('Wystąpił błąd podczas pobierania kontaktów', OPTIONS);
    }
  };

  const handleAddNew = async () => {
    try {
      await api.addContact(newContact);
      setNewContact({ ...defaultContact });
      getContacts();
      toast.success('Kontakt został dodany.', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił błąd podczas dodawania nowego kontaktu.', OPTIONS);
    }
  };

  const handleSave = async () => {
    try {
      await api.updateContact(currentEdit.id, { ...currentEdit, type: 'MAIN' });
      setCurrentEdit({});
      getContacts();
      toast.success('Kontakt został zaktualizowany.', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił błąd podczas aktualizowania kontaktu.', OPTIONS);
    }
  };

  const handleDelete = async id => {
    try {
      await api.deleteContact(id);
      setCurrentEdit({});
      getContacts();
      toast.success('Kontakt został usunięty.', OPTIONS);
    } catch (e) {
      toast.error('Wystąpił błąd podczas usuwania kontaktu.', OPTIONS);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const mappedEvacuations = contacts
    ?.filter(e => JSON.stringify(e)?.includes(contactsSearch))
    ?.map(contact => (
      <SingleItem key={contact.id}>
        <ItemRow>
          <span>Nazwa:</span>
          <input
            disabled={currentEdit?.id !== contact.id}
            value={
              currentEdit?.id === contact.id ? currentEdit?.name : contact.name
            }
            onChange={e =>
              setCurrentEdit(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </ItemRow>
        <ItemRow>
          {currentEdit?.id === contact.id ? (
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
              onClick={() => setCurrentEdit({ ...contact })}
            >
              Edytuj
            </SubmitButton>
          )}
          <SubmitButton
            style={{ margin: 'auto 0 auto auto' }}
            type='button'
            onClick={() => handleDelete(contact.id)}
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
          <span>Dodaj kontakt</span>
          <CellRow>
            <span>Nazwa:</span>
            <input
              value={newContact.name}
              onChange={e =>
                setNewContact(prev => ({ ...prev, name: e.target.value }))
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
              value={contactsSearch}
              onChange={e => setContactSearch(e.target.value)}
            />
          </CellRow>
          <ItemList>{mappedEvacuations}</ItemList>
        </Cell>
      </Wrapper>
    </BookmarkWrapper>
  );
};

export default Contacts;
