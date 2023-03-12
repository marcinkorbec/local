import React, { useState, useEffect } from 'react';
import { api } from 'API';
import styled from 'styled-components';
import PopUp from 'common/PopUp/PopUp';
import { scroll } from 'styles/mixins';
import theme from 'styles/theme';
import { toast } from 'react-toastify';

const Title = styled.h2`
  font-weight: 400;
  font-size: 1rem;
  margin: 0;
  margin-bottom: 20px;
`;

const BackUpWrap = styled.div`
  margin: 10px;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  overflow-y: auto;

  ${scroll}
`;

const BackUpElement = styled.div`
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  background: ${({ isSelected }) => (isSelected === true ? '#888' : 'none')};
  color: ${({ isSelected }) =>
    isSelected === true ? '#fff' : theme.secondary};
  border-bottom: 1px solid #ccc;

  :hover {
    background: ${({ isSelected }) =>
      isSelected === true ? '#888' : '#dcdcdc'};
  }
`;

const NoData = styled.p`
  font-size: 0.8rem;
`;

const Backup = ({ togglePopUp, setTogglePopUp, backupDate, setBackupDate }) => {
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const [backUpData, setBackUpData] = useState([]);

  const getBackup = async () => {
    try {
      const resp = await api.getBackup();
      setBackUpData(resp.data);
    } catch (err) {
      toast.error(
        <div>{err?.response?.data?.error || err?.response?.data}</div>
      );
    }
  };

  const doBackup = async () => {
    try {
      await api.postBackup({ date: backupDate });
      setToggleConfirm(prev => !prev);
      setTogglePopUp(prev => !prev);
      setBackupDate(null);
      toast.success('Pomyślnie przywrócono kopię zapasową.');
    } catch (err) {
      toast.error(
        <div>{err?.response?.data?.error || err?.response?.data}</div>
      );
    }
  };

  useEffect(() => {
    getBackup();
  }, []);

  const confirmAction = () => {
    if (backupDate) setToggleConfirm(prev => !prev);
    else toast.error('Wybierz kopię zapasową z listy');
  };

  const closePopUp = () => {
    setTogglePopUp(false);
    setToggleConfirm(false);
    setBackupDate(null);
  };

  const backupList = backUpData.map(el => (
    <BackUpElement
      key={el}
      onClick={() => setBackupDate(el)}
      isSelected={el === backupDate}
    >
      {el}
    </BackUpElement>
  ));

  return (
    <PopUp
      title='Przywróć kopię zapasową'
      buttons
      actionButtonText='Przywróć'
      actionButtonFunc={confirmAction}
      togglePopUp={togglePopUp}
      setTogglePopUp={closePopUp}
    >
      <Title>Wybierz datę, do której chcesz przywrócić system</Title>
      <BackUpWrap>
        {!backupList ? <NoData>Brak kopii zapasowych. </NoData> : backupList}
      </BackUpWrap>
      <PopUp
        title='Przywróć kopię zapasową'
        text='Czy na pewno chcesz przywrócić kopię zapasową?'
        buttons
        actionButtonText='Przywróć'
        actionButtonFunc={doBackup}
        togglePopUp={toggleConfirm}
        setTogglePopUp={setToggleConfirm}
      />
    </PopUp>
  );
};

export default Backup;
