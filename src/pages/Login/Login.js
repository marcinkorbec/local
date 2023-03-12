import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TextField } from '@material-ui/core';
import allActions from 'store/actions';
import MainWrapper from 'common/MainWrapper';
import { api } from 'API';
import { ACCESS_TOKEN } from 'utils/constants';
import routes from 'routes';
import { LoginForm, LoginWrapper, SubmitButton } from './Login.css';

const fields = [
  {
    label: 'E-mail',
    field: 'email',
  },
  {
    label: 'Hasło',
    field: 'password',
  },
];

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.pageTitle.setTitle('Logowanie'));
  }, [dispatch]);

  const mappedFields = fields.map(el => (
    <TextField
      id='outlined-basic'
      key={el.label}
      label={el.label}
      type={el.field}
      onChange={e =>
        setLoginData(prev => ({ ...prev, [el.field]: e.target.value }))
      }
      variant='outlined'
    />
  ));

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await api.login(loginData);

      localStorage.setItem(ACCESS_TOKEN, data.token);

      setToken(data.token);
    } catch {
      toast.error('Nie udało się zalogować.\nSpróbuj ponownie.');
    }
  };

  if (token) return <Redirect to={routes.home} />;

  return (
    <MainWrapper>
      <LoginWrapper>
        <LoginForm onSubmit={onSubmit}>
          <h1>Zaloguj się, by korzystać z systemu</h1>
          {mappedFields}
          <SubmitButton>Zaloguj się</SubmitButton>
        </LoginForm>
      </LoginWrapper>
    </MainWrapper>
  );
};

export default Login;
