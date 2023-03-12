import React, { useState } from 'react';
import Backup from './components/Backup';
import Notifications from './components/Notifications';

import {
  Wrapper,
  Title,
  Buttons,
  Button,
  ButtonLink,
  DateTitle,
} from './HomePage.css';

const HomePage = () => {
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [backupDate, setBackupDate] = useState(0);

  const getCurrentDate = (separator = '-') => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${date < 10 ? `0${date}` : `${date}`}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  };

  return (
    <Wrapper>
      <Title>Dzień dobry</Title>
      <DateTitle>{getCurrentDate()}</DateTitle>
      <Notifications />
      <Buttons>
        <Button type='button' onClick={() => setTogglePopUp(prev => !prev)}>
          Przywróć kopię zapasową
        </Button>
        <ButtonLink to='/report'>Utwórz autoraport</ButtonLink>
        <ButtonLink to='/item-creator'>Dodaj przedmiot</ButtonLink>
      </Buttons>
      <Backup
        togglePopUp={togglePopUp}
        setTogglePopUp={setTogglePopUp}
        backupDate={backupDate}
        setBackupDate={setBackupDate}
      />
    </Wrapper>
  );
};

export default HomePage;
