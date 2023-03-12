import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as S from './PopUp.css';

const PopUp = ({
  children,
  title,
  text,
  buttons,
  actionButtonText,
  actionButtonFunc,
  togglePopUp,
  setTogglePopUp,
}) => {
  const closePopUp = () => {
    setTogglePopUp(prev => !prev);
  };

  return (
    <S.Wrapper togglePopUp={togglePopUp} setTogglePopUp={setTogglePopUp}>
      <S.Background onClick={closePopUp} />
      <S.Content>
        <S.TopBar>
          {title && <S.Title>{title}</S.Title>}
          <S.CloseButton onClick={closePopUp}>
            <CloseIcon />
          </S.CloseButton>
        </S.TopBar>

        <S.ChildrenWrap>
          {text}
          {children}
        </S.ChildrenWrap>
        {buttons && (
          <S.Buttons>
            <S.Button onClick={actionButtonFunc}>{actionButtonText}</S.Button>
            <S.Button onClick={closePopUp} type='button'>
              Anuluj
            </S.Button>
          </S.Buttons>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default PopUp;
