import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ControlForm } from 'm-web-components';

import { CancelButton, SaveButton } from 'common/Buttons';
import * as S from '../../Administration.css';

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const ModalContent = ({ onSubmit, fields, cancel, row, info }) => {
  const { handleSubmit, control, errors } = useForm({
    defaultValues: row,
  });

  const formFields = fields?.map(el => (
    <>
      <ControlForm key={el.name} errors={errors} {...el} control={control} />
    </>
  ));
  return (
    <S.FormModal onSubmit={handleSubmit(async data => onSubmit(row.id, data))}>
      <p>{info}</p>
      <p>
        <span>Id:</span> {row.id}
      </p>
      <p>
        <span>Imię:</span> {row.name}
      </p>
      <p>
        <span>Nazwisko:</span> {row.surname}
      </p>
      <p>
        <span>E-mail:</span> {row.email}
      </p>

      {formFields}
      <ButtonsWrapper>
        <CancelButton type='button' onClick={cancel} isVisible>
          Anuluj
        </CancelButton>
        <SaveButton type='submit' isVisible>
          Zatwierdź
        </SaveButton>
      </ButtonsWrapper>
    </S.FormModal>
  );
};

export default ModalContent;
