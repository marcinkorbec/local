import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import ReactTooltip from 'react-tooltip';
import PopUp from '../../../common/PopUp/PopUp';
import {
  Title,
  Wrapper,
  Notification,
  NotificationsWrapper,
  NotifTitle,
  NotifContent,
  TurnOffButton,
} from './Notifications.css';
import { api } from '../../../API';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotif, setSelectedNotif] = useState();
  const [togglePopUp, setTogglePopUp] = useState(false);

  const getNotifications = async () => {
    try {
      const resp = await api.getNotifications();
      setNotifications(resp.data);
    } catch (err) {
      toast.error(
        <div>{err?.response?.data?.error || err?.response?.data}</div>
      );
    }
  };

  const turnOffNotifications = async id => {
    try {
      await api.putNotificationTurnOff(selectedNotif);
      getNotifications(id);
      setTogglePopUp(false);
      toast.success(
        'Pomyślnie wyłączono powiadomienie dla przedmiotu.',
        OPTIONS
      );
    } catch (err) {
      toast.error(
        <div>{err?.response?.data?.error || err?.response?.data}</div>
      );
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const toggleNotifPopUp = id => {
    setTogglePopUp(prev => !prev);
    setSelectedNotif(id);
  };

  const closePopUp = () => {
    setTogglePopUp(false);
  };

  const notifList = notifications.map(el => (
    <Notification key={el.id}>
      <TurnOffButton
        type='button'
        data-tip
        data-for='turnOffNotif'
        onClick={() => toggleNotifPopUp(el.id)}
      >
        <NotificationsOffIcon />
      </TurnOffButton>
      <NotifTitle>{el.eventName}</NotifTitle>
      <NotifContent>{el.eventDescription}</NotifContent>
      <ReactTooltip id='turnOffNotif' effect='solid'>
        <span style={{ color: 'white' }}>Wyłącz powiadomienie</span>
      </ReactTooltip>
    </Notification>
  ));

  return (
    <Wrapper>
      <Title>
        Powiadomienia <NotificationsIcon />
      </Title>
      <NotificationsWrapper>
        {notifList.length > 0 ? (
          notifList
        ) : (
          <NotifContent>brak powiadomień.</NotifContent>
        )}
      </NotificationsWrapper>
      <PopUp
        title='Wyłącz powiadomienie'
        text='Czy na pewno chcesz wyłączyć to powiadomienie?'
        actionButtonFunc={() => turnOffNotifications(selectedNotif)}
        actionButtonText='Wyłącz'
        togglePopUp={togglePopUp}
        setTogglePopUp={closePopUp}
        buttons
      />
    </Wrapper>
  );
};

export default Notifications;
