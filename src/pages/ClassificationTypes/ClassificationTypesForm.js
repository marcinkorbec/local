import React from 'react';
import * as S from './ClassificationTypes.css';

const ClassificationTypesForm = ({
  toggleEdit,
  formData,
  setFormData,
  submitClassificationSystem,
}) => {
  const handleChange = (e, name) => {
    setFormData(prev => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <S.Form>
      <S.Title>
        {toggleEdit ? 'Dodaj nowy rodzaj zbioru' : 'Edytuj rodzaj zbioru'}
      </S.Title>
      {!toggleEdit && formData.id == null && (
        <S.Notice>Aby edytować rodzaj zbioru wybierz element z listy.</S.Notice>
      )}
      <S.Label>
        <span> Znak:</span>
        <S.Input
          name='shortcut'
          id='shortcut'
          value={formData.shortcut}
          onChange={e => handleChange(e, 'shortcut')}
          disabled={!toggleEdit && formData.id == null}
        />
      </S.Label>
      <S.Label>
        <span> Nazwa (pl):</span>
        <S.Input
          name='contentPL'
          id='contentPL'
          value={formData.contentPL}
          onChange={e => handleChange(e, 'contentPL')}
          disabled={!toggleEdit && formData.id == null}
        />
      </S.Label>

      <S.Label>
        <span> Nazwa (eng):</span>
        <S.Input
          name='contentEN'
          id='contentEN'
          value={formData.contentEN}
          onChange={e => handleChange(e, 'contentEN')}
          disabled={!toggleEdit && formData.id == null}
        />
      </S.Label>

      <S.Label>
        <span> Opis:</span>
        <S.Textarea
          name='description'
          id='description'
          value={formData.description}
          onChange={e => handleChange(e, 'description')}
          disabled={!toggleEdit && formData.id == null}
        />
      </S.Label>
      <S.Button
        type='button'
        onClick={submitClassificationSystem}
        disabled={!toggleEdit && formData.id == null}
      >
        {toggleEdit ? 'Dodaj rodzaj zbioru' : 'Zapisz'}
      </S.Button>
    </S.Form>
  );
};
export default ClassificationTypesForm;
